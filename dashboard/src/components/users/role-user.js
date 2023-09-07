import React, { Fragment, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Breadcrumb from "../common/breadcrumb";
import { Card, CardBody, CardHeader, Container, Table } from "reactstrap";
import { useStateValue } from "../../StateProvider";
import { Loader } from "../common/Loader";
import {
  fetchCoursesAndUsers,
  fetchSotlData,
  fetchUserData,
} from "../Endpoints";
import { completeColor } from "../colors";

const Roleuser = () => {
  const [{ user, userData }, dispatch] = useStateValue();
  const [startSlice, setStartSlice] = useState(0);
  const [userSlice, setUserSlice] = useState(10);
  const perSlice = 10;
  const [pagination, setPagination] = useState([]);
  const [open, setOpen] = useState(1);
  const [usersToShow, setUsersToShow] = useState([]);
  const params = useParams();

  useEffect(() => {
    if (user.role === "Super_Admin") {
      fetchSotlData(dispatch, user.token);
    }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const pageSlug =
      params.slug === "campus-directors"
        ? "Campus_Director"
        : params.slug === "head-of-departments"
        ? "Head_of_Department"
        : params.slug === "observers"
        ? "Observer"
        : params.slug === "faculty"
        ? "Faculty"
        : "";
    const users = userData?.users?.filter((item) => item.role === pageSlug);
    setUsersToShow(users);
    if (userData) {
      let getPage = users.length / perSlice;
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
      <Breadcrumb
        parent="User List"
        title={`${params?.slug?.charAt(0).toUpperCase()}${params?.slug
          ?.slice(1)
          .replaceAll("-", " ")}`}
      />
      {!userData && <Loader />}

      {userData && (
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
                      {usersToShow?.slice(startSlice, userSlice).map((item) => (
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
                      {usersToShow?.length === 0 && (
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

export default Roleuser;
