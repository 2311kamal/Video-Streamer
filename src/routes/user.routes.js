import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  refrehAccessToken,
  changePassword,
  getCurrentUser,
  updateAccountDetail,
  updateUserAvatar,
  updateUsercoverImage,
  getWathHistory,
  getUserChannerProfile,
} from "../controllers/user.controller.js";

import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const userRouter = Router();

userRouter.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);

userRouter.route("/login").post(loginUser);

//Secured Routes
userRouter.route("/logout").post(verifyJWT, logoutUser);
userRouter.route("/refresh-token").post(refrehAccessToken);
userRouter.route("/change-pass").post(verifyJWT, changePassword);
userRouter.route("/cur-user").get(verifyJWT, getCurrentUser);
userRouter.route("/update-details").patch(verifyJWT, updateAccountDetail);
userRouter.route("/update-avatar").get(verifyJWT, upload.single("avatar"), updateUserAvatar);
userRouter.route("/update-cover").get(verifyJWT, upload.single("coverImage"), updateUsercoverImage);
userRouter.route("/channel/:username").get(verifyJWT,getUserChannerProfile)
userRouter.route("/history").get(verifyJWT,getWathHistory)
export default userRouter;
