import { IoNotificationsSharp, IoSettings } from "react-icons/io5";
import { useStateValue } from "../StateProvider";

const Notifications = ({ roleimg }) => {
  const [{ user }] = useStateValue();
  return (
    <div className="col-md-12 flex items-center justify-between p-3">
      <div className="flex items-center mr-3">
        <div className="w-11 h-11 bg-slate-100 shadow-sm shadow-gray-100 rounded-full overflow-hidden mr-2">
          <img className="w-100" src={roleimg} alt="role" />
        </div>
        <p className="m-0 text-sm font-semibold w-2/3">
          {user?.name} | {user?.role}
        </p>
      </div>
      <div className="flex">
        <span className="bg-slate-100 p-2 rounded-3xl mr-1 shadow-sm shadow-gray-100">
          <IoNotificationsSharp color="var(--baseC--)" size={20} />
        </span>
        <span className="bg-slate-100 p-2 rounded-3xl shadow-sm shadow-gray-100">
          <IoSettings color="var(--baseC--)" size={20} />
        </span>
      </div>
    </div>
  );
};

export default Notifications;
