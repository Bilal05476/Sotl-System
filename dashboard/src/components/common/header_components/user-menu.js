import React, { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
//images import
import avatar from "../../../assets/images/dashboard/avatar.png";
import { useStateValue } from "../../../StateProvider";
import { info } from "../../../constants/Toasters";
import { User, UserPlus } from "react-feather";

const URL = process.env.PUBLIC_URL;

const UserMenu = () => {
  const navigate = useNavigate();
  const [{ user }, dispatch] = useStateValue();

  const onLogout = () => {
    navigate("/");
    info("Logging out...");
    setTimeout(() => {
      localStorage.clear();
      dispatch({
        type: "CLEAR_USER",
      });
    }, 2000);
  };
  return (
    <Fragment>
      <li className="onhover-dropdown">
        {/* <div className="media align-items-center"> */}
        {/* <img
            className="align-self-center pull-right img-50 rounded-circle blur-up lazyloaded"
            src={user?.avatar ? user.avatar : avatar}
            alt="header-user"
          /> */}
        {/* <User className="bg-dark" /> */}
        {/* <div className="dotted-animation">
            <span className="animate-circle"></span>
            <span className="main-circle"></span>
          </div> */}
        {/* </div> */}
        <User />

        <ul className="profile-dropdown onhover-show-div p-20 profile-dropdown-hover">
          <li>
            <Link to={`${URL}/settings/profile`}>
              <i data-feather="user"></i>Profile
            </Link>
          </li>
          {/* <li>
            <a href="#javaScript">
              <i data-feather="mail"></i>Inbox
            </a>
          </li> */}

          <li>
            <a onClick={() => onLogout()}>
              <i data-feather="log-out"></i>Logout
            </a>
          </li>
        </ul>
      </li>
    </Fragment>
  );
};

export default UserMenu;
