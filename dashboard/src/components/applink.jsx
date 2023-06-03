import { NavLink } from "react-router-dom";

const Applink = ({ to, backgroundColor, text }) => {
  return (
    <NavLink
      to={to}
      style={{
        backgroundColor: backgroundColor,
        outline: "none",
        boxShadow: "none",
        padding: "15px",
        border: "0",
        color: "#fff",
        borderRadius: "5px",
        marginRight: "1rem",
        fontWeight: "700",
        textDecoration: "none",
      }}
    >
      {text}
    </NavLink>
  );
};

export default Applink;
