import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
const app = express();
app.use(cors());

dotenv.config();

app.use(
  bodyParser.json({
    limit: "250mb",
  })
);

app.use(
  bodyParser.urlencoded({
    limit: "250mb",
    parameterLimit: 100000,
    extended: true,
  })
);

// login and create role
import authRoutes from "./routes/auth.js";
app.use("/api", authRoutes);

// observation and meetings
import obsRoutes from "./routes/observation.js";
app.use("/api", obsRoutes);

// courses
import courseRoutes from "./routes/courses.js";
app.use("/api", courseRoutes);

const port = 8080;

app.listen(port, () => {
  console.log("Server Running");
});

// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();

// async function main() {
// const film = await prisma.film.findMany({
//   include: {
//     Producer: true,
//     Director: true,
//   },
// });
// console.log(film);
// const person = await prisma.person.findFirst({
//   where: {
//     id: 1,
//   },
//   include: {
//     filmD: true,
//     filmP: true,
//   },
// });
// console.log(person);
// }
// main();
