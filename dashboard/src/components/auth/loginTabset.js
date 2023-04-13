import React, { Fragment, useState } from "react";
import { Tabs, TabList, TabPanel, Tab } from "react-tabs";
import { User, Loader } from "react-feather";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { useStateValue } from "../../StateProvider";

const LoginTabset = () => {
  const [loginState, setLoginState] = useState({
    email: "",
    password: "",
    alert: "",
    loader: false,
  });
  const [{}, dispatch] = useStateValue();
  const { email, password, alert, loader } = loginState;

  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  const handleSignin = () => {
    async function fetchData() {
      try {
        const res = await fetch("http://localhost:8080/api/login", {
          method: "POST",
          body: JSON.stringify({ email, password }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
        const data = await res.json();
        if (data.error) {
          setLoginState({ ...loginState, alert: data.error, loader: false });
        } else {
          dispatch({
            type: "SET_USER",
            payload: data,
          });
          setLoginState({
            ...loginState,
            alert: "",
            email: "",
            password: "",
            loader: false,
          });
          // console.log(data);
          localStorage.setItem("user", JSON.stringify(data));
        }
      } catch (error) {
        // console.log(error.message);
        setLoginState({
          ...loginState,
          alert: "Server not responding at that time!",
          loader: false,
        });
      }
    }
    if (!validateEmail(email)) {
      // console.log("Invalid");
      setLoginState({ ...loginState, alert: "Enter Valid Email Address" });
    } else {
      // console.log("Success");
      setLoginState({ ...loginState, alert: "", loader: true });
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
              {alert && (
                <FormGroup>
                  <span
                    style={{
                      background: "pink",
                      color: "crimson",
                      padding: "0.5rem 1rem",
                      borderRadius: "20px",
                    }}
                  >
                    {alert}
                  </span>
                </FormGroup>
              )}
              <FormGroup>
                <Input
                  required={true}
                  name="login[username]"
                  type="email"
                  className="form-control"
                  placeholder="Username"
                  value={email}
                  onChange={(e) =>
                    setLoginState({ ...loginState, email: e.target.value })
                  }
                  id="exampleInputEmail1"
                />
              </FormGroup>
              <FormGroup>
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
                  className="d-flex align-items-center"
                  color="primary"
                  style={{ cursor: loader && "progress" }}
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
