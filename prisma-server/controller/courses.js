import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import asyncHandler from "express-async-handler";

// @desc   Get course by id
// @route  GET api/course/:id
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
      observations: true,
      department: true,
    },
  });

  if (!getCourseById)
    res.status(400).json({ error: `No course for that id = ${req.params.id}` });
  else res.status(200).json(getCourseById);
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
  if (getAllCourses.length === 0)
    res.status(200).json({ message: "No courses" });
  else res.status(200).json(getAllCourses);
});

// @desc   Create course (Only Head of Department Create Courses)
// @route  POST api/courses
// @access Private
export const createCourse = asyncHandler(async (req, res) => {
  const {
    courseCode,
    name,
    departments,
    campus,
    slots,
    isElective,
    isDepthElective,
    credits,
  } = req.body;

  const newCourse = await prisma.courses.create({
    data: {
      courseCode,
      name,
      campus,
      isDepthElective,
      isElective,
      credits,
      slots: {
        createMany: {
          data: slots,
        },
      },
      department: {
        connect: departments.map((id) => ({ id })),
      },
    },
    include: {
      slots: true,
      department: true,
    },
  });

  res.status(200).json(newCourse);
});

// @desc   Update User Courses (Only Hod assign courses)
// @route  PUT api/courses/user/:id
// @access Private
export const assignCourses = asyncHandler(async (req, res) => {
  const { slots } = req.body;
  slots.map(async (id) => {
    await prisma.courseSlots.update({
      where: {
        id,
      },
      data: {
        facultyId: Number(req.params.id),
      },
    });
  });
  res.status(200).json({
    message: "Course(s) assigned successfully!",
  });
});

// @desc   Add Courses Slots
// @route  POST api/courses/slots
// @access Only Hod add course slots
export const createCourseSlots = asyncHandler(async (req, res) => {
  const { sectionCode, location, day, time, courseId } = req.body;

  const findSlot = await prisma.courseSlots.findFirst({
    where: {
      OR: [{ sectionCode }, { location }],
    },
  });
  if (findSlot) {
    res.status(400).json({
      error: "Slot already created for same location or section code!",
    });
  } else {
    const createSlot = await prisma.courseSlots.create({
      data: { sectionCode, location, day, time, courseId },
    });
    res.status(200).json(createSlot);
  }
});
