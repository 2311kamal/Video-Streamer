import apiClient from "./apiService";

export const getCurUser = () => apiClient.get("/users/cur-user");

export const loginUser = (data) => apiClient.post("/users/login", data);

export const registerUser = (data) =>
  apiClient.post(
    "/users/register",
    data,

    { headers: { "Content-Type": "multipart/form-data" } }
  );


  export const logoutUser = () => apiClient.post("/users/logout");
