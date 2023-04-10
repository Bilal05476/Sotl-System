import { useState } from "react";
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
        <SidebarOptions optionName="Create User" href="#create" />
        <SidebarOptions optionName="Login User" href="#login" />
        <SidebarOptions optionName="Get Users" href="#users" />
        <SidebarOptions optionName="One User" href="#user" />
        <SidebarOptions optionName="Update User" href="#update" />
      </div>
      <div className="routes-deck">
        <div id="create" className="mb-5">
          <h4>Create User</h4>
          <EndPoint endpoint="url/api/create" method="POST" />
          <h4>Available Parameters</h4>

          <Parameters
            params="
          name,
      email,
      password,
      role: Campus_Director ||
  Head_of_Department ||
  Faculty ||
  Observer,
      campus: Main_Campus ||
  Gulshan_Campus ||
  North_Campus ||
  Airport_Campus ||
  Bahria_Campus ||
  Islamabad_Campus,
      department: Fest ||
  Aifd ||
  Media_Studies ||
  Business ||
  Education,
          "
          />
        </div>

        <div id="login" className="mb-5">
          <h4>Login User</h4>
          <EndPoint endpoint="url/api/login" method="POST" />
          <h4>Available Parameters</h4>
          <Parameters params="email, password" />
        </div>
        <div id="users" className="mb-5">
          <h4>Get All Users</h4>
          <EndPoint endpoint="url/api/users" method="GET" />
        </div>
        <div id="user" className="mb-5">
          <h4>Get User by Id</h4>
          <EndPoint endpoint="url/api/user/:id" method="GET" />
        </div>
        <div id="update" className="mb-5">
          <h4>User update by Id</h4>
          <EndPoint endpoint="url/api/update/:id" method="PUT" />
          <h4>Available Parameters</h4>
          <Parameters
            params="dateOfBirth,
        institute,
        degree,
        starting,
        ending,
        phone, 
        avatar"
          />
        </div>
      </div>
    </div>
  );
};

const SidebarOptions = ({ optionName, href }) => {
  return (
    <a href={href} className="options">
      {optionName}
    </a>
  );
};

const EndPoint = ({ endpoint, method }) => {
  return (
    <div className="endpoint">
      <span className="method">{method}</span>
      {endpoint}
    </div>
  );
};

const Parameters = ({ params }) => {
  return <div className="parameters">{`{${params}}`}</div>;
};

export default Users;
