import express from "express";
const authRoutes = express.Router();
import {
  getUser,
  createUser,
  updateUser,
  getUsers,
  userById,
} from "../controller/auth.js";

authRoutes.route("/login").post(getUser);
authRoutes.route("/create").post(createUser);
authRoutes.route("/update-user").put(updateUser);
authRoutes.route("/get-users").get(getUsers);
authRoutes.route("/get-user/:id").get(userById);

export default authRoutes;
