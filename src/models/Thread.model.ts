import { IThread, TThreadModel } from "@/types/types";
import { Schema, models, model } from "mongoose";

const threadSchema = new Schema<IThread, TThreadModel>({
  text: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },

  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  parentId: String || null,

  children: [
    {
      type: Schema.Types.ObjectId,
      ref: "Thread",
    },
  ],

  community: {
    type: Schema.Types.ObjectId,
    ref: "Community",
  },
});

const Thread =
  models.Thread || model<IThread, TThreadModel>("Thread", threadSchema);

export default Thread;
