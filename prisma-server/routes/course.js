import express from "express";
const courseRoutes = express.Router();

import {
  assignCourses,
  cou,
  createCourse,
  getCourse,
  getCourses,
} from "../controller/courses.js";

courseRoutes.route("/courses").get(getCourses).post(createCourse);
courseRoutes.route("/course/:id").get(getCourse);
courseRoutes.route("/courses/user/:id").put(assignCourses);
courseRoutes.route("/cou").get(cou);

export default courseRoutes;
