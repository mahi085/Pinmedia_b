
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configure cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export const uploadImage = async (file, folder) => {
  try {
    if (!file) {
      throw new Error("No file provided");
    }

    const options = {
      folder: folder || "pin_media_uploads",
      resource_type: "auto",
      use_filename: true,
      unique_filename: false,
    };

    // Upload from file path
    const result = await cloudinary.uploader.upload(file.path, options);
    
    // Delete local file after upload
    if (fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }

    return result;
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    throw new Error(`Image upload failed: ${error.message}`);
  }
};

export const deleteImage = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error("Cloudinary Delete Error:", error);
    throw new Error(`Image deletion failed: ${error.message}`);
  }
};
