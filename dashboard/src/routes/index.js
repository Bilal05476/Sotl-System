import React, { Fragment, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../components/auth/login";
import LayoutRoutes from "./LayoutRoutes";
import { useStateValue } from "../StateProvider";

const Routers = () => {
  const [{ user, courses }, dispatch] = useStateValue();
  const getAllUsers = async () => {
    const res = await fetch("http://localhost:8080/api/users", {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const data = await res.json();
    dispatch({
      type: "SET_USERS",
      payload: data,
    });
  };
  const getAllObs = async () => {
    const res = await fetch("http://localhost:8080/api/observations", {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const data = await res.json();
    dispatch({
      type: "SET_OBS",
      payload: data,
    });
  };
  const getAllCourses = async () => {
    const res = await fetch("http://localhost:8080/api/courses", {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const data = await res.json();
    dispatch({
      type: "SET_COURSES",
      payload: data,
    });
  };
  useEffect(() => {
    getAllUsers();
    getAllObs();
    getAllCourses();
  }, []);
  return (
    <Fragment>
      <Routes>
        {user ? (
          <Route path={`/*`} element={<LayoutRoutes />} />
        ) : (
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/`}
            element={<Login />}
          />
        )}
      </Routes>
    </Fragment>
  );
};

export default Routers;
