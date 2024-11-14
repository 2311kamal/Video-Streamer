import React from "react";
import axios from "axios";

function UserCard({ user, className }) {
  const subCount = "10M";

  return (
    <div className={`flex ${className}`}>
      <div className="flex  overflow-hidden   ">
        <img
          className="rounded-full"
          src={user.avatar ? user.avatar : "https://via.placeholder.com/150"}
          alt="User-Image "
        ></img>
      </div>
      <div className="flex flex-col ml-4 ">
        <div className="flex text-3xl">
          {user.fullName ? user.fullName : "full Name"}
        </div>
        <div className="flex">
          <div className="flex">
            @ {user.userName ? user.userName : "userName"}
          </div>
          <div className="flex ml-2">{subCount}</div>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
