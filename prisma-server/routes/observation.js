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
} from "../controller/observations.js";

import { protectInitiateObs } from "../middleware/protectRoutes.js";

obsRoutes.route("/initiate").post(protectInitiateObs, initiate);
obsRoutes.route("/scheduling").post(obsScheduleCreate).put(obsScheduleCycle);

obsRoutes.route("/informed").put(informedObsCycle);

obsRoutes
  .route("/post-scheduling")
  .post(postScheduleCreate)
  .put(postScheduleCycle);

obsRoutes.route("/").get(getAllObs);
obsRoutes.route("/:id").get(getObs);

export default obsRoutes;
