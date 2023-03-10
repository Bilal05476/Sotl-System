import "../css/dashboard.css";
import AdminView from "./AdminView";
import FacultyView from "./FacultyView";
import Observations from "./Observations";
import ObserverView from "./ObserverView";
import Sidebar from "./Sidebar";
import { Route, Routes } from "react-router-dom";
import AddUser from "./AddUser";
import { MdSpaceDashboard } from "react-icons/md";
import { SiObservable } from "react-icons/si";
import { HiUserGroup } from "react-icons/hi";
import { ImUserTie } from "react-icons/im";
import { FaUserTie } from "react-icons/fa";
import { HiUserPlus, HiUser } from "react-icons/hi2";
import RolesView from "./RolesView";
import { facultiesData } from "../Data";
import { useStateValue } from "../StateProvider";

const Dashboard = () => {
  const [{ user }] = useStateValue();
  return (
    <div className="container-fluid dashboard">
      {user.role === "Faculty" && (
        <div className="row faculty-dash">
          <Sidebar
            menus={[
              { name: "Home", to: "/" },
              { name: "Meetings", to: "/meetings" },
              { name: "Profile", to: "/profile" },
            ]}
          />

          <Routes>
            <Route path="/" exact element={<FacultyView />} />
            <Route path="/observations" exact element={<Observations />} />
          </Routes>
        </div>
      )}
      {user.role === "Admin" && (
        <div className="row admin-dash">
          <Sidebar
            menus={[
              {
                name: "Dashboard",
                to: "/",
                icon: <MdSpaceDashboard size={20} className="mx-2 my-0" />,
              },
              {
                name: "Observations",
                to: "/observations",
                icon: <SiObservable size={20} className="mx-2 my-0" />,
              },
              {
                name: "Faculties",
                to: "/faculties",
                icon: <HiUserGroup size={20} className="mx-2 my-0" />,
              },
              {
                name: "Observers",
                to: "/observers",
                icon: <FaUserTie size={20} className="mx-2 my-0" />,
              },
              {
                name: "Head of Dept",
                to: "/head-of-departments",
                icon: <ImUserTie size={20} className="mx-2 my-0" />,
              },
              {
                name: "Campus Directors",
                to: "/campus-directors",
                icon: <ImUserTie size={20} className="mx-2 my-0" />,
              },
              {
                name: "Your Profile",
                to: "/profile",
                icon: <HiUser size={20} className="mx-2 my-0" />,
              },
              {
                name: "Add Role",
                to: "/add-role",
                icon: <HiUserPlus size={20} className="mx-2 my-0" />,
              },
            ]}
          />
          <Routes>
            <Route path="/" exact element={<AdminView />} />
            <Route
              path="/faculties"
              exact
              element={
                <RolesView
                  roleData={facultiesData}
                  role="faculty"
                  heading="Faculty"
                  btnText="Add Faculty"
                />
              }
            />
            <Route
              path="/observers"
              exact
              element={
                <RolesView
                  roleData={facultiesData}
                  role="observers"
                  heading="Observers"
                  btnText="Add Observer"
                />
              }
            />
            <Route
              path="/head-of-departments"
              exact
              element={
                <RolesView
                  roleData={facultiesData}
                  role="head-of-departments"
                  heading="Head of Departments"
                  btnText="Add Head of Departments"
                />
              }
            />
            <Route
              path="/campus-directors"
              exact
              element={
                <RolesView
                  roleData={facultiesData}
                  role="campus-directors"
                  heading="Campus Directors"
                  btnText="Add Campus Directors"
                />
              }
            />
            <Route path="/observations" exact element={<Observations />} />
            <Route path="/add-role" exact element={<AddUser />} />
          </Routes>
        </div>
      )}
      {user.role === "Observer" && (
        <div className="row observer-dash">
          <Sidebar
            menus={[
              { name: "Home", to: "/" },
              { name: "Meetings", to: "/meetings" },
              { name: "Profile", to: "/profile" },
            ]}
          />

          <Routes>
            <Route path="/" exact element={<ObserverView />} />
            <Route path="/observations" exact element={<Observations />} />
          </Routes>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
