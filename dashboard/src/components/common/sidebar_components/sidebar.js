import React, { Fragment, useEffect, useState } from "react";
import UserPanel from "./user-panel";
import { Link } from "react-router-dom";
import {
  FACULTYMENU,
  HODMENU,
  MENUITEMS,
  OBSERVERMENU,
} from "../../../constants/menu";

// image import
import logo from "../../../assets/images/sotllogo-white.png";
import logo2 from "../../../assets/images/white-version.png";
import { useStateValue } from "../../../StateProvider";
import { Settings } from "react-feather";

const URL = process.env.PUBLIC_URL;

const Sidebar = () => {
  const [{ user }] = useStateValue();
  const [mainmenu, setMainMenu] = useState(
    user.role === "Observer"
      ? OBSERVERMENU
      : user.role === "Head_of_Department"
      ? HODMENU
      : user.role === "Faculty"
      ? FACULTYMENU
      : MENUITEMS
  );
  const [isChange, setIsChange] = useState(false);

  useEffect(() => {
    const currentUrl = window.location.pathname;
    mainmenu.map((items) => {
      mainMenu.filter((Items) => {
        if (Items.path === currentUrl) setNavActive(Items);
        if (!Items.children) return false;
        Items.children.filter((subItems) => {
          if (subItems.path === currentUrl) setNavActive(subItems);
          if (!subItems.children) return false;
          subItems.children.filter((subSubItems) => {
            if (subSubItems.path === currentUrl) {
              setNavActive(subSubItems);
              return true;
            } else {
              return false;
            }
          });
          return subItems;
        });
        return Items;
      });
      return items;
    });
    return () => {
      setMainMenu(
        user.role === "Observer"
          ? OBSERVERMENU
          : user.role === "Head_of_Department"
          ? HODMENU
          : user.role === "Faculty"
          ? FACULTYMENU
          : MENUITEMS
      );
    };
  }, [isChange]);

  const setNavActive = (item) => {
    setIsChange(!isChange);
    mainmenu.filter((menuItem) => {
      if (menuItem !== item) menuItem.active = false;
      if (menuItem.children && menuItem.children.includes(item))
        menuItem.active = true;
      if (menuItem.children) {
        menuItem.children.filter((submenuItems) => {
          if (submenuItems !== item) {
            submenuItems.active = false;
          }
          if (submenuItems.children) {
            submenuItems.children.map(
              (childItem) => (childItem.active = false)
            );
            if (submenuItems.children.includes(item)) {
              submenuItems.active = true;
              menuItem.active = true;
            }
          }
          return false;
        });
      }
      return false;
    });
    item.active = !item.active;
    setMainMenu(
      user.role === "Observer"
        ? OBSERVERMENU
        : user.role === "Head_of_Department"
        ? HODMENU
        : user.role === "Faculty"
        ? FACULTYMENU
        : MENUITEMS
    );
  };

  const mainMenu = mainmenu.map((menuItem, i) => (
    <li className={`${menuItem.active ? "active" : ""}`} key={i}>
      {/* {menuItem.sidebartitle ? (
        // <div className="sidebar-title">{menuItem.sidebartitle}</div>
        <></>
      ) : (
        ""
      )} */}
      {menuItem.type === "sub" ? (
        <a
          className={`sidebar-header ${menuItem.active ? "active" : ""}`}
          href="#javaScript"
          onClick={(event) => {
            event.preventDefault();
            return setNavActive(menuItem);
          }}
        >
          <menuItem.icon />
          <span>{menuItem.title}</span>
          <i className="fa fa-angle-right pull-right"></i>
        </a>
      ) : (
        ""
      )}
      {menuItem.type === "link" ? (
        <Link
          to={`${URL}${menuItem.path}`}
          className={`sidebar-header ${menuItem.active ? "active" : ""}`}
          onClick={() => setNavActive(menuItem)}
        >
          <menuItem.icon />
          <span>{menuItem.title}</span>
          {menuItem.children ? (
            <i className="fa fa-angle-right pull-right"></i>
          ) : (
            ""
          )}
        </Link>
      ) : (
        ""
      )}
      {menuItem.children ? (
        <ul
          className={`sidebar-submenu ${menuItem.active ? "menu-open" : ""}`}
          style={
            menuItem.active
              ? { opacity: 1, transition: "opacity 500ms ease-in" }
              : {}
          }
        >
          {menuItem.children.map((childrenItem, index) => (
            <li
              key={index}
              className={
                childrenItem.children
                  ? childrenItem.active
                    ? "active"
                    : ""
                  : ""
              }
            >
              {childrenItem.type === "sub" ? (
                <a
                  href="#javaScript"
                  onClick={(event) => {
                    event.preventDefault();
                    return setNavActive(childrenItem);
                  }}
                >
                  <i className="fa fa-circle"></i>
                  {childrenItem.title}{" "}
                  <i className="fa fa-angle-right pull-right"></i>
                </a>
              ) : (
                ""
              )}

              {childrenItem.type === "link" ? (
                <Link
                  to={`${URL}${childrenItem.path}`}
                  className={childrenItem.active ? "active" : ""}
                  onClick={() => setNavActive(childrenItem)}
                >
                  <i className="fa fa-circle"></i>
                  {childrenItem.title}{" "}
                </Link>
              ) : (
                ""
              )}
              {childrenItem.children ? (
                <ul
                  className={`sidebar-submenu ${
                    childrenItem.active ? "menu-open" : "active"
                  }`}
                >
                  {childrenItem.children.map((childrenSubItem, key) => (
                    <li
                      className={childrenSubItem.active ? "active" : ""}
                      key={key}
                    >
                      {childrenSubItem.type === "link" ? (
                        <Link
                          to={`${URL}${childrenSubItem.path}`}
                          className={childrenSubItem.active ? "active" : ""}
                          onClick={() => setNavActive(childrenSubItem)}
                        >
                          <i className="fa fa-circle"></i>
                          {childrenSubItem.title}
                        </Link>
                      ) : (
                        ""
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                ""
              )}
            </li>
          ))}
        </ul>
      ) : (
        ""
      )}
    </li>
  ));

  return (
    <Fragment>
      <div className="page-sidebar">
        <div className="main-header-left d-none d-lg-block">
          <div className="logo-wrapper">
            <Link to={`${URL}/dashboard`}>
              <img
                className="blur-up lazyloaded img-fluid mt-2"
                src={logo2}
                alt="sotl system"
                style={{
                  width: "30%",
                  display: "block",
                  margin: "1px auto",
                }}
              />
              <img
                className="blur-up lazyloaded img-fluid my-2"
                src={logo}
                alt="sotl system"
                style={{
                  width: "70%",
                  display: "block",
                  margin: "1px auto",
                }}
              />
            </Link>
          </div>
        </div>

        <div className="sidebar custom-scrollbar">
          <UserPanel />
          <ul className="sidebar-menu">{mainMenu}</ul>
        </div>
      </div>
    </Fragment>
  );
};

export default Sidebar;
