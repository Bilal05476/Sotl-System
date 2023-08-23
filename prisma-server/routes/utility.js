import express from "express";
const utilityRoutes = express.Router();
import {
  // changeDate,
  getDepartments,
  getDataForHod,
} from "../controller/utility.js";
import {
  createTemplate,
  getTemplate,
  getTemplates,
} from "../controller/templates.js";
import { uploadArtifacts } from "../controller/upload.js";

utilityRoutes.route("/data/:role/:departmentId").get(getDataForHod);
utilityRoutes.route("/template").post(createTemplate).get(getTemplates);
utilityRoutes.route("/template/:id").get(getTemplate);
utilityRoutes.route("/department").get(getDepartments);

// dummy route to change observations createdAt
// utilityRoutes.route("/updateobs").put(changeDate);

// upload artifacts with postId in body
utilityRoutes.post("/upload-artifact", uploadArtifacts);

export default utilityRoutes;
