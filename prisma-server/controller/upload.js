import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import asyncHandler from "express-async-handler";
import path from "path";
import { Storage } from "@google-cloud/storage";
// Initialize Google Cloud Storage
const storage = new Storage({
  // keyFilename: "./google-key.json", // Path to your JSON key file
  keyFilename: {
    type: "service_account",
    project_id: "daring-night-394613",
    private_key_id: "f1a97bf01cf60d12a5eeeceb5c7263f97cde0087",
    private_key: process.env.PRIVATEKEY,
    client_email: "113588280014-compute@developer.gserviceaccount.com",
    client_id: process.env.CLIENTID,
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url:
      "https://www.googleapis.com/robot/v1/metadata/x509/113588280014-compute%40developer.gserviceaccount.com",
    universe_domain: "googleapis.com",
  }, // Path to your JSON key file
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
