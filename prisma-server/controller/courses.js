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
      slots: {
        include: {
          faculty: true,
        },
      },
    },
  });
  res.status(200).json(getCourseById);
});

// @desc   Get courses
// @route  GET api/courses
// @access Public
export const getCourses = asyncHandler(async (req, res) => {
  const getAllCourses = await prisma.courses.findMany({
    include: {
      slots: {
        include: {
          faculty: true,
        },
      },
    },
  });
  res.status(200).json(getAllCourses);
});

// @desc   Create course
// @route  POST api/courses
// @access Public
export const createCourse = asyncHandler(async (req, res) => {
  await prisma.courseSlots.deleteMany();
  await prisma.courses.deleteMany();

  const { courseName, department, campus, slots, elective, depthElective } =
    req.body;
  const newCourse = await prisma.courses.create({
    data: {
      department,
      courseName,
      campus,
      depthElective,
      elective,
    },
  });
  if (newCourse) {
    for (let s = 0; s < slots.length; s++) {
      await prisma.courseSlots.create({
        data: {
          day: slots[s].day,
          location: slots[s].location,
          time: slots[s].time,
          coursesId: newCourse.id,
        },
      });
    }
  }
  res.status(200).json(newCourse);
});
