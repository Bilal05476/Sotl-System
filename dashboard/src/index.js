import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.scss";
import Routers from "./routes";
import PerfectScrollbar from "react-perfect-scrollbar";
import { StateProvider } from "./StateProvider";

import reducer, { initialState } from "./reducer";
const Root = () => {
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <BrowserRouter basename={"/"}>
        <PerfectScrollbar>
          <Routers />
        </PerfectScrollbar>
      </BrowserRouter>
    </StateProvider>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

// content: "";
//       position: absolute;
//       top: 0;
//       left: 0;
//       width: 100%;
//       height: 100%;
//       background-image: url("../../images/dashboard/login-bg2.png");
//       background-position: center;
//       opacity: 0.2;
