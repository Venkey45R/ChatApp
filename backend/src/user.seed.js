import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import User from "./models/users.model.js";
dotenv.config();

const seedUsers = [
  {
    email: "akash@gmail.com",
    fullName: "Akash",
    password: "12345678",
    profilePicture: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    email: "sara@gmail.com",
    fullName: "Sara Ali",
    password: "password123",
    profilePicture: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    email: "john.doe@gmail.com",
    fullName: "John Doe",
    password: "johnpassword",
    profilePicture: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    email: "linda.smith@gmail.com",
    fullName: "Linda Smith",
    password: "lindapass",
    profilePicture: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    email: "mike.jones@gmail.com",
    fullName: "Mike Jones",
    password: "mike1234",
    profilePicture: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    email: "emma.watson@gmail.com",
    fullName: "Emma Watson",
    password: "emma2024",
    profilePicture: "https://randomuser.me/api/portraits/women/6.jpg",
  },
  {
    email: "david.brown@gmail.com",
    fullName: "David Brown",
    password: "davidpass",
    profilePicture: "https://randomuser.me/api/portraits/men/7.jpg",
  },
  {
    email: "nina.kapoor@gmail.com",
    fullName: "Nina Kapoor",
    password: "nina123",
    profilePicture: "https://randomuser.me/api/portraits/women/8.jpg",
  },
  {
    email: "samuel.green@gmail.com",
    fullName: "Samuel Green",
    password: "samgreen",
    profilePicture: "https://randomuser.me/api/portraits/men/9.jpg",
  },
  {
    email: "lucy.williams@gmail.com",
    fullName: "Lucy Williams",
    password: "lucypass",
    profilePicture: "https://randomuser.me/api/portraits/women/10.jpg",
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();
    await User.insertMany(seedUsers);
    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

seedDatabase();
