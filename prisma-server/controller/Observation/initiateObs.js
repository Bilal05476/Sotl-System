import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import asyncHandler from "express-async-handler";
// import nodemailer from "nodemailer";

// @desc   Initiate Observation by Head of department
// @route  POST api/initiate-obs
// @access Private (only hod will initiate)
export const initateObs = asyncHandler(async (req, res) => {
  const { facultyId, observerId, hodId } = req.body;

  const newObservation = await prisma.observations.create({
    data: { facultyId, observerId, hodId },
  });

  let obsUsers = [facultyId, observerId, hodId];
  if (newObservation) {
    let toSendMail = [];
    for (let i = 0; i < obsUsers.length; i++) {
      const findemail = await prisma.user.findMany({
        where: {
          id: obsUsers[i],
        },
      });
      toSendMail.push(findemail[0].email);
    }
    res.status(200).send(toSendMail);
  }
});

// @desc   Get all users
// @route  POST api/all-users
// @access Private
export const getAllObs = asyncHandler(async (req, res) => {
  const allObs = await prisma.observations.findMany();
  res.status(200).send(allObs);
});
