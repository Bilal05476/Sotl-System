import express from "express";
const authRoutes = express.Router();
import {
  getUser,
  createUser,
  updateUser,
  getUsers,
  userById,
} from "../controller/auth.js";

authRoutes.route("/users").get(getUsers);
authRoutes.route("/user/:id").get(userById);
authRoutes.route("/login").post(getUser);
authRoutes.route("/create").post(createUser);
authRoutes.route("/update/:id").put(updateUser);

export default authRoutes;
