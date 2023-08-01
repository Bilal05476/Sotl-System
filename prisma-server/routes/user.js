import express from "express";
const userRoutes = express.Router();
import { getUsers, userById } from "../controller/users.js";
import { updateUser, updateUserImg } from "../controller/auth.js";

userRoutes.route("/").get(getUsers);
userRoutes.route("/:id").get(userById);
userRoutes.route("/update/:id").put(updateUser);
userRoutes.route("/update-image/:id").put(updateUserImg);

export default userRoutes;
