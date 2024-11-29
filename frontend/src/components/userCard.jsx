import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

function UserCard({ className }) {
  const user = useSelector((state) => state.auth.user);

  const subCount = "10M"; // You can replace this with actual data if available
  console.log(user);
  return (
    <div className={`flex ${className}`}>
      <div className="flex overflow-hidden">
        <img
          className="rounded-full"
          src={user?.avatar || "https://via.placeholder.com/150"}
          alt="User Avatar"
        />
      </div>
      <div className="flex flex-col ml-4">
        <div className="text-3xl">
          {user?.fullName || "Full Name"}{" "}
          {/* Conditional rendering for fullName */}
        </div>
        <div className="flex">
          <div>@{user?.userName || "userName"}</div>{" "}
          {/* Conditional rendering for userName */}
          <div className="ml-2">{subCount}</div>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
