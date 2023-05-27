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
      observations: true,
    },
  });
  if (getAllCourses.length === 0)
    res.status(200).json({ message: "No courses" });
  else res.status(200).json(getAllCourses);
});

// @desc   Create course
// @route  POST api/courses
// @access Public
export const createCourse = asyncHandler(async (req, res) => {
  // await prisma.courseSlots.deleteMany();
  // await prisma.courses.deleteMany();
  const {
    courseCode,
    name,
    department,
    campus,
    slots,
    isElective,
    isDepthElective,
    credits,
  } = req.body;
  const newCourse = await prisma.courses.create({
    data: {
      courseCode,
      department,
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
    },
  });

  res.status(200).json(newCourse);
});

// @desc   Update User Courses
// @route  PUT api/courses/user/:id
// @access Only Hod assign courses
export const assignCourses = asyncHandler(async (req, res) => {
  const { slots } = req.body;
  if (slots) {
    let ids = [];
    slots.map((item) => ids.push({ id: item }));
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

// @desc   Add Courses Slots
// @route  POST api/courses/slots
// @access Only Hod add course slots
export const createCourseSlots = asyncHandler(async (req, res) => {
  const { sectionCode, location, day, time, courseId } = req.body;

  const findSlot = await prisma.courseSlots.findFirst({
    where: {
      OR: [{ sectionCode }, { time }],
    },
  });
  if (findSlot) {
    res.status(400).json({
      error: "Slot already created",
    });
  } else {
    const createSlot = await prisma.courseSlots.create({
      data: { sectionCode, location, day, time, courseId },
    });
    res.status(200).json(createSlot);
  }
});
