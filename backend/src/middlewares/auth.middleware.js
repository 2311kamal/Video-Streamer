import { User } from "../models/user.model.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { generateAccRefToken } from "../controllers/user.controller.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  const accessToken = req.cookies?.accessToken;
  try {
    if (accessToken) {
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
      return next();
    }

    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
      return res
        .status(401)
        .json(
          new apiResponse(401, {}, "No access token or refresh token found")
        );
    }

    const decodedToken = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken._id);
    if (!user || user.refreshToken !== refreshToken) {
      return res
        .status(401)
        .json(new apiResponse(401, {}, "Invalid refresh token"));
    }

    const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
      await generateAccRefToken(user._id);


    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: process.env.ACCESS_TOKEN_EXPIRY_INT * 60 * 1000,
    });

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: process.env.REFRESH_TOKEN_EXPIRY_INT * 24 * 60 * 60 * 1000,
    });

    req.user = user;

    next();
  } catch (error) {
    console.log("Invalid access token in the auth middleware");
    return res
      .status(401)
      .json(
        new apiResponse(
          401,
          {},
          error.message || "Invalid access token inside auth middleware"
        )
      );
  }
});
