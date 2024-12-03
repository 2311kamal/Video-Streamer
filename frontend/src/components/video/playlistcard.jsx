import React from "react";

function PlaylistCard({ url, title, channelName, className, num = 100 }) {
  return (
    <div
      className={`bg-gray-800 flex-shrink-0 w-[300px] md:w-[350px] rounded-lg flex flex-col shadow-lg relative ${className}`}
    >
      <div className="hover:scale-[1.03] transition-transform duration-300 overflow-hidden rounded-t-lg mt-1">
        {/* Aspect ratio control with 16:9 */}
        <img
          src={url ? url : "https://via.placeholder.com/150"}
          alt="PlaylistCard"
          className="w-full sm:w-[200px] md:w-[250px] lg:w-[300px] xl:w-[350px] aspect-video object-cover rounded-lg"
        />
        <span className="absolute top-0 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
          {num} videos
        </span>
      </div>

      <div className="p-4">
        <h2 className="text-base md:text-lg font-semibold text-white truncate">
          {title ? title : "Sample Title"}
        </h2>
        <div className="mt-2 text-sm text-gray-400 truncate">
          {channelName ? channelName : "Channel Name"} • Playlist
        </div>
      </div>
    </div>
  );
}

export default PlaylistCard;
