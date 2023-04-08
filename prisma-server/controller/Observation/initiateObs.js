import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import asyncHandler from "express-async-handler";
// import nodemailer from "nodemailer";

// @desc   Initiate Observation by Head of department
// @route  POST api/initiate-obs
// @access Private (only hod will initiate)
export const initateObs = asyncHandler(async (req, res) => {
  const { facultyId, semester, observerId, hodId } = req.body;

  const obsUsers = [facultyId, observerId, hodId];

  const newObservation = await prisma.observations.create({
    data: { semester, meetings: [] },
  });
  if (newObservation) {
    for (let u = 0; u < obsUsers.length; u++) {
      const jsonData = await prisma.user.findFirst({
        where: {
          id: obsUsers[u],
        },
        select: {
          observations: true,
        },
      });
      jsonData.observations.push(newObservation.id);
      await prisma.user.update({
        where: { id: obsUsers[u] },
        data: {
          observations: jsonData.observations,
        },
      });
    }

    res.status(200).send(newObservation);
  }

  // let obsUsers = [facultyId, observerId, hodId];
  // if (newObservation) {
  //   let toSendMail = [];
  //   for (let i = 0; i < obsUsers.length; i++) {
  //     const findemail = await prisma.user.findMany({
  //       where: {
  //         id: obsUsers[i],
  //       },
  //     });
  //     toSendMail.push(findemail[0].email);
  //   }
  //   res.status(200).send(toSendMail);
  // }
});

// @desc   Get all observations
// @route  POST api/get-observations
// @access Private
export const getAllObs = asyncHandler(async (req, res) => {
  const allObs = await prisma.observations.findMany();
  res.status(200).send(allObs);
});
