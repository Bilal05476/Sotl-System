import { PrismaClient, Campus, Role, Department } from "@prisma/client";
const prisma = new PrismaClient();
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

// @desc   Get all users
// @route  POST api/users
// @access Private
export const getUsers = asyncHandler(async (req, res) => {
  const allUsers = await prisma.user.findMany();
  res.status(200).json(allUsers);
});

// @desc   Get User by id
// @route  POST api/user/:id
// @access Public
export const userById = asyncHandler(async (req, res) => {
  const user = await prisma.user.findFirst({
    where: {
      id: Number(req.params.id),
    },
    include: {
      facultyObs: {
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
      },
      observerObs: {
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
      },
      hodObs: {
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
      },
      facultyCourses: true,
      observerCourses: true,
    },
  });
  const exclude = [
    "observerObs",
    "hodObs",
    "facultyObs",
    "facultyCourses",
    "observerCourses",
  ];
  const filtered = Object.keys(user).reduce((acc, key) => {
    if (!exclude.includes(key)) {
      acc[key] = user[key];
    }
    return acc;
  }, {});
  if (user.role == "Faculty") {
    const observations = user.facultyObs;
    const courses = user.facultyCourses;

    //filtered
    filtered.observations = observations;
    filtered.courses = courses;

    res.status(200).json(filtered);
  } else if (user.role == "Observer") {
    const observations = user.observerObs;
    const courses = user.observerCourses;

    //filtered
    filtered.observations = observations;
    filtered.courses = courses;

    res.status(200).json(filtered);
  } else if (user.role == "Head_of_Department") {
    const observations = user.hodObs;

    //filtered
    filtered.observations = observations;

    res.status(200).json(filtered);
  } else {
    res.status(404).json(filtered);
  }
});

// @desc   Register or Add any Role
// @route  POST api/create
// @access Private (Parent Role Like (Admin, Campus Director, HOD))
export const createUser = asyncHandler(async (req, res) => {
  const { name, email, password, role, campus, department, courses } = req.body;

  // Validate if user exist in our database
  const existedUser = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (existedUser) {
    res.status(400).json({ error: "User Already Exist" });
  } else {
    // hash password from plain to encrypted
    const hashedPassword = await bcrypt.hash(password, 10);

    // user data object
    const newUserData = {
      name,
      email,
      password: hashedPassword,
      role: Role[role],
      campus: Campus[campus],
      department: Department[department],
    };

    // create new user in database
    const newUser = await prisma.user.create({
      data: newUserData,
    });

    let ids;
    if (courses) {
      ids = courses.map((item) => ({ id: item }));
    }

    // uncheck func // check by morning
    if (newUser) {
      if (newUser.role === "Observer") {
        await prisma.user.update({
          where: {
            id: newUser.id,
          },
          data: {
            observerCourses: {
              set: ids,
            },
          },
        });
      } else if (newUser.role === "Faculty") {
        await prisma.user.update({
          where: {
            id: newUser.id,
          },
          data: {
            facultyCourses: {
              set: ids,
            },
          },
        });
      }
      // create user session token
      const token = generateJWT(newUser.id);
      newUser.token = token;
      res.status(200).json(newUser);
    }
  }
});

// @desc   Authenticate Role
// @route  POST api/login
// @access Public (anyone login with their authentic credentials)
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validate if user exist in our database
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (user) {
    // hash password compare database password with plain password
    const checkPassword = await bcrypt.compare(password, user.password);
    if (checkPassword) {
      // create user session token
      const token = generateJWT(user.id);
      user.token = token;

      res.status(200).json(user);
    } else {
      res.status(400).json({ error: "Invalid Credentials" });
    }
  } else {
    res.status(404).json({ error: "No User Exist" });
  }
});

// @desc   Update User
// @route  POST api/user-update/:id
// @access Private (only user update their own data)
export const updateUser = asyncHandler(async (req, res) => {
  const { avatar, dateOfBirth, institute, degree, starting, ending, phone } =
    req.body;

  // Validate if user exist in our database
  const user = await prisma.user.findFirst({
    where: {
      id: Number(req.params.id),
    },
  });

  if (user) {
    const updateUser = await prisma.user.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        dateOfBirth,
        institute,
        degree,
        starting,
        ending,
        phone,
        avatar,
      },
    });
    res.status(200).json(updateUser);
  } else {
    res.status(404).json({ error: "No User Exist" });
  }
});

// Generate JWT
const generateJWT = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_KEY, {
    expiresIn: "30d",
  });
};
