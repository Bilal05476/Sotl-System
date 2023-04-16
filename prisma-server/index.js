import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
const app = express();
app.use(cors());

const port = process.env.PORT || 8080;

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

// login, create role, and user
import authRoutes from "./routes/auth.js";
app.use("/api", authRoutes);

// observation and meetings
// import obsRoutes from "./routes/observation.js";
// app.use("/api", obsRoutes);

// courses
import courseRoutes from "./routes/courses.js";
app.use("/api", courseRoutes);

app.use("/", (req, res) => {
  res.status(200).json({
    message: `Server Running at port: ${port}`,
  });
});

app.listen(port, () => {
  console.log(`Server Running at port: ${port}`);
});

// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();

// async function main() {
//   //update courses for user
//   const up = await prisma.user.update({
//     where: {
//       id: 2,
//     },
//     data: {
//       facultyCourses: {
//         //connect or disconnect
//         connect: {
//           id: 9,
//         },
//       },
//     },
//     select: {
//       facultyCourses: true,
//     },
//   });
//   console.log(up);
// }
// main();
