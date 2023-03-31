import React from "react";
import user5 from "../images/dashboard/user5.jpg";
import user3 from "../images/dashboard/user3.jpg";
import user1 from "../images/dashboard/user1.jpg";
import boy2 from "../images/dashboard/boy-2.png";
import designer from "../images/dashboard/designer.jpg";
import user from "../images/dashboard/user.png";

export const data = [
  {
    id: "1",
    avtar: <img alt="" src={user5} style={{ width: 50, height: 50 }} />,
    f_name: "Rowan",

    email: "Rowan.torres@gmail.com",
    last_login: "6 Days ago",
    role: "Customer",
  },
  {
    id: "2",
    avtar: <img alt="" src={user3} style={{ width: 50, height: 50 }} />,
    f_name: "Alonzo",

    email: "Perez.Alonzo@gmail.com",
    last_login: "2 Days ago",
    role: "Customer",
  },
  {
    id: "3",
    avtar: <img alt="" src={user1} style={{ width: 50, height: 50 }} />,
    f_name: "Skylar",
    email: "Lane.Skylar@gmail.com",
    last_login: "1 Days ago",
    role: "Customer",
  },
  {
    id: "4",
    avtar: <img alt="" src={boy2} style={{ width: 50, height: 50 }} />,
    f_name: "Brody",
    email: "Gray.Brody@gmail.com",
    last_login: "3 Days ago",
    role: "Admin",
  },
  {
    id: "5",
    avtar: <img alt="" src={designer} style={{ width: 50, height: 50 }} />,
    f_name: "Colton",
    email: "Colton.Clay@gmail.com",
    last_login: "1 Days ago",
    role: "Customer",
  },
  {
    id: "6",
    avtar: <img alt="" src={user} style={{ width: 50, height: 50 }} />,
    f_name: "Maxine",

    email: "woters.maxine@gmail.com",
    last_login: "10 Days ago",
    role: "Customer",
  },
  {
    id: "7",
    avtar: <img alt="" src={user3} style={{ width: 50, height: 50 }} />,
    f_name: "Alonzo",

    email: "Perez.Alonzo@gmail.com",
    last_login: "2 Days ago",
    role: "Customer",
  },
];
export default data;
