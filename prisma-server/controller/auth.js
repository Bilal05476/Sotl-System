import { PrismaClient, Campus, Role, Department } from "@prisma/client";
const prisma = new PrismaClient();
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

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
    // const newUser = null;

    let ids = [];
    if (courses) {
      courses.map((item) => ids.push({ id: item }));
    }

    if (newUser) {
      // if (newUser.role === "Observer") {
      //   await prisma.user.update({
      //     where: {
      //       id: newUser.id,
      //     },
      //     data: {
      //       observerCourses: {
      //         set: ids,
      //       },
      //     },
      //   });
      // } else
      if (newUser.role === "Faculty") {
        await prisma.user.update({
          where: {
            id: newUser.id,
          },
          data: {
            courseSlots: {
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
  const validate = await prisma.user.findFirst({
    where: {
      email,
    },
    select: {
      id: true,
      name: true,
      password: true,
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
    // hash password compare database password with plain password
    const checkPassword = await bcrypt.compare(password, validate.password);
    if (checkPassword) {
      // create user session token
      const token = generateJWT(validate.id);

      const loginUser = {
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
        token,
      };

      /// send user data to client side
      res.status(200).json(loginUser);
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
  const {
    phone,
    avatar,
    designation,
    dateOfBirth,
    institute,
    degree,
    starting,
    ending,
  } = req.body;

  // Validate if user exist in our database
  const user = await prisma.user.findFirst({
    where: {
      id: Number(req.params.id),
    },
  });

  if (user) {
    const token = generateJWT(user.id);
    const updateUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        phone,
        avatar,
        designation,
        dateOfBirth,
        institute,
        degree,
        starting,
        ending,
      },
      select: {
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
    updateUser.token = token;
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

// const exclude = [
//   "observerObs",
//   "hodObs",
//   "facultyObs",
//   "facultyCourses",
//   "observerCourses",
// ];
// const filtered = Object.keys(user).reduce((acc, key) => {
//   if (!exclude.includes(key)) {
//     acc[key] = user[key];
//   }
//   return acc;
// }, {});
