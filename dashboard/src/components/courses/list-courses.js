import React, { Fragment, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
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
} from "reactstrap";
import { useStateValue } from "../../StateProvider";
import { Eye, Loader } from "react-feather";
import { fetchCoursesAndUsers, fetchUserData } from "../Endpoints";

const List_courses = () => {
  const [{ user, usersandcourses }, dispatch] = useStateValue();
  useEffect(() => {
    if (user.role === "Head_of_Department") fetchCoursesAndUsers(dispatch);
    fetchUserData(user.id, dispatch);
  }, []);
  return (
    <Fragment>
      <Breadcrumb title="Courses List" parent="Courses" />
      <Container fluid={true}>
        <Row>
          <Col xl="12 xl-100">
            <Card>
              {user.role === "Head_of_Department" && (
                <>
                  <CardHeader className="d-flex justify-content-end">
                    <Link
                      to="/observations/create-observation"
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
                            <th scope="col">Department</th>
                            <th scope="col">Campus</th>
                            <th scope="col">Elective</th>
                            <th scope="col">Depth Elective</th>
                            <th scope="col"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {usersandcourses?.courses.map((item) => (
                            <tr key={item.id}>
                              <td className="digits">{item.id}</td>
                              <td className="digits">{item.name}</td>
                              <td className="digits">{item.credits}</td>
                              <td className="digits">
                                {item.department.replaceAll("_", " ")}
                              </td>
                              <td className="digits">
                                {item.campus.replaceAll("_", " ")}
                              </td>
                              <td
                                className={`digits ${
                                  item.isElective
                                    ? "text-primary"
                                    : "text-danger"
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
                              {/* <td className="digits font-primary">
                                <NavLink
                                  className="d-flex align-items-center"
                                  to={`${process.env.PUBLIC_URL}/observations/detail-observation/${item.id}`}
                                >
                                  <Eye size={20} />
                                </NavLink>
                              </td> */}
                            </tr>
                          ))}
                          {usersandcourses?.courses.length === 0 && (
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
                </>
              )}
              {/* {userData && (
                
              )} */}
              {!usersandcourses && (
                <Loader style={{ display: "block", margin: "0.5rem auto" }} />
              )}
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default List_courses;
