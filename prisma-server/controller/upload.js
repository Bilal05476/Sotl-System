import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import asyncHandler from "express-async-handler";

// @desc   Upload artifacts for post observations
// @route  POST api/upload-artifact/:postid
// @access Private (Only Faculty)
export const uploadArtifacts = asyncHandler(async (req, res) => {
  const postid = Number(req.params.id);
  const { fileURL, name, type } = req.body;
  try {
    await prisma.post.update({
      where: {
        id: postid,
      },
      data: {
        artifacts: {
          create: {
            fileURL,
            name,
            type,
          },
        },
      },
    });
    res.status(200).json({ message: "File uploaded successfuly!" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error!" });
  }
});
