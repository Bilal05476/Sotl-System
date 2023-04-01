import express from "express";
const obsRoutes = express.Router();
import { initateObs } from "../controller/Observation/initiateObs.js";
// import { protect } from "../middleware/authMiddleware.js";

obsRoutes.route("/initiate-obs").post(initateObs);
// obsRoutes.route("/pre-obs").post();
// obsRoutes.route("/informed-obs").put();

export default obsRoutes;
