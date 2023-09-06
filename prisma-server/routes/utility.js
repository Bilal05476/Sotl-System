import express from "express";
const utilityRoutes = express.Router();
import {
  // changeDate,
  getSuperData,
  getDepartments,
  getDataForHod,
} from "../controller/utility.js";
import { updateTemplate, getTemplate } from "../controller/templates.js";
import { uploadArtifacts } from "../controller/upload.js";

import multer from "multer";
import { protectSuperAdmin } from "../middleware/protectRoutes.js";
import { EmailTemplate, GetEmailTemplate } from "../controller/email.js";

// for upload media files
const artifactsStorage = multer.memoryStorage();
const uploadMedia = multer({ storage: artifactsStorage });
// const uploadAvatar = multer({ storage: avatars });

utilityRoutes.route("/data/:role/:departmentId").get(getDataForHod);
utilityRoutes.route("/template/:type").put(updateTemplate).get(getTemplate);
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
utilityRoutes.route("/data/super-data").get(protectSuperAdmin, getSuperData);

utilityRoutes
  .route("/email/:type")
  .get(protectSuperAdmin, GetEmailTemplate)
  .post(protectSuperAdmin, EmailTemplate);

export default utilityRoutes;
