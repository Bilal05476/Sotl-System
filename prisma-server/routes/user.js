import express from "express";
const userRoutes = express.Router();
import { getUsers, userById } from "../controller/users.js";

userRoutes.route("/users").get(getUsers);
userRoutes.route("/user/:id").get(userById);

export default userRoutes;
