import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { apiResponse } from "../utils/apiResponse.js";

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
  const coverLocalPath = req.files?.coverImage[0]?.path;
  // console.log("Here is the avatar Local Path: ", avatarLocalPath);
  if (!avatarLocalPath) {
    throw new apiError(400, "Avatar file required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverLocalPath);
  // console.log(avatar);
  if (!avatar) {
    throw new apiError(409, "Avatar is required 111");
  }

  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage.url || "",
    email,
    password,
    userName: userName.toLowerCase(),
  });
  // console.log(password);
  // console.log("hello1");
  const createdUser = await User.findById(user._id).select(
    "-passeord -refreshToken"
  );
  // console.log("hello2");

  if (!createdUser) {
    throw new apiError(500, "Something went wrong while registering user");
  }
  // console.log("hello3");
  return res
    .status(201)
    .json(new apiResponse(200), createdUser, "User registered successfully");
});

export { registerUser };
