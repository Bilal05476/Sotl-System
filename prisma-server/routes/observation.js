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

obsRoutes.route("/observation/initiate").post(protectInitiateObs, initiate);
obsRoutes
  .route("/observation/scheduling")
  .post(obsScheduleCreate)
  .put(obsScheduleCycle);

obsRoutes.route("/observation/informed").put(informedObsCycle);

obsRoutes
  .route("/observation/post-scheduling")
  .post(postScheduleCreate)
  .put(postScheduleCycle);

obsRoutes.route("/observations").get(getAllObs);
obsRoutes.route("/observation/:id").get(getObs);

export default obsRoutes;
