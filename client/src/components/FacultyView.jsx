import UserDetails from "./UserDetails";
import "../css/faculty-view.css";
import DashColumn from "./DashColumn";
import { HiUserGroup } from "react-icons/hi";
import Notifications from "./Notifications";
const FacultyView = () => {
  return (
    <div className="max-height col-md-10">
      <div className="row">
        <div className="faculty-view col-md-9">
          <div className="row">
            <UserDetails username={"Asif Ali"} />
            <div className="d-flex">
              <DashColumn
                to="/"
                column="column-1"
                heading="Observation Score"
                icon={<HiUserGroup size={30} />}
                count="0%"
                col="5"
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
        <div className="col-md-3 faculty-feed">
          <div className="row">
            <Notifications
              col="12"
              rolename="Asif Ali"
              rolerole="Faculty"
              roleimg="https://th.bing.com/th/id/OIP.FjFkHghHK8HFQygVn_zzjwHaIQ?pid=ImgDet&rs=1"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyView;
