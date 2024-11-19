import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View Credentials' below to copy your API secret
});

const uploadOnCloudinary = async (
  localFilePath,
  userId = "",
  relativePath = "",
  id
) => {
  try {
    if (!localFilePath || !userId || !id) {
      return null;
    }

    // Sanitize the `id` to remove spaces and special characters
    const sanitizeId = (id) => id.trim().replace(/\s+/g, "_");
    const sanitizedId = sanitizeId(id);

    // Construct folder and public_id
    const folderPath = `user-assets/${userId}${relativePath}`;
    const publicId = `${folderPath}/${sanitizedId}`;

    console.log("Uploading to Cloudinary with public_id:", publicId);

    // Upload with public_id
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      folder: folderPath,
      public_id: publicId,
      overwrite: true, // Ensures overwriting if the file already exists
    });

    // Delete the local file
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); // Cleanup even on error
    throw error;
  }
};

export { uploadOnCloudinary };
