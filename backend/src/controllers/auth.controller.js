import { generateToken } from "../lib/utils.js";
import User from "../models/users.model.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";
import sendMail from "../lib/mail.js";

export const Signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }
    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });
    generateToken(newUser._id, res);
    await newUser.save();
    const subject = "Welcome to Huddle! 🎉";
    const message = `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; padding: 25px; border-radius: 10px; background-color: #f9f9f9;">
            <div style="text-align: center; margin-bottom: 20px;">
                <h1 style="color: #4A90E2; font-size: 28px; margin: 0;">Welcome to Huddle!</h1>
            </div>
            <p style="font-size: 16px;"><strong>Greetings ${fullName},</strong></p>
            <p style="font-size: 16px;">On behalf of the entire team, we're thrilled to welcome you to the Huddle community. This is a place where like-minded people can <strong>connect, communicate, and share their learnings and experiences</strong>.</p>
            <p style="font-size: 16px;">Huddle is the right place for people who are ready to team up with skilled individuals and change the world together. We've built this community with people like you in mind, focusing on simplicity and the mission of giving you a great user experience.</p>
            <div style="text-align: center; margin: 30px 0; padding: 15px; background-color: #e6f3ff; border-radius: 8px;">
                <h3 style="color: #4A90E2; font-style: italic; margin: 0;">Huddle is to Hustle.</h3>
            </div>
            <br>
            <p style="font-size: 14px; color: #777; border-top: 1px solid #eee; padding-top: 15px; margin-top: 20px;">
                Best regards,<br>
                The Huddle Team
            </p>
          </div>
        `;
    try {
      await sendMail(newUser.email, subject, message);
    } catch (error) {
      console.error("Error sending welcome email:", error);
    }
    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
      profilePic: newUser.profilePic,
      message: "User created successfully",
    });
  } catch (error) {
    console.error("Error in Signup:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    generateToken(user._id, res);
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
      message: "Login successful",
    });
  } catch (error) {
    console.error("Error in Login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const Logout = (req, res) => {
  try {
    res.cookie("jwt", "", {
      maxAge: 0,
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Error in Logout:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const UpdateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;
    if (!profilePic) {
      return res.status(400).json({ message: "Profile picture is required" });
    }
    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );
    res.status(200).json({ updatedUser });
  } catch (error) {
    console.error("Error in UpdateProfile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const checkAuth = (req, res) => {
  try {
    res.status(200).json({ user: req.user });
  } catch (error) {
    console.error("Error in checkAuth:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
