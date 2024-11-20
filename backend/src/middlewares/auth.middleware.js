import { apiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    // console.log("Checking req in auth.mideleware.js: ", req);
    const accessToken =
      req.cookies?.accessToken ||
      req.header("authorization")?.replace("Bearer ", "");
    console.log(accessToken);
    if (!accessToken) {
      // throw new apiError(401, "Unauthorized request");
      console.log("No access token");
      return res.status(401).json({
        success: false,
        message: "Unauthorized request",
      });
    }

    const decodedToken = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );
    // console.log(decodedToken);

    const user = {
      _id: decodedToken?._id,
      email: decodedToken?.email,
      username: decodedToken?.username,
      fullName: decodedToken?.fullName,
    };

    // const user = await User.findById(decodedToken?._id).select(
    //   "-password -refreshToken"
    // );

    // if (!user) {
    //   throw new apiError(401, "Invalid Access Token");
    // }

    req.user = user;
    next();
  } catch (error) {
    // throw new apiError(401, error?.message || "Invalid access token");
    console.log("Invalid access token");
    return res.status(401).json({
      success: false,
      message: error?.message || "Invalid access token",
    });
  }
});
