import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { apiResponse } from "../utils/apiResponse.js";
import jwt from "jsonwebtoken";
import { delFromCloudinary } from "../utils/deleteFromCloudinary.js";

const generateAccRefToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshsToken();
    user.refreshToken = refreshToken;
    // user.accessToken = accessToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch {
    throw new apiError(
      500,
      "Something went wrong while generating refresh and access Token"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  // res.status(200).json({ message: "ok" });

  //get user details from frontend
  // validation - not empty
  //check if not a user already(must be unique)
  //check for images, avatar
  //upload them to cloudunary, check avatar again
  //ctreate user object - create entry in db
  //remove passeord and refreh Token dirld from respnse
  //check for user creation
  //return res

  const { fullName, email, userName, password } = req.body;

  if (
    [fullName, email, userName, password].some((field) => {
      return field?.trim() === "";
    })
  ) {
    return new apiError(400, "All fields are required");
  }

  const exisitinguser = await User.findOne({
    $or: [{ userName }, { email }],
  });
  if (exisitinguser) {
    throw new apiError(409, "Username/email already exist");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  if (!avatarLocalPath) {
    throw new apiError(400, "Avatar file required");
  }

  //const coverImageLocalPath = req.files?.coverImage[0]?.path;

  let coverImageLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImageLocalPath = req.files.coverImage[0].path;
  }

  const avatar = await uploadOnCloudinary(
    avatarLocalPath,
    userName,
    "/avatar",
    fullName
  );
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);
  if (!avatar) {
    throw new apiError(409, "Avatar is required 111");
  }

  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage ? coverImage.url : "",
    email,
    password,
    userName: userName.toLowerCase(),
  });

  const createdUser = await User.findById(user._id).select(
    "-passeord -refreshToken"
  );

  if (!createdUser) {
    throw new apiError(500, "Something went wrong while registering user");
  }
  return res
    .status(201)
    .json(new apiResponse(200), createdUser, "User registered successfully");
});

const loginUser = asyncHandler(async (req, res) => {
  //req body->data fetch
  //username or email
  //find the user
  //check password
  //access and refresh Token
  //send cookie

  const { email, userName, password } = req.body;
  console.log(req.body);
  if (!userName && !email) {
    throw new apiError(400, "username/email is required");
  }
  const user = await User.findOne({
    $or: [{ userName }, { email }],
  });
  if (!user) {
    throw new apiError(404, "user dont exist");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new apiError(404, "Invalid Credentials");
  }

  const { accessToken, refreshToken } = await generateAccRefToken(user._id);

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    // secure: true,
    sameSite: "lax",
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, {
      ...options,
      maxAge: process.env.ACCESS_TOKEN_EXPIRY_INT * 60 * 1000,
    })
    .cookie("refreshToken", refreshToken, {
      ...options,
      maxAge: process.env.REFRESH_TOKEN_EXPIRY_INT * 24 * 60 * 60 * 1000,
    })
    .json(
      new apiResponse(
        200,
        { user: loggedInUser, accessToken, refreshToken },
        "User logged In Successfully"
      )
    ); //loggedInUser
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );
  const options = {
    httpOnly: true,
    sameSite: "lax",

    // secure: true, // ;uncomment this if using https (during production), localhost runs on http
  };
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new apiResponse(200, {}, "User LoggedOut"));
});

const refrehAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;
  if (!incomingRefreshToken) {
    throw new apiError(401, "Unauthorized relogin request");
  }
  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
    const user = await User.findById(decodedToken?._id);
    if (!user) {
      throw new apiError(401, "Invalid rfresh Token");
    }
    if (!user?.refreshToken === incomingRefreshToken) {
      throw new apiError(401, "refresh Token is expired or used");
    }
    const options = {
      httpOnly: true,
      // secure: true,
      sameSite:"lax"
    };
    const { accessToken, refreshToken: newRefreshToken } =
      await generateAccRefToken(user._id);

    return res
      .status(200)
      .cookie("accessToken", accessToken)
      .cookie("refreshToken", newRefreshToken)
      .json(
        new apiResponse(
          200,
          { accessToken, newRefreshToken },
          "Access Token refreshed"
        )
      );
  } catch (error) {
    throw new apiError(401, error?.message || "Invalid refresh Token");
  }
});

const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = await User.findOne(req.user?._id);
  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);
  if (!isPasswordCorrect) {
    throw new apiError(401, "Wrong Password");
  }
  user.password = newPassword;
  await user.save({ validateBeforeSave: false });
  return res
    .status(200)
    .json(new apiResponse(200, {}, "password changed successfully"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select(
    "-password -refreshToken"
  );

  return res
    .status(200)
    .json(new apiResponse(200, user, "User fetched succfully"));
});

