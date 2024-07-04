"use server";

import User from "@/models/User.model";

const getUser = async (userId: string) => {
  try {
    const user = await User.findOne({ userId });

    console.log(user);

    return user;
  } catch (error) {
    console.log("Connection to server failed");
  }
};

export { getUser };
