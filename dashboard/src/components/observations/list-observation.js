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

const List_observation = () => {
  const [{ user, userData }, dispatch] = useStateValue();

  const pendingColor = "#FCC43E";
  const ongoingColor = "#4AD6EF";
  const completeColor = "#5673ED";

  async function fetchData() {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/user/${user.id}`,
        {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      const data = await res.json();
      const specificData = {
        observations: data.observations,
        courses: data.courses,
      };
      dispatch({
        type: "SET_USER_DATA",
        payload: specificData,
      });
      console.log(specificData);
    } catch (error) {
      console.log(error.message);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Fragment>
      <Breadcrumb title="Observation List" parent="Observations" />
      <Container fluid={true}>
        <Row>
          <Col xl="6 xl-100">
            <Card>
              <CardHeader className="d-flex justify-content-end">
                {user.role === "Head_of_Department" && (
                  <Link
                    to="/observations/create-observation"
                    className="btn btn-primary"
                  >
                    Initiate Observation
                  </Link>
                )}
              </CardHeader>
              {userData && (
                <CardBody>
                  <div className="user-status table-responsive latest-order-table">
                    <Table borderless>
                      <thead>
                        <tr>
                          <th scope="col">Course</th>
                          <th scope="col">Semester</th>
                          <th scope="col">Faculty</th>
                          <th scope="col">Observer</th>
                          <th scope="col">Head of department</th>
                          <th scope="col">Starting Date</th>
                          <th scope="col">Ending Date</th>
                          <th scope="col">Progress</th>
                          <th scope="col">Status</th>
                          <th scope="col"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {userData?.observations.map((item) => (
                          <tr key={item.id}>
                            <td className="digits">{item.course.name}</td>
                            <td className="digits">{item.semester}</td>
                            <td className="digits">{item.faculty.name}</td>
                            <td className="digits">{item.observer.name}</td>
                            <td className="digits">{item.hod.name}</td>
                            <td className="digits">
                              {item.starting ? item.starting : "--"}
                            </td>
                            <td className="digits">
                              {item.ending ? item.ending : "--"}
                            </td>
                            <td>
                              <div className="progress-showcase">
                                <div className="progress" style={{ height: 8 }}>
                                  <div
                                    className="progress-bar"
                                    style={{
                                      width: item.observationProgress,
                                      backgroundColor:
                                        item.observationStatus === "Ongoing"
                                          ? ongoingColor
                                          : completeColor,
                                    }}
                                    role="progressbar"
                                    aria-valuenow="50"
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                  ></div>
                                </div>
                              </div>
                            </td>
                            <td
                              style={{
                                color:
                                  item.observationStatus === "Ongoing"
                                    ? ongoingColor
                                    : item.observationStatus === "Completed"
                                    ? completeColor
                                    : pendingColor,
                              }}
                            >
                              {item.observationStatus}
                            </td>
                            <td className="digits font-primary">
                              <NavLink
                                className="d-flex align-items-center"
                                to={`${process.env.PUBLIC_URL}/observations/detail-observation/${item.id}`}
                              >
                                <Eye size={20} />
                              </NavLink>
                            </td>
                          </tr>
                        ))}
                        {userData.observations.length === 0 && (
                          <tr>
                            <td className="text-center" colSpan={10}>
                              No Observations!
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
              )}
              {!userData && (
                <Loader style={{ display: "block", margin: "0.5rem auto" }} />
              )}
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default List_observation;
