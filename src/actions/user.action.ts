"use server";

import User from "@/models/User.model";
import { TUserInfoProps } from "@/types/types";
import connectDB from "@/utils/connectDB";

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

    const user = await User.findOne({ userId });

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
}: TUserInfoProps) => {
  try {
    connectDB();

    const user = await User.findOneAndUpdate(
      { userId },
      { imageUrl, name, username, bio, onboarding: true }
    );
    await user?.save();
  } catch (error) {
    console.log("Connection to server failed", error);
  }
};

export { getUser, updateUser, createUser };