const updateAccountDetail = asyncHandler(async (req, res) => {
  const { fullName, email } = req.body;
  if (!fullName || !email) {
    throw new apiError(400, "All fields are required");
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: { fullName, email },
    },
    { new: true }
  ).select("-password");
  return res
    .status(200)
    .json(new apiResponse(200, user, "Account details updated "));
});

const updateUsercoverImage = asyncHandler(async (req, res) => {
  const coverImagelocalpath = req.file?.path;
  // console.log(req.file);

  if (!coverImagelocalpath) {
    throw new apiError(400, "coverImage file is missing");
  }
  const coverImage = await uploadOnCloudinary(coverImagelocalpath);
  if (!coverImage.url) {
    throw new apiError(400, "Error while uploading coverImage");
  }
  await delFromCloudinary(req?.user.coverImage);

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    { $set: { coverImage: coverImage.url } },
    { new: true }
  ).select("-password");
  return res
    .status(200)
    .json(new apiResponse(200, user, "Cover Image updated successfully"));
});

const updateUserAvatar = asyncHandler(async (req, res) => {
  const avatarlocalpath = req.file?.path;
  if (!avatarlocalpath) {
    throw new apiError(400, "Avatar file is missing");
  }
  const avatar = await uploadOnCloudinary(avatarlocalpath);
  if (!avatar.url) {
    throw new apiError(400, "Error while uploading avatar");
  }
  await delFromCloudinary(req?.user.avatar);

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    { $set: { avatar: avatar.url } },
    { new: true }
  ).select("-password");
  return res
    .status(200)
    .json(new apiResponse(200, user, "Avatar updated successfully"));
});

const getUserChannelProfile = asyncHandler(async (req, res) => {
  const { username } = req.params;
  if (!username.trim()) {
    throw new apiError(400, "UserName is missing");
  }
  // console.log(username);
  const channel = await User.aggregate([
    {
      $match: {
        userName: username?.toLowerCase(),
      },
    },
    {
      $lookup: {
        from: "subscriptions",
        localField: "_id",
        foreignField: "channel",
        as: "subscribers",
      },
    },
    {
      $lookup: {
        from: "subscriptions",
        localField: "_id",
        foreignField: "subscriber",
        as: "subscribedTo",
      },
    },
    {
      $addFields: {
        subscribersCount: {
          $size: "$subscribers",
        },
        channelsSubscriberToCount: {
          $size: "$subscribedTo",
        },
        isSubscribed: {
          $cond: {
            if: {
              $in: [
                // new mongoose.Types.ObjectId(req?.user._id), //depricated
                req?.user._id,
                "$subscribers.subscriber",
              ],
            },
            then: true,
            else: false,
          },
        },
      },
    },
    {
      $project: {
        fullName: 1,
        username: 1,
        subscribersCount: 1,
        channelsSubscriberToCount: 1,
        isSubscribed: 1,
        avatar: 1,
        coverImage: 1,
        email: 1,
      },
    },
  ]);
  // console.log(channel);
  if (!channel?.length) {
    throw new apiError(404, {}, "channel does not exists");
  }

  return res
    .status(200)
    .json(
      new apiResponse(200, channel[0], "User channel fetched successfully")
    );
});

const getWathHistory = asyncHandler(async (req, res) => {
  const user = await User.aggregate([
    {
      $match: {
        // _id: new mongoose.Types.ObjectId(req.user.id), // now deprecated
        _id: req.user._id, // This did not work earlier as pipelines are passed as it is to mongoDb mongoose don't interfare here so it wont convert id to the object id that is created by mongodb autobatically.
      },
    },
    {
      $lookup: {
        from: "videos",
        localField: "watchHistory",
        foreignField: "_id",
        as: "watchHistory",
        pipeline: [
          {
            $lookup: {
              from: "users",
              localField: "owner",
              foreignField: "_id",
              as: "owner",
              pipeline: [
                {
                  $project: {
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
              owner: {
                $first: "$owner",
              },
            },
          },
        ],
      },
    },
  ]);
  // console.log(user);
  return res
    .status(200)
    .json(new apiResponse(200, user[0].watchHistory, "watchHistory fetched"));
});

const checkToken = asyncHandler(async (req, res) => {
  const user = req.user;
  return res.status(200).json(new apiResponse(200, user, "Token is valid"));
});

export {
  registerUser,
  loginUser,
  logoutUser,
  refrehAccessToken,
  changePassword,
  getCurrentUser,
  updateAccountDetail,
  updateUserAvatar,
  updateUsercoverImage,
  getUserChannelProfile,
  getWathHistory,
  checkToken,
  generateAccRefToken,
};
