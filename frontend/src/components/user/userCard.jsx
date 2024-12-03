import { useSelector } from "react-redux";

function UserCard({ className }) {
  const user = useSelector((state) => state.auth.user);

  const subCount = "10M"; 
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
        </div>
        <div className="flex">
          <div>@{user?.userName || "userName"}</div>{" "}
          <div className="ml-2">{subCount}</div>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
