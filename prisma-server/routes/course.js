import express from "express";
const courseRoutes = express.Router();

import {
  assignCourses,
  createCourse,
  createCourseSlots,
  getCourse,
  getCourses,
} from "../controller/courses.js";

courseRoutes.route("/").get(getCourses).post(createCourse);
courseRoutes.route("/:id").get(getCourse);
courseRoutes.route("/user/:id").put(assignCourses);
courseRoutes.route("/slots").post(createCourseSlots);

export default courseRoutes;
