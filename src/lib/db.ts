import mongoose from "mongoose";
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://admin:pass@cluster0.0sets.mongodb.net/";


export const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(MONGO_URI);
  console.log("MongoDB connected");
};
