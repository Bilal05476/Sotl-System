import express from "express";
const obsRoutes = express.Router();
import {
  getAllObs,
  getObs,
  initiate,
  informedObsCycle,
  obsScheduleCreate,
  obsScheduleCycle,
  postScheduleCreate,
  postScheduleCycle,
  deleteObs,
  prompt,
} from "../controller/observations.js";

import {
  protectInitiateObs,
  protectSuperAdmin,
} from "../middleware/protectRoutes.js";

obsRoutes.route("/initiate").post(protectInitiateObs, initiate);
obsRoutes.route("/scheduling").post(obsScheduleCreate).put(obsScheduleCycle);

// obsRoutes.route("/informed").put(informedObsCycle);

// obsRoutes
//   .route("/post-scheduling")
//   .post(postScheduleCreate)
//   .put(postScheduleCycle);

obsRoutes
  .get("/", getAllObs)
  .get("/:id", getObs)
  .post("/post-scheduling", postScheduleCreate)
  .post("/prompt", protectSuperAdmin, prompt)
  .put("/informed", informedObsCycle)
  .put("/post-scheduling", postScheduleCycle)
  .delete("/:id", protectSuperAdmin, deleteObs);

export default obsRoutes;
