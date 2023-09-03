import express from "express";
const utilityRoutes = express.Router();
import {
  // changeDate,
  getSuperData,
  getDepartments,
  getDataForHod,
} from "../controller/utility.js";
import {
  createTemplate,
  getTemplate,
  getTemplates,
} from "../controller/templates.js";
import { uploadArtifacts } from "../controller/upload.js";

import multer from "multer";
import { protectSystemData } from "../middleware/protectRoutes.js";

// for upload media files
const artifactsStorage = multer.memoryStorage();
const uploadMedia = multer({ storage: artifactsStorage });
// const uploadAvatar = multer({ storage: avatars });

utilityRoutes.route("/data/:role/:departmentId").get(getDataForHod);
utilityRoutes.route("/template").post(createTemplate).get(getTemplates);
utilityRoutes.route("/template/:id").get(getTemplate);
utilityRoutes.route("/department").get(getDepartments);

// dummy route to change observations createdAt
// utilityRoutes.route("/updateobs").put(changeDate);

// upload artifacts with postId in body
utilityRoutes.post(
  "/upload-artifact/:id",
  uploadMedia.single("file"),
  uploadArtifacts
);

// get data for super_admin
// must be protected with middleWare
utilityRoutes.route("/data/super-data").get(protectSystemData, getSuperData);
export default utilityRoutes;
