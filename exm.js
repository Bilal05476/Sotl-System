// model User {
//   id      Int    @id @default(autoincrement())
//   // email String  @unique
//   name    String
//   courses Json?
// }

// model Courses {
//   id   Int    @id @default(autoincrement())
//   name String
// }

// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();
// import asyncHandler from "express-async-handler";

// export const get = asyncHandler(async (req, res) => {
//   const existedUser = await prisma.user.findMany();
//   res.status(200).send(existedUser);
// });
// export const getUserCourse = asyncHandler(async (req, res) => {
//   const [co] = await prisma.courses.findMany({
//     where: {
//       id: Number(req.params.id),
//     },
//   });
//   res.status(200).send(co);
// });
// export const create = asyncHandler(async (req, res) => {
//   const { name, courses } = req.body;
//   const newUser = await prisma.user.create({
//     data: {
//       name,
//       courses,
//     },
//   });
//   res.status(200).send(newUser);
// });
// export const upt = asyncHandler(async (req, res) => {
//   const { courses, id } = req.body;
//   const newUser = await prisma.user.update({
//     where: {
//       id,
//     },
//     data: {
//       // name,
//       courses,
//     },
//   });
//   res.status(200).send(newUser);
// });
// export const course = asyncHandler(async (req, res) => {
//   const { name } = req.body;
//   const newCourse = await prisma.courses.create({
//     data: {
//       name,
//     },
//   });
//   res.status(200).send(newCourse);
// });

// authRoutes.route("/create").post(create);
// authRoutes.route("/course").post(course);
// authRoutes.route("/get").get(get);
// authRoutes.route("/upt").put(upt);
