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

    revalidatePath("/community");

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
          members: [{ userId: userId }],
        },
      }
    );

    await User.updateOne(
      { userId: userId },
      {
        $pull: {
          communities: [{ communityId: orgId }],
        },
      }
    );

    revalidatePath("/community");

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

    await User.find({}, { $pull: { communities: [{ communityId: id }] } });

    return { message: "Community updated" };
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
};
