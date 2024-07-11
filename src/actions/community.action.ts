import Community from "@/models/Community.model";
import User from "@/models/User.model";
import {
  TCreateCommunityProps,
  TUpdateCommunityInfoProps,
} from "@/types/types";
import connectDB from "@/utils/connectDB";

const createCommunity = async ({
  id,
  name,
  slug,
  image,
  bio,
  createdBy,
}: TCreateCommunityProps) => {
  try {
    connectDB();

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

    return newCommunity;
  } catch (error) {
    console.log("Connection to server failed", error);
  }
};

const addMemberToCommunity = async (orgId: string, userId: string) => {};

const removeUserFromCommunity = async (orgId: string, userId: string) => {};

const updateCommunityInfo = async ({
  id,
  name,
  slug,
  image,
}: TUpdateCommunityInfoProps) => {};

const deleteCommunity = async (
  id: string | number | Record<string, string>[]
) => {};

export {
  addMemberToCommunity,
  createCommunity,
  deleteCommunity,
  removeUserFromCommunity,
  updateCommunityInfo,
};
