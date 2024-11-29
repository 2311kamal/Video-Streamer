import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const accessToken =
      req.cookies?.accessToken ||
      req.header("authorization")?.replace("Bearer ", "");

    if (!accessToken) {
      console.log("No access token");
      return res
        .status(200)
        .json(new apiResponse(401, {}, "Unauthorized request"));
    }

    const decodedToken = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );

    const user = {
      _id: decodedToken?._id,
      email: decodedToken?.email,
      username: decodedToken?.username,
      fullName: decodedToken?.fullName,
    };

    req.user = user;
    next();
  } catch (error) {
    console.log("Invalid access token in the auth middleware");
    return res
      .status(401)
      .json(
        new apiError(
          401,
          {},
          error.message || "Invalid access token inside auth middleware"
        )
      );
  }
});
