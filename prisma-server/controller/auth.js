import { PrismaClient, Campus, Role, Department } from "@prisma/client";
const prisma = new PrismaClient();
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

// @desc   Register or Add any Role
// @route  POST api/register
// @access Private (Parent Role Like (Admin, Campus Director, HOD))
export const createUser = asyncHandler(async (req, res) => {
  const { name, email, password, role, campus, department } = req.body;

  // Validate if user exist in our database
  const [existedUser] = await prisma.user.findMany({
    where: {
      email,
    },
  });

  if (existedUser) {
    res.status(400).send({ error: "User Already Exist" });
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
    if (newUser) {
      // create user session token
      const token = generateJWT(newUser.id);
      newUser.token = token;
      res.status(200).send(newUser);
    }
  }
});

// @desc   Authenticate Role
// @route  POST api/login
// @access Public (anyone login with their authentic credentials)
export const getUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validate if user exist in our database
  const [user] = await prisma.user.findMany({
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
      res.status(200).send(user);
    } else {
      res.status(400).send({ error: "Invalid Credentials" });
    }
  } else {
    res.status(404).send({ error: "No User Exist" });
  }
});

// @desc   Update User
// @route  POST api/update-user
// @access Private (only user update their own data)
export const updateUser = asyncHandler(async (req, res) => {
  const { id, name, dateOfBirth, institute, degree, starting, ending } =
    req.body;

  // Validate if user exist in our database
  const [user] = await prisma.user.findMany({
    where: {
      id,
    },
  });

  if (user) {
    const updateUser = await prisma.user.update({
      where: {
        id,
      },
      data: {
        dateOfBirth,
        institute,
        degree,
        starting,
        ending,
        name,
      },
    });
    res.status(200).send(updateUser);
  } else {
    res.status(404).send({ error: "No User Exist" });
  }
});

// Generate JWT
const generateJWT = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_KEY, {
    expiresIn: "30d",
  });
};
