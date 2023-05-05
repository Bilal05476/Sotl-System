import { PrismaClient, Campus, Role, Department } from "@prisma/client";
const prisma = new PrismaClient();
import asyncHandler from "express-async-handler";

// @desc   Get all users
// @route  Get api/users
// @access Private
export const getUsers = asyncHandler(async (req, res) => {
  const allUsers = await prisma.user.findMany({});
  let filtered = [];
  allUsers.map((item) => {
    filtered.push({
      id: item.id,
      name: item.name,
      email: item.email,
      phone: item.phone,
      avatar: item.avatar,
      designation: item.designation,
      dateOfBirth: item.dateOfBirth,
      institute: item.institute,
      degree: item.degree,
      starting: item.starting,
      ending: item.ending,
      role: item.role,
      campus: item.campus,
      department: item.department,
    });
  });

  res.status(200).json(filtered);
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
      role: true,
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
                  obsRequest: {
                    include: {
                      course: true,
                    },
                  },
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
                  obsRequest: {
                    include: {
                      course: true,
                    },
                  },
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
      observations: user.facultyObs
        ? user.facultyObs
        : user.observerObs
        ? user.observerObs
        : user.hodObs
        ? user.hodObs
        : [],
      courses: user.courseSlots,
    };
    res.status(200).json(userData);
  } else {
    res.status(404).json({ error: "No user exists" });
  }
});
