import { useState } from "react";
import { NavLink } from "react-router-dom";

export const Applink = ({ to, backgroundColor, text }) => {
  const [isHovered, setisHovered] = useState(false);
  return (
    <NavLink
      to={to}
      style={{
        backgroundColor: backgroundColor,
        outline: "none",
        boxShadow: isHovered ? "0.1rem 0.1rem 0.1rem #1e1e1e54" : "none",
        padding: "15px",
        border: "0",
        color: "#fff",
        borderRadius: "5px",
        marginRight: "1rem",
        fontWeight: "700",
        textDecoration: "none",
      }}
      onMouseEnter={() => setisHovered(true)}
      onMouseLeave={() => setisHovered(false)}
    >
      {text}
    </NavLink>
  );
};

export const AccordButton = ({ backgroundColor, text, onClick, loader }) => {
  const [isHovered, setisHovered] = useState(false);
  return (
    <button
      style={{
        backgroundColor: backgroundColor,
        outline: "none",
        boxShadow: isHovered ? "0.1rem 0.1rem 0.1rem #1e1e1e54" : "none",
        padding: "15px",
        marginLeft: "0.4rem",
        border: "0",
        color: "#fff",
        borderRadius: "5px",
        fontWeight: "700",
        cursor: loader ? "progress" : "pointer",
      }}
      disabled={loader}
      onClick={onClick}
      onMouseEnter={() => setisHovered(true)}
      onMouseLeave={() => setisHovered(false)}
    >
      {text}
    </button>
  );
};
