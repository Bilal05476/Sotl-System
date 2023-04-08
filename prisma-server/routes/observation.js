import express from "express";
const obsRoutes = express.Router();
import {
  getAllObs,
  initateObs,
} from "../controller/Observation/initiateObs.js";
import {
  // preObsAcceptedByObserver,
  // preObsByFaculty,
  obsScheculeCreate,
  obsScheduleCycle,
  // preObsByObserver,
} from "../controller/Observation/preObs.js";
// import { protect } from "../middleware/authMiddleware.js";

obsRoutes.route("/observation/initiate").post(initateObs);

obsRoutes.route("/observation/scheduling").post(obsScheculeCreate);
obsRoutes.route("/observation/scheduling/:id").post(obsScheduleCycle);
// obsRoutes.route("/pre-obs-accepted/:id").post(preObsAcceptedByObserver);

obsRoutes.route("/observations").get(getAllObs);

export default obsRoutes;
