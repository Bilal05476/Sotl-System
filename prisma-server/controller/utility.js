import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import asyncHandler from "express-async-handler";

// @desc   Get users and courses for Admin, Campus Director, HOD
// @route  GET api/courses-users
// @access Private (Parent Role Like (Admin, Campus Director, HOD))
export const getUsersAndCourses = asyncHandler(async (req, res) => {
  const getUsers = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      avatar: true,
      designation: true,
      dateOfBirth: true,
      institute: true,
      degree: true,
      starting: true,
      ending: true,
      role: true,
      campus: true,
      department: true,
    },
  });
  const getCourses = await prisma.courses.findMany({
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
  const data = { users: getUsers, courses: getCourses };
  res.status(200).json(data);
});
