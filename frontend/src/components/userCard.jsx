import React, { useEffect, useState } from "react";
import axios from "axios";

function UserCard({ className }) {
  const [user, setUser] = useState(null); // Start with null instead of empty string
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/users/cur-user",
          { withCredentials: true }
        );
        setUser(response.data.data); // Assuming response is in response.data.user
        console.log(response.data.data.avatar);
      } catch (err) {
        setError("Error fetching user data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const subCount = "10M"; // You can replace this with actual data if available

  if (loading) {
    return <div>Loading...</div>; // You can customize this with a spinner or other indicator
  }

  if (error) {
    return <div>{error}</div>; // Display error message
  }

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
