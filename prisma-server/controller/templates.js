import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import asyncHandler from "express-async-handler";

// @desc   Add template questionaire
// @route  POST api/template/create
// @access Private (Role Like (Observer))
export const createTemplate = asyncHandler(async (req, res) => {
  const { steps, type } = req.body;

  const createTemplate = await prisma.templatePlan.create({
    data: {
      type,
      steps: {
        createMany: {
          data: steps,
        },
      },
    },
  });
  res.status(200).json(createTemplate);
});

// @desc   Get templates
// @route  POST api/template/
// @access
export const getTemplates = asyncHandler(async (req, res) => {
  const temaplates = await prisma.templatePlan.findMany({
    include: {
      steps: true,
    },
  });
  res.status(200).json(temaplates);
});

// @desc   Get templates
// @route  POST api/template/:id
// @access
export const getTemplate = asyncHandler(async (req, res) => {
  const temaplate = await prisma.templatePlan.findFirst({
    include: {
      steps: true,
    },
    where: {
      id: Number(req.params.id),
    },
  });
  res.status(200).json(temaplate);
});
