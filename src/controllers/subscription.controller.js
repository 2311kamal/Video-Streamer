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
  const subscribers = Subscription.aggregate([
    {
      $match: channelId,
    },
  ]);
});

// controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandler(async (req, res) => {
  const { userId } = req.params;
});

export { toggleSubscription, getUserChannelSubscribers, getSubscribedChannels };
