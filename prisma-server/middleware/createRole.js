import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const protectCreateRole = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get Token from header
      token = req.headers.authorization.split(" ")[1];

      //verify token
      const decoded = jwt.verify(token, process.env.TOKEN_KEY);

      // get user from database
      const user = await prisma.user.findFirst({
        where: {
          id: decoded.id,
        },
      });

      // only these roles have access to create a role in database
      if (
        user.role === "Head_of_Department" ||
        user.role === "Campus_Director" ||
        user.role === "Admin"
      ) {
        next();
      } else {
        res
          .status(400)
          .json({ error: "You are not authorized person to create a role!" });
      }
    } catch (err) {
      res.status(400).json({ error: "Not authorized, invalid token!" });
    }
  }
  if (!token) {
    res.status(401).json({
      error:
        "No authorized, no token, please provide user token in request header!",
    });
  }
});
