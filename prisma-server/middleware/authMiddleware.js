import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const protect = asyncHandler(async (req, res, next) => {
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
      await prisma.user.findMany({
        where: {
          id: decoded.id,
        },
      });

      next();
    } catch (err) {
      res.status(400).send("Not Authorized");
    }
  }
  if (!token) {
    res.status(401).send("No authorized, no token");
  }
});
