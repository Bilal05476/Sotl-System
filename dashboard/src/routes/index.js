import React, { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../components/auth/login";
import LayoutRoutes from "./LayoutRoutes";
import { useStateValue } from "../StateProvider";
const URL = process.env.PUBLIC_URL;

const Routers = () => {
  const [{ user }] = useStateValue();

  return (
    <Fragment>
      <Routes>
        {user ? (
          <Route path={`/*`} element={<LayoutRoutes />} />
        ) : (
          <Route exact path={`${URL}/*`} element={<Login />} />
        )}
      </Routes>
    </Fragment>
  );
};

export default Routers;
