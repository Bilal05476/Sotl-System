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

// login, create role
import authRoutes from "./routes/auth.js";
app.use("/api", authRoutes);

// users
import userRoutes from "./routes/user.js";
app.use("/api", userRoutes);

// observation and meetings
import obsRoutes from "./routes/observation.js";
app.use("/api", obsRoutes);

// courses
import courseRoutes from "./routes/course.js";
app.use("/api", courseRoutes);

// utility
import utilityRoutes from "./routes/utility.js";
app.use("/api", utilityRoutes);

app.use("/", (req, res) => {
  res.status(200).json({
    message: `Server Running!`,
  });
});

app.listen(port, () => {
  console.log(`Server Running at port: ${port}`);
});

// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();
// async function main() {
//   const d = await prisma.user.deleteMany({});

//   console.log(d);
// }
// main();
