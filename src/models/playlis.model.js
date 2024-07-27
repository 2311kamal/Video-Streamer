import mongoose, { Schema } from "mongoose";

const playlistSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    description: {
      type: String,
      default: "This playlist has no description",
    },

    videos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "video",
      },
    ],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);

export const playlist = mongoose.model("playlist", playlistSchema);
