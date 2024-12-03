import React from "react";
import Thumbnail from "../components/video/Thumbnail"; // Assuming this is the component for the thumbnails

function HomePage({ card = <Thumbnail /> }) {
  return (
    <div className="flex flex-wrap justify-center ab:justify-between ab:px-24 lg:px-2 pt-4 ">
      <Thumbnail
        thumbnailUrl="https://via.placeholder.com/150"
        title="Sample YouTube Video Title"
        channelName="Sample Channel"
        views="1.2M"
      />
      <Thumbnail
        thumbnailUrl="https://via.placeholder.com/150"
        title="Sample YouTube Video Title"
        channelName="Sample Channel"
        views="1.2M"
      />
      <Thumbnail
        thumbnailUrl="https://via.placeholder.com/150"
        title="Sample YouTube Video Title"
        channelName="Sample Channel"
        views="1.2M"
      />
      <Thumbnail
        thumbnailUrl="https://via.placeholder.com/150"
        title="Sample YouTube Video Title"
        channelName="Sample Channel"
        views="1.2M"
      />
      <Thumbnail
        thumbnailUrl="https://via.placeholder.com/150"
        title="Sample YouTube Video Title"
        channelName="Sample Channel"
        views="1.2M"
      />
      <Thumbnail
        thumbnailUrl="https://via.placeholder.com/150"
        title="Sample YouTube Video Title"
        channelName="Sample Channel"
        views="1.2M"
      />
      <Thumbnail
        thumbnailUrl="https://via.placeholder.com/150"
        title="Sample YouTube Video Title"
        channelName="Sample Channel"
        views="1.2M"
      />
      <Thumbnail
        thumbnailUrl="https://via.placeholder.com/150"
        title="Sample YouTube Video Title"
        channelName="Sample Channel"
        views="1.2M"
      />
      <Thumbnail
        thumbnailUrl="https://via.placeholder.com/150"
        title="Sample YouTube Video Title"
        channelName="Sample Channel"
        views="1.2M"
      />
    </div>
  );
}

export default HomePage;
