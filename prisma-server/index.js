import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

// for socket.io
// import { createServer } from "http";
// import { Server } from "socket.io";
// const httpServer = createServer(app);
// const io = new Server(httpServer, {
//   cors: ["http://localhost:3000", "https://sotlsystem.tech"],
// });

const app = express();
app.use(cors());

const port = process.env.PORT || 8080;
dotenv.config();

app.use(
  bodyParser.json({
    limit: "250mb",
  })
);

app.use(
  bodyParser.urlencoded({
    limit: "250mb",
    parameterLimit: 100000,
    extended: true,
  })
);

// login, create role
import authRoutes from "./routes/auth.js";
app.use("/api/auth", authRoutes);

// users
import userRoutes from "./routes/user.js";
app.use("/api/user", userRoutes);

// observation and meetings
import obsRoutes from "./routes/observation.js";
app.use("/api/observation", obsRoutes);

// courses
import courseRoutes from "./routes/course.js";
app.use("/api/course", courseRoutes);

// utility
import utilityRoutes from "./routes/utility.js";
import sampleUsers from "./data.js";
app.use("/api", utilityRoutes);

app.use("/", (req, res) => {
  res.status(200).json({
    message: `Server Running!`,
  });
});

// for socket.io
// io.on("connection", (socket) => {
//   console.log(`Client Connected ${socket.id}`);
//   socket.on("send", (data) => {
//     console.log(data);
//     socket.broadcast.emit("receive", data);
//   });
// });

app.listen(port, () => {
  console.log(`Server Running at port: ${port}`);
});

// for socket.io
// httpServer.listen(port, () => {
//   console.log(`Server Running at port: ${port}`);
// });

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  [
    { id: 41, createdAt: "2023-09-08T04:09:52.721Z" },
    { id: 42, createdAt: "2023-07-08T04:09:52.721Z" },
    { id: 43, createdAt: "2023-08-08T04:09:52.721Z" },
  ].map(
    async (item) =>
      await prisma.observations.update({
        where: {
          id: item.id,
        },
        data: {
          createdAt: item.createdAt,
          semester: "Spring",
        },
      })
  );

  // console.log(await prisma.user.deleteMany({}));
}
main();
// console.log(sampleUsers());
// const obj = {
//   field1: "value1",
//   field2: "value2",
//   field3: "value3",
// };

// // To exclude 'field2' from the object
// delete obj.field2;
// console.log(obj);
// let templateSteps = await findTemplate("Re");
// console.log(templateSteps);
// let str =
//   "Hello {{name}}, hope you are doing well. {{name}} is your email: {{email}}";
// console.log(
//   str
//     .replaceAll("{{name}}", "Bilal")
//     .replaceAll("{{email}}", "bilal@iqra.edu.pk")
// );

// function hello() {
//   let arr = [1];
//   const obj = [
//     { id: 1, sc: 2 },
//     { id: 2, sc: 2 },
//   ];
//   return obj.map((item) => item.id);
// }
// console.log(hello());
// "rubricsFinal": [
//     {"rid": 3340, "score": 4},
//     {"rid": 4032, "score": 4},
//     {"rid": 2320, "score": 4},
//     {"rid": 430, "score": 4},
//     {"rid": 23320, "score": 4},
//     {"rid": 3230, "score": 4},
//     {"rid": 23320, "score": 4},
//     {"rid": 2320, "score": 4},
//     {"rid": 3230, "score": 4},
//     {"rid": 23230, "score": 4},
//     {"rid": 1132, "score": 4},
//     {"rid": 132322, "score": 4},
//     {"rid": 1323, "score": 4},
//     {"rid": 132324, "score": 4},
//     {"rid": 132325, "score": 4},
//     {"rid": 1326, "score": 4},
//     {"rid": 123237, "score": 4},
//     {"rid": 132328, "score": 4},
//     {"rid": 13239, "score": 4},
//     {"rid": 23230, "score": 4}
//   ],
//   "facultyScore": 80,
//   "observerScore": 80
