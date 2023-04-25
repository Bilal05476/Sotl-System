import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import asyncHandler from "express-async-handler";

// @desc   Get course by id
// @route  POST api/course/:id
// @access Public
export const getCourse = asyncHandler(async (req, res) => {
  const getCourseById = await prisma.courses.findFirst({
    where: {
      id: Number(req.params.id),
    },
    include: {
      faculty: true,
      observer: true,
    },
  });
  res.status(200).json(getCourseById);
});

// @desc   Get courses
// @route  GET api/courses
// @access Public
export const getCourses = asyncHandler(async (req, res) => {
  const getAllCourses = await prisma.courses.findMany({});
  res.status(200).json(getAllCourses);
});

// @desc   Create course
// @route  POST api/courses
// @access Public
export const createCourse = asyncHandler(async (req, res) => {
  const {
    courseName,
    department,
    campus,
    observerId,
    facultyId,
    day,
    timeSlot,
    room,
  } = req.body;
  const newCourse = await prisma.courses.create({
    data: {
      department,
      courseName,
      campus,
      observerId: observerId && observerId,
      facultyId: facultyId && facultyId,
      day,
      timeSlot,
      room,
    },
  });
  res.status(200).json(newCourse);
});
