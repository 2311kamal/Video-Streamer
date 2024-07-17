import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { apiResponse } from "../utils/apiResponse.js";

const generateTokens = async (userId) => {
  try {
    console.log("check 1");
    const user = await User.findById(userId);
    console.log("check 2");
    console.log("\n", user, "/n");
    const accesstoken = user.generateAccessToken();
    console.log("check 3");
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

  const { email, username, password } = req.body;
  if (!username && !email) {
    throw new apiError(400, "username/email is required");
  }
  const user = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (!user) {
    throw new apiError(404, "user dont exist");
  }

  const isPasswordVali = await user.isPasswordCorrect(password);
  if (!isPasswordVali) {
    throw new apiError(404, "Invalid Credentials");
  }

  const { accesstoken, refreshtoken } = await generateTokens(user._id);

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
        { user: loggedInUser, accesstoken, refreshtoken },
        "User logged In Successfully"
      )
    ); //loggedInUser
});

const logoutUser = asyncHandler(async (req, res) => {
  // const user = req.user;

  await User.findByIdAndUpdate(
    req.User._id,
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

export { registerUser, loginUser, logoutUser };
