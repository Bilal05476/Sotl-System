import { PrismaClient, Campus, Role, Department } from "@prisma/client";
const prisma = new PrismaClient();
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

// @desc   Register or Add any Role
// @route  POST api/register
// @access Private (Parent Role Like (Admin, Campus Director, HOD))
export const createUser = asyncHandler(async (req, res) => {
  // const {name, email, password, phone, designation, role, campus, department} = req.body;

  // Validate if user exist in our database
  const [existedUser] = await prisma.user.findMany({
    where: {
      email: "bilal1@gmail.com",
    },
  });

  if (existedUser) {
    res.status(400).send({ error: "User Already Exist" });
  } else {
    const hashedPassword = await bcrypt.hash("123456", 10);
    const newUser = await prisma.user.create({
      data: {
        name: "Bilal",
        email: "bilal1@gmail.com",
        password: hashedPassword,
        phone: "28229292",
        designation: "Associate CS",
        role: Role["Faculty"],
        campus: Campus["Main_Campus"],
        department: Department["Fest"],
      },
    });
    console.log(newUser);
    if (newUser) {
      // create user session token
      const token = generateJWT(newUser.id);
      user.token = token;
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

// Generate JWT
const generateJWT = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_KEY, {
    expiresIn: "30d",
  });
};
