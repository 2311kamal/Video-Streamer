import { Router } from "express";
import {
  getSubscribedChannels,
  getUserChannelSubscribers,
  toggleSubscription,
} from "../controllers/subscription.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const subscriptionRouter = Router();
subscriptionRouter.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

subscriptionRouter.route("/c/:channelId").post(toggleSubscription);

subscriptionRouter.route("/c/:userId").get(getSubscribedChannels);
subscriptionRouter.route("/u/:channelId").get(getUserChannelSubscribers);

export default subscriptionRouter;
