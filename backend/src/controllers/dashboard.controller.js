import mongoose from "mongoose";
import { Video } from "../models/video.model.js";
import { User } from "../models/user.model.js";
import { Subscription } from "../models/subscription.model.js";
import { Like } from "../models/like.model.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { response } from "express";

const getChannelStats = asyncHandler(async (req, res) => {
  // TODO: Get the channel stats like total video views, total subscribers, total videos, total likes etc.
  let videos, subscriberList;
  try {
    videos = await Video.aggregate([
      {
        $match: {
          owner: req.user._id,
        },
      },
      {
        $lookup: {
          from: "likes",
          localField: "_id",
          foreignField: "video",
          as: "likes",
        },
      },
      {
        $addFields: {
          likes: { $size: "$likes" },
        },
      },
      {
        $facet: {
          videos: [],
          stats: [
            {
              $group: {
                _id: null,
                likes: { $sum: "$likes" },
                views: { $sum: "$views" },
                videos: { $sum: 1 },
              },
            },
          ],
        },
      },
      {
        $unwind: "$stats",
      },
    ]);
  } catch (error) {
    throw new apiError(
      500,
      error?.message || "Something faild during video fetching"
    );
  }
  try {
    subscriberList = await Subscription.aggregate([
      {
        $match: {
          channel: req.user._id,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "subscriber",
          foreignField: "_id",
          as: "subscribers",
          pipeline: [
            {
              $project: {
                _id: 0,
                userName: 1,
                fullName: 1,
                avatar: 1,
              },
            },
          ],
        },
      },

      {
        $addFields: {
          userName: { $first: "$subscribers.userName" },
          fullName: { $first: "$subscribers.fullName" },
          avatar: { $first: "$subscribers.avatar" },
        },
      },
      {
        $project: {
          subscriber: 0,
          channel: 0,
          _id: 0,
          subscribers: 0,
          createdAt: 0,
          updatedAt: 0,
        },
      },
    ]);
  } catch (error) {
    throw new apiError(
      500,
      error?.message || "Something faild during subscribers fetching"
    );
  }
  return res
    .status(200)
    .json(
      new apiResponse(
        200,
        { videos, subscriberList, subscribersCount: subscriberList.length },
        "Stats fetched successfully"
      )
    );
});

const getChannelVideos = asyncHandler(async (req, res) => {
  // TODO: Get all the videos uploaded by the channel
  const videos = await Video.aggregate([
    {
      $match: {
        owner: req.user._id,
      },
    },
  ]);
  return res.status(200).json(new apiResponse(200, videos, "Videos fetched"));
});

export { getChannelStats, getChannelVideos };
