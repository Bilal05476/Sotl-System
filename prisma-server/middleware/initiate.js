import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const protectInitiateObs = asyncHandler(async (req, res, next) => {
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

      // only head_of_department have access to initiate a observation
      if (user.role === "Head_of_Department") {
        next();
      } else {
        res.status(400).send({
          error: "You are not authorized person to initiate a observation!",
        });
      }
    } catch (err) {
      res.status(400).send({ error: "Not authorized, invalid token!" });
    }
  }
  if (!token) {
    res.status(401).send({
      error:
        "No authorized, no token, please provide user token in request header!",
    });
  }
});
