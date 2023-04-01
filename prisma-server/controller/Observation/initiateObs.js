import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import asyncHandler from "express-async-handler";
import nodemailer from "nodemailer";

// @desc   Initiate Observation by Head of department
// @route  POST api/initiate-obs
// @access Private (only hod will initiate)
export const initateObs = asyncHandler(async (req, res) => {
  const { facultyId, observerId, hodId } = req.body;

  const newObservation = await prisma.observations.create({
    data: {
      facultyId,
      observerId,
      hodId,
      coursesId: "123",
    },
  });
  if (newObservation) {
    // res.status(200).send(newObservation);
    let obsUsers = [facultyId, observerId, hodId];
    let toSendMail = [];
    for (let i = 0; i < obsUsers.length; i++) {
      const findemail = await prisma.user.findMany({
        where: {
          id: obsUsers[i],
        },
      });
      toSendMail.push(findemail[0].email);
    }
    let testAccount = await nodemailer.createTestAcount();
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
      },
    });
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: `"Fred Foo 👻" <${testAccount.user}>`, // sender address
      to: "bilal.48480@iqra.edu.pk", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    });
    console.log("Message sent: %s", info.messageId);
    res.status(200).send(toSendMail);
  }
});
