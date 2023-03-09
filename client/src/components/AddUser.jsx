import { useState } from "react";
import "../css/adduser.css";
import Notifications from "./Notifications";
const AddUser = () => {
  const [userState, setUserState] = useState({
    role: null,
    dept: null,
    branch: null,
  });
  const { role, dept, branch } = userState;
  const rolename = "Faculty";
  return (
    <div className="col-md-10 max-height add-user column">
      <div className="row">
        <div className="col-md-9 p-0 pt-4">
          <h3 className="heading">Add New {rolename}</h3>
        </div>
        <Notifications col="3" />
        <FieldHeader heading="Personal Details" />
        <div className="col-md-12 field-deck">
          <input className="fields" type="text" placeholder="First name" />
          <input className="fields" type="text" placeholder="Last name" />
          <input className="fields" type="email" placeholder="Email" />
          <input className="fields" type="number" placeholder="Phone" />
          <input className="fields" type="text" placeholder="Date of Birth" />
          <input className="fields" type="text" placeholder="Place of Birth" />
          <input className="fields" type="file" />
          <textarea
            className="fields"
            type="text"
            rows="4"
            placeholder="Address"
          />
          {/* <span
            title="Enter email here will be unique, and create email automatically in your database."
            className="email-detail"
          >
            ?
          </span> */}
        </div>
        <FieldHeader heading="Education Details" />
        <div className="col-md-12 field-deck">
          <input className="fields" type="text" placeholder="First name" />
          <input className="fields" type="text" placeholder="Last name" />
          <input className="fields" type="email" placeholder="Email" />
          <input className="fields" type="number" placeholder="Phone" />
          <input className="fields" type="text" placeholder="Date of Birth" />
          <input className="fields" type="text" placeholder="Place of Birth" />
        </div>
        <FieldHeader heading="Role Details" />
        <div className="col-md-12 field-deck">
          <input className="fields" type="text" placeholder="First name" />
          <input className="fields" type="text" placeholder="Last name" />
          <input className="fields" type="email" placeholder="Email" />
          <input className="fields" type="number" placeholder="Phone" />
          <input className="fields" type="text" placeholder="Date of Birth" />
          <input className="fields" type="text" placeholder="Place of Birth" />
        </div>

        {/* <div className="row">
        <div className="col-md-12">
          <input className="fields" type="text" placeholder="Enter name" />
          <input className="fields" type="email" placeholder="Enter email" />
          <span
            title="Enter email here will be unique, and create email automatically in your database."
            className="email-detail"
          >
            ?
          </span>
        </div>

        <div className="col-md-12">
          <select
            onChange={(e) =>
              setUserState({ ...userState, role: e.target.value })
            }
            value={role}
            className="fields"
            name="role"
            id="role"
          >
            <option value="select">Select Role</option>
            <option value="faculty">Faculty</option>
            <option value="observer">Observer</option>
            <option value="hod">Head of Dept</option>
            <option value="director">Campus Director</option>
          </select>
          <select
            onChange={(e) =>
              setUserState({ ...userState, branch: e.target.value })
            }
            value={branch}
            className="fields"
            name="branch"
            id="branch"
          >
            <option value="select">Select Branch</option>
            <option value="main campus">Main Campus</option>
            <option value="north campus">North Campus</option>
            <option value="airport campus">Airport Campus</option>
            <option value="bahria campus">Bahria Campus</option>
          </select>
        </div>
        <div className="col-md-12">
          {role !== "director" && (
            <select
              onChange={(e) =>
                setUserState({ ...userState, dept: e.target.value })
              }
              value={dept}
              className="fields"
              name="dept"
              id="dept"
            >
              <option value="select">Select Dept</option>
              <option value="computer science">Computer Science</option>
              <option value="media science">Media Science</option>
              <option value="business admin">Business Administration</option>
              <option value="electronics">Electronics</option>
            </select>
          )}
        </div>
      </div> */}
        <div className="col-md-4"></div>
        <button className="col-md-4" type="submit">
          Create {rolename}
        </button>
      </div>
    </div>
  );
};

const FieldHeader = ({ heading }) => {
  return (
    <div className="col-md-12 field-header">
      <h3 className="heading">{heading}</h3>
    </div>
  );
};

export default AddUser;
