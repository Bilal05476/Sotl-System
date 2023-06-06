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

const URL = process.env.PUBLIC_URL;

const List_observation = () => {
  const [{ user, userData }, dispatch] = useStateValue();

  console.log(userData);

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
    } catch (error) {
      console.log(error.message);
    }
  }
  useEffect(() => {
    fetchData();
    window.scrollTo(0, 0);
  }, []);

  const [openFilter, setOpenFilter] = useState(false);
  const [obsFilter, setObsFilter] = useState({
    course: 0,
    semester: "All",
    faculty: 0,
    observer: 0,
    status: "All",
    start: "All",
  });
  const { course, semester, faculty, observer, status, start } = obsFilter;
  const [observationData, setObservationData] = useState(
    userData?.observations
  );
  const applyFilter = () => {
    if (course !== 0) {
      const filteredByCourse = userData?.observations?.filter(
        (item) => item.courseId === course
      );
      setObservationData(filteredByCourse);
    }
    if (semester !== "All") {
      const filteredByCourse = userData?.observations?.filter(
        (item) => item.semester === semester
      );
      setObservationData(filteredByCourse);
    } else {
      setObservationData(userData?.observations);
    }
    // const filteredBy = userData?.observations?.filter(
    //   (item) =>
    //     (item.courseId === course !== 0 && course) ||
    //     (item.facultyId === faculty !== 0 && faculty)
    // );
  };
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
                            filtername="Course"
                            filterOption={[]}
                            filterValue={course}
                            changeValue={(value) =>
                              setObsFilter({
                                ...obsFilter,
                                course: value,
                              })
                            }
                          />
                          <FilterOptions
                            filtername="Semester"
                            filterOption={[
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
                            changeValue={(value) =>
                              setObsFilter({
                                ...obsFilter,
                                semester: value,
                              })
                            }
                          />
                          <FilterOptions
                            filtername="Faculty"
                            filterOption={[]}
                            filterValue={faculty}
                            setObsFilter={setObsFilter}
                            obsFilter={obsFilter}
                          />
                          <FilterOptions
                            filtername="Observer"
                            filterOption={[]}
                            filterValue={observer}
                            setObsFilter={setObsFilter}
                            obsFilter={obsFilter}
                          />
                          <FilterOptions
                            filtername="Status"
                            filterOption={[]}
                            filterValue={status}
                            setObsFilter={setObsFilter}
                            obsFilter={obsFilter}
                          />
                        </FormGroup>
                      </Form>
                      <Button
                        onClick={() => applyFilter()}
                        className="btn btn-primary d-flex justify-self-flex-end"
                      >
                        Apply Filter
                      </Button>
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
                            <td className="digits">{item.course.name}</td>
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

const FilterOptions = ({
  filtername,
  filterOption,
  filterValue,
  changeValue,
}) => {
  return (
    <>
      <Label className="col-xl-2 col-3 mb-2">
        <span>*</span> {filtername}
      </Label>
      <div className="col-xl-2 col-3 mb-2">
        <Input
          className="form-control"
          id="validationCustom3"
          type="select"
          required={true}
          value={filterValue}
          onChange={(e) => changeValue(e.target.value)}
        >
          <option value="Select">Select</option>
          {filterOption?.map((item) => (
            <option key={item?.id} value={item?.id}>
              {item?.name}
            </option>
          ))}
        </Input>
      </div>
    </>
  );
};

export default List_observation;
