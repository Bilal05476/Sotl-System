const Observations = () => {
  return (
    <div className="users container-fluid">
      <div className="sidebar">
        <h4
          style={{
            color: "#fff",
            textTransform: "uppercase",
            marginBottom: "2rem",
            textShadow: "1px 1px 1px #fff",
          }}
        >
          Observations
        </h4>
        <SidebarOptions optionName="Initiate Observation" />
        <SidebarOptions optionName="Meeting Scheduling (Observer)" />
        <SidebarOptions optionName="Meeting Scheduling (Faculty)" />
        <SidebarOptions optionName="Get Observations" />
        <SidebarOptions optionName="One Observation" />
      </div>
      <div className="routes-deck"></div>
    </div>
  );
};

const SidebarOptions = ({ optionName, optionClick }) => {
  return (
    <span className="options" onClick={() => {}}>
      {optionName}
    </span>
  );
};

export default Observations;
