import { v2 as cloudinary } from "cloudinary";
import { public_id } from "./fetchPublic_id.js";
import { apiError } from "./apiError.js";

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View Credentials' below to copy your API secret
});

const delFromCloudinary = async (fileUrl,resource='image') => {
  try {
    if (fileUrl === "") {
      return;
    }
    const id = public_id(fileUrl);
    if (!id)
      return new apiError(500, {}, "There is no public_id to delete the file");
    // console.log("\nid of old coverImage:", id);
    const response = await cloudinary.uploader.destroy(id, {resource_type: resource});
    // console.log(
    //   "\nHere is the response after deleting the old cover\n",
    //   response
    // );
    return response;
  } catch (error) {
    throw new apiError(
      500,
      error,
      "Error in deleting the file from cloudinary"
    );
  }
};

export { delFromCloudinary };
