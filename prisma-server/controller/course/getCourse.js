import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import asyncHandler from "express-async-handler";

// @desc   Get course by id
// @route  POST api/get-course/:id
// @access Public
export const getCourse = asyncHandler(async (req, res) => {
  const getCourseById = await prisma.courses.findMany({
    where: {
      id: req.params.id,
    },
  });
  res.status(200).send(getCourseById);
});

// @desc   Create course
// @route  POST api/create-course/
// @access Public
export const createCourse = asyncHandler(async (req, res) => {
  const { courseName, department } = req.body;
  const newCourse = await prisma.courses.create({
    data: {
      department,
      courseName,
    },
  });
  res.status(200).send(newCourse);
});
