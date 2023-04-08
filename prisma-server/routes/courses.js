import express from "express";
const courseRoutes = express.Router();

import {
  createCourse,
  getCourse,
  getCourses,
} from "../controller/course/getCourse.js";

courseRoutes.route("/courses").get(getCourses).post(createCourse);
courseRoutes.route("/course/:id").get(getCourse);

export default courseRoutes;
