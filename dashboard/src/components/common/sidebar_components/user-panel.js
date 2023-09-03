import React from "react";
import avatar from "../../../assets/images/dashboard/avatar.png";
import { useStateValue } from "../../../StateProvider";

const UserPanel = () => {
  const [{ user }] = useStateValue();
  return (
    <div>
      <div className="sidebar-user text-center">
        <div>
          <img
            className="img-60 rounded-circle lazyloaded blur-up"
            src={user?.avatar ? user.avatar : avatar}
            alt="#"
          />
        </div>
        <h5 className="mt-3 f-14">{user.name}</h5>
        <p>{user.role?.replaceAll("_", " ")}</p>
        <p>{user.department?.name}</p>
        <p>Fest</p>
      </div>
    </div>
  );
};

export default UserPanel;
