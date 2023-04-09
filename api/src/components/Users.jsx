const Users = () => {
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
          Users
        </h4>
        <SidebarOptions optionName="Create User" />
        <SidebarOptions optionName="Login User" />
        <SidebarOptions optionName="Get Users" />
        <SidebarOptions optionName="One User" />
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

export default Users;
