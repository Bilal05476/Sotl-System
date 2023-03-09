import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../css/admin-view.css";
import { HiUserGroup } from "react-icons/hi";
import { ImUserTie } from "react-icons/im";
import { FaUserTie } from "react-icons/fa";
import Observations from "./Observations";
import UserDetails from "./UserDetails";
import BarChart from "./BarChart";
import Notifications from "./Notifications";
import DashColumn from "./DashColumn";
import { useStateValue } from "../StateProvider";
const AdminView = () => {
  const [obsFilter, setObsFilter] = useState("all");
  const [{ darkTheme }] = useStateValue();
  return (
    <div className="max-height col-md-10">
      <div className="row">
        <div className={`admin-view col-md-9 ${darkTheme && "dark"}`}>
          <div className="row">
            <UserDetails username={"Dr. Fariha"} />
            <DashColumn
              to="/faculties"
              column="column-1"
              heading="Faculties"
              icon={<HiUserGroup size={30} />}
              count="200"
            />
            <DashColumn
              to="/observers"
              column="column-2"
              heading="Obsevers"
              icon={<FaUserTie size={30} />}
              count="150"
            />
            <DashColumn
              to="/head-of-departments"
              column="column-3"
              heading="Head of Departments"
              icon={<ImUserTie size={30} />}
              count="100"
            />
            <DashColumn
              to="/campus-directors"
              column="column-4"
              heading="Campus Directors"
              icon={<ImUserTie size={30} />}
              count="5"
            />
            <div className="col-md-12">
              <BarChart />
            </div>
            <div className="col-md-12 observations-headers">
              <h3 className="heading">All Observations</h3>
              <select
                className="observation-filter"
                name="observation-filter"
                id="obs-filter"
                value={obsFilter}
                onChange={(e) => setObsFilter(e.target.value)}
              >
                <option value="all">All</option>
                <option value="completed">Completed</option>
                <option value="ongoing">Ongoing</option>
              </select>
            </div>
            <div className="col-md-12 observations-list">
              <Observations obsFilter={obsFilter} />
            </div>
          </div>
        </div>
        <div className={`col-md-3 admin-feed ${darkTheme && "dark"}`}>
          <div className="row">
            <Notifications
              col="12"
              rolename="Dr. Fariha Hayat"
              rolerole="Admin"
              roleimg="https://i.pinimg.com/564x/a6/58/32/a65832155622ac173337874f02b218fb--people-icon-avatar.jpg"
            />
            <div className="col-md-12 recent-roles">
              <h5 className="heading">Recent Roles</h5>
              <p className="mb-3">
                Your have <span>254</span> Members
              </p>
              <RoleBox />
              <RoleBox />
              <RoleBox />
              <RoleBox />
              <div className="view-more">
                <NavLink className="view" to="/">
                  View More
                </NavLink>
              </div>
            </div>
            <div className="col-md-12 todays-meeting">
              <h5 className="heading">Today's Meetings</h5>
              <MeetingBox />
              <MeetingBox />
              <MeetingBox />
              <MeetingBox />
              <div className="view-more">
                <NavLink className="view" to="/">
                  View More
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MeetingBox = ({
  faculty = "Ali",
  observer = "Ahmed",
  meetName = "Post Observation Meeting",
}) => {
  return (
    <div className="meet-box">
      <p className="meet-name">
        {faculty} via {observer}
      </p>
      <p className="role-desig">{meetName}</p>
    </div>
  );
};

const RoleBox = ({
  rolename = "Sheraz Ahmed",
  role = "Faculty",
  roledesignation = "Associate Instructor",
  roleimg = "https://i.pinimg.com/564x/a6/58/32/a65832155622ac173337874f02b218fb--people-icon-avatar.jpg",
}) => {
  return (
    <div className="role-box">
      <img className="role-img" src={roleimg} alt="" />
      <div className="role-text">
        <p className="role-name">{rolename}</p>
        <p className="role-desig">
          {roledesignation} | {role}
        </p>
      </div>
    </div>
  );
};

export default AdminView;
