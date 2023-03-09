import express from "express";
const authRoutes = express.Router();
import { getUser, createUser } from "../controller/auth.js";

authRoutes.route("/login").post(getUser);
authRoutes.route("/create").post(createUser);

export default authRoutes;
