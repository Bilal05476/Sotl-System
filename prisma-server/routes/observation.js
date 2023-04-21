import express from "express";
const obsRoutes = express.Router();
import { getAllObs, getObs, initiate } from "../controller/observations.js";
import {
  obsScheduleCreate,
  obsScheduleCycle,
} from "../controller/observations.js";
import { protectInitiateObs } from "../middleware/protectRoutes.js";

obsRoutes.route("/observation/initiate").post(protectInitiateObs, initiate);
obsRoutes.route("/observation/scheduling").post(obsScheduleCreate);

obsRoutes.route("/observation/scheduling/:id").put(obsScheduleCycle);

obsRoutes.route("/observations").get(getAllObs);
obsRoutes.route("/observation/:id").get(getObs);

export default obsRoutes;
