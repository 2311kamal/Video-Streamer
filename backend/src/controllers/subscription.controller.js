import mongoose, { isValidObjectId } from "mongoose";
import { User } from "../models/user.model.js";
import { Subscription } from "../models/subscription.model.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const toggleSubscription = asyncHandler(async (req, res) => {
  const { channelId } = req.params;
  // TODO: toggle subscription
  const channel = await User.findById(channelId);
  if (!channel) {
    throw new apiError(403, "channer does not exist");
  }
  const userId = req.user?.id;
  // console.log(userId);
  // console.log(channelId, "\n", userId);
  if (userId === channelId) {
    throw new apiError(402, "Can not subscripbe to yourself");
  }
  const isSubscribed = await Subscription.findOne({
    subscriber: userId,
    channel: channelId,
  });
  let response;
  try {
    response = isSubscribed
      ? await Subscription.deleteOne({ subscriber: userId, channel: channelId })
      : await Subscription.create({ subscriber: userId, channel: channelId });
  } catch (error) {
    console.log("toggleSubscriptionError :: ", error);
    throw new apiError(500, error?.message || "Internal server Error");
  }
  // console.log(channel.userName);
  return res.status(200).json(
    new apiResponse(
      200,
      {
        response,
        subscriber: req.user.userName,
        subscribedTo: channel.userName,
      },
      isSubscribed === null
        ? "subscribed Succesfully"
        : "unsubscribed Sucessfully"
    )
  );
});

// controller to return subscriber list of a channel
const getUserChannelSubscribers = asyncHandler(async (req, res) => {
  const { channelId } = req.params;
  if (!channelId) {
    throw new apiError(403, "Not a valid channel");
  }
  const subscribersList = await Subscription.aggregate([
    {
      $match: {
        channel: mongoose.Types.ObjectId.createFromHexString(channelId),
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
  // const subscribersList = await Subscription.aggregate([
  //   {
  //     $match: {
  //       channel: mongoose.Types.ObjectId.createFromHexString(channelId),
  //     },
  //   },
  //   {
  //     $lookup: {
  //       from: "users",
  //       localField: "subscriber",
  //       foreignField: "_id",
  //       as: "subscribers",
  //       pipeline: [
  //         {
  //           $project: {
  //             _id: 0,
  //             userName: 1,
  //             fullName: 1,
  //             avatar: 1,
  //           },
  //         },
  //       ],
  //     },
  //   },
  //   {
  //     $project: {
  //       channel: 0,
  //       _id: 0,
  //       subscriber: 0,
  //       createdAt: 0,
  //       updatedAt: 0,
  //     },
  //   },
  //   {
  //     $addFields: {
  //       subscribers: {
  //         $first: "$subscribers",
  //       },
  //     },
  //   },
  //   {
  //     $addFields: {
  //       userName: "$subscribers.userName",
  //       fullName: "$subscribers.fullName",
  //       avatar: "$subscribers.avatar",
  //     },
  //   },
  //   {
  //     $project: {
  //       subscribers: 0,
  //     },
  //   },
  // ]);
  return res
    .status(200)
    .json(
      new apiResponse(
        200,
        { subscribersList, subscribersCount: subscribersList.length },
        "ok"
      )
    );
});

// controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    throw new apiError(403, "Not a valid user");
  }
  const channelsList = await Subscription.aggregate([
    {
      $match: {
        subscriber: mongoose.Types.ObjectId.createFromHexString(userId),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "channel",
        foreignField: "_id",
        as: "channels",
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
        userName: { $first: "$channels.userName" },
        fullName: { $first: "$channels.fullName" },
        avatar: { $first: "$channels.avatar" },
      },
    },
    {
      $project: {
        subscriber: 0,
        channel: 0,
        _id: 0,
        channels: 0,
        createdAt: 0,
        updatedAt: 0,
      },
    },
  ]);

  return res
    .status(200)
    .json(
      new apiResponse(
        200,
        { channelsList, channelCount: channelsList.length },
        "ok"
      )
    );
});

export { toggleSubscription, getUserChannelSubscribers, getSubscribedChannels };
