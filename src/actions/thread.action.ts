"use server";

import Thread from "@/models/Thread.model";
import User from "@/models/User.model";
import { TCreateThreadProps } from "@/types/types";
import connectDB from "@/utils/connectDB";

const createThread = async ({ userId, text }: TCreateThreadProps) => {
  try {
    connectDB();

    const user = await User.findOne({ userId });

    const newThread = await Thread.create({
      text,
      author: user,
    });

    user?.threads.push(newThread);
    user?.save();

    return { status: "success" };
  } catch (error) {
    console.log("Connection to server failed", error);
  }
};

export { createThread };
