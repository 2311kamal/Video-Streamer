import mongoose, { isValidObjectId } from "mongoose";
import { Like } from "../models/like.model.js";
import { Video } from "../models/video.model.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import videoRouter from "../routes/video.routes.js";

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

  const comment = await Comment.findById(commentId);
  if (!comment) {
    throw new apiError(404, "Comment does not exist");
  }
  const isLiked = await Like.findOne({
    comment: commentId,
    likedBy: req.user._id,
  });
  let response;
  try {
    response = isLiked
      ? await Like.deleteOne({ comment: commentId, likedBy: req.user._id })
      : await Like.create({ comment: commentId, likedBy: req.user._id });
  } catch (error) {
    console.log("toggleCommentLike :: ", error);
    throw new apiError(500, error?.message || "Internal server Error");
  }
  // console.log(response);
  return res.status(200).json(
    new apiResponse(
      200,
      {
        response,
        likedBy: req.user.userName,
        comment: comment.content,
      },
      isLiked === null ? "Liked the Comment " : "undo Like"
    )
  );
});

const toggleTweetLike = asyncHandler(async (req, res) => {
  const { tweetId } = req.params;
  //TODO: toggle like on tweet

  const tweet = await Comment.findById(tweetId);
  if (!tweet) {
    throw new apiError(404, "Comment does not exist");
  }
  const isLiked = await Like.findOne({
    tweet: tweetId,
    likedBy: req.user._id,
  });
  let response;
  try {
    response = isLiked
      ? await Like.deleteOne({ tweet: tweetId, likedBy: req.user._id })
      : await Like.create({ tweet: tweetId, likedBy: req.user._id });
  } catch (error) {
    console.log("toggleCommentLike :: ", error);
    throw new apiError(500, error?.message || "Internal server Error");
  }
  // console.log(response);
  return res.status(200).json(
    new apiResponse(
      200,
      {
        response,
        likedBy: req.user.userName,
        tweet: tweet.content,
      },
      isLiked === null ? "Liked the Comment " : "undo Like"
    )
  );
});

const getLikedVideos = asyncHandler(async (req, res) => {
  //TODO: get all liked videos
  const user = req.user;
  if (!user) {
    throw new apiError(403, "Bad user request");
  }
  const videos = await Like.aggregate([
    {
      $match: { likedBy: user._id },
    },
    {
      $lookup: {
        from: "videos",
        localField: "video",
        foreignField: "_id",
        as: "likedVideo",
        pipeline: [
          {
            $project: {
              _id: 0,
              owner: 1,
              title: 1,
            },
          },
          {
            $lookup: {
              from: "users",
              localField: "owner",
              foreignField: "_id",
              as: "videoOwner",
            },
          },
          {
            $addFields: {
              owner: { $first: "$videoOwner.userName" },
            },
          },
          {
            $project: {
              videoOwner: 0,
            },
          },
        ],
      },
    },
    {
      $addFields: {
        title: { $first: "$likedVideo.title" },
        channelUserName: { $first: "$likedVideo.owner" },
        likedByuserName: req.user.userName,
      },
    },
    {
      $project: {
        likedVideo: 0,
      },
    },
  ]);

  return res
    .status(200)
    .json(
      new apiResponse(
        200,
        { videos, likes: videos.length },
        "Liked videos fetched"
      )
    );
});

export { toggleCommentLike, toggleTweetLike, toggleVideoLike, getLikedVideos };
