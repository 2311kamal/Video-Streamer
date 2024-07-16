import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { fileURLToPath } from "url";

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  API_SECRET: process.env.CLOUDINARY_API_SECRET, // Click 'View Credentials' below to copy your API secret
});

const uploadOnCloudinary = async (lacalFilePath) => {
  try {
    if (!lacalFilePath) return null;
    const response = await cloudinary.uploader.upload(lacalFilePath, {
      resource_type: "auto",
    });
    console.log("File uploaded on cloudinary/n", response.url);
    return response;
  } catch (error) {
    fs.unlinkSync(lacalFilePath);
  }
};

export { uploadOnCloudinary };
