import React, { Fragment, useEffect, useState } from "react";
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
  Label,
  Form,
  FormGroup,
  Input,
  Button,
} from "reactstrap";
import { useStateValue } from "../../StateProvider";
import { Eye, Filter, Loader } from "react-feather";
import { completeColor, ongoingColor, pendingColor } from "../colors";
import { dateFormater } from "../DateFormater";
import { fetchUserData } from "../Endpoints";

const URL = process.env.PUBLIC_URL;

const List_observation = () => {
  const [{ user, userData }, dispatch] = useStateValue();
  const [observationData, setObservationData] = useState(
    userData?.observations
  );
  useEffect(() => {
    fetchUserData(user.id, dispatch);
    window.scrollTo(0, 0);
  }, []);

  const [openFilter, setOpenFilter] = useState(false);
  const [obsFilter, setObsFilter] = useState({
    course: null,
    semester: null,
    faculty: null,
    observer: null,
    status: null,
    start: null,
  });
  const { course, semester, faculty, observer, status, start } = obsFilter;

  // console.log(userData?.observations);

  const onSelectfilter = () => {
    console.log(obsFilter);
    // if (
    //   (!course || course === "Course") &&
    //   (!semester || semester === "Semester") &&
    //   (!faculty || faculty === "Faculty") &&
    //   (!observer || observer === "Observer") &&
    //   (!status || status === "Status") &&
    //   (!start || start === "Start")
    // ) {
    //   setObservationData(userData?.observations);
    // } else {
    //   const filterByCourse = userData?.observations.filter(
    //     (item) => course && item?.courseId === Number(course)
    //   );
    //   console.log(filterByCourse);
    //   const filterByStatus = filterByCourse.filter(
    //     (item) => course && item?.observationStatus === status
    //   );
    //   setObservationData(filterByStatus);
    // }
  };

  useEffect(() => {
    onSelectfilter();
  }, [obsFilter]);
  return (
    <Fragment>
      <Breadcrumb title="Observation List" parent="Observations" />
      <Container fluid={true}>
        <Row>
          <Col xl="12 xl-100">
            <Card>
              {user.role === "Head_of_Department" && (
                <CardHeader className="d-flex align-items-center justify-content-end">
                  <Link
                    to="/observations/create-observation"
                    className="btn btn-primary"
                  >
                    Initiate Observation
                  </Link>
                  <Filter
                    color={completeColor}
                    className="mx-3"
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={() => setOpenFilter(!openFilter)}
                  />
                </CardHeader>
              )}
              {userData && (
                <CardBody>
                  {openFilter && (
                    <div className="mb-4">
                      <Form className="needs-validation user-add" noValidate="">
                        <FormGroup className="row">
                          <FilterOptions
                            filterOption={[
                              {
                                id: null,
                                name: "Course",
                              },
                              {
                                id: 1,
                                name: "Applied Physics",
                              },
                            ]}
                            filterValue={course}
                            changeValue={(e) =>
                              setObsFilter({
                                ...obsFilter,
                                course: e.target.value,
                              })
                            }
                            // onSelectfilter={onSelectfilter}
                          />
                          <FilterOptions
                            filterOption={[
                              {
                                id: null,
                                name: "Semester",
                              },
                              {
                                id: "Spring",
                                name: "Spring",
                              },
                              {
                                id: "Summer",
                                name: "Summer",
                              },
                              {
                                id: "Fall",
                                name: "Fall",
                              },
                            ]}
                            filterValue={semester}
                            changeValue={(e) =>
                              setObsFilter({
                                ...obsFilter,
                                semester: e.target.value,
                              })
                            }
                            // onSelectfilter={onSelectfilter}
                          />
                          <FilterOptions
                            filterOption={[
                              {
                                id: null,
                                name: "Faculty",
                              },
                            ]}
                            filterValue={faculty}
                            changeValue={(e) =>
                              setObsFilter({
                                ...obsFilter,
                                faculty: e.target.value,
                              })
                            }
                          />
                          <FilterOptions
                            filterOption={[
                              {
                                id: null,
                                name: "Observer",
                              },
                            ]}
                            filterValue={observer}
                            changeValue={(e) =>
                              setObsFilter({
                                ...obsFilter,
                                observer: e.target.value,
                              })
                            }
                          />
                          <FilterOptions
                            filterOption={[
                              {
                                id: null,
                                name: "Status",
                              },
                              {
                                id: "Pending",
                                name: "Pending",
                              },
                              {
                                id: "Ongoing",
                                name: "Ongoing",
                              },
                              {
                                id: "Completed",
                                name: "Completed",
                              },
                            ]}
                            filterValue={status}
                            changeValue={(e) =>
                              setObsFilter({
                                ...obsFilter,
                                status: e.target.value,
                              })
                            }
                          />
                          <FilterOptions
                            filterOption={[
                              {
                                id: null,
                                name: "Starting",
                              },
                            ]}
                            filterValue={start}
                            changeValue={(e) =>
                              setObsFilter({
                                ...obsFilter,
                                start: e.target.value,
                              })
                            }
                          />
                        </FormGroup>
                      </Form>
                    </div>
                  )}
                  <div className="user-status table-responsive latest-order-table">
                    <Table borderless>
                      <thead>
                        <tr>
                          <th scope="col">Course</th>
                          <th scope="col">Semester</th>
                          {user.role !== "Faculty" && (
                            <th scope="col">Faculty</th>
                          )}
                          {user.role !== "Observer" && (
                            <th scope="col">Observer</th>
                          )}
                          {user.role !== "Head_of_Department" && (
                            <th scope="col">Head of department</th>
                          )}
                          <th scope="col">Current Meeting</th>
                          <th scope="col">Starting Date</th>
                          <th scope="col">Ending Date</th>
                          <th scope="col">Progress</th>
                          <th scope="col">Status</th>
                          <th scope="col"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {observationData?.map((item) => (
                          <tr key={item.id}>
                            <td className="digits">
                              {item.course ? item.course.name : "---"}
                            </td>
                            <td className="digits">{item.semester}</td>
                            {user.role !== "Faculty" && (
                              <td className="digits">{item.faculty.name}</td>
                            )}
                            {user.role !== "Observer" && (
                              <td className="digits">{item.observer.name}</td>
                            )}
                            {user.role !== "Head_of_Department" && (
                              <td className="digits">{item.hod.name}</td>
                            )}

                            <td
                              className="digits"
                              style={{
                                color: completeColor,
                              }}
                            >
                              {item.meetings?.obsRequest?.status === "Ongoing"
                                ? "Scheduling"
                                : item.meetings?.informedObservation?.status ===
                                  "Ongoing"
                                ? "Informed"
                                : item.meetings?.postObservation?.status ===
                                  "Ongoing"
                                ? "Post Informed"
                                : item.meetings?.uninformedObservation
                                    ?.status === "Ongoing"
                                ? "Uninformed"
                                : item.meetings?.professionalDPlan?.status ===
                                  "Ongoing"
                                ? "Prof development"
                                : "---"}
                            </td>

                            {item.starting ? (
                              dateFormater(item.starting)
                            ) : (
                              <td>---</td>
                            )}

                            {item.ending ? (
                              dateFormater(item.ending)
                            ) : (
                              <td>---</td>
                            )}

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
                                to={`${URL}/observations/detail-observation/${item.id}`}
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

const FilterOptions = ({ filterOption, filterValue, changeValue }) => {
  return (
    <div className="col-2 mb-2">
      <Input
        className="form-control"
        id="validationCustom3"
        type="select"
        required={true}
        value={filterValue}
        onChange={changeValue}
      >
        {filterOption?.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </Input>
    </div>
  );
};

export default List_observation;
