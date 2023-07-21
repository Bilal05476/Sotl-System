import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import asyncHandler from "express-async-handler";
import { TeachingSteps, Rubrics, ReflectionSteps } from "../rubrics.js";
// import nodemailer from "nodemailer";

// @desc   Initiate Observation by Head of department
// @route  POST api/observation/initiate
// @access Private (only hod will initiate)
export const initiate = asyncHandler(async (req, res) => {
  const { facultyIds, semester, observerId, hodId } = req.body;

  let exitedObsForFaculty = [];

  for (let i = 0; i < facultyIds.length; i++) {
    const existed = await prisma.observations.findFirst({
      where: {
        OR: [
          { observationStatus: "Pending" },
          { observationStatus: "Ongoing" },
        ],
        facultyId: facultyIds[i],
      },
      select: {
        observationStatus: true,
        course: {
          select: {
            name: true,
          },
        },
        faculty: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    if (existed) {
      exitedObsForFaculty.push({
        message: `Observation is already ${existed.observationStatus} for the faculty: ${existed.faculty.id}) ${existed.faculty.name} for the ${existed.course.name} course`,
      });
    } else {
      await prisma.observations.create({
        data: {
          facultyId: facultyIds[i],
          observerId,
          hodId,
          semester,
        },
      });
    }
  }
  const findObservations = await prisma.observations.findMany();
  res
    .status(200)
    .json({ observations: findObservations, existed: exitedObsForFaculty });
});

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
          courseSlots: true,
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
          informedObservation: {
            include: {
              rubrics: true,
            },
          },
          postObservation: {
            include: {
              timeSlotsByObserver: true,
              timeSlotsByFaculty: true,
              reflectionPlan: {
                include: {
                  steps: true,
                },
              },
            },
          },
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
// @route  POST api/observation/scheduling
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
// @route  PUT api/observation/scheduling
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
            observationProgress: 10,
            meetings: {
              create: {
                informedObservation: {
                  create: {
                    rubrics: {
                      createMany: {
                        data: Rubrics,
                      },
                    },
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

// @desc   Informed Observation rubrics scoring
// @route  PUT api/observation/informed
// @access Private (only faculty and observer update scoring)
export const informedObsCycle = asyncHandler(async (req, res) => {
  const { informedId, rubricsFinal, facultyScore, observerScore, status } =
    req.body;

  if (facultyScore) {
    try {
      await prisma.informed.update({
        where: {
          id: informedId,
        },
        data: {
          facultyScore,
        },
      });
      rubricsFinal.map(async (item) => {
        await prisma.rubric.update({
          where: {
            id: item.rid,
          },
          data: {
            facultyScore: item.score,
          },
        });
      });
      res.status(200).json({
        message: "Rubrics Score Successfully Submitted!",
      });
    } catch (err) {
      res.status(400).json({
        error: err,
      });
    }
  }
  if (observerScore) {
    try {
      await prisma.informed.update({
        where: {
          id: informedId,
        },
        data: {
          observerScore,
        },
      });
      rubricsFinal.map(async (item) => {
        await prisma.rubric.update({
          where: {
            id: item.rid,
          },
          data: {
            observerScore: item.score,
          },
        });
      });

      res.status(200).json({
        message: "Rubrics Score Successfully Submitted!",
      });
    } catch (err) {
      res.status(400).json({
        error: err,
      });
    }
  }
  if (status) {
    try {
      await prisma.informed.update({
        where: {
          id: informedId,
        },
        data: {
          status,
        },
      });
      res.status(200).json({
        message: "Informed Rubrics Observation Successfully Completed!",
      });
    } catch (err) {
      res.status(400).json({
        error: err,
      });
    }
  }
});

// @desc   Create post observation scheduling
// @route  POST api/observation/post-scheduling
// @access Private for Observer
export const postScheduleCreate = asyncHandler(async (req, res) => {
  const { timeSlotsByObserver, observationsId, facultyId, location } = req.body;

  let odates = [];
  timeSlotsByObserver.map((item) => odates.push({ dateTime: item }));
  // [{date: "2023-07-09:00:00:00Z", date: "2023-07-10:00:00:00Z"}]

  const createPostObs = await prisma.meetings.update({
    where: {
      observationsId,
    },
    data: {
      postObservation: {
        create: {
          location,
          timeSlotsByObserver: {
            createMany: {
              data: odates,
            },
          },
          reflectionPlan: {
            create: {
              type: "Reflection",
              steps: {
                createMany: {
                  data: ReflectionSteps,
                },
              },
              assignedId: facultyId,
            },
          },
        },
      },
    },
  });
  res.status(200).json(createPostObs);
});

// @desc   Update post observation scheduling
// @route  PUT api/observation/post-scheduling
// @access Private for Observer and Faculty
export const postScheduleCycle = asyncHandler(async (req, res) => {
  const {
    observationsId,
    timeSlotsByFaculty,
    scheduledOn,
    status,
    templateResponse,
    templateId,
    timeSlotsByObserver,
    editedById,
    location,
  } = req.body;

  if (timeSlotsByObserver) {
    let odates = [];
    timeSlotsByObserver.map((item) => odates.push({ dateTime: item }));
    // [{dateTime: "2023-07-09:00:00:00Z", dateTime: "2023-07-10:00:00:00Z"}]

    const updatedPostObs = await prisma.meetings.update({
      where: {
        observationsId,
      },
      data: {
        postObservation: {
          update: {
            location,
            timeSlotsByObserver: {
              createMany: {
                data: odates,
              },
            },
          },
        },
      },
    });
    res.status(200).json(updatedPostObs);
  }
  if (timeSlotsByFaculty) {
    // "2023-07-09:00:00:00Z"
    const updatedPostObs = await prisma.meetings.update({
      where: {
        observationsId,
      },
      data: {
        postObservation: {
          update: {
            timeSlotsByFaculty: {
              create: {
                dateTime: timeSlotsByFaculty,
              },
            },
          },
        },
      },
    });
    res.status(200).json(updatedPostObs);
  }
  if (status && scheduledOn) {
    const updatedPostObs = await prisma.meetings.update({
      where: {
        observationsId,
      },
      data: {
        postObservation: {
          update: {
            facultyAccepted: true,
            observerAccepted: true,
            scheduledOn,
          },
        },
      },
    });
    res.status(200).json(updatedPostObs);
  }
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
        const { id, response } = item;
        await prisma.templatePlanStep.update({
          where: {
            id,
          },
          data: {
            response,
          },
        });
      });

      res.status(200).json({
        message: "Reflection Template Successfully Submitted!",
      });
    } catch (err) {
      res.status(400).json({
        error: err,
      });
    }
  }
});
