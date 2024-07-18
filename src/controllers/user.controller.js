import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { apiResponse } from "../utils/apiResponse.js";
import jwt from "jsonwebtoken";

const generateAccRefToken = async (userId) => {
  try {
    // console.log("check 1");
    const user = await User.findById(userId);
    // console.log("check 2");
    // console.log("\n", user, "/n");
    const accesstoken = user.generateAccessToken();
    // console.log("check 3");
    const refreshtoken = user.generateRefreshsToken();
    user.refreshtoken = refreshtoken;
    user.accesstoken = accesstoken;
    await user.save({ validateBeforeSave: false });
    return { accesstoken, refreshtoken };
  } catch {
    throw new apiError(
      500,
      "Something went wrong while generating refresh and access token"
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
  //remove passeord and refreh token dirld from respnse
  //check for user creation
  //return res

  const { fullName, email, userName, password } = req.body;
  // console.log(email);

  // if (fullName == "") {
  //   throw new apiError(400, "fullname is required");
  // }

  if (
    [fullName, email, userName, password].some((field) => {
      return field?.trim() === "";
    })
  ) {
    return new apiError(400, "All fields are required");
  }

  const exisitinguser = await User.findOne({
    $or: [{ userName }, { email }],
    if(exisitinguser) {
      throw new apiError(409, "User already exist");
    },
  });

  const avatarLocalPath = req.files?.avatar[0]?.path;
  // const coverLocalPath = req.files?.coverImage[0]?.path;
  // console.log("Here is the avatar Local Path: ", avatarLocalPath);
  if (!avatarLocalPath) {
    throw new apiError(400, "Avatar file required");
  }

  let coverImageLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.lengrh > 0
  ) {
    coverImageLocalPath = req.files.coverImage[0].path;
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);
  // console.log(avatar);
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
  // console.log(password);
  // console.log("check1");
  const createdUser = await User.findById(user._id).select(
    "-passeord -refreshToken"
  );
  // console.log("check2");

  if (!createdUser) {
    throw new apiError(500, "Something went wrong while registering user");
  }
  // console.log("check3");
  return res
    .status(201)
    .json(new apiResponse(200), createdUser, "User registered successfully");
});

const loginUser = asyncHandler(async (req, res) => {
  //req body->data fetch
  //username or email
  //find the user
  //check password
  //access and refresh token
  //send cookie

  const { email, userName, password } = req.body;
  if (!userName && !email) {
    throw new apiError(400, "username/email is required");
  }
  const user = await User.findOne({
    $or: [{ userName }, { email }],
  });
  // console.log(user);
  if (!user) {
    throw new apiError(404, "user dont exist");
  }

  const isPasswordVali = await user.isPasswordCorrect(password);
  if (!isPasswordVali) {
    throw new apiError(404, "Invalid Credentials");
  }

  const { accesstoken, refreshtoken } = await generateAccRefToken(user._id);

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = { httpOnly: true, secure: true };

  return res
    .status(200)
    .cookie("accessToken", accesstoken, options)
    .cookie("refreshToken", refreshtoken, options)
    .json(
      new apiResponse(
        200,
        { user: user, accesstoken, refreshtoken },
        "User logged In Successfully"
      )
    ); //loggedInUser
});

const logoutUser = asyncHandler(async (req, res) => {
  // const user = req.user;

  // console.log("check 1 User details: ",req.user);
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    }
  );
  const options = { httpOnly: true, secure: true };
  return res
    .status(200)
    .clearCookie("accessToken", options)
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
      throw new apiError(401, "Invalid rfresh token");
    }
    if (user?.refreshToken === incomingRefreshToken) {
      throw new apiError(401, "refresh token is expired or used");
    }
    const options = {
      httpOnly: true,
      secure: true,
    };
    const { accessToken, newRefreshToken } = await generateAccRefToken(
      user._id
    );
    return res
      .status(200)
      .cookie("accessToken", accessToken)
      .cookie("refreshToken", newRefreshToken)
      .json(
        new apiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "Access token refreshed"
        )
      );
  } catch (error) {
    throw new apiError(401, error?.message || "Invalid refresh token");
  }
});

export { registerUser, loginUser, logoutUser,refrehAccessToken };
