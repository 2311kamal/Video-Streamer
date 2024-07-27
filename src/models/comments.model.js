import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },

    video: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "video",
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);

export const comment = mongoose.model("comment", commentSchema);
