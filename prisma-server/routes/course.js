import express from "express";
const courseRoutes = express.Router();

import {
  assignCourses,
  createCourse,
  createCourseSlots,
  getCourse,
  getCourses,
} from "../controller/courses.js";

courseRoutes.route("/courses").get(getCourses).post(createCourse);
courseRoutes.route("/course/:id").get(getCourse);
courseRoutes.route("/courses/user/:id").put(assignCourses);
courseRoutes.route("/courses/slots").post(createCourseSlots);

export default courseRoutes;
