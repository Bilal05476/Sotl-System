import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import asyncHandler from "express-async-handler";

export const preObsByObserver = asyncHandler(async (req, res) => {
  const { observationRubric, facultyId, observationId, observerId } = req.body;

  const reqData = {
    observationRubric,
    facultyId,
    observationId,
    observerId,
  };

  const createdReq = await prisma.obsRequests.create({
    data: reqData,
  });
  res.status(200).send(createdReq);
});

export const preObsByFaculty = asyncHandler(async (req, res) => {
  const { teachingPlan, timeSlot, courseId, observationId } = req.body;

  const updatedReq = await prisma.obsRequests.update({
    where: {
      id: Number(req.params.id),
    },
    data: {
      teachingPlan,
      timeSlot,
    },
  });
  if (updatedReq) {
    await prisma.observations.update({
      where: {
        id: observationId,
      },
      data: {
        courseId,
      },
    });
    res.status(200).send(updatedReq);
  }
});

export const preObsAcceptedByObserver = asyncHandler(async (req, res) => {
  const { observationId, timeSlot } = req.body;

  const updatedReq = await prisma.obsRequests.update({
    where: {
      id: Number(req.params.id),
    },
    data: {
      obsReqStatus: "Completed",
    },
  });
  if (updatedReq) {
    await prisma.observations.update({
      where: {
        id: observationId,
      },
      data: {
        observationStatus: "Ongoing",
        timeSlot,
      },
    });
    res.status(200).send(updatedReq);
  }
});
