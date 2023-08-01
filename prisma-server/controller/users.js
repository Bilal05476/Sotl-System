import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import asyncHandler from "express-async-handler";

// @desc   Get all users
// @route  Get api/users
// @access Private
export const getUsers = asyncHandler(async (req, res) => {
  const allUsers = await prisma.user.findMany({
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
  if (allUsers.length === 0) res.status(200).json({ message: "No users" });
  else res.status(200).json(allUsers);
});

// @desc   Get User by id
// @route  Get api/user/:id
// @access Public
export const userById = asyncHandler(async (req, res) => {
  const validate = await prisma.user.findFirst({
    where: {
      id: Number(req.params.id),
    },
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
  if (validate) {
    const user = await prisma.user.findFirst({
      where: {
        id: validate.id,
      },
      include: {
        facultyObs:
          validate.role === "Faculty"
            ? {
                include: {
                  course: true,
                  faculty: {
                    select: {
                      name: true,
                      email: true,
                    },
                  },
                  observer: {
                    select: {
                      name: true,
                      email: true,
                    },
                  },
                  hod: {
                    select: {
                      name: true,
                      email: true,
                    },
                  },
                  obsRequest: true,
                  meetings: {
                    include: {
                      informedObservation: true,
                      postObservation: true,
                      uninformedObservation: true,
                      professionalDPlan: true,
                    },
                  },
                },
              }
            : false,
        observerObs:
          validate.role === "Observer"
            ? {
                include: {
                  course: true,
                  faculty: {
                    select: {
                      name: true,
                      email: true,
                    },
                  },
                  observer: {
                    select: {
                      name: true,
                      email: true,
                    },
                  },
                  hod: {
                    select: {
                      name: true,
                      email: true,
                    },
                  },
                  obsRequest: true,
                  meetings: {
                    include: {
                      informedObservation: true,
                      postObservation: true,
                      uninformedObservation: true,
                      professionalDPlan: true,
                    },
                  },
                },
              }
            : false,
        hodObs:
          validate.role === "Head_of_Department"
            ? {
                include: {
                  course: true,
                  faculty: {
                    select: {
                      name: true,
                      email: true,
                    },
                  },
                  observer: {
                    select: {
                      name: true,
                      email: true,
                    },
                  },
                  hod: {
                    select: {
                      name: true,
                      email: true,
                    },
                  },
                  obsRequest: true,
                  meetings: {
                    include: {
                      informedObservation: true,
                      postObservation: true,
                      uninformedObservation: true,
                      professionalDPlan: true,
                    },
                  },
                },
              }
            : false,
        courseSlots:
          validate.role === "Faculty"
            ? {
                include: {
                  course: true,
                },
              }
            : false,
      },
    });
    /// send user data to client side
    const userData = {
      id: validate.id,
      name: validate.name,
      email: validate.email,
      phone: validate.phone,
      avatar: validate.avatar,
      designation: validate.designation,
      dateOfBirth: validate.dateOfBirth,
      institute: validate.institute,
      degree: validate.degree,
      starting: validate.starting,
      ending: validate.ending,
      role: validate.role,
      campus: validate.campus,
      department: validate.department,
      observations: user.facultyObs
        ? user.facultyObs
        : user.observerObs
        ? user.observerObs
        : user.hodObs
        ? user.hodObs
        : [],
      slots: user.courseSlots,
    };
    res.status(200).json(userData);
  } else {
    res.status(404).json({ error: "No user exists" });
  }
});
