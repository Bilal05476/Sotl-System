import { IoNotificationsSharp, IoSettings } from "react-icons/io5";

const Notifications = ({ col, rolename, rolerole, roleimg }) => {
  return (
    <div className={`col-md-${col} notifications`}>
      <span className="notify-icon">
        <IoNotificationsSharp color="var(--baseC--)" size={20} />
      </span>
      <span className="setting-icon">
        <IoSettings color="var(--baseC--)" size={20} />
      </span>
      <div className="profile-icon">
        <div className="profile-text">
          <p className="profile-name">{rolename}</p>
          <p className="profile-role">{rolerole}</p>
        </div>
        <img className="profile-img" src={roleimg} alt="role" />
      </div>
    </div>
  );
};

export default Notifications;
