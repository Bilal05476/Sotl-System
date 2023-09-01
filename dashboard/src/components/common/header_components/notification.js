import React, { Fragment, useEffect, useState } from "react";
import { ShoppingBag, Download, AlertCircle } from "react-feather";
import { Media } from "reactstrap";
import { NavLink } from "react-router-dom";
import { useStateValue } from "../../../StateProvider";
import { completeColor2 } from "../../colors";

const Notification = () => {
  const [{ notifications }, dispatch] = useStateValue();
  const [unopened, setupoened] = useState(0);
  const [show, setshow] = useState("unread");

  useEffect(() => {
    const unopen = () => {
      let count = 0;
      notifications.filter((item) => {
        if (!item.open) count += 1;
      });
      return count;
    };
    setupoened(unopen());
  });

  const handleOpen = (id) => {
    dispatch({
      type: "OPEN_NOTIFICATION",
      payload: id,
    });
  };

  return (
    <Fragment>
      <ul className="notification-dropdown onhover-show-div p-0">
        <li>
          Notification{" "}
          <span
            className="badge rounded badge-primary pull-right p-2"
            style={{
              backgroundColor: show === "all" && completeColor2,
              cursor: "pointer",
            }}
            onClick={() => setshow("all")}
            title="all"
          >
            all ({notifications.length})
          </span>
          <span
            className="badge rounded badge-primary pull-right p-2 mx-1"
            onClick={() => setshow("unread")}
            style={{
              backgroundColor: show === "unread" && completeColor2,
              cursor: "pointer",
            }}
            title="unread"
          >
            unread ({unopened})
          </span>
        </li>
        {notifications.map((item) => {
          if (show === "unread" && !item.open)
            return (
              <li
                onClick={() => handleOpen(item?.id)}
                kye={item}
                className={!item.open && "unopen"}
              >
                <NavLink to={item.route}>
                  <Media>
                    <Media body>
                      <h6 className="mt-0">
                        <span>
                          <AlertCircle />
                        </span>
                        {item.title}
                      </h6>
                      <p className="mb-0">{item.message}</p>
                    </Media>
                  </Media>
                </NavLink>
              </li>
            );
          if (show === "all")
            return (
              <li
                onClick={() => handleOpen(item?.id)}
                kye={item}
                className={!item.open && "unopen"}
              >
                <NavLink to={item.route}>
                  <Media>
                    <Media body>
                      <h6 className="mt-0">
                        <span>
                          <AlertCircle />
                        </span>
                        {item.title}
                      </h6>
                      <p className="mb-0">{item.message}</p>
                    </Media>
                  </Media>
                </NavLink>
              </li>
            );
        })}
      </ul>
    </Fragment>
  );
};

export default Notification;
