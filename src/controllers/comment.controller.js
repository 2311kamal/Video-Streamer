import mongoose from "mongoose";
import { Comment } from "../models/comment.model.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getVideoComments = asyncHandler(async (req, res) => {
  //TODO: get all comments for a video
  const { videoId } = req.params;
  const { page = 1, limit = 5 } = req.query;
  const skip = (page - 1) * limit;
  const comments = await Comment.find({ video: videoId })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(parseInt(limit));

  if (!comments) {
    throw new apiError(501, "Getting Eroor while fetching comments");
  }

  return res
    .status(200)
    .json(
      new apiResponse(
        200,
        { comments, count: comments.length },
        "Comments fetched successfully"
      )
    );
});

const addComment = asyncHandler(async (req, res) => {
  // TODO: add a comment to a video
  const { videoId } = req.params;
  const { content } = req.body;
  if (!content) {
    throw new apiError(401, "Commet content is reqired");
  }
  const owner = req.user;
  const comment = await Comment.create({
    content,
    owner,
    vedeo: videoId,
  });
  if (!comment) {
    throw new apiError(500, "Errror in creating in comment");
  }
  return res.status(200).json(200, comment, "Comment added successfully");
});

const updateComment = asyncHandler(async (req, res) => {
  // TODO: update a comment
  const { commentId } = req.params;
  const { content } = req.body;

  if (!commentId) {
    throw new apiError(400, "Invalid url");
  }
  if (!content) {
    throw new apiError(400, "content is required");
  }

  const comment = await Comment.findByIdAndUpdate(
    commentId,
    {
      $set: {
        content,
      },
    },
    { new: true }
  );

  return res
    .status(200)
    .json(new apiResponse(200, comment, "Comment updated successfully"));
});

const deleteComment = asyncHandler(async (req, res) => {
  // TODO: delete a comment
  const { commentId } = req.params;
  if (!commentId) {
    throw new apiError(400, "Invalid url");
  }

  const comment = await Comment.findById(commentId);
  if (!comment) {
    throw new apiError(400, "This comment doesn't exists");
  }

  await Comment.findByIdAndDelete(commentId);

  return res
    .status(200)
    .json(new apiResponse(200, {}, "Comment deleted successfully"));
});

export { getVideoComments, addComment, updateComment, deleteComment };
