import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View Credentials' below to copy your API secret
});

const uploadOnCloudinary = async (localFilePath, userId = "") => {
  try {
    if (!localFilePath || !userId) {
      return null;
    }
    
    console.log("Uploading file to cloudinary");
    console.log("LocalFile:", localFilePath);
    console.log(userId);
    const folderPath = `user-assets/${userId}`;
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      folder: folderPath,
    });

    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath);
    throw error;
  }
};

export { uploadOnCloudinary };
