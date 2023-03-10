import express from "express";
const authRoutes = express.Router();
import { getUser, createUser, updateUser } from "../controller/auth.js";

authRoutes.route("/login").post(getUser);
authRoutes.route("/create").post(createUser);
authRoutes.route("/update-user").put(updateUser);

export default authRoutes;
