import React from "react";
import UserCard from "../components/user/userCard";
import VideoSlide from "../components/video/videoSlide";
import PlaylistCard from "../components/video/playlistcard";

function Library() {
  return (
    <div className="flex flex-col">
      <UserCard
        className={"ml-16 mt-8 mb-8"}
        user={{
          fullName: "John Doe",
          userName: "john_doe",
          avatar: "https://via.placeholder.com/150",
        }}
      />

      <VideoSlide Name={"History"} />
      <VideoSlide Card={PlaylistCard} Name={"Playlists"} count={6} />
      <VideoSlide Name={"watch Later"} count={5} />
      <VideoSlide Name={"Liked"} count={67} />
    </div>
  );
}

export default Library;
