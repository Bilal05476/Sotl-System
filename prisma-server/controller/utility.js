import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import asyncHandler from "express-async-handler";

// @desc   Get users and courses for Admin, Campus Director, HOD
// @route  GET api/courses-users/:departmentId/:role
// @access Private (Parent Role Like (Admin, Campus Director, HOD))
export const getUsersAndCourses = asyncHandler(async (req, res) => {
  let { departmentId, role } = req.params;

  departmentId = Number(departmentId);

  const department = await prisma.departments.findFirst({
    where: {
      id: departmentId,
    },
  });

  const getUsers =
    departmentId && role === "Head_of_Department"
      ? await prisma.user.findMany({
          where: {
            departmentId,
            NOT: {
              role,
            },
          },
          include: {
            department: true,
          },
        })
      : await prisma.user.findMany({
          include: {
            department: true,
          },
        });

  const getCourses =
    departmentId && role === "Head_of_Department"
      ? await prisma.courses.findMany({
          where: {
            department: {
              some: {
                name: department.name,
              },
            },
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
            department: true,
          },
        })
      : await prisma.courses.findMany({
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
            department: true,
          },
        });

  // // exclude user password from getUsers
  const userWithoutPass = getUsers.map((obj) => {
    const newObj = { ...obj };
    ["password"].forEach((field) => delete newObj[field]);
    return newObj;
  });

  const data = { users: userWithoutPass, courses: getCourses };
  res.status(200).json(data);
});

// @desc   Send all Departments
// @route  GET api/department/
// @access Private (Parent Role Like (Admin, Campus Director, HOd))
export const getDepartments = asyncHandler(async (req, res) => {
  const alldepart = await prisma.departments.findMany({});
  alldepart?.length > 0
    ? res.status(200).json(alldepart)
    : res.status(404).json({
        message: "No departments!",
      });
});
