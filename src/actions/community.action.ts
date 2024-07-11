import {
  TCreateCommunityProps,
  TUpdateCommunityInfoProps,
} from "@/types/types";

const createCommunity = async ({
  id,
  name,
  slug,
  image,
  bio,
  createdBy,
}: TCreateCommunityProps) => {};

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
