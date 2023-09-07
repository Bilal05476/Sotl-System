import nodemailer from "nodemailer";

// smtp email transporter
var transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.USER,
    pass: process.env.PASSWORD,
  },
});

export async function emailSender(emailString, subject, receiverEmail) {
  const info = await transporter.sendMail({
    from: '"SOTL System " <info@sotlsystem.tech>', // sender address
    to: receiverEmail, // list of receivers
    subject,
    text: emailString, // plain text body
    html: emailString, // html body
  });
  console.log("Message sent: %s", info.messageId);
}
