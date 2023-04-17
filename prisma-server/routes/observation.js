import express from "express";
const obsRoutes = express.Router();
import {
  getAllObs,
  getObs,
  initiate,
} from "../controller/observation/initiateObs.js";
import {
  // preObsAcceptedByObserver,
  // preObsByFaculty,
  obsScheculeCreate,
  obsScheduleCycle,
  // preObsByObserver,
} from "../controller/observation/preObs.js";
import { protectInitiateObs } from "../middleware/initiate.js";

obsRoutes.route("/observation/initiate").post(protectInitiateObs, initiate);
obsRoutes.route("/observation/scheduling").post(obsScheculeCreate);
obsRoutes.route("/observation/scheduling/:id").post(obsScheduleCycle);

obsRoutes.route("/observations").get(getAllObs);
obsRoutes.route("/observation/:id").get(getObs);

export default obsRoutes;
