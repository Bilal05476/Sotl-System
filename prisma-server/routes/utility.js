import express from "express";
const utilityRoutes = express.Router();
import { getUsersAndCourses } from "../controller/utility.js";
import {
  createTemplate,
  getTemplate,
  getTemplates,
} from "../controller/templates.js";

utilityRoutes
  .route("/courses-users/:departmentId/:role")
  .get(getUsersAndCourses);
utilityRoutes.route("/template").post(createTemplate).get(getTemplates);
utilityRoutes.route("/template/:id").get(getTemplate);

export default utilityRoutes;
