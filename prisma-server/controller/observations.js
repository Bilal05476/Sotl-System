import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import asyncHandler from "express-async-handler";
// import nodemailer from "nodemailer";

// @desc   Initiate Observation by Head of department
// @route  POST api/observation/initiate
// @access Private (only hod will initiate)
export const initiate = asyncHandler(async (req, res) => {
  // await prisma.observations.deleteMany();
  const { facultyId, semester, observerId, hodId, courseId } = req.body;
  const findObservation = await prisma.observations.findFirst({
    where: {
      courseId,
      facultyId,
      observationStatus: "Pending" || "Ongoing",
    },
  });
  if (findObservation) {
    res.status(400).json({
      error:
        "Already have an ongoing observation for that course of this faculty!",
    });
  } else {
    const newObservation = await prisma.observations.create({
      data: { semester, facultyId, observerId, hodId, courseId },
    });
    res.status(200).json(newObservation);
  }

  // if (newObservation) {
  //   res.status(200).json(newObservation);
  // }

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
  //   res.status(200).json(toSendMail);
  // }
});

// @desc   Get all observations
// @route  Get api/observations
// @access Private
export const getAllObs = asyncHandler(async (req, res) => {
  const allObs = await prisma.observations.findMany({
    include: {
      faculty: true,
      observer: true,
      hod: true,
      course: true,
    },
  });

  const returnObss = [];
  allObs.map((item) => {
    returnObss.push({
      id: item.id,
      faculty: {
        id: item.faculty.id,
        name: item.faculty.name,
        email: item.faculty.email,
      },
      observer: {
        id: item.observer.id,
        name: item.observer.name,
        email: item.observer.email,
      },
      hod: {
        id: item.hod.id,
        name: item.hod.name,
        email: item.hod.email,
      },
      starting: item.starting,
      ending: item.ending,
      semester: item.semester,
      observationProgress: item.observationProgress,
      observationStatus: item.observationStatus,
      course: item.course,
    });
  });
  res.status(200).json(returnObss);
});

// @desc   Get observation by id
// @route  Get api/observation/:id
// @access Private
export const getObs = asyncHandler(async (req, res) => {
  const Obs = await prisma.observations.findFirst({
    where: { id: Number(req.params.id) },
    include: {
      faculty: {
        select: {
          name: true,
          email: true,
        },
      },
      observer: {
        select: {
          name: true,
          email: true,
        },
      },
      hod: {
        select: {
          name: true,
          email: true,
        },
      },
      obsRequest: {
        include: {
          timeSlotByObserver: true,
          timeSlotsByFaculty: true,
        },
      },
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
  if (Obs) {
    res.status(200).json(Obs);
  } else {
    res.status(404).json({ error: "No observation found!" });
  }
});

export const obsScheduleCreate = asyncHandler(async (req, res) => {
  // await prisma.obsScheduling.deleteMany();
  const {
    teachingPlanByObserver,
    refelectionPlanByObserver,
    artifacts,
    observationsId,
  } = req.body;

  const reqData = {
    teachingPlanByObserver,
    refelectionPlanByObserver,
    artifacts,
    observationsId,
  };

  // await prisma.obsScheduling.deleteMany();
  const findSheduling = await prisma.obsScheduling.findFirst({
    where: {
      observationsId,
    },
  });
  if (findSheduling) {
    res.status(400).json({
      error: "Scheduling already created for this observation by observer!",
    });
  } else {
    const createdReq = await prisma.obsScheduling.create({
      data: reqData,
    });
    res.status(200).json(createdReq);
  }
});

// @desc   update observation schedyling
// @route  PUT api/observations/scheduling
// @access Private for Observer and Faculty
export const obsScheduleCycle = asyncHandler(async (req, res) => {
  const {
    observationsId,
    teachingPlanByObserver,
    refelectionPlanByObserver,
    artifacts,
    teachingPlanByFaculty,
    refelectionPlanByFaculty,
    timeSlotsByFaculty,
    timeSlotByObserver,
    scheduledOn,
    status,
  } = req.body;

  let fids = [];
  if (timeSlotsByFaculty.length > 0) {
    timeSlotsByFaculty.map((item) => fids.push({ id: item }));
  }
  let oids = [];
  if (timeSlotByObserver.length > 0) {
    timeSlotByObserver.map((item) => oids.push({ id: item }));
  }

  const reqData = {
    teachingPlanByObserver,
    refelectionPlanByObserver,
    artifacts,
    teachingPlanByFaculty,
    refelectionPlanByFaculty,
    timeSlotsByFaculty: {
      set: fids,
    },
    timeSlotByObserver: {
      set: oids,
    },
    scheduledOn,
    status,
    teachingPlanByFaculty,
  };

  const existedReq = await prisma.obsScheduling.findFirst({
    where: {
      observationsId,
    },
  });
  if (existedReq) {
    const updatedReq = await prisma.obsScheduling.update({
      where: {
        observationsId,
      },
      data: reqData,
    });
    if (status === "Completed") {
      const scheduledObs = await prisma.observations.update({
        where: {
          id: observationsId,
        },
        data: {
          observationStatus: "Ongoing",
          starting: scheduledOn,
          meetings: {
            create: {
              informedObservation: {
                create: {},
              },
            },
          },
        },
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
      res.status(200).json(scheduledObs);
    } else {
      res.status(200).json(updatedReq);
    }
  } else {
    res.status(404).json({ error: "Request not exist!" });
  }
});
