import { useState } from "react";
import { EndPoint, Parameters, SidebarOptions } from "./utils";
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
            params={[
              {
                name: "name",
                type: "string",
                def: "",
                avail: "",
                req: true,
              },
              {
                name: "email",
                type: "string",
                def: "",
                avail: "",
                req: true,
              },
              {
                name: "password",
                type: "string",
                def: "",
                avail: "",
                req: true,
              },
              {
                name: "role",
                type: "string",
                def: "",
                avail:
                  "Campus_Director | Head_of_Department | Faculty | Observer",
                req: true,
              },
              {
                name: "campus",
                type: "string",
                def: "",
                avail:
                  "Main_Campus | Gulshan_Campus | North_Campus | Airport_Campus | Bahria_Campus | Islamabad_Campus",
                req: true,
              },
              {
                name: "department",
                type: "string",
                def: "",
                avail: "Fest | Aifd | Media_Studies | Business | Education",
                req: true,
              },
              {
                name: "courses",
                type: "array",
                def: "",
                avail: "Required for Obsever | Faculty, array of courses id",
                req: false,
              },
            ]}
          />
        </div>

        <div id="login" className="mb-5">
          <h4>Login User</h4>
          <EndPoint endpoint="url/api/login" method="POST" />
          <h4>Available Parameters</h4>
          <Parameters
            params={[
              {
                name: "email",
                type: "string",
                def: "",
                avail: "",
                req: true,
              },
              {
                name: "password",
                type: "string",
                def: "",
                avail: "",
                req: true,
              },
            ]}
          />
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
            params={[
              {
                name: "phone",
                type: "string",
                def: "null",
                avail: "",
                req: false,
              },
              {
                name: "dateOfBirth",
                type: "dateTime",
                def: "null",
                avail: "",
                req: false,
              },
              {
                name: "institute",
                type: "string",
                def: "null",
                avail: "",
                req: false,
              },
              {
                name: "degree",
                type: "string",
                def: "null",
                avail: "",
                req: false,
              },
              {
                name: "starting",
                type: "dateTime",
                def: "null",
                avail: "",
                req: false,
              },
              {
                name: "ending",
                type: "dateTime",
                def: "null",
                avail: "",
                req: false,
              },
              {
                name: "avatar",
                type: "string",
                def: "null",
                avail: "",
                req: false,
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default Users;
