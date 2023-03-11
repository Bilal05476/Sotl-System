import { BsFillMoonFill, BsSunFill } from "react-icons/bs";
import { GrUserAdmin } from "react-icons/gr";
import { useStateValue } from "../StateProvider";

const UserDetails = ({ username }) => {
  const [{ darkTheme }, dispatch] = useStateValue();
  const toggleTheme = () => {
    // dispatch({
    //   type: "TOGGLE_THEME",
    // });
  };
  return (
    <div className="col-md-12 flex items-center justify-between rounded shadow-sm shadow-gray-100 mb-5 p-3">
      <div className="flex items-center">
        <GrUserAdmin className="m-2 admin-icon" size={40} />
        <h3 className="text-2xl leading-6">
          Good Morning,<span className="font-semibold"> {username}</span>
          <br />
          <span className="font-light text-sm">Have a nice day at work</span>
        </h3>
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
