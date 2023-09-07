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
  uninformedObsCreate,
  uninformedObsCycle,
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
  .post("/uninformed", uninformedObsCreate)
  .put("/informed", informedObsCycle)
  .put("/uninformed", uninformedObsCycle)
  .put("/post-scheduling", postScheduleCycle)
  .delete("/:id", protectSuperAdmin, deleteObs);

export default obsRoutes;
