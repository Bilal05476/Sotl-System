import "../css/signin.css";
import { useStateValue } from "../StateProvider";
import { BsSunFill, BsFillMoonFill } from "react-icons/bs";
import { useState } from "react";
const Signin = ({ role, setRole }) => {
  const [{ darkTheme }, dispatch] = useStateValue();
  const [loginVisible, setLoginVisible] = useState(false);
  const [alert, setAlert] = useState(null);

  setTimeout(() => {
    setLoginVisible(true);
  }, 1000);
  const options = [
    {
      label: "Select",
      value: "select",
    },
    {
      label: "Admin",
      value: "admin",
    },
    {
      label: "Faculty",
      value: "faculty",
    },
    {
      label: "Observer",
      value: "observer",
    },
  ];
  const handleSignin = () => {
    if (role !== "select") {
      setAlert("");
      dispatch({
        type: "SET_USER",
      });
    } else {
      setAlert("Please select your role!");
    }
  };
  const toggleTheme = () => {
    dispatch({
      type: "TOGGLE_THEME",
    });
  };
  return (
    <div className={`signin ${darkTheme && "dark"}`}>
      <div className={`logo-desc ${loginVisible && "visible"}`}>
        <img src="/assets/img/white-version.png" alt="IU-logo" />
        <p className="m-0 text-center mt-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
          libero voluptatum dolor cumque deleniti reiciendis nisi quae odit,
          eveniet animi. Natus exercitationem animi asperiores, temporibus ut
          eos eum dicta id.
        </p>
      </div>
      <div className={`wrapper ${loginVisible && "visible"}`}>
        <span className="toggle-btn" onClick={() => toggleTheme()}>
          {darkTheme ? (
            <BsSunFill size={28} color="var(--dashBg--)" />
          ) : (
            <BsFillMoonFill size={28} color="var(--baseC--)" />
          )}
        </span>
        <h3 className="heading">Login</h3>
        <input
          type="text"
          readOnly
          value={alert}
          className={`role-select alert ${alert && "show"}`}
        />
        <input className="role-select" type="email" placeholder="Enter Email" />
        <input
          className="role-select"
          type="password"
          placeholder="Enter Password"
        />
        <select
          id="role"
          name="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="role-select round"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <button className="btn" onClick={() => handleSignin()}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Signin;
