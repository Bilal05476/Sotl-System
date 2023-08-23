import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import asyncHandler from "express-async-handler";

// import multer from "multer";
// import path from "path";

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "artifacts/");
//   },
//   filename: (req, file, cb) => {
//     cb(
//       null,
//       file.fieldname + "_" + Date.now() + path.extname(file.originalname)
//     );
//   },
// });

// export const upload = multer({
//   storage,
// });

// export const upload = multer({ dest: "artifacts/" });

// @desc   Upload artifacts for post observations
// @route  POST api/upload-artifact/
// @access Private (Only Faculty)
import { __dirname } from "../index.js";
export const uploadArtifacts = asyncHandler(async (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ error: "No file uploaded!" });
  }
  const file = req.files.file;
  const postId = req.files.postId;
  file.mv(`${__dirname}/artifacts/${file.name}`, async (err) => {
    if (err) {
      return res.status(500).json(err);
    }
    try {
      await prisma.artifact.create({
        data: {
          filename: file.name,
          filepath: `/artifacts/${file.name}`,
        },
      });

      res.status(200).json({ message: "File uploaded successfully", postId });
    } catch (error) {
      console.warn(error);
      res.status(500).json({ message: "Error uploading file" });
    }
  });
});
