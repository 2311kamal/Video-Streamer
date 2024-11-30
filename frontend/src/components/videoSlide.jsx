import React, { useRef, useState, useEffect } from "react";
import Thumbnail from "./Thumbnail";
import { Link } from "react-router-dom";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";

function VideoSlide({ Name, Card = Thumbnail, count, cardProps = {} }) {
  const containerRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const scrollAmount = 600;

  const handleScroll = (direction) => {
    const newPosition = scrollPosition + direction * scrollAmount;
    setScrollPosition(newPosition);
    containerRef.current.scrollTo({ left: newPosition, behavior: "smooth" });
  };

  useEffect(() => {
    const containerWidth = containerRef.current?.offsetWidth || 0;
    const totalWidth = containerRef.current?.scrollWidth || 0;
    setMaxScroll(totalWidth - containerWidth);
  }, [scrollPosition]);

  return (
    <div className="flex flex-col w-[90%] relative">
      <div className="flex justify-between my-2">
        <div className="text-2xl ml-16 font-bold">
          {Name} {count ? "• " : ""}
          <span className="text-lg font-normal">{count || ""}</span>
        </div>
        <Link className="mr-2">
          <button className="rounded-3xl text-gray-300 hover:text-white">
            View All
          </button>
        </Link>
      </div>

      <div className="flex gap-4 ml-16 relative">
        <div className="flex gap-4 pb-2 overflow-hidden" ref={containerRef}>
          <div className="flex gap-4 transition-transform duration-300 ease-in-out">
            {/* Thumbnails */}

            <Card {...cardProps} />
            <Card {...cardProps} />
            <Card {...cardProps} />
            <Card {...cardProps} />
            <Card {...cardProps} />
            <Card {...cardProps} />
          </div>
        </div>

        {scrollPosition > 0 && (
          <button
            className="absolute top-1/3 -left-5 transform -translate-y-1/2 bg-gray-700 text-white rounded-full p-2 hover:bg-gray-600"
            onClick={() => handleScroll(-1)}
          >
            <FiChevronLeft size={24} />
          </button>
        )}

        {scrollPosition < maxScroll && (
          <button
            className="absolute top-1/3 -right-5 transform -translate-y-1/2 bg-gray-700 text-white rounded-full p-2 hover:bg-gray-600"
            onClick={() => handleScroll(1)}
          >
            <FiChevronRight size={24} />
          </button>
        )}
      </div>
    </div>
  );
}

export default VideoSlide;
