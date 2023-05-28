import React, { Fragment } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Login from "../components/auth/login";
import LayoutRoutes from "./LayoutRoutes";
import { useStateValue } from "../StateProvider";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const URL = process.env.PUBLIC_URL;

const Routers = () => {
  const [{ user }] = useStateValue();

  return (
    <Fragment>
      <AnimatedRoutes>
        {user ? (
          <Route path={`/*`} element={<LayoutRoutes />} />
        ) : (
          <Route exact path={`${URL}/*`} element={<Login />} />
        )}
      </AnimatedRoutes>
    </Fragment>
  );
};

const AnimatedRoutes = ({ children }) => {
  const location = useLocation();
  return (
    <TransitionGroup>
      <CSSTransition key={location.key} classNames="fade" timeout={300}>
        <Routes location={location}>{children}</Routes>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default Routers;
