"use server";

import Community from "@/models/Community.model";
import User from "@/models/User.model";
import {
  TCreateCommunityProps,
  TUpdateCommunityInfoProps,
} from "@/types/types";
import connectDB from "@/utils/connectDB";
import { revalidatePath } from "next/cache";

const createCommunity = async ({
  id,
  name,
  slug,
  image,
  bio,
  createdBy,
}: TCreateCommunityProps) => {
  try {
    await connectDB();

    const owner = await User.findOne({ userId: createdBy });

    if (!owner) return;

    const community = await Community.findOne({ communityId: id });

    if (community) return;

    const newCommunity = await Community.create({
      communityId: id,
      name,
      slug,
      image,
      bio,
      owner,
    });

    newCommunity.members.push(owner);
    await newCommunity.save();

    owner.communities.push(newCommunity);
    await owner.save();

    revalidatePath("/communities");

    return newCommunity;
  } catch (error) {
    console.log("Connection to server failed", error);
  }
};

const addMemberToCommunity = async (orgId: string, userId: string) => {
  try {
    await connectDB();

    const user = await User.findOne({ userId });

    if (!user) return;

    const community = await Community.findOne({ communityId: orgId });

    if (!community) return;

    community.members.push(user);
    await community.save();

    user.communities.push(community);
    await user.save();

    revalidatePath("/communities");

    return { message: "Member added to community" };
  } catch (error) {
    console.log("Connection to server failed", error);
  }
};

const removeUserFromCommunity = async (orgId: string, userId: string) => {
  try {
    await connectDB();

    await Community.updateOne(
      { communityId: orgId },
      {
        $pull: {
          members: { userId: userId },
        },
      }
    );

    await User.updateOne(
      { userId: userId },
      {
        $pull: {
          communities: { communityId: orgId },
        },
      }
    );

    revalidatePath("/communities");

    return { message: "Member removed from community" };
  } catch (error) {
    console.log("Connection to server failed", error);
  }
};

const updateCommunityInfo = async ({
  id,
  name,
  slug,
  image,
}: TUpdateCommunityInfoProps) => {
  try {
    await connectDB();

    await Community.updateOne({ communityId: id }, { name, slug, image });

    revalidatePath("/communities");

    return { message: "Community updated" };
  } catch (error) {
    console.log("Connection to server failed", error);
  }
};

const deleteCommunity = async (
  id: string | number | Record<string, string>[]
) => {
  try {
    await connectDB();

    await Community.deleteOne({ communityId: id });

    await User.updateOne(undefined, {
      $pull: { communities: { communityId: id } },
    });

    revalidatePath("/communities");
    return { message: "Community updated" };
  } catch (error) {
    console.log("Connection to server failed", error);
  }
};

const fetchCommunities = async (searchString: string) => {
  try {
    await connectDB();

    const communities = await Community.find({
      $or: [
        { name: { $regex: searchString.trim(), $options: "i" } },
        { slug: { $regex: searchString.trim(), $options: "i" } },
      ],
    })
      .populate({path: "members", model: "User", select: "imageUrl"});

    const uniqueCommunities = Array.from(
      new Set(communities.map((community) => community._id))
    )
      .map((id) => communities.find((community) => community._id === id))
      .slice(0, 8);

    revalidatePath("/communities");

    return JSON.stringify(uniqueCommunities);
  } catch (error) {
    console.log("Connection to server failed", error);
  }
};

const fetchSuggestedCommunities = async () => {
  try {
    await connectDB();

    const communities = await Community.find();
    const finalCommunities = communities.reverse().slice(0, 4);

    return finalCommunities;
  } catch (error) {
    console.log("Connection to server failed", error);
  }
};

export {
  addMemberToCommunity,
  createCommunity,
  deleteCommunity,
  removeUserFromCommunity,
  updateCommunityInfo,
  fetchCommunities,
  fetchSuggestedCommunities,
};
