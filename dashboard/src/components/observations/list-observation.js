import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  Form,
  FormGroup,
  Input,
} from "reactstrap";
import { useStateValue } from "../../StateProvider";
import { CheckCircle, Filter } from "react-feather";
import { Loader } from "../common/Loader";
import { completeColor, ongoingColor, pendingColor } from "../colors";
import { dateFormater } from "../DateFormater";
import {
  fetchCoursesAndUsers,
  fetchSotlData,
  fetchUserData,
} from "../Endpoints";

const URL = process.env.PUBLIC_URL;

const List_observation = () => {
  const [{ user, userData }, dispatch] = useStateValue();
  const navigate = useNavigate();
  const [observationData, setObservationData] = useState("");
  useEffect(() => {
    if (user.role === "Head_of_Department")
      fetchCoursesAndUsers(dispatch, user.department.id, user.role);
    else if (user.role === "Super_Admin") {
      fetchSotlData(dispatch, user.token);
    } else fetchUserData(user.id, dispatch);
    window.scrollTo(0, 0);
  }, []);

  setTimeout(() => {
    if (!observationData) {
      setObservationData(userData?.observations);
    }
  }, 2000);

  const [openFilter, setOpenFilter] = useState(false);
  const [obsFilter, setObsFilter] = useState({
    course: "select",
    semester: "select",
    faculty: "select",
    observer: "select",
    status: "select",
    start: "select",
  });
  const { course, semester, faculty, observer, status, start } = obsFilter;

  const onSelectCourse = (courseId) => {
    setObsFilter({
      ...obsFilter,
      course: courseId,
    });
    if (courseId !== "select") {
      let filterByCourse;
      if (observationData.length > 0) {
        filterByCourse = observationData.filter(
          (item) => item?.courseId?.toString() === courseId
        );
      } else {
        filterByCourse = userData?.observations.filter(
          (item) => item?.courseId?.toString() === courseId
        );
      }
      setObservationData(filterByCourse);
    }
  };
  const onSelectSemester = (semester) => {
    setObsFilter({
      ...obsFilter,
      semester,
    });
    if (semester !== "select") {
      let filterBySemester;
      if (observationData.length > 0) {
        filterBySemester = observationData.filter(
          (item) => item.semester === semester
        );
      } else {
        filterBySemester = userData?.observations.filter(
          (item) => item.semester === semester
        );
      }
      setObservationData(filterBySemester);
    }
  };
  const onSelectFaculty = (facultyId) => {
    setObsFilter({
      ...obsFilter,
      faculty: facultyId,
    });
    if (facultyId !== "select") {
      let filterByFaculty;
      if (observationData.length > 0) {
        filterByFaculty = observationData.filter(
          (item) => item?.facultyId?.toString() === facultyId
        );
      } else {
        filterByFaculty = userData?.observations.filter(
          (item) => item?.facultyId?.toString() === facultyId
        );
      }
      setObservationData(filterByFaculty);
    }
  };
  const onSelectObserver = (observerId) => {
    setObsFilter({
      ...obsFilter,
      observer: observerId,
    });
    if (observerId !== "select") {
      let filterByObserver;
      if (observationData.length > 0) {
        filterByObserver = observationData.filter(
          (item) => item?.observerId?.toString() === observerId
        );
      } else {
        filterByObserver = userData?.observations.filter(
          (item) => item?.observerId?.toString() === observerId
        );
      }
      setObservationData(filterByObserver);
    }
  };
  const onSelectStatus = (status) => {
    setObsFilter({
      ...obsFilter,
      status,
    });
    if (status !== "select") {
      let filterByStatus;
      if (observationData.length > 0) {
        filterByStatus = observationData.filter(
          (item) => item.status === status
        );
      } else {
        filterByStatus = userData?.observations.filter(
          (item) => item.status === status
        );
      }
      setObservationData(filterByStatus);
    }
  };

  useEffect(() => {
    if (
      course === "select" &&
      semester === "select" &&
      faculty === "select" &&
      observer === "select" &&
      status === "select" &&
      start === "select"
    ) {
      setObservationData(userData?.observations);
    }
  }, [obsFilter]);

  const detailObs = (path) => {
    navigate(path);
  };

  return (
    <Fragment>
      <Breadcrumb title="Observation List" parent="Observations" />
      {!observationData && <Loader />}
      {observationData && (
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

                <CardBody>
                  {openFilter && (
                    <div className="mb-4">
                      <Form className="needs-validation user-add" noValidate="">
                        <FormGroup className="row">
                          <FilterOptions
                            filterOption={[
                              {
                                id: "select",
                                name: "Course",
                              },
                              {
                                id: 27,
                                name: "Embedded System",
                              },
                              {
                                id: 28,
                                name: "Personal Development",
                              },
                            ]}
                            filterValue={course}
                            changeValue={(e) => onSelectCourse(e.target.value)}
                          />
                          <FilterOptions
                            filterOption={[
                              {
                                id: "select",
                                name: "Semester",
                              },
                              {
                                id: "Spring",
                                name: "Spring",
                              },
                              {
                                id: "Fall",
                                name: "Fall",
                              },
                            ]}
                            filterValue={semester}
                            changeValue={(e) =>
                              onSelectSemester(e.target.value)
                            }
                          />
                          <FilterOptions
                            filterOption={[
                              {
                                id: "select",

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
                                id: "select",

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
                                id: "select",

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
                            changeValue={(e) => onSelectStatus(e.target.value)}
                          />
                          <FilterOptions
                            filterOption={[
                              {
                                id: "select",
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
                          {/* <th scope="col">Semester</th> */}
                          {user.role !== "Faculty" && (
                            <th scope="col">Faculty</th>
                          )}
                          {user.role !== "Observer" && (
                            <th scope="col">Observer</th>
                          )}
                          {user.role !== "Head_of_Department" && (
                            <th scope="col">Head of Department</th>
                          )}

                          <th scope="col">Obs Cycle</th>
                          <th scope="col">Starting Date</th>
                          <th scope="col">Ending Date</th>
                          <th scope="col">Progress</th>
                          <th scope="col">Status</th>
                          <th scope="col"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {observationData?.map((item) => (
                          <tr
                            key={item.id}
                            onClick={() =>
                              detailObs(
                                `${URL}/observations/detail-observation/${item.id}`
                              )
                            }
                            style={{ cursor: "pointer" }}
                            className="observation-row"
                          >
                            <td className="digits">
                              {item.course ? item.course.name : "---"}
                            </td>
                            {/* <td className="digits">{item.semester}</td> */}
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
                              {item?.obsRequest?.status === "Ongoing"
                                ? "Observation Scheduling"
                                : item.meetings?.informedObservation?.status ===
                                  "Ongoing"
                                ? "Informed Observation"
                                : item.meetings?.postObservation?.status ===
                                  "Ongoing"
                                ? "Post Observation"
                                : item.meetings?.postObservation?.status ===
                                  "Scheduled"
                                ? "Post Observation"
                                : item.meetings?.uninformedObservation
                                    ?.status === "Ongoing"
                                ? "Uninformed Observation"
                                : // : item.meetings?.professionalDPlan?.status ===
                                  //   "Ongoing"
                                  // ? "Prof development"
                                  "---"}
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
                              {/* <NavLink
                                className="d-flex align-items-center"
                                to={`${URL}/observations/detail-observation/${item.id}`}
                              >
                                <Eye size={20} />
                              </NavLink> */}
                              <span className=" d-flex flex-column align-items-center ">
                                <CheckCircle
                                  color={
                                    item.meetings?.postObservation?.status ===
                                    "Completed"
                                      ? completeColor
                                      : "lightgray"
                                  }
                                  size={20}
                                  style={{ margin: "0.1rem 0rem" }}
                                />
                                <CheckCircle
                                  color={
                                    item.meetings?.uninformedObservation
                                      ?.status === "Completed"
                                      ? completeColor
                                      : "lightgray"
                                  }
                                  size={20}
                                  style={{ margin: "0.1rem 0rem" }}
                                />{" "}
                              </span>
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
              </Card>
            </Col>
          </Row>
        </Container>
      )}
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
