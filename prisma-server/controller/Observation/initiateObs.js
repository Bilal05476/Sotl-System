import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import asyncHandler from "express-async-handler";
// import nodemailer from "nodemailer";

// @desc   Initiate Observation by Head of department
// @route  POST api/observation/initiate
// @access Private (only hod will initiate)
export const initateObs = asyncHandler(async (req, res) => {
  const { facultyId, semester, observerId, hodId } = req.body;
  // const obsUsers = [facultyId, observerId, hodId];
  const newObservation = await prisma.observations.create({
    data: { semester, facultyId, observerId, hodId },
  });
  if (newObservation) {
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
// @route  POST api/observations
// @access Private
export const getAllObs = asyncHandler(async (req, res) => {
  const allObs = await prisma.observations.findMany();
  res.status(200).send(allObs);
});

// @desc   Get observation by id
// @route  POST api/observation/:id
// @access Private
export const getObs = asyncHandler(async (req, res) => {
  const Obs = await prisma.observations.findFirst({
    where: { id: Number(req.params.id) },
    include: {
      faculty: true,
      observer: true,
      hod: true,
      obsRequest: true,
      course: true,
      meetings: {
        include: {
          informedObservation: true,
          postObservation: true,
          uninformedObservation: true,
          professionalDPlan: true,
        },
      },
    },
  });
  res.status(200).send(Obs);
});
