import express from "express";
const courseRoutes = express.Router();

import { createCourse, getCourse } from "../controller/course/getCourse.js";

// courseRoutes.route("/get-course/:id").post(getCourse);
// courseRoutes.route("/create-course").post(createCourse);

export default courseRoutes;
