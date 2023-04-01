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
        <h6 className="mt-3 f-14">{user.name}</h6>
        <p>{user.role.replaceAll("_", " ")}</p>
      </div>
    </div>
  );
};

export default UserPanel;
