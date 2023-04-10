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

export const obsScheduleCycle = asyncHandler(async (req, res) => {
  const {
    teachingPlanByFaculty,
    refelectionPlanByFaculty,
    timeSlotsByFaculty,
    timeSlotsByObserver,
    obsReqStatus,
    course,
  } = req.body;

  const reqData = {
    teachingPlanByFaculty: teachingPlanByFaculty && teachingPlanByFaculty,
    refelectionPlanByFaculty:
      refelectionPlanByFaculty && refelectionPlanByFaculty,
    timeSlotsByFaculty: timeSlotsByFaculty && timeSlotsByFaculty,
    timeSlotsByObserver: timeSlotsByObserver && timeSlotsByObserver,
    obsReqStatus: obsReqStatus && obsReqStatus,
    courseId: course && course,
  };

  const existedReq = await prisma.obsRequests.findFirst({
    where: {
      id: Number(req.params.id),
    },
  });
  if (existedReq) {
    const updatedReq = await prisma.obsRequests.update({
      where: {
        id: Number(req.params.id),
      },
      data: reqData,
    });
    if (updatedReq.obsReqStatus === "Completed") {
      await prisma.observations.update({
        where: {
          id: updatedReq.observationsId,
        },
        data: {
          observationStatus: "Ongoing",
          timeSlot: updatedReq.timeSlotsByObserver,
          courseId: updatedReq.courseByFaculty,
        },
      });
      res.status(200).send({ message: "Meeting Scheduled Successfully!" });
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
