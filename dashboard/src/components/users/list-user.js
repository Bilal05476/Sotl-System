import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../common/breadcrumb";
import { Card, CardBody, CardHeader, Container, Table } from "reactstrap";
import { useStateValue } from "../../StateProvider";
import { Loader } from "../common/Loader";
import { fetchHodData, fetchSotlData, fetchUserData } from "../Endpoints";
import { completeColor } from "../colors";

const List_user = () => {
  const [{ usersandcourses, user, userData }, dispatch] = useStateValue();
  const [startSlice, setStartSlice] = useState(0);
  const [userSlice, setUserSlice] = useState(10);
  const perSlice = 10;
  const [pagination, setPagination] = useState([]);
  const [open, setOpen] = useState(1);

  useEffect(() => {
    if (user.role === "Head_of_Department") {
      fetchHodData(dispatch, user.department.id, user.role, user.id);
    } else if (user.role === "Super_Admin") {
      fetchSotlData(dispatch, user.token);
    } else fetchUserData(user.id, dispatch);
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (userData) {
      let getPage = userData?.users?.length / perSlice;
      if (getPage > 1) {
        setPagination([1, 2]);
      } else if (getPage > 2) {
        setPagination([1, 2, 3]);
      } else if (getPage > 3) {
        setPagination([1, 2, 3, 4]);
      } else if (getPage > 4) {
        setPagination([1, 2, 3, 4, 5]);
      } else {
        setPagination([]);
      }
    }
  }, [userData]);

  const ChangeSlice = (slice) => {
    setOpen(slice);
    if (slice === 1) {
      setStartSlice(0);
      setUserSlice(10);
    } else if (slice === 2) {
      setStartSlice(10);
      setUserSlice(20);
    } else if (slice === 3) {
      setStartSlice(20);
      setUserSlice(30);
    } else if (slice === 4) {
      setStartSlice(30);
      setUserSlice(40);
    } else {
      setStartSlice(0);
      setUserSlice(10);
    }
  };

  return (
    <Fragment>
      <Breadcrumb title="User List" parent="Users" />
      {!userData && !usersandcourses && <Loader />}

      {user.role !== "Super_Admin" && usersandcourses && (
        <Container fluid={true}>
          <Card>
            {user.role === "Head_of_Department" && (
              <CardHeader className="d-flex justify-content-end">
                <Link to="/users/create-user" className="btn btn-primary">
                  Create User
                </Link>
              </CardHeader>
            )}

            <CardBody>
              <div className="user-status table-responsive latest-order-table">
                <Table borderless>
                  <thead>
                    <tr>
                      {/* <th scope="col">Id</th> */}
                      {/* <th scope="col">Avatar</th> */}
                      <th scope="col">Full Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Campus</th>
                      <th scope="col">Department</th>
                      <th scope="col">Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usersandcourses.users.map((item) => (
                      <tr key={item.id}>
                        {/* <td>{item.id}</td> */}
                        {/* <td className="digits">{item?.avatar}</td> */}
                        <td className="digits">
                          {item.name} ({item.id})
                        </td>
                        <td className="digits">{item.email}</td>
                        {/* // font-danger */}
                        <td className="digits">
                          {item.campus.replaceAll("_", " ")}
                        </td>
                        <td className="digits">{item?.department?.name}</td>
                        <td className="digits">
                          {item.role.replaceAll("_", " ")}
                        </td>
                      </tr>
                    ))}
                    {usersandcourses.users.length === 0 && (
                      <tr>
                        <td className="text-center" colSpan={10}>
                          No Users!
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
            </CardBody>
          </Card>
        </Container>
      )}
      {user.role === "Super_Admin" && userData && (
        <Container fluid={true}>
          <Card>
            {userData && (
              <CardBody>
                <div className="user-status table-responsive latest-order-table">
                  <Table borderless>
                    <thead>
                      <tr>
                        {/* <th scope="col">Id</th> */}
                        {/* <th scope="col">Avatar</th> */}
                        <th scope="col">Full Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Campus</th>
                        <th scope="col">Department</th>
                        <th scope="col">Role</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userData.users
                        .slice(startSlice, userSlice)
                        .map((item) => {
                          if (item.role !== "Super_Admin") {
                            return (
                              <tr key={item.id}>
                                {/* <td>{item.id}</td> */}
                                {/* <td className="digits">{item?.avatar}</td> */}
                                <td className="digits">
                                  {item.name} ({item.id})
                                </td>
                                <td className="digits">{item.email}</td>
                                {/* // font-danger */}
                                <td className="digits">
                                  {item.campus.replaceAll("_", " ")}
                                </td>
                                <td className="digits">
                                  {item?.department?.name}
                                </td>
                                <td className="digits">
                                  {item.role.replaceAll("_", " ")}
                                </td>
                              </tr>
                            );
                          }
                        })}
                      {userData.users.length === 0 && (
                        <tr>
                          <td className="text-center" colSpan={10}>
                            No Users!
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </div>
              </CardBody>
            )}
            {pagination.length > 1 && (
              <div className="bg-light d-flex align-items-center justify-content-end p-2 px-4">
                {pagination.map((item) => (
                  <span
                    className=" d-flex align-items-center justify-content-center mx-2"
                    style={{
                      borderRadius: "50%",
                      width: "40px",
                      height: "40px",
                      border: `1px solid ${completeColor}`,
                      background: open === item ? completeColor : "white",
                      color: open === item ? "white" : completeColor,
                      cursor: "pointer",
                    }}
                    onClick={() => ChangeSlice(item)}
                    key={item}
                  >
                    {item}
                  </span>
                ))}
              </div>
            )}
          </Card>
        </Container>
      )}
    </Fragment>
  );
};

export default List_user;
