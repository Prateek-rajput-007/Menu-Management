import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// MongoDB connection URI
const dbURI = process.env.MONGODB_URI;

if (!dbURI) {
  console.error("Error: MONGODB_URI is not defined in environment variables.");
  process.exit(1); // Exit the process if no DB URI is found
}

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(dbURI);
    console.log("Connection successful.");
  } catch (error) {
    console.error("Connection failed:", error.message);
    process.exit(1); // Exit the process on failure
  }
};

// Export the connection function without invoking it
export default connectDB;
