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
    campus: "Main Campus",
    role: "Campus Directors",
  },
  {
    id: "2",
    avtar: <img alt="" src={user3} style={{ width: 50, height: 50 }} />,
    f_name: "Alonzo",
    email: "Perez.Alonzo@gmail.com",
    campus: "North",
    role: "Head of Department",
  },
  {
    id: "3",
    avtar: <img alt="" src={user1} style={{ width: 50, height: 50 }} />,
    f_name: "Skylar",
    email: "Lane.Skylar@gmail.com",
    campus: "Airport",
    role: "Faculty",
  },
];
export default data;
