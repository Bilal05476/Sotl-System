import { NavLink } from "react-router-dom";
import "../css/sidebar.css";
import { useLocation } from "react-router-dom";

const Sidebar = ({ menus }) => {
  const params = useLocation();
  const { pathname } = params;

  return (
    <div className="col-md-2 sidebar">
      <div className="menu-bar">
        <div className="img-fluid mb-4">
          <img src="/assets/img/white-version.png" />
        </div>
        {menus.map((item) => (
          <NavLink
            className={`link ${pathname === item.to ? "active" : ""}`}
            key={item.name}
            to={item.to}
          >
            {item.icon}
            <p className="m-0">{item.name}</p>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
