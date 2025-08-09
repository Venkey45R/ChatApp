import Message from "../models/message.model.js";
import User from "../models/users.model.js";
import cloudinary from "../lib/cloudinary.js";
import { io, getReceiverSocketId } from "../lib/socket.js";
import sendMail from "../lib/mail.js";
export const getUsersForSideBar = async (req, res) => {
  try {
    const loggedUserId = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedUserId },
    }).select("-password");
    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error fetching users for sidebar:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const MyId = req.user._id;
    const messages = await Message.find({
      $or: [
        { senderId: MyId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: MyId },
      ],
    });
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// ... (previous imports and code)

export const sendMessage = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const senderId = req.user._id;
    const { text, image } = req.body;

    let imageUrl;
    if (image) {
      try {
        const uploadResponse = await cloudinary.uploader.upload(image);
        imageUrl = uploadResponse.secure_url;
      } catch (uploadError) {
        console.error("Failed to upload image:", uploadError);
        imageUrl = null;
      }
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();

    const receiverUser = await User.findById(receiverId);

    if (receiverUser) {
      const subject = `New Message from ${req.user.fullName} on Huddle`;
      const message = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
          <h2 style="color: #4A90E2; text-align: center;">New Message on Huddle! 💬</h2>
          <p>Hello ${receiverUser.fullName},</p>
          <p>You have received a new message from <storng>${req.user.fullName}</strong>.</p>
          <p style="text-align: center; margin-top: 25px;">
            <a href="https://chatapp-ob8g.onrender.com/" style="background-color: #4A90E2; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">View Message on Huddle</a>
          </p>
          <br>
          <p style="font-size: 0.9em; color: #777;">Best regards,</p>
          <p style="font-size: 0.9em; color: #777;">The Huddle Team</p>
        </div>
      `;
      sendMail(receiverUser.email, subject, message).catch((mailError) => {
        console.error("Error sending email notification:", mailError);
      });
    }

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }
    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error in sendMessage controller:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
