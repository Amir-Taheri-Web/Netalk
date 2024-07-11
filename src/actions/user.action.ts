"use server";

import Community from "@/models/Community.model";
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

    const existingUser = await User.findOne({ userId });

    if (existingUser) return existingUser;

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
    await connectDB();

    const user = await User.findOne({ userId })
      .populate({
        path: "threads",
        populate: {
          path: "author",
          model: User,
          select: "_id userId username imageUrl",
        },
      })
      .populate({
        path: "threads",
        populate: {
          path: "children",
          populate: {
            path: "author",
            model: User,
            select: "_id userId username imageUrl",
          },
        },
      })
      .populate({ path: "communities", model: Community });

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
    await connectDB();

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

const fetchUsers = async (searchString: string) => {
  try {
    await connectDB();

    const users = await User.find({
      $or: [
        { name: { $regex: searchString, $options: "i" } },
        { username: { $regex: searchString, $options: "i" } },
      ],
    });

    const uniqueUsers = Array.from(new Set(users.map((user) => user._id)))
      .map((id) => users.find((user) => user._id === id))
      .slice(0, 10);

    revalidatePath("/search");

    return JSON.stringify(uniqueUsers);
  } catch (error) {
    console.log("Connection to server failed", error);
  }
};

const fetchSuggestedUsers = async () => {
  try {
    await connectDB();

    const users = await User.find();
    const finalUsers = users.reverse().slice(0, 4);

    return finalUsers;
  } catch (error) {
    console.log("Connection to server failed", error);
  }
};

export { getUser, updateUser, createUser, fetchUsers, fetchSuggestedUsers };
