import { useState } from "react";
import "../css/adduser.css";
import { useStateValue } from "../StateProvider";
import Notifications from "./Notifications";
const AddUser = () => {
  const [{ user }] = useStateValue();
  const [userState, setUserState] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    designation: "",
    dateOfBirth: "",
    degree: "",
    institute: "",
    starting: "",
    ending: "",
    role: "select",
    dept: user?.department,
    campus: user?.campus,
  });

  const deptOptions = [
    {
      value: "Fest",
      option: "FEST",
    },
    {
      value: "Aifd",
      option: "AIFD",
    },
    {
      value: "Media",
      option: "Media",
    },
    {
      value: "Business",
      option: "Business",
    },
  ];
  const campOptions = [
    {
      value: "Main_Campus",
      option: "Main Campus",
    },
    {
      value: "Gulshan",
      option: "Gulshan Campus",
    },
    {
      value: "North",
      option: "North Campus",
    },
    {
      value: "Bahria",
      option: "Bahria Campus",
    },
    {
      value: "Islamabad",
      option: "Islamabad Campus",
    },
  ];
  const roleOptions = [
    {
      value: "Admin",
      option: "Admin",
    },
    {
      value: "Campus_Director",
      option: "Campus Director",
    },
    {
      value: "Hod",
      option: "Head of Department",
    },
    {
      value: "Faculty",
      option: "Faculty",
    },
    {
      value: "Observer",
      option: "Observer",
    },
  ];
  const {
    name,
    email,
    password,
    dateOfBirth,
    phone,
    designation,
    degree,
    institute,
    starting,
    ending,
    role,
    dept,
    campus,
  } = userState;

  const onAddRole = () => {
    const data = {
      name,
      email,
      password,
      dateOfBirth,
      phone,
      designation,
      degree,
      institute,
      starting,
      ending,
      role,
      dept,
      campus,
    };
    console.log(data);
  };
  return (
    <div className="col-md-10  max-height add-user">
      <div className="row">
        <div className="col-md-9 p-0 pt-4">
          <h3 className="heading">Add New</h3>
        </div>
        <Notifications col="3" />
        <FieldHeader heading="Personal Details" />
        <div className="col-md-12 field-deck">
          <input
            onChange={(e) =>
              setUserState({ ...userState, name: e.target.value })
            }
            value={name}
            className="fields"
            type="text"
            placeholder="Full name"
          />
          <input
            onChange={(e) =>
              setUserState({ ...userState, email: e.target.value })
            }
            value={email}
            className="fields"
            type="email"
            placeholder="Email"
          />
          <input
            onChange={(e) =>
              setUserState({ ...userState, phone: e.target.value })
            }
            value={phone}
            className="fields"
            type="text"
            placeholder="Phone"
          />
          <input
            onChange={(e) =>
              setUserState({ ...userState, dateOfBirth: e.target.value })
            }
            value={dateOfBirth}
            className="fields"
            type="text"
            placeholder="Date of Birth (Optional)"
          />
          <input
            onChange={(e) =>
              setUserState({ ...userState, password: e.target.value })
            }
            value={password}
            className="fields"
            type="password"
            placeholder="Password"
          />
          <input
            onChange={(e) =>
              setUserState({ ...userState, designation: e.target.value })
            }
            value={designation}
            className="fields"
            type="text"
            placeholder="Designation"
          />

          {/* <input className="fields" type="file" /> */}
          {/* <textarea
            className="fields"
            type="text"
            rows="4"
            placeholder="Address"
          /> */}
        </div>
        <FieldHeader heading="Education Details (Optional)" />
        <div className="col-md-12 field-deck">
          <input
            value={degree}
            className="fields"
            type="text"
            placeholder="Degree"
            onChange={(e) =>
              setUserState({ ...userState, degree: e.target.value })
            }
          />
          <input
            value={institute}
            className="fields"
            type="email"
            placeholder="Institute"
            onChange={(e) =>
              setUserState({ ...userState, institute: e.target.value })
            }
          />
          <input
            value={starting}
            className="fields"
            type="date"
            placeholder="Starting"
            onChange={(e) =>
              setUserState({ ...userState, starting: e.target.value })
            }
          />
          <input
            value={ending}
            className="fields"
            type="date"
            placeholder="Ending"
            onChange={(e) =>
              setUserState({ ...userState, ending: e.target.value })
            }
          />
          <input
            value={ending}
            type="checkbox"
            onChange={(e) => setUserState({ ...userState, ending: "" })}
          />{" "}
          In Progress
        </div>
        <FieldHeader heading="Role Details" />
        <div className="col-md-12 field-deck">
          <select
            onChange={(e) =>
              setUserState({ ...userState, role: e.target.value })
            }
            value={role}
            className="fields role-select round"
            name="role"
            id="role"
          >
            <option value="select">Select Role</option>
            {roleOptions.map((item) => (
              <option key={item.option} value={item.value}>
                {item.option}
              </option>
            ))}
          </select>
          <select
            onChange={(e) =>
              setUserState({ ...userState, dept: e.target.value })
            }
            value={dept}
            className="fields role-select round"
            name="role"
            id="role"
          >
            <option value="select">Select Deparmtment</option>
            {deptOptions.map((item) => (
              <option key={item.option} value={item.value}>
                {item.option}
              </option>
            ))}
          </select>
          <select
            onChange={(e) =>
              setUserState({ ...userState, campus: e.target.value })
            }
            value={campus}
            className="fields role-select round"
            name="role"
            id="role"
          >
            <option value="select">Select Campus</option>
            {campOptions.map((item) => (
              <option key={item.option} value={item.value}>
                {item.option}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-4"></div>
        <button className="col-md-4" type="submit" onClick={() => onAddRole()}>
          Create
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
