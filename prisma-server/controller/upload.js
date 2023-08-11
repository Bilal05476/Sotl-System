// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();
import asyncHandler from "express-async-handler";

// @desc   Upload artifacts for post observations
// @route  POST api/uploadartifact/
// @access Private (Only Faculty)
export const uploadArtifacts = asyncHandler(async (req, res) => {
  const { formData, postId } = req.body;
  console.log(formData, postId);
  res.status(200).json({ message: "File uploaded successfully" });

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
