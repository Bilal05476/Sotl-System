// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();
import asyncHandler from "express-async-handler";

import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "artifacts/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

export const upload = multer({
  storage,
});

// export const upload = multer({ dest: "artifacts/" });

// @desc   Upload artifacts for post observations
// @route  POST api/uploadartifact/
// @access Private (Only Faculty)
export const uploadArtifacts = asyncHandler(async (req, res) => {
  console.log("body", req.body);
  console.log("file", req.file);
  res.status(200).json({ message: "Hello " });

  // try {
  //   await prisma.artifact.create({
  //     data: {
  //       filename,
  //       mimeType,
  //       data: Buffer.from(path),
  //       // postId,
  //     },
  //     // include: {
  //     //   Post: true,
  //     // },
  //   });

  //   res.status(200).json({ message: "File uploaded successfully" });
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).json({ message: "Error uploading file" });
  // }
});
