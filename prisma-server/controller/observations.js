import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import asyncHandler from "express-async-handler";
import { Rubrics } from "../rubrics.js";
import { findEmail } from "./email.js";
import { emailSender } from "../EmailSmtp/index.js";
import { findTemplate } from "./templates.js";

// @desc   Observation Prompt by Admin to Head of department
// @route  POST api/observation/prompt
// @access Private (Only Admin will prompt)
export const prompt = asyncHandler(async (req, res) => {
  const { departmentId, campus, threshold } = req.body;
  const findHodOfCampus = await prisma.user.findMany({
    where: {
      campus,
      department: {
        id: departmentId,
      },
      role: "Head_of_Department",
    },
    select: {
      name: true,
      email: true,
    },
  });

  if (findHodOfCampus.length > 0) {
    await prisma.observationThreshold.update({
      where: {
        id: 1,
      },
      data: {
        threshold,
      },
    });
    // send email to head of departments for observation prompt
    let emailString = await findEmail("ObsPrompt");
    for (let em = 0; em < findHodOfCampus.length; em++) {
      emailSender(
        emailString
          .replaceAll("{{name}}", findHodOfCampus[em].name)
          .replaceAll("{{email}}", findHodOfCampus[em].email),
        "Observation Prompt from SOTL System CTeli!",
        findHodOfCampus[em].email
      );
    }

    res.status(200).json({ message: "Emails send to head of departments!" });
  } else {
    res.status(404).json({ error: "No head of departments found!" });
  }
});

