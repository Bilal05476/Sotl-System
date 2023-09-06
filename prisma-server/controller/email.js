import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import asyncHandler from "express-async-handler";

// @desc   Update email template
// @route  PUT api/email/:type
// @access Private (Role Like (HOD, Super Admin))
export const EmailTemplate = asyncHandler(async (req, res) => {
  const { id, email } = req.body;
  await prisma.emailTemplate.update({
    where: {
      id,
    },
    data: {
      email,
    },
  });

  const getEmailTemplate = await prisma.emailTemplate.findFirst({
    where: {
      type: req.params.type,
    },
  });
  res.status(200).json(getEmailTemplate);
});

// @desc   Fetch email template
// @route  GET api/email/:type
// @access Private (Role Like (HOD, Super Admin))
export const GetEmailTemplate = asyncHandler(async (req, res) => {
  const findTemplate = await prisma.emailTemplate.findFirst({
    where: {
      type: req.params.type,
    },
  });
  if (findTemplate) {
    res.status(200).json(findTemplate);
  } else {
    res.status(404).json({ error: "Email Template not found!" });
  }
});
