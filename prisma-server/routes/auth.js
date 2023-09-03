import express from "express";
const authRoutes = express.Router();
import { loginUser, createUser, resetPassword } from "../controller/auth.js";
import { protectCreateRole } from "../middleware/protectRoutes.js";

authRoutes.route("/login").post(loginUser);
// create role protected through middleware, only head of department and above role from him have this access
authRoutes.route("/create").post(protectCreateRole, createUser);
// other way of writin routes
authRoutes.put("/reset-password", resetPassword);

export default authRoutes;
