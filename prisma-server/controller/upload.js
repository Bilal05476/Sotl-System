import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import asyncHandler from "express-async-handler";
import path from "path";
import { Storage } from "@google-cloud/storage";
// Initialize Google Cloud Storage
const storage = new Storage({
  keyFilename: "./google-key.json", // Path to your JSON key file
});
const bucket = storage.bucket("sotl-system-storage");

// @desc   Upload artifacts for post observations
// @route  POST api/upload-artifact/:postid
// @access Private (Only Faculty)
export const uploadArtifacts = asyncHandler(async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).send("No file uploaded.");
    }

    const filename = Date.now() + "-" + path.basename(file.originalname);
    const fileUpload = bucket.file(filename);

    const stream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    stream.on("error", (err) => {
      console.error(err);
      return res.status(500).send("Upload failed.");
    });

    stream.on("finish", async () => {
      // Insert the file link into your database
      const fileLink = `https://storage.cloud.google.com/${bucket.name}/${fileUpload.name}`;
      // Here, you would use your database library to store the fileLink in your database
      const addArtifact = await prisma.artifact.create({
        data: {
          postId: Number(req.params.id),
          filename: fileLink.replaceAll(" ", "%20"),
          mimetype: file.mimetype,
        },
      });
      // console.log(addArtifact);
      return res.status(200).json({ message: "Uploaded Successfully!" });
    });
    stream.end(file.buffer);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server error.");
  }
});
