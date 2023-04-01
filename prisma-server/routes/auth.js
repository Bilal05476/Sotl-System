import express from "express";
const authRoutes = express.Router();
import {
  getUser,
  createUser,
  updateUser,
  getUsers,
} from "../controller/auth.js";

authRoutes.route("/login").post(getUser);
authRoutes.route("/create").post(createUser);
authRoutes.route("/update-user").put(updateUser);
authRoutes.route("/all-users").get(getUsers);

export default authRoutes;
