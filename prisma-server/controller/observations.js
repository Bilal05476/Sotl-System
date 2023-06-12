import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import asyncHandler from "express-async-handler";
import { TeachingSteps, Rubrics } from "../rubrics.js";
// import nodemailer from "nodemailer";

// @desc   Initiate Observation by Head of department
// @route  POST api/observation/initiate
// @access Private (only hod will initiate)
export const initiate = asyncHandler(async (req, res) => {
  const { facultyIds, semester, observerId, hodId } = req.body;

  for (let i = 0; i < facultyIds.length; i++) {
    await prisma.observations.create({
      data: {
        facultyId: facultyIds[i],
        observerId,
        hodId,
        semester,
      },
    });
  }
  const findObservations = await prisma.observations.findMany();
  res.status(200).json(findObservations);

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
      faculty: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      observer: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      hod: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      course: true,
    },
  });
  res.status(200).json(allObs);
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

// @desc   Create observation scheduling
// @route  POST api/observations/scheduling
// @access Private for Observer
export const obsScheduleCreate = asyncHandler(async (req, res) => {
  const { observationsId, facultyId, courseId } = req.body;
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
    const createdReq = await prisma.observations.update({
      where: {
        id: observationsId,
      },
      data: {
        courseId,
        obsRequest: {
          create: {
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
                  create: {
                    rubrics: {
                      createMany: {
                        data: Rubrics
                      }
                    }
                   },
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
