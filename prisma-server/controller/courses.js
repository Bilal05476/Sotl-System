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
          faculty: {
            select: {
              name: true,
              email: true,
            },
          },
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
          faculty: {
            select: {
              name: true,
              email: true,
            },
          },
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
  const { name, department, campus, slots, elective, depthElective } = req.body;
  const newCourse = await prisma.courses.create({
    data: {
      department,
      name,
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
          courseId: newCourse.id,
        },
      });
    }
  }

  res.status(200).json(newCourse);
});

// @desc   Update User Courses
// @route  PUT api/courses/user/:id
// @access Only Hod assign courses
export const assignCourses = asyncHandler(async (req, res) => {
  const { courses } = req.body;
  if (courses) {
    let ids = [];
    courses.map((item) => ids.push({ id: item }));
    await prisma.user.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        courseSlots: {
          set: ids,
        },
      },
    });
    res.status(200).json({
      message: "Course(s) assigned successfully!",
    });
  } else {
    res.status(400).json({
      error: "Please assign some course(s) to the user!",
    });
  }
});
