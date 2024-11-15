import React, { useRef, useState, useEffect } from "react";
import Thumbnail from "./Thumbnail";
import { Link } from "react-router-dom";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi"; // Importing icons

function VideoSlide({ Name }) {
  const containerRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0); // Track the maximum scroll position
  const scrollAmount = 300; // The amount of scroll per click

  // Handle scroll for both directions (left and right)
  const handleScroll = (direction) => {
    const newPosition = scrollPosition + direction * scrollAmount;
    setScrollPosition(newPosition);
    containerRef.current.scrollTo({ left: newPosition, behavior: "smooth" });
  };

  // Set the max scroll position based on the container width and number of thumbnails
  useEffect(() => {
    const containerWidth = containerRef.current?.offsetWidth || 0;
    const totalWidth = containerRef.current?.scrollWidth || 0;
    setMaxScroll(totalWidth - containerWidth);
  }, [scrollPosition]);

  return (
    <div className="flex flex-col w-[90%] relative">
      <div className="flex justify-between my-2">
        <div className="text-2xl ml-16 font-bold">{Name}</div>
        <Link className="mr-2">
          <button className="rounded-3xl text-gray-300 hover:text-white">
            View All
          </button>
        </Link>
      </div>

      <div className="flex gap-4 ml-16 relative">
        {/* The container with overflow-hidden and no permanent scrollbar */}
        <div className="flex gap-4 pb-2 overflow-hidden" ref={containerRef}>
          <div className="flex gap-4 transition-transform duration-300 ease-in-out">
            {/* Thumbnails */}
            <Thumbnail />
            <Thumbnail />
            <Thumbnail />
            <Thumbnail />
            <Thumbnail />
            <Thumbnail />
            <Thumbnail />
            <Thumbnail />
            <Thumbnail />
            <Thumbnail />
            <Thumbnail />
            <Thumbnail />
            <Thumbnail />
            <Thumbnail />
            <Thumbnail />
            <Thumbnail />
            <Thumbnail />
            <Thumbnail />
            <Thumbnail />
            <Thumbnail />
            <Thumbnail />
            <Thumbnail />
            <Thumbnail />
          </div>
        </div>

        {/* Left Scroll Button */}
        {scrollPosition > 0 && (
          <button
            className="absolute top-1/3 -left-5 transform -translate-y-1/2 bg-gray-700 text-white rounded-full p-2 hover:bg-gray-600"
            onClick={() => handleScroll(-1)} // Negative direction for left scroll
          >
            <FiChevronLeft size={24} /> {/* Left arrow icon */}
          </button>
        )}

        {/* Right Scroll Button */}
        {scrollPosition < maxScroll && (
          <button
            className="absolute top-1/3 -right-5 transform -translate-y-1/2 bg-gray-700 text-white rounded-full p-2 hover:bg-gray-600"
            onClick={() => handleScroll(1)} // Positive direction for right scroll
          >
            <FiChevronRight size={24} /> {/* Right arrow icon */}
          </button>
        )}
      </div>
    </div>
  );
}

export default VideoSlide;
