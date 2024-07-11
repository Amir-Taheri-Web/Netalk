import { ICommunity, TCommunityModel } from "@/types/types";
import { Schema, models, model } from "mongoose";

const communitySchema = new Schema<ICommunity, TCommunityModel>({
  communityId: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  slug: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: true,
  },

  bio: {
    type: String,
    required: true,
  },

  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  members: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Community =
  models.Community ||
  model<ICommunity, TCommunityModel>("Community", communitySchema);

export default Community;
