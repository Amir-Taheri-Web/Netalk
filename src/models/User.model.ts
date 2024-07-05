import { IUser, TUserModel } from "@/types/types";
import { Schema, models, model } from "mongoose";

const userSchema = new Schema<IUser, TUserModel>({
  userId: {
    type: String,
    required: true,
  },

  imageUrl: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  username: {
    type: String,
    required: true,
  },

  bio: String,

  communities: [
    {
      type: Schema.Types.ObjectId,
      ref: "Community",
    },
  ],

  threads: [
    {
      type: Schema.Types.ObjectId,
      ref: "Thread",
    },
  ],

  onboarding: {
    type: Boolean,
    default: false,
  },
});

const User: TUserModel =
  models.User || model<IUser, TUserModel>("User", userSchema);

export default User;
