import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import asyncHandler from "express-async-handler";
// import nodemailer from "nodemailer";

// @desc   Initiate Observation by Head of department
// @route  POST api/observation/initiate
// @access Private (only hod will initiate)
export const initiate = asyncHandler(async (req, res) => {
  const { facultyId, semester, observerId, hodId } = req.body;
  // const obsUsers = [facultyId, observerId, hodId];
  const newObservation = await prisma.observations.create({
    data: { semester, facultyId, observerId, hodId },
  });
  if (newObservation) {
    res.status(200).json(newObservation);
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
      faculty: { name: item.faculty.name, email: item.faculty.email },
      observer: { name: item.observer.name, email: item.observer.email },
      hod: { name: item.hod.name, email: item.hod.email },
      timeSlot: item.timeSlot,
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
      faculty: true,
      observer: true,
      hod: true,
      obsRequest: {
        include: {
          course: true,
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
    const returnObs = {
      id: Obs.id,
      faculty: { name: Obs.faculty.name, email: Obs.faculty.email },
      observer: { name: Obs.observer.name, email: Obs.observer.email },
      hod: { name: Obs.hod.name, email: Obs.hod.email },
      meetings: Obs.meetings,
      obsRequest: Obs.obsRequest,
      timeSlot: Obs.timeSlot,
      semester: Obs.semester,
      observationProgress: Obs.observationProgress,
      observationScore: Obs.observationScore,
      observationStatus: Obs.observationStatus,
      course: Obs.course,
    };
    res.status(200).json(returnObs);
  } else {
    res.status(404).json({ error: "No observation found!" });
  }
});

export const obsScheduleCreate = asyncHandler(async (req, res) => {
  const {
    teachingPlanByObserver,
    refelectionPlanByObserver,
    artifacts,
    observationsId,
  } = req.body;

  const reqData = {
    teachingPlanByObserver: teachingPlanByObserver && teachingPlanByObserver,
    refelectionPlanByObserver:
      refelectionPlanByObserver && refelectionPlanByObserver,
    artifacts: artifacts && artifacts,
    observationsId,
  };

  // await prisma.obsScheduling.deleteMany();
  const findSheduling = await prisma.obsScheduling.findFirst({
    where: {
      observationsId,
    },
  });
  if (findSheduling) {
    res.status(500).json({
      error: "Scheduling already created for this observation by observer!",
    });
  } else {
    const createdReq = await prisma.obsScheduling.create({
      data: reqData,
    });
    res.status(200).json(createdReq);
  }
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
    res.status(200).json(updatedReq);
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
    res.status(200).json(updatedReq);
  }
});

export const obsScheduleCycle = asyncHandler(async (req, res) => {
  const {
    teachingPlanByFaculty,
    refelectionPlanByFaculty,
    timeSlotsByFaculty,
    timeSlotsByObserver,
    status,
    course,
  } = req.body;

  const reqData = {
    teachingPlanByFaculty: teachingPlanByFaculty && teachingPlanByFaculty,
    refelectionPlanByFaculty:
      refelectionPlanByFaculty && refelectionPlanByFaculty,
    timeSlotsByFaculty: timeSlotsByFaculty && timeSlotsByFaculty,
    timeSlotsByObserver: timeSlotsByObserver && timeSlotsByObserver,
    status: status && status,
    courseId: course && course,
  };

  const existedReq = await prisma.obsScheduling.findFirst({
    where: {
      id: Number(req.params.id),
    },
  });
  if (existedReq) {
    const updatedReq = await prisma.obsScheduling.update({
      where: {
        id: Number(req.params.id),
      },
      data: reqData,
    });
    if (updatedReq.status === "Completed") {
      await prisma.observations.update({
        where: {
          id: updatedReq.observationsId,
        },
        data: {
          observationStatus: "Ongoing",
          timeSlot: updatedReq.timeSlotsByObserver,
          courseId: updatedReq.courseId,
        },
      });
      const newMeeting = await prisma.meetings.create({
        data: {
          observationsId: updatedReq.observationsId,
        },
      });
      if (newMeeting) {
        await prisma.informed.create({
          data: {
            meetingId: newMeeting.id,
          },
        });
        const Obs = await prisma.observations.findFirst({
          where: { id: updatedReq.observationsId },
          include: {
            faculty: true,
            observer: true,
            hod: true,
            obsRequest: true,
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
        res.status(200).json(Obs);
      }
    } else {
      res.status(200).json(updatedReq);
    }
  } else {
    res.status(404).json({ error: "Request not exist!" });
  }
  // res.status(200).json(existedReq);
});
