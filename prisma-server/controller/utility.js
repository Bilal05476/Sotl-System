import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import asyncHandler from "express-async-handler";

// @desc   Get users and courses for HOD
// @route  GET api/data/:role/:departmentId
// @access Private (Parent Role Like (HOD))
export const getDataForHod = asyncHandler(async (req, res) => {
  let { departmentId, role } = req.params;

  if (departmentId && role === "Head_of_Department") {
    departmentId = Number(departmentId);

    const department = await prisma.departments.findFirst({
      where: {
        id: departmentId,
      },
    });

    const getUsers = await prisma.user.findMany({
      where: {
        departmentId,
        NOT: {
          role,
        },
      },
      include: {
        department: true,
        facultyObs: {
          where: {
            OR: [
              { observationStatus: "Ongoing" },
              { observationStatus: "Pending" },
            ],
          },
        },
      },
    });

    const getCourses = await prisma.courses.findMany({
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
    });

    // // exclude user password from getUsers
    const userWithoutPass = getUsers.map((obj) => {
      const newObj = { ...obj };
      ["password"].forEach((field) => delete newObj[field]);
      return newObj;
    });
    const data = {
      users: userWithoutPass,
      courses: getCourses,
    };
    res.status(200).json(data);
  } else {
    res.status(400).json({
      error: "Sorry, this can be only visible for head of departments!",
    });
  }
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

// @desc   Get system data for super admin
// @route  GET api/data/super-data
// @access Private (Super_Admin)
export const getSuperData = asyncHandler(async (req, res) => {
  // get users
  const getUsers = await prisma.user.findMany({
    include: {
      department: true,
    },
  });
  // get observations
  const getObservations = await prisma.observations.findMany({
    include: {
      obsRequest: true,
      faculty: true,
      observer: true,
      hod: true,
      course: true,
      feedbacks: true,
      meetings: {
        include: {
          informedObservation: true,
          postObservation: true,
          uninformedObservation: true,
          professionalDPlan: true,
        },
      },
    },
  });
  // get departments
  const getDepartments = await prisma.departments.findMany({});
  // get courses
  const getCourses = await prisma.courses.findMany({
    include: {
      slots: true,
      department: true,
    },
  });

  res.status(200).json({
    users: getUsers,
    department: getDepartments,
    observations: getObservations,
    courses: getCourses,
  });
});

// @desc   Dummy Route to change observations createdAt
// @route  PUT api/updateobs/
// @access Private (Parent Role Like (Admin, Campus Director, HOd))
export const changeDate = asyncHandler(async (req, res) => {
  const { id, createdAt } = req.body;
  const up = await prisma.observations.update({
    where: {
      id,
    },
    data: {
      createdAt,
    },
  });

  res.status(200).json(up);
});
