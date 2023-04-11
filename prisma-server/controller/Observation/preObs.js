import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import asyncHandler from "express-async-handler";

export const obsScheculeCreate = asyncHandler(async (req, res) => {
  const {
    teachingPlanByObserver,
    refelectionPlanByObserver,
    artifcats,
    observationsId,
  } = req.body;

  const reqData = {
    teachingPlanByObserver: teachingPlanByObserver && teachingPlanByObserver,
    refelectionPlanByObserver:
      refelectionPlanByObserver && refelectionPlanByObserver,
    artifcats: artifcats && artifcats,
    observationsId,
  };

  const createdReq = await prisma.obsScheduling.create({
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
        res.status(200).send(Obs);
      }
    } else {
      res.status(200).send(updatedReq);
    }
  } else {
    res.status(404).send({ error: "Request not exist!" });
  }
  // res.status(200).send(existedReq);
});

// {
//   "teachingPlanByFaculty": "teaching",
//   "courseByFaculty": 2,
//   "timeSlotsByFaculty": ["2023-05-01:11:45:00Z", "2023-05-02:11:45:00Z"],
//   "refelectionPlanByFaculty": "",
//   "obsReqStatus": "Pending",
//   "timeSlotsByObserver": []
// }
