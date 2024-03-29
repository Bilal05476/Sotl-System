import React, { Fragment, useState } from "react";
import { Tabs, TabList, TabPanel, Tab } from "react-tabs";
import { User } from "react-feather";
import { Loader } from "../common/Loader";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { useStateValue } from "../../StateProvider";
import { info, errors } from "../../constants/Toasters";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const BASEURL =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_DEV_URL
    : process.env.REACT_APP_PROD_URL;

const LoginTabset = () => {
  const navigate = useNavigate();

  const [loginState, setLoginState] = useState({
    email: "",
    password: "",
    loader: false,
  });
  const [{}, dispatch] = useStateValue();
  const { email, password, loader } = loginState;

  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  const handleSignin = () => {
    async function fetchData() {
      try {
        const res = await fetch(`${BASEURL}/auth/login`, {
          method: "POST",
          body: JSON.stringify({ email, password }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
        const data = await res.json();
        if (data.error) {
          setLoginState({ ...loginState, loader: false });
          errors(data.error);
        } else {
          dispatch({
            type: "SET_USER",
            payload: data,
          });
          setLoginState({
            ...loginState,
            email: "",
            password: "",
            loader: false,
          });
          localStorage.setItem("user", JSON.stringify(data));
          navigate("/");
        }
      } catch (error) {
        setLoginState({
          ...loginState,
          loader: false,
        });
        errors("Server not responding at that time!");
      }
    }
    if (!validateEmail(email)) {
      info("Enter Valid Email Address!");
    } else {
      setLoginState({ ...loginState, loader: true });
      fetchData();
    }
  };

  //   const clickActive = (event) => {
  //     document.querySelector(".nav-link").classList.remove("show");
  //     event.target.classList.add("show");
  //   };

  return (
    <div>
      <Fragment>
        <ToastContainer position="top-center" />
        <Tabs>
          <TabList className="nav nav-tabs tab-coupon">
            <Tab className="nav-link show">
              <User />
              Login
            </Tab>
            {/* <Tab className="nav-link" onClick={(e) => clickActive(e)}>
              <Unlock />
              Register
            </Tab> */}
          </TabList>

          <TabPanel>
            <Form className="form-horizontal auth-form">
              <FormGroup>
                <Input
                  required={true}
                  name="login[username]"
                  type="email"
                  className="form-control"
                  placeholder="Email Address (only @iqra.edu.pk)"
                  value={email}
                  onChange={(e) =>
                    setLoginState({ ...loginState, email: e.target.value })
                  }
                  id="exampleInputEmail1"
                />
              </FormGroup>
              <FormGroup style={{ position: "relative" }}>
                <Input
                  required={true}
                  name="login[password]"
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) =>
                    setLoginState({ ...loginState, password: e.target.value })
                  }
                />
              </FormGroup>
              {/* <div className="form-terms">
                <div className="custom-control custom-checkbox me-sm-2">
                  <Label className="d-block">
                    <Input
                      className="checkbox_animated"
                      id="chk-ani2"
                      type="checkbox"
                    />
                    Reminder Me{" "}
                    <span className="pull-right">
                      {" "}
                      <a href="/#" className="btn btn-default forgot-pass p-0">
                        lost your password
                      </a>
                    </span>
                  </Label>
                </div>
              </div> */}
              <div className="form-button">
                <Button
                  className="text-center 
                  d-flex align-items-center justify-content-center w-100"
                  color="primary"
                  style={{ cursor: loader && "progress", borderRadius: "10px" }}
                  onClick={() => handleSignin()}
                >
                  {loader ? <Loader /> : "Login"}
                </Button>
              </div>
              {/* <div className="form-footer">
                <span>Or Login up with social platforms</span>
                <ul className="social">
                  <li>
                    <a href="/#">
                      <i className="icon-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a href="/#">
                      <i className="icon-twitter-alt"></i>
                    </a>
                  </li>
                  <li>
                    <a href="/#">
                      <i className="icon-instagram"></i>
                    </a>
                  </li>
                  <li>
                    <a href="/#">
                      <i className="icon-pinterest-alt"></i>
                    </a>
                  </li>
                </ul>
              </div> */}
            </Form>
          </TabPanel>
        </Tabs>
      </Fragment>
    </div>
  );
};

export default LoginTabset;
