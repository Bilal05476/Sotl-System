import React from "react";
import man from "../../../assets/images/dashboard/man.png";
import { useStateValue } from "../../../StateProvider";

const UserPanel = () => {
  const [{ user }] = useStateValue();
  return (
    <div>
      <div className="sidebar-user text-center">
        <div>
          <img
            className="img-60 rounded-circle lazyloaded blur-up"
            src={man}
            alt="#"
          />
        </div>
        <h6 className="mt-3 f-14">{user.name}</h6>
        <p>{user.role.replaceAll("_", " ")}</p>
      </div>
    </div>
  );
};

export default UserPanel;
