import express from "express";
const authRoutes = express.Router();
import {
  getUser,
  createUser,
  updateUser,
  getUsers,
  userById,
} from "../controller/auth.js";
import { protectCreateRole } from "../middleware/createRole.js";

authRoutes.route("/users").get(getUsers);
authRoutes.route("/user/:id").get(userById);
authRoutes.route("/login").post(getUser);
authRoutes.route("/create").post(protectCreateRole, createUser);
authRoutes.route("/update/:id").put(updateUser);

// authRoutes.route("/protected").post(protectinitiateObs, () => {
//   console.log("Initiate Observation");
// });

export default authRoutes;
