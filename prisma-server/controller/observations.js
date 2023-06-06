import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import asyncHandler from "express-async-handler";
// import nodemailer from "nodemailer";

const TeachingSteps = [
  {
    field: "Program Outcomes for this Program (PLOs)",
    name: "ProgramOutcomes",
  },
  {
    field: "Learning Outcomes for this Course (CLOs)",
    name: "LearningOutcomes",
  },
  {
    field: "Learning Resources",
    name: "LearningResources",
  },
  {
    field: "Teaching Summary",
    name: "TeachingSummary",
  },
  {
    field: "Pre Teaching / Warm-up",
    name: "PreTeaching",
  },
  {
    field: "Post Teaching",
    name: "PostTeaching",
  },
  {
    field: "Learning Feedbacks (activity, quiz, no-graded/graded assessments)",
    name: "Feedback",
  },
];
const ReflectionSteps = [
  {
    field: "Abhi nahi pata",
  },
];
// @desc   Initiate Observation by Head of department
// @route  POST api/observation/initiate
// @access Private (only hod will initiate)
export const initiate = asyncHandler(async (req, res) => {
  const { facultyId, semester, observerId, hodId, courseId } = req.body;
  const findObservation = await prisma.observations.findFirst({
    where: {
      OR: [{ observationStatus: "Pending" }, { observationStatus: "Ongoing" }],
      courseId,
      facultyId,
    },
  });
  if (findObservation) {
    res.status(400).json({
      error:
        "Already have an ongoing observation for that course of this faculty!",
    });
  } else {
    const newObservation = await prisma.observations.create({
      data: {
        facultyId,
        observerId,
        hodId,
        courseId,
        semester,
      },
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
      createdAt: item.createdAt,
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
          timeSlotByObserver: {
            select: {
              id: true,
              time: true,
              location: true,
              day: true,
              courseId: true,
            },
          },
          timeSlotsByFaculty: {
            select: {
              id: true,
              time: true,
              location: true,
              day: true,
              courseId: true,
            },
          },
          teachingPlan: {
            select: {
              steps: true,
              assignedTo: {
                select: {
                  name: true,
                  email: true,
                },
              },
              editedBy: {
                select: {
                  name: true,
                  email: true,
                },
              },
            },
          },

          reasons: true,
        },
      },
      course: {
        include: {
          slots: true,
        },
      },
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

// @desc   Create observation scheduling
// @route  POST api/observations/scheduling
// @access Private for Observer
export const obsScheduleCreate = asyncHandler(async (req, res) => {
  const { observationsId, facultyId } = req.body;
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
      data: {
        observationsId,
        teachingPlan: {
          create: {
            type: "Teaching",
            steps: {
              createMany: {
                data: TeachingSteps,
              },
            },
            assignedId: facultyId,
          },
        },
      },
    });
    res.status(200).json(createdReq);
  }
});

// @desc   update observation scheduling
// @route  PUT api/observations/scheduling
// @access Private for Observer and Faculty
export const obsScheduleCycle = asyncHandler(async (req, res) => {
  const {
    observationsId,
    timeSlotsByFaculty,
    timeSlotByObserver,
    scheduledOn,
    status,
    reasons,
    observerAccepted,
    facultyAccepted,
    templateResponse,
    templateId,
    editedById,
  } = req.body;

  let fids = [];
  if (timeSlotsByFaculty) {
    timeSlotsByFaculty.map((item) => fids.push({ id: item }));
  }
  let oids = [];
  if (timeSlotByObserver) {
    timeSlotByObserver.map((item) => oids.push({ id: item }));
  }

  const reqData = {
    timeSlotsByFaculty: timeSlotsByFaculty && {
      set: fids,
    },
    timeSlotByObserver: timeSlotByObserver && {
      set: oids,
    },

    scheduledOn: scheduledOn && scheduledOn,

    status: status && status,
    observerAccepted: observerAccepted && observerAccepted,
    facultyAccepted: facultyAccepted && facultyAccepted,

    reasons: reasons && {
      create: {
        reason: reasons.reason,
        senderId: reasons.senderId,
        receiverId: reasons.receiverId,
      },
    },
  };

  const existedReq = await prisma.obsScheduling.findFirst({
    where: {
      observationsId,
    },
    select: {
      id: true,
      status: true,
      scheduledOn: true,
    },
  });

  if (existedReq && existedReq.status !== "Completed") {
    if (templateResponse) {
      try {
        await prisma.templatePlan.update({
          where: {
            id: templateId,
          },
          data: {
            editedById,
          },
        });
        templateResponse.map(async (item) => {
          await prisma.templatePlanStep.update({
            where: {
              id: item.id,
            },
            data: {
              response: item.response,
            },
          });
        });
        res.status(200).json({
          message: "Teaching Template Successfully Submitted!",
        });
      } catch (err) {
        res.status(400).json({
          error: err,
        });
      }
    } else {
      const updatedReq = await prisma.obsScheduling.update({
        where: {
          observationsId,
        },
        data: reqData,
        include: {
          timeSlotByObserver: {
            select: {
              id: true,
              time: true,
              location: true,
              day: true,
              courseId: true,
            },
          },
          timeSlotsByFaculty: {
            select: {
              id: true,
              time: true,
              location: true,
              day: true,
              courseId: true,
            },
          },
          reasons: true,
        },
      });
      if (status) {
        const scheduledObs = await prisma.observations.update({
          where: {
            id: observationsId,
          },
          data: {
            observationStatus: "Ongoing",
            starting: existedReq.scheduledOn,
            observationProgress: 0,
            meetings: {
              create: {
                informedObservation: {
                  create: {},
                },
              },
            },
          },
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
                timeSlotByObserver: {
                  select: {
                    id: true,
                    time: true,
                    location: true,
                    day: true,
                    courseId: true,
                  },
                },
                timeSlotsByFaculty: {
                  select: {
                    id: true,
                    time: true,
                    location: true,
                    day: true,
                    courseId: true,
                  },
                },
                reasons: true,
                teachingPlan: {
                  select: {
                    steps: true,
                    assignedTo: {
                      select: {
                        name: true,
                        email: true,
                      },
                    },
                  },
                },
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
        res.status(200).json(scheduledObs);
      } else {
        res.status(200).json(updatedReq);
      }
    }
  } else {
    res.status(404).json({ error: "Scheduling does not exist or completed!" });
  }
});
