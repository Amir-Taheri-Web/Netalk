"use server";

import Thread from "@/models/Thread.model";
import User from "@/models/User.model";
import { TCreateThreadProps } from "@/types/types";
import connectDB from "@/utils/connectDB";
import { revalidatePath } from "next/cache";

const createThread = async ({ userId, text, parentId }: TCreateThreadProps) => {
  try {
    connectDB();

    const user = await User.findOne({ userId });

    const newThread = await Thread.create({
      text,
      author: user,
      parentId: parentId || null,
    });

    user?.threads.push(newThread);
    await user?.save();

    if (parentId) {
      const parentThread = await Thread.findOne({ _id: parentId });
      parentThread.children.push(newThread);
      await parentThread.save();
      revalidatePath(`/thread/${userId}`);
    }

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

const fetchThread = async (id: string) => {
  try {
    connectDB();

    const thread = await Thread.findOne({ _id: id })
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

    thread.children.reverse();

    return thread;
  } catch (error) {
    console.log("Connection to server failed", error);
  }
};

export { createThread, fetchThreads, fetchThread };
