// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();
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
export const uploadArtifacts = asyncHandler(async (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ error: "No file uploaded!" });
  }

  const file = req.files.file;
  file.mv();
  // res.status(200).json({ file: req.file, body: req.file });

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
