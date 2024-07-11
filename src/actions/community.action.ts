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

const addMemberToCommunity = async (orgId: string, userId: string) => {
  try {
    connectDB();

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
    connectDB();

    const community = await Community.findOneAndUpdate(
      { communityId: orgId },
      {
        $pullAll: {
          members: [{ userId }],
        },
      }
    );

    await community?.save();

    const user = await User.findOneAndUpdate(
      { userId },
      {
        $pullAll: {
          communities: [{ communityId: orgId }],
        },
      }
    );

    await user?.save();

    // community.members = community.members.filter(
    //   (item: any) => item.userId !== userId
    // );
    // await community.save();

    // user.communities = user.communities.filter(
    //   (item: any) => item.communityId !== orgId
    // );
    // await user.save();

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
