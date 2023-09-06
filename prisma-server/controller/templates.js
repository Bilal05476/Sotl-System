import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import asyncHandler from "express-async-handler";

// @desc   Update template questionaire
// @route  PUT api/template/:type
// @access Private (Role Like (HOD, Super Admin))
export const updateTemplate = asyncHandler(async (req, res) => {
  const { id, field, name } = req.body;
  // My overall perception of today’s class in ONE word:
  await prisma.systemTemplatePlanStep.update({
    where: {
      id,
    },
    data: {
      field,
      name,
    },
  });
  const getUpdatedTemplate = await prisma.systemTemplatePlan.findFirst({
    where: {
      type: req.params.type,
    },
    include: {
      steps: true,
    },
  });
  res.status(200).json(getUpdatedTemplate);
});

// @desc   Get templates
// @route  GET api/template/:type
// @access
export const getTemplate = asyncHandler(async (req, res) => {
  const template = await prisma.systemTemplatePlan.findFirst({
    where: {
      type: req.params.type,
    },
    include: {
      steps: true,
    },
  });
  res.status(200).json(template);
});
