import mongoose, { isValidObjectId } from "mongoose";
import { Like } from "../models/like.model.js";
import { Video } from "../models/video.model.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const toggleVideoLike = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: toggle like on video
  const video = await Video.findById(videoId);
  if (!video) {
    throw new apiError(404, "Video does not exist");
  }
  const isLiked = await Like.findOne({ video: videoId, likedBy: req.user._id });
  let response;
  try {
      response = isLiked
      ? await Like.deleteOne({ video: videoId, likedBy: req.user._id })
      : await Like.create({ video: videoId, likedBy: req.user._id });
    } catch (error) {
        console.log("toggleVideoLike :: ", error);
        throw new apiError(500, error?.message || "Internal server Error");
    }
    // console.log(response);
  return res.status(200).json(
    new apiResponse(
      200,
      {
        response,
        likedBy: req.user.userName,
        video: video.title,
      },
      isLiked === null ? "Liked the Video " : "undo Like"
    )
  );
});

const toggleCommentLike = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  //TODO: toggle like on comment
});

const toggleTweetLike = asyncHandler(async (req, res) => {
  const { tweetId } = req.params;
  //TODO: toggle like on tweet
});

const getLikedVideos = asyncHandler(async (req, res) => {
  //TODO: get all liked videos
});

export { toggleCommentLike, toggleTweetLike, toggleVideoLike, getLikedVideos };
