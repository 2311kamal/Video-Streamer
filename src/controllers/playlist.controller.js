import mongoose, { isValidObjectId } from "mongoose";
import { Playlist } from "../models/playlist.model.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createPlaylist = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  //TODO: create playlist
  if (!name || !description) {
    throw new apiError(403, "Name and Description are required");
  }
  const owner = req.user;
  const palylist = await Playlist.create({
    name,
    description,
    videos: [],
    owner,
  });
  if (!palylist) {
    throw new apiError(500, "Server Error in creating playlist");
  }
  return res
    .status(200)
    .json(new apiResponse(200, palylist, "Playlist created successfully"));
});

const getUserPlaylists = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  //TODO: get user playlists
  const playlists = await Playlist.find({ owner: userId });
  if (!playlists) {
    throw new apiError(501, "Error while fetching user playlists");
  }
  res
    .status(200)
    .json(new apiResponse(200, playlists, "Playlists fetched successfully"));
});

const getPlaylistById = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  //TODO: get playlist by id
  const playlist = await Playlist.findById(playlistId);
  if (!playlist) {
    throw new apiError(501, "Error while fetching  playlist with Id");
  }
  res.status(200).json(new apiResponse(200, playlist, "Playlist fetched "));
});

const addVideoToPlaylist = asyncHandler(async (req, res) => {
  const { playlistId, videoId } = req.params;
  if (!playlistId || !videoId) {
    throw new apiError(400, "playlistId and videoId is required");
  }
  const playlist = await Playlist.findById(playlistId);
  if (!playlist) {
    throw new apiError(501, "Error while fetching  playlist with Id");
  }
  playlist.videos.push(videoId);
  await playlist.save({ validationBeforeSave: false });
  return res
    .status(200)
    .json(new apiResponse(200, playlist, "Video added to Playlist"));
});

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
  const { playlistId, videoId } = req.params;
  // TODO: remove video from playlist
  if (!playlistId || !videoId) {
    throw new apiError("playlistId and videoId is required");
  }

  const playlist = await Playlist.findById(playlistId);
  if (!playlist) {
    throw new apiError(400, "No such Playlist found");
  }

  const index = playlist.videos.indexOf(videoId);
  if (index > -1) {
    playlist.videos.splice(index, 1);
  }

  await playlist.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new apiResponse(200, playlist, "Video deleted from playlist"));
});

const deletePlaylist = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  // TODO: delete playlist
  await Playlist.deleteOne({ _id: playlistId });
  return res.status(200).json(new apiResponse(200, {}, "Playlist deleted "));
});

const updatePlaylist = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  const { name, description } = req.body;
  //TODO: update playlist
  const playlist = await Playlist.findByIdAndUpdate(
    playlistId,
    {
      $set: { name, description },
    },
    { new: true }
  );
  return res.status(200).json(200, playlist, "Playlist details updated");
});

export {
  createPlaylist,
  getUserPlaylists,
  getPlaylistById,
  addVideoToPlaylist,
  removeVideoFromPlaylist,
  deletePlaylist,
  updatePlaylist,
};
