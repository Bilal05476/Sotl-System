import express from "express";
const utilityRoutes = express.Router();
import { getUsersAndCourses } from "../controller/utility.js";

utilityRoutes.route("/courses-users").get(getUsersAndCourses);

export default utilityRoutes;
