import React from "react";
import { NavLink } from "react-router-dom";
import "../css/dash-column.css";
import { useStateValue } from "../StateProvider";

const DashColumn = ({ column, to, icon, heading, count, col }) => {
  const [{ darkTheme }] = useStateValue();
  return (
    <NavLink
      to={to}
      className={`col-md-${col ? col : "3"} column ${column} ${
        darkTheme && "dark"
      }`}
    >
      <div className="icon">
        <span>{icon}</span>
      </div>
      <div className="content">
        <h5 className="heading">{heading}</h5>
        <h4 className="heading c">{count}</h4>
      </div>
    </NavLink>
  );
};

export default DashColumn;
