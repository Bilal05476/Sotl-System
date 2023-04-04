import express from "express";
const obsRoutes = express.Router();
import {
  getAllObs,
  initateObs,
} from "../controller/Observation/initiateObs.js";
import {
  preObsAcceptedByObserver,
  preObsByFaculty,
  preObsByObserver,
} from "../controller/Observation/preObs.js";
// import { protect } from "../middleware/authMiddleware.js";

obsRoutes.route("/initiate-obs").post(initateObs);

obsRoutes.route("/pre-obs-by-observer").post(preObsByObserver);
obsRoutes.route("/pre-obs-by-faculty/:id").post(preObsByFaculty);
obsRoutes.route("/pre-obs-accepted/:id").post(preObsAcceptedByObserver);

obsRoutes.route("/all-obs").get(getAllObs);

export default obsRoutes;
