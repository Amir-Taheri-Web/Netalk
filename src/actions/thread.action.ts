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

const fetchThreads = async (amount: number, skipAmount: number) => {
  try {
    connectDB();

    const threads = await Thread.find({ parentId: { $in: [null, undefined] } })
      .sort({ createdAt: "desc" })
      .limit(amount)
      .skip(skipAmount)
      .populate({
        path: "author",
        model: User,
        select: "_id userId username imageUrl",
      })
      .populate({
        path: "children",
        populate: {
          path: "author",
          model: User,
          select: "_id username imageUrl",
        },
      });

    const threadCount = await Thread.countDocuments({
      parentId: { $in: [null, undefined] },
    });

    const isNext = threadCount > threads.length + skipAmount;

    return JSON.stringify({ threads, isNext });
  } catch (error) {
    console.log("Connection to server failed", error);
  }
};

export { createThread, fetchThreads };