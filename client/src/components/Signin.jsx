import "../css/signin.css";
import { useStateValue } from "../StateProvider";
import { BsSunFill, BsFillMoonFill } from "react-icons/bs";
import { useState } from "react";
const Signin = () => {
  const [{ darkTheme }, dispatch] = useStateValue();
  const [loginVisible, setLoginVisible] = useState(false);
  const [alert, setAlert] = useState("");
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const { email, password } = state;

  setTimeout(() => {
    setLoginVisible(true);
  }, 1000);

  const handleSignin = () => {
    console.log(email, password);
    async function fetchData() {
      const res = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const data = await res.json();
      console.log(data);
      if (data.error) {
        setAlert(data.error);
      } else {
        dispatch({
          type: "SET_USER",
          payload: data,
        });
      }
    }
    fetchData();
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
        <input
          className="role-select"
          type="email"
          value={email}
          onChange={(e) =>
            setState({
              ...state,
              email: e.target.value,
            })
          }
          placeholder="Enter Email"
        />
        <input
          className="role-select"
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) =>
            setState({
              ...state,
              password: e.target.value,
            })
          }
        />

        <button className="btn" onClick={() => handleSignin()}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Signin;
