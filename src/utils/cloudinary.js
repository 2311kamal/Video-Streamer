import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View Credentials' below to copy your API secret
});

const uploadOnCloudinary = async (lacalFilePath) => {
  try {
    if (!lacalFilePath) return null;

    // console.log("hello1");
    const response = await cloudinary.uploader.upload(lacalFilePath, {
      resource_type: "auto",
    });
    // console.log("hello2");
    // console.log("File uploaded on cloudinary/n", response.url);
    fs.unlinkSync(lacalFilePath);
    return response;
  } catch (error) {
    fs.unlinkSync(lacalFilePath);
  }
};

export { uploadOnCloudinary };
