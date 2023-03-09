import { BsFillMoonFill, BsSunFill } from "react-icons/bs";
import { GrUserAdmin } from "react-icons/gr";
import { useStateValue } from "../StateProvider";

const UserDetails = ({ username }) => {
  const [{ darkTheme }, dispatch] = useStateValue();
  const toggleTheme = () => {
    dispatch({
      type: "TOGGLE_THEME",
    });
  };
  return (
    <div className="col-md-12 admin-detail">
      <div className="admin-text">
        <h3 className="heading admin-name">
          <GrUserAdmin className="m-2 admin-icon" size={40} />
          Good Morning,<span> {username}</span>
        </h3>
        <h5 className="heading greeting">Have a nice day at work</h5>
      </div>
      <span className="toggle-btn" onClick={() => toggleTheme()}>
        {darkTheme ? (
          <BsSunFill size={28} color="var(--dashBg--)" />
        ) : (
          <BsFillMoonFill size={28} color="var(--baseC--)" />
        )}
      </span>
    </div>
  );
};

export default UserDetails;
