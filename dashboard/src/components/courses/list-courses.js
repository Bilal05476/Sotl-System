import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../common/breadcrumb";
// import data from "../../assets/data/listUser";
// import Datatable from "../common/datatable";
import {
  Card,
  CardBody,
  CardHeader,
  Container,
  Table,
  Col,
  Row,
  Button,
} from "reactstrap";
import { useStateValue } from "../../StateProvider";
import { Eye } from "react-feather";
import { Loader } from "../common/Loader";
import { fetchHodData, fetchSotlData, fetchUserData } from "../Endpoints";
import { completeColor2 } from "../colors";

const List_courses = () => {
  const [{ user, usersandcourses, userData }, dispatch] = useStateValue();
  const [viewSlots, setViewSlots] = useState([]);
  useEffect(() => {
    if (user.role === "Head_of_Department")
      fetchHodData(dispatch, user.department.id, user.role, user.id);
    else if (user.role === "Super_Admin") {
      fetchSotlData(dispatch, user.token);
    } else fetchUserData(user.id, dispatch);
    window.scrollTo(0, 0);
  }, []);

  const selectCourse = (slots) => {
    setViewSlots(slots);
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 200);
  };
  return (
    <Fragment>
      <Breadcrumb title="Courses List" parent="Courses" />

      {!userData && !usersandcourses && <Loader />}

      {user.role === "Head_of_Department" && usersandcourses && (
        <Container fluid={true}>
          <Row>
            <Col xl="12 xl-100">
              <Card>
                <CardHeader className="d-flex justify-content-end">
                  <Link
                    to="/courses/create-courses"
                    className="btn btn-primary"
                  >
                    Create Course
                  </Link>
                </CardHeader>
                <CardBody>
                  <div className="user-status table-responsive latest-order-table">
                    <Table borderless>
                      <thead>
                        <tr>
                          <th scope="col">Course Code</th>
                          <th scope="col">Course Name</th>
                          <th scope="col">Credits</th>
                          <th scope="col">Departments</th>
                          <th scope="col">Campus</th>
                          <th scope="col">Elective</th>
                          <th scope="col">Depth Elective</th>
                          <th scope="col">Slots</th>
                          <th scope="col"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {usersandcourses?.courses.map((item) => (
                          <tr key={item.id}>
                            <td className="digits">{item.courseCode}</td>
                            <td className="digits">{item.name}</td>
                            <td className="digits">{item.credits}</td>
                            <td className="digits">
                              {item.department.map((dept) => (
                                <span
                                  key={dept?.id}
                                  style={{
                                    color:
                                      dept.id === user.department?.id
                                        ? completeColor2
                                        : "#979797",
                                    fontWeight:
                                      dept.id === user.department?.id
                                        ? "600"
                                        : "300",
                                  }}
                                >
                                  {dept.name}{" "}
                                  {item.department.indexOf(dept) !==
                                    item.department?.length - 1 && ","}{" "}
                                </span>
                              ))}
                            </td>
                            <td className="digits">
                              {item.campus.replaceAll("_", " ")}
                            </td>
                            <td
                              className={`digits ${
                                item.isElective ? "text-primary" : "text-danger"
                              }`}
                            >
                              {item.isElective ? "Yes" : "No"}
                            </td>
                            <td
                              className={`digits ${
                                item.isDepthElective
                                  ? "text-primary"
                                  : "text-danger"
                              }`}
                            >
                              {item.isDepthElective ? "Yes" : "No"}
                            </td>

                            <td className="digits">{item.slots?.length}</td>
                            <td className="digits font-primary">
                              <Button
                                className="d-flex align-items-center"
                                onClick={() => selectCourse(item.slots)}
                              >
                                <Eye size={20} />
                              </Button>
                            </td>
                          </tr>
                        ))}
                        {usersandcourses?.courses?.length === 0 && (
                          <tr>
                            <td className="text-center" colSpan={10}>
                              No Courses!
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
                {!usersandcourses && (
                  <Loader style={{ display: "block", margin: "0.5rem auto" }} />
                )}
              </Card>
            </Col>
          </Row>
          {viewSlots?.length > 0 && (
            <Row>
              <Col xl="12 xl-100">
                <Card>
                  <CardBody>
                    <div className="user-status table-responsive latest-order-table">
                      <Table borderless>
                        <thead>
                          <tr>
                            <th scope="col">Section Code</th>
                            <th scope="col">Day &amp; Time</th>
                            <th scope="col">Location</th>
                            <th scope="col">Faculty</th>

                            <th scope="col"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {viewSlots.map((item) => (
                            <tr key={item.id}>
                              <td className="digits">{item.sectionCode}</td>
                              <td className="digits">
                                {item.day} {item.time}
                              </td>
                              <td className="digits">{item.location}</td>

                              <td
                                className="digits"
                                style={{
                                  color: item.faculty
                                    ? completeColor2
                                    : "crimson",
                                  fontWeight: "600",
                                }}
                              >
                                {item.faculty
                                  ? item.faculty.name
                                  : "Not Assigned"}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          )}
        </Container>
      )}
      {user.role === "Super_Admin" && userData && (
        <Container fluid={true}>
          <Row>
            <Col xl="12 xl-100">
              <Card>
                <CardBody>
                  <div className="user-status table-responsive latest-order-table">
                    <Table borderless>
                      <thead>
                        <tr>
                          <th scope="col">Course Code</th>
                          <th scope="col">Course Name</th>
                          <th scope="col">Credits</th>
                          <th scope="col">Departments</th>
                          <th scope="col">Campus</th>
                          <th scope="col">Elective</th>
                          <th scope="col">Depth Elective</th>
                          <th scope="col">Slots</th>
                          <th scope="col"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {userData?.courses?.map((item) => (
                          <tr key={item.id}>
                            <td className="digits">{item.courseCode}</td>
                            <td className="digits">{item.name}</td>
                            <td className="digits">{item.credits}</td>
                            <td className="digits">
                              {item.department.map((dept) => (
                                <span
                                  key={dept?.id}
                                  style={{
                                    color:
                                      dept.id === user.department?.id
                                        ? completeColor2
                                        : "#979797",
                                    fontWeight:
                                      dept.id === user.department?.id
                                        ? "600"
                                        : "300",
                                  }}
                                >
                                  {dept.name}{" "}
                                  {item.department.indexOf(dept) !==
                                    item.department?.length - 1 && ","}{" "}
                                </span>
                              ))}
                            </td>
                            <td className="digits">
                              {item.campus.replaceAll("_", " ")}
                            </td>
                            <td
                              className={`digits ${
                                item.isElective ? "text-primary" : "text-danger"
                              }`}
                            >
                              {item.isElective ? "Yes" : "No"}
                            </td>
                            <td
                              className={`digits ${
                                item.isDepthElective
                                  ? "text-primary"
                                  : "text-danger"
                              }`}
                            >
                              {item.isDepthElective ? "Yes" : "No"}
                            </td>

                            <td className="digits">{item.slots?.length}</td>
                            <td className="digits font-primary">
                              <Button
                                className="d-flex align-items-center"
                                onClick={() => selectCourse(item.slots)}
                              >
                                <Eye size={20} />
                              </Button>
                            </td>
                          </tr>
                        ))}
                        {userData?.courses?.length === 0 && (
                          <tr>
                            <td className="text-center" colSpan={10}>
                              No Courses!
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          {viewSlots?.length > 0 && (
            <Row>
              <Col xl="12 xl-100">
                <Card>
                  <CardBody>
                    <div className="user-status table-responsive latest-order-table">
                      <Table borderless>
                        <thead>
                          <tr>
                            <th scope="col">Section Code</th>
                            <th scope="col">Day &amp; Time</th>
                            <th scope="col">Location</th>
                            <th scope="col">Faculty</th>

                            <th scope="col"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {viewSlots.map((item) => (
                            <tr key={item.id}>
                              <td className="digits">{item.sectionCode}</td>
                              <td className="digits">
                                {item.day} {item.time}
                              </td>
                              <td className="digits">{item.location}</td>

                              <td
                                className="digits"
                                style={{
                                  color: item.faculty
                                    ? completeColor2
                                    : "crimson",
                                  fontWeight: "600",
                                }}
                              >
                                {item.faculty
                                  ? item.faculty.name
                                  : "Not Assigned"}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          )}
        </Container>
      )}
    </Fragment>
  );
};

export default List_courses;
