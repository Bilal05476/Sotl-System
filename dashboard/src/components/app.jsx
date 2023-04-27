import React from "react";
import Sidebar from "./common/sidebar_components/sidebar";
import RightSidebar from "./common/right-sidebar";
import Footer from "./common/footer";
import Header from "./common/header_components/header";
import { Outlet } from "react-router-dom";
import Logout from "./Logout";
import { useStateValue } from "../StateProvider";

const App = () => {
  const [{ logoutState }] = useStateValue();
  return (
    <div>
      {!logoutState ? (
        <div className="page-wrapper">
          <Header />
          <div className="page-body-wrapper">
            <Sidebar />
            <RightSidebar />
            <div className="page-body">
              <Outlet />
            </div>
            <Footer />
          </div>
        </div>
      ) : (
        <Logout />
      )}
    </div>
  );
};
export default App;
