"use server";

import User from "@/models/User.model";
import { TUserInfoProps } from "@/types/types";
import connectDB from "@/utils/connectDB";
import { revalidatePath } from "next/cache";

const createUser = async ({
  userId,
  imageUrl,
  name,
  username,
  bio,
}: TUserInfoProps) => {
  try {
    connectDB();

    const newUser = await User.create({
      userId,
      imageUrl,
      name,
      username,
      bio,
    });

    return newUser;
  } catch (error) {
    console.log("Connection to server failed", error);
  }
};

const getUser = async (userId: string) => {
  try {
    connectDB();

    const user = await User.findOne({ userId }).populate({
      path: "threads",
      populate: {
        path: "author",
        model: User,
        select: "_id username imageUrl",
      },
    });

    return user;
  } catch (error) {
    console.log("Connection to server failed", error);
  }
};

const updateUser = async ({
  userId,
  imageUrl,
  name,
  username,
  bio,
  isEdit,
}: TUserInfoProps) => {
  try {
    connectDB();

    const user = await User.findOneAndUpdate(
      { userId },
      { imageUrl, name, username, bio, onboarding: true }
    );
    await user?.save();

    if (isEdit) {
      revalidatePath("/profile");
    }
  } catch (error) {
    console.log("Connection to server failed", error);
  }
};

export { getUser, updateUser, createUser };
