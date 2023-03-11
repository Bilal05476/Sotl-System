import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Notifications from "./Notifications";
import "../css/roleview.css";
import { FaPlus } from "react-icons/fa";
import { BiPhone, BiEnvelope } from "react-icons/bi";
import { IoFilterSharp } from "react-icons/io5";
import { AiOutlineSearch } from "react-icons/ai";
import { BsEmojiFrown } from "react-icons/bs";

const RolesView = ({ roleData, role, heading, btnText }) => {
  const [searchRole, setSearchRole] = useState("");
  const [data, setData] = useState();
  const [openFilter, setOpenFilter] = useState(false);

  useEffect(() => {
    async function fetchData() {}
    setData(roleData);
  }, []);

  const onSearchRole = () => {
    if (searchRole === "") {
      setData(roleData);
      console.log("Serach hi nahi kia kuch");
    } else {
      console.log("Serach kia kuch");
      const filteredRole = roleData.filter((item) =>
        item.username.includes(searchRole)
      );
      if (filteredRole.length === 0) {
        setData(`No Matching ${heading}`);
      } else {
        setData(filteredRole);
      }
    }
  };

  return (
    <div className="max-height col-md-10 role-view">
      <div className="row">
        <div className="col-md-8"></div>
        <Notifications col="4" rolerole="Admin" rolename="Dr. Fariha Hayat" />
        <div className="col-md-12 headers">
          <div className="left">
            <h4 className="heading">{heading}</h4>
            <NavLink className="link" to="/add-role">
              <FaPlus className="icon" />
              {btnText}
            </NavLink>
          </div>
          <div className="right">
            <input
              className="search-box"
              placeholder={`Search ${heading}`}
              type="text"
              value={searchRole}
              onChange={(e) => setSearchRole(e.target.value)}
            />
            <AiOutlineSearch
              onClick={onSearchRole}
              className="search-icon"
              size={25}
            />
            <button
              onClick={() => setOpenFilter(!openFilter)}
              className="role-filters"
            >
              <IoFilterSharp className="icon" size={22} />
              Filters
            </button>
          </div>
        </div>
        <div className={`col-md-12 filters-deck ${openFilter ? "open" : ""}`}>
          <>Hello Filters</>
        </div>
        <div className="col-md-12 role-view-deck">
          {typeof data === "string" ? (
            <h5 className="no-data">
              {data}...
              <BsEmojiFrown size={24} />
            </h5>
          ) : (
            <>
              {data.map((item) => (
                <RoleViewBox item={item} key={item.id} />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const RoleViewBox = ({ item }) => {
  return (
    <NavLink to="/role-details" className="roleviewbox">
      <img className="role-img" src={item.userimg} alt="" />
      <h4 className="heading">{item.username}</h4>
      <p className="role-details m-0">
        {item.designation} | {item.department}
      </p>
      <div className="contact">
        {[<BiPhone size={20} />, <BiEnvelope size={20} />].map((item) => (
          <span className="one">{item}</span>
        ))}
      </div>
    </NavLink>
  );
};

export default RolesView;
