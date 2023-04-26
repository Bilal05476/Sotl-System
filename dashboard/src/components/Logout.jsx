import React from "react";
import { Loader } from "react-feather";
const Logout = () => {
  return (
    <div
      style={{ paddingTop: "20rem" }}
      className="d-flex align-items-center justify-content-center "
    >
      <Loader size={40} />
    </div>
  );
};

export default Logout;
