import UserDetails from "./UserDetails";
import "../css/faculty-view.css";
import DashColumn from "./DashColumn";
import { HiUserGroup } from "react-icons/hi";
import { useStateValue } from "../StateProvider";
const FacultyView = () => {
  const [{ user }] = useStateValue();
  return (
    <div className="max-height col-md-8">
      <div className="row">
        <div className="faculty-view col-md-12">
          <div className="row">
            <UserDetails username={user?.name} />
            <div className="flex">
              <DashColumn
                to="/"
                column="column-1"
                heading="Observation Score"
                icon={<HiUserGroup size={30} />}
                count="0%"
                col="6"
              />
              <DashColumn
                to="/faculties"
                column="column-4"
                heading="Current Observation Meeting"
                icon={<HiUserGroup size={30} />}
                count="Post Observation"
                col="6"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyView;
