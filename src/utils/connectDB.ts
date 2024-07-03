import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  mongoose.set("strictQuery", true);

  try {
    if (mongoose.connections[0].readyState) return;

    await mongoose.connect(process.env.MONGODB_URI as string);

    console.log("Connected To DB!");
  } catch (error) {
    console.log("Connection to DB failed!");
  }
};

export default connectDB;
