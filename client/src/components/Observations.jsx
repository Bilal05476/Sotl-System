import { NavLink } from "react-router-dom";
const Observations = ({ obsFilter }) => {
  return (
    <div className="observation">
      <table className="table">
        <tr>
          <th>O.No</th>
          <th>Faculty Name</th>
          <th>Observer Name</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Status</th>
          <th></th>
        </tr>
        {observation.map((item) => {
          if (obsFilter === "ongoing") {
            if (!item.completed) {
              return <ObservationList key={item.ob} item={item} />;
            }
          } else if (obsFilter === "completed") {
            if (item.completed) {
              return <ObservationList key={item.ob} item={item} />;
            }
          } else {
            return <ObservationList key={item.ob} item={item} />;
          }
          return null;
        })}
      </table>
    </div>
  );
};
const ObservationList = ({ item }) => {
  return (
    <tr>
      <td>{item.ob}</td>
      <td>{item.faculty}</td>
      <td>{item.observer}</td>
      <td>{item.startDate}</td>
      <td>{item.endDate ? item.endDate : "---"}</td>
      <td>{item.completed ? "Completed" : "Ongoing"}</td>
      <td className="meet-detail">
        <NavLink className="btn" to="/">
          Show Details
        </NavLink>
      </td>
    </tr>
  );
};

const observation = [
  {
    ob: 1,
    faculty: "Sheraz Ahmed",
    observer: "Mansoor Ebrahim",
    startDate: "12-12-23",
    endDate: "12-12-23",
    completed: true,
  },
  {
    ob: 2,
    faculty: "Bilal Ahmed",
    observer: "Asif Ali",
    startDate: "12-12-23",
    endDate: "",
    completed: false,
  },
  {
    ob: 3,
    faculty: "Krish Kanojia",
    observer: "Daud Abbasi",
    startDate: "12-12-23",
    endDate: "22-12-23",
    completed: true,
  },
  {
    ob: 4,
    faculty: "Muhammad Haris",
    observer: "Daud Abbasi",
    startDate: "12-12-23",
    endDate: "22-12-23",
    completed: true,
  },
];
export default Observations;
