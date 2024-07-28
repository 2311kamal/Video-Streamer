import mongoose, { isValidObjectId } from "mongoose";
import { Video } from "../models/video.model.js";
import { User } from "../models/user.model.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { delFromCloudinary } from "../utils/deleteFromCloudinary.js";

const getAllVideos = asyncHandler(async (req, res) => {
  //   console.log(req);
  const {
    page = 1,
    limit = 10,
    query,
    sortBy,
    sortType,
    userName,
    fullName,
  } = req.query;
  //TODO: get all videos based on query, sort, pagination

  const skip = (page - 1) * limit;
  const sortOrder = sortType === "asc" ? 1 : -1;
  let filters = {};
  if (query) {
    filters = {
      $or: [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ],
    };
  }

  const owner =
    (await User.findOne({ $or: [{ userName }, { fullName }] }))?._id || "";
  if (owner) {
    filters.owner = owner;
  }
  try {
    const videos = await Video.find(filters)
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(parseInt(limit));

    const totalVideos = await Video.countDocuments(filters);

    res.status(200).json(
      new apiResponse(
        200,
        {
          page,
          limit,
          totalVideos,
          totalPages: Math.ceil(totalVideos / limit),
          videos,
        },
        "All videos fetched"
      )
    );
  } catch (error) {
    res.status(500).json(new apiError(500, error.message));
  }
});

const publishAVideo = asyncHandler(async (req, res) => {
  // console.log(req);
  const { title, description } = req.body;
  // console.log(title);
  // TODO: get video, upload to cloudinary, create video
  //   console.log(req.files);
  if (!title || !description) {
    throw new apiError(400, "All fields are required");
  }
  const owner = req.user;
  const existingVideo = await Video.findOne({ title, owner });
  if (existingVideo) {
    throw new apiError(402, "A video with the same title already exist");
  }
  const videoLocalPath = req.files?.videoFile[0]?.path;
  if (!videoLocalPath) {
    throw new apiError(400, "Video file required");
  }
  const thumbnailLocalPath = req.files?.thumbnail[0]?.path;
  if (!thumbnailLocalPath) {
    throw new apiError(400, "thumbnail file required");
  }

  const videoFile = await uploadOnCloudinary(videoLocalPath);
  if (!videoFile) {
    throw new apiError(501, "video upload on cloudinary failed");
  }
  const thumbnail = await uploadOnCloudinary(thumbnailLocalPath);
  if (!thumbnail) {
    throw new apiError(501, "thumbnail upload on cloudinary failed");
  }
  const duration = videoFile.duration;
  const video = await Video.create({
    title,
    description,
    videoFile: videoFile.url,
    thumbnail: thumbnail.url,
    owner,
    duration,
  });
  // console.log("\n\nError is here\n\n")
  if (!video) {
    throw new apiError(500, "something went wrong while publishing video");
  }
  return res
    .status(200)
    .json(new apiResponse(200, video, "video published successfully"));
});

const getVideoById = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: get video by id
  const video = await Video.findById(videoId);
  // console.log(videoId);
  if (!video) {
    throw new apiError(404, "Video not found");
  }
  // console.log(video);
  return res.status(200).json(new apiResponse(200, { video }, "Video Fetched"));
});

const updateVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: update video details like title, description, thumbnail
  const { title, description } = req.body;
  const owner = req.user;
  const existingVideo = await Video.findOne({ title, owner });
  if (existingVideo) {
    throw new apiError(402, "A video with the same title already exist");
  }
  if (!title || !description) {
    throw new apiError(400, "Title and description are required");
  }
  const thumbnailLocalPath = req.files?.thumbnail[0]?.path;
  if (!thumbnailLocalPath) {
    throw new apiError(400, "thumbnail required");
  }

  const thumbnail = await uploadOnCloudinary(thumbnailLocalPath);
  if (!thumbnail) {
    throw new apiError(501, "new thumbnail upload on cloudinary failed");
  }
  const video = await Video.findById(videoId);
  // console.log(video.thumbnail);
  delFromCloudinary(video.thumbnail);
  video.title = title;
  video.description = description;
  video.thumbnail = thumbnail.url;
  // console.log(video.thumbnail, "\n", thumbnail);
  await video.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(
      new apiResponse(200, video, "Video details are updated successfully")
    );
});

const deleteVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: delete video
});

const togglePublishStatus = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
});

export {
  getAllVideos,
  publishAVideo,
  getVideoById,
  updateVideo,
  deleteVideo,
  togglePublishStatus,
};
