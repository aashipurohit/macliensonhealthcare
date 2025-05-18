const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
require("dotenv").config();

const router = express.Router();

//  Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//  Multer setup using memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

//  Route: POST /api/upload
router.post("/", upload.single("image"), async (req, res) => {
  try {
    //  No file uploaded
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    //  Stream upload to Cloudinary with folder support
    const streamUpload = (fileBuffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder:"macliensonhealthcare", 
          },
          (error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          }
        );

        streamifier.createReadStream(fileBuffer).pipe(stream);
      });
    };

    const result = await streamUpload(req.file.buffer);

    //  Return image URL
    res.status(200).json({ imageUrl: result.secure_url });
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    res.status(500).json({ message: "Server error during upload" });
  }
});

module.exports = router;
