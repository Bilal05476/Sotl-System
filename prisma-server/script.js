import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
const app = express();
app.use(cors());

dotenv.config();

app.use(
  bodyParser.json({
    limit: "50mb",
  })
);

app.use(
  bodyParser.urlencoded({
    limit: "50mb",
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

// const port = 8080;

app.use("/", (req, res) => {
  res.status(200).json({
    message: "Server Running",
  });
});

app.listen();
