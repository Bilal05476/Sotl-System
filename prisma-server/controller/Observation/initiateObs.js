import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import asyncHandler from "express-async-handler";
import nodemailer from "nodemailer";

// @desc   Initiate Observation by Head of department
// @route  POST api/initiate-obs
// @access Private (only hod will initiate)
export const initateObs = asyncHandler(async (req, res) => {
  const { facultyId, observerId, hodId } = req.body;
  let userIds = [facultyId, observerId, hodId];
  const newObservation = await prisma.observations.create({
    data: {},
  });

  if (newObservation) {
    for (let i = 0; i < userIds.length; i++) {
      await prisma.user.update({
        where: {
          id: userIds[i],
        },
        data: {
          // observations: newObservation.id,
          observationIds: newObservation.id,
        },
      });
    }
  }
  res.status(200).send(newObservation);

  // if (newObservation) {
  //   // res.status(200).send(newObservation);
  //   let obsUsers = [facultyId, observerId, hodId];
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