// @desc   Initiate Observation by Head of department
// @route  POST api/observation/initiate
// @access Private (only hod will initiate)
export const initiate = asyncHandler(async (req, res) => {
  const { facultyIds, semester, observerId, hodId } = req.body;
  // "createdAt": "2023-04-12T11:51:50.445Z"

  // email receivers deatils lists
  let receiversEmail = [];
  let receiversName = [];
  // let receiversPassword = [];

  // const existedObservation = await prisma.observations.findMany({
  //   where: {
  //     AND: [
  //       {
  //         observationStatus: {
  //           in: ["Pending", "Ongoing"],
  //         },
  //       },
  //       {
  //         facultyId: {
  //           in: facultyIds,
  //         },
  //       },
  //     ],
  //   },
  //   select: {
  //     observationStatus: true,
  //     course: {
  //       select: {
  //         name: true,
  //       },
  //     },
  //     faculty: {
  //       select: {
  //         id: true,
  //         name: true,
  //       },
  //     },
  //   },
  // });

  // let existedIds = existedObservation.map((item) => item.faculty.id);

  // observation threshold
  const obsthreshold = await prisma.observationThreshold.findFirst({
    where: {
      id: 1,
    },
    select: {
      threshold: true,
    },
  });

  const observationsToCreate = facultyIds
    // .filter((facultyId) => !existedIds.includes(facultyId))
    .map((facultyId) => ({
      facultyId,
      observerId,
      hodId,
      semester,
      threshold: obsthreshold.threshold,
    }));

  let initiateObs = [];
  // res.status(200).json(observationsToCreate);
  // return;
  // if (observationsToCreate.length > 0) {
  for (let f = 0; f < facultyIds.length; f++) {
    const existed = await prisma.observations.findFirst({
      where: {
        AND: [
          {
            observationStatus: {
              in: ["Pending", "Ongoing"],
            },
          },
          {
            facultyId: facultyIds[f],
          },
        ],
      },
    });
    if (existed) {
      continue;
    } else {
      initiateObs.push(
        await prisma.observations.create({
          data: observationsToCreate[f],
          include: {
            faculty: {
              select: {
                email: true,
                name: true,
              },
            },
            observer: {
              select: {
                email: true,
                name: true,
              },
            },
          },
        })
      );
    }
  }
  // }

  // send emails to observer and faculty if obs initiated
  if (initiateObs.length > 0) {
    // different faculties
    initiateObs?.map((item) => receiversEmail.push(item.faculty.email));
    initiateObs?.map((item) => receiversName.push(item.faculty.name));
    // same observer
    receiversEmail.push(initiateObs[0].observer.email);
    receiversName.push(initiateObs[0].observer.name);

    // send email after observation initiating to observer and faculty
    let emailString = await findEmail("InitiateObs");
    for (let em = 0; em < receiversEmail.length; em++) {
      emailSender(
        emailString
          .replaceAll("{{name}}", receiversName[em])
          .replaceAll("{{email}}", receiversEmail[em]),
        "Your new observation just initiate by your head of department on SOTL System!",
        receiversEmail[em]
      );
    }
    res.status(200).json({ observations: initiateObs });
  } else {
    res.status(200).json({ observations: null });
  }
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
  if (allObs.length === 0) res.status(200).json({ message: "No observations" });
  else res.status(200).json(allObs);
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
          courseSlots: {
            include: {
              course: true,
            },
          },
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
              reflectionPlan: {
                include: {
                  steps: true,
                },
              },
              artifacts: true,
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

// @desc   DELETE observation by id
// @route  Delete api/observation/:id
// @access Private (Super Admin)
export const deleteObs = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  const find = await prisma.observations.findFirst({
    where: {
      id,
    },
  });
  if (find) {
    await prisma.observations.delete({
      where: {
        id,
      },
      include: {
        meetings: {
          include: {
            informedObservation: {
              include: {
                rubrics: true,
              },
            },
            uninformedObservation: {
              include: {
                rubrics: true,
              },
            },
            postObservation: {
              include: {
                artifacts: true,
                reflectionPlan: {
                  include: {
                    steps: true,
                  },
                },
                timeSlotsByObserver: true,
              },
            },
          },
        },
        obsRequest: {
          include: {
            reasons: true,
            teachingPlan: {
              include: {
                steps: true,
              },
            },
          },
        },
        feedbacks: true,
      },
    });
    res.status(200).json({ message: "Observation deleted successfully!" });
  } else {
    res.status(404).json({ error: "Observation not found!" });
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
    let templateSteps = await findTemplate("Teaching");

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
                    data: templateSteps,
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
  const { informedId, rubricsFinal, role, status } = req.body;
  // const Find = async (id) => {
  //   let findInformed = await prisma.informed.findFirst({
  //     where: { id },
  //     select: {
  //       rubrics: true,
  //       facultyScore: role === "Faculty" && true,
  //       observerScore: role === "Observer" && true,
  //     },
  //   });
  //   return findInformed;
  // };

  // res.status(200).json({ sc: scoreByRole });
  // let getOnlyIds = [];
  let getScores = 0;
  if (rubricsFinal) {
    // rubricsFinal.map((item) => getOnlyIds.push(item.rid));
    rubricsFinal.map((item) => (getScores += item.score));
  }

  // return;

  if (role === "Faculty") {
    try {
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

      // let facultyScore = 0;

      // let find = await Find();
      // if (find) {
      // which are not included in coming response
      // const notIncluded = find.rubrics.filter(
      //   (item) => !getOnlyIds.includes(item.id)
      // );
      // notIncluded.map((item) => (facultyScore += item.facultyScore));
      // getOnlyScores.map((item) => (facultyScore += item));

      await prisma.informed.update({
        where: {
          id: informedId,
        },
        data: {
          facultyScore: getScores,
          // status: "Draft",
        },
      });
      // }

      res.status(200).json({
        message: "Rubrics Score Successfully Submitted!",
      });
    } catch (err) {
      res.status(400).json({
        error: err,
      });
    }
  }
  if (role === "Observer") {
    try {
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

      // let observerScore = 0;

      // let find = await Find(informedId);

      // if (find) {
      // which are not included in coming response
      // const notIncluded = find.rubrics.filter(
      //   (item) => !getOnlyIds.includes(item.id)
      // );
      // notIncluded.map((item) => (observerScore += item.observerScore));
      // getOnlyScores.map((item) => (observerScore += item));

      await prisma.informed.update({
        where: {
          id: informedId,
        },
        data: {
          observerScore: getScores,
          // status: "Draft",
        },
      });
      // }

      res.status(200).json({
        message: "Rubrics Score Successfully Submitted!",
      });
    } catch (err) {
      res.status(400).json({
        err,
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
  // [{dateTime: "2023-07-09:00:00:00Z", dateTime: "2023-07-10:00:00:00Z"}]
  let templateSteps = await findTemplate("Reflection");
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
                  data: templateSteps,
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
    timeSlotByFaculty,
    scheduledOn,
    status,
    templateResponse,
    templateId,
    timeSlotsByObserver,
    editedById,
    location,
  } = req.body;

  const existed = await prisma.meetings.findFirst({
    where: {
      observationsId,
    },
    select: {
      postObservation: {
        select: {
          status: true,
          timeSlotByFaculty: true,
        },
      },
    },
  });

  if (
    existed.postObservation.status === "Ongoing" ||
    existed.postObservation.status === "Scheduled"
  ) {
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
        include: {
          postObservation: true,
        },
      });
      res.status(200).json(updatedPostObs);
    }
    if (timeSlotByFaculty) {
      // "2023-07-09:00:00:00Z" only one slot by faculty
      const updatedPostObs = await prisma.meetings.update({
        where: {
          observationsId,
        },
        data: {
          postObservation: {
            update: {
              timeSlotByFaculty,
            },
          },
        },
        include: {
          postObservation: true,
        },
      });
      res.status(200).json(updatedPostObs);
    }
    if (status) {
      // scheduledOn === timeslotByFaculty
      if (existed.postObservation.timeSlotByFaculty) {
        await prisma.meetings.update({
          where: {
            observationsId,
          },
          data: {
            postObservation: {
              update: {
                facultyAccepted: true,
                observerAccepted: true,
                scheduledOn: existed.postObservation.timeSlotByFaculty,
                status,
              },
            },
          },
          include: {
            postObservation: true,
          },
        });
        res.status(200).json({ message: "Post Observation Scheduling Done!" });
      } else {
        res
          .status(400)
          .json({ error: "Faculty doesn't select any timeslot yet!" });
      }
    }
    if (templateResponse && templateId && editedById) {
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
  } else {
    res
      .status(400)
      .json({ error: "Post observation scheduling already completed!" });
  }
});
