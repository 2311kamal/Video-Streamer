import React from "react";
import UserCard from "../components/userCard";
import VideoSlide from "../components/videoSlide";

function Profile() {
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
      <VideoSlide Name={"Playlist"} />
      <VideoSlide Name={"watch Later"} />
      <VideoSlide Name={"Liked"} />
    </div>
  );
}

export default Profile;
