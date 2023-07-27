import React, { Fragment, useEffect, useRef, useState } from "react";
import { Button, Col, Container, Row, Table } from "reactstrap";
import { NavLink, useParams } from "react-router-dom";
import Breadcrumb from "../common/breadcrumb";
import { Loader, DownloadCloud } from "react-feather";
import { useStateValue } from "../../StateProvider";
import {
  fetchCoursesAndUsers,
  fetchObservation,
  startScheduling,
} from "../Endpoints";
import { info } from "../../constants/Toasters";
import { completeColor, completeColor2 } from "../colors";
import { dateFormater, dateFormater2 } from "../DateFormater";
import { PopupModal, PostTimeModal } from "../PopupModal";

const Detail_observation = () => {
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState("open");
  const [obsDetail, setObsDetail] = useState("");
  const [openPopup, setOpenPopup] = useState(false);
  const [cid, setcid] = useState("");
  const [facultycourses, setfacultycourses] = useState([]);
  const toastId = useRef(null);

  const [{ user, usersandcourses }, dispatch] = useStateValue();

  useEffect(() => {
    fetchObservation(setObsDetail, Number(id));
    fetchCoursesAndUsers(dispatch);
    window.scrollTo(0, 0);
  }, []);

  // const handleAccordion = (selector) => {
  //   if (selector === isOpen) {
  //     setIsOpen("");
  //   } else {
  //     setIsOpen(selector);
  //   }
  // };

  const startSchedule = () => {
    setOpenPopup(false);
    startScheduling(
      obsDetail?.facultyId,
      Number(id),
      cid,
      toastId,
      setObsDetail
    );
    // console.log(obsDetail?.facultyId, Number(id), cid, toastId);
    info("Scheduling Creating...");
  };

  const selectCourse = () => {
    setOpenPopup(!openPopup);
    obsDetail?.faculty.courseSlots.map((item) =>
      setfacultycourses([
        ...facultycourses,
        {
          sid: item.id,
          cid: item.course.id,
          n: `${item.course.name} on ${item.day} ${item.time} at ${item.location}`,
        },
      ])
    );
  };

  // return;
  console.log(obsDetail);

  const [postTimingOpen, setPostTimingOpen] = useState(false);
  return (
    <Fragment>
      <Breadcrumb title="Detail Observation" parent="Observations" />
      <PopupModal
        open={openPopup}
        setOpen={setOpenPopup}
        facultycourses={facultycourses}
        setfacultycourses={setfacultycourses}
        course={cid}
        setCourse={setcid}
        startSchedule={startSchedule}
      />
      {/* <SchedulingModel id="exampleModal" /> */}
      {obsDetail && (
        <Container fluid={true}>
          {/* <Row className="mb-3"> */}
          {/* {user.role !== "Faculty" && (
              <Col className="xl-25">
                <span style={{ fontWeight: "200" }}>Faculty:</span>{" "}
                {obsDetail?.faculty.name}
              </Col>
            )} */}
          {/* {user.role !== "Observer" && (
              <Col className="xl-25">
                <span style={{ fontWeight: "200" }}>Observer:</span>{" "}
                {obsDetail?.observer.name}
              </Col>
            )} */}
          {/* {user.role !== "Head_of_Department" && (
              <Col className="xl-25 text-right">
                <span style={{ fontWeight: "200" }}>Head of Department:</span>{" "}
                {obsDetail?.hod.name}
              </Col>
            )} */}
          {/* <Col className="xl-25 text-right">
              <span style={{ fontWeight: "200" }}>Progress:</span>{" "}
              {obsDetail?.observationProgress}%
              <span style={{ marginLeft: "1rem", fontWeight: "200" }}>
                Status:
              </span>{" "}
              {obsDetail?.observationStatus}
            </Col> */}
          {/* </Row> */}
          {/* <Row className="mb-3"> */}
          {/* <Col className="xl-50 text-right">
              <span style={{ fontWeight: "200" }}>Course:</span>{" "}
              {obsDetail?.course.name}
            </Col> */}
          {/* <Col className="xl-25 text-right">
              <span style={{ fontWeight: "200" }}>(F):</span> Faculty
              <span style={{ marginLeft: "1rem", fontWeight: "200" }}>
                (O):
              </span>{" "}
              Observer
            </Col> */}
          {/* </Row> */}
          <div className="accordion">
            <div className="accordion-item overflow-hidden mb-5">
              <button
                className="btn btn-block text-light"
                // onClick={() => handleAccordion("scheduling")}
                style={{
                  backgroundColor: completeColor,
                  outline: "none",
                  boxShadow: "none",
                  padding: "15px",
                  width: "100%",
                  borderBottomLeftRadius: "0",
                  borderBottomRightRadius: "0",
                }}
                type="button"
                aria-expanded="true"
              >
                Observation Scheduling
              </button>
              {obsDetail.obsRequest ? (
                <>
                  {isOpen === "open" && (
                    <div className="accordion-body px-2 user-status table-responsive latest-order-table">
                      <Table borderless>
                        <thead>
                          <tr>
                            <th scope="col">Slot By Observer</th>
                            <th scope="col">Slots By Faculty</th>
                            <th scope="col">Teaching Plan</th>

                            <th scope="col">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="digits">
                              {obsDetail?.obsRequest?.timeSlotByObserver?.map(
                                (item) => (
                                  <Spanner day={item.day} time={item.time} />
                                )
                              )}
                            </td>
                            <td className="digits">
                              {obsDetail?.obsRequest?.timeSlotsByFaculty?.map(
                                (item) => (
                                  <Spanner day={item.day} time={item.time} />
                                )
                              )}
                            </td>
                            <td className="digits" title="Download">
                              {obsDetail?.obsRequest?.teachingPlan[0]
                                ?.editedBy && (
                                <span
                                  className="d-flex alogn-items-center"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => alert("PDF Downloaded")}
                                >
                                  <DownloadCloud
                                    className="mx-2"
                                    color={completeColor}
                                    size={20}
                                  />{" "}
                                  Download
                                </span>
                              )}
                            </td>

                            <td
                              className={`digits ${
                                obsDetail?.obsRequest.status === "Completed"
                                  ? "text-success"
                                  : "text-danger"
                              }`}
                            >
                              {obsDetail.obsRequest?.status}
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                      {obsDetail.obsRequest?.status !== "Completed" && (
                        <>
                          {user.role === "Faculty" ||
                          user.role === "Observer" ? (
                            <div
                              style={{
                                textAlign: "right",
                              }}
                            >
                              <NavLink
                                to={`/observations/observation-scheduling/${obsDetail?.id}`}
                                className="btn btn-primary mx-2"
                              >
                                Edit Scheduling
                              </NavLink>
                            </div>
                          ) : (
                            <></>
                          )}
                        </>
                      )}
                    </div>
                  )}
                </>
              ) : (
                <>
                  {isOpen === "open" && (
                    <div className="accordion-body text-center">
                      <strong>Not started!</strong>
                      <br />
                      {user.role === "Observer" && (
                        <button
                          className="mt-2 btn btn-primary"
                          onClick={() => selectCourse()}
                        >
                          Select Course
                        </button>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          <div className="accordion">
            <div className="accordion-item overflow-hidden mb-5">
              <button
                className="btn btn-block text-light"
                // onClick={() => handleAccordion("informed")}
                style={{
                  backgroundColor: completeColor,
                  outline: "none",
                  boxShadow: "none",
                  padding: "15px",
                  width: "100%",
                  borderBottomLeftRadius: "0",
                  borderBottomRightRadius: "0",
                }}
                type="button"
                aria-expanded="true"
              >
                Informed Observation
              </button>
              {obsDetail.meetings?.informedObservation ? (
                <>
                  {isOpen === "open" && (
                    <div className="accordion-body px-2 user-status table-responsive latest-order-table">
                      <Table borderless>
                        <thead>
                          <tr>
                            {/* <th scope="col">Id</th> */}
                            <th scope="col">
                              Final Score{" "}
                              <span
                                style={{ color: "#f1f1f1", fontSize: "0.8rem" }}
                              >
                                (avg. observer and faculty)
                              </span>
                            </th>
                            <th scope="col">Schedule on</th>
                            <th scope="col">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            {/* <td className={"digits"}>
                              {obsDetail?.meetings.informedObservation.id}
                            </td> */}
                            <td className={"digits "}>
                              {
                                obsDetail?.meetings.informedObservation
                                  .finalScore
                              }
                            </td>
                            {dateFormater(obsDetail?.starting)}
                            <td
                              className={`digits ${
                                obsDetail?.meetings.informedObservation
                                  .status === "Completed"
                                  ? "text-success"
                                  : "text-primary"
                              }`}
                            >
                              {obsDetail?.meetings.informedObservation.status}
                            </td>
                          </tr>
                        </tbody>
                      </Table>

                      <div style={{ textAlign: "right" }}>
                        <NavLink
                          to={`/observations/observation-rubric/${id}`}
                          className="btn btn-primary mx-2"
                        >
                          Open Rubrics
                        </NavLink>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <>
                  {isOpen === "open" && (
                    <div className="accordion-body text-center">
                      <strong>Not started!</strong>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
          <div className="accordion">
            <div className="accordion-item overflow-hidden mb-5">
              <button
                className="btn btn-block text-light"
                // onClick={() => handleAccordion("post")}
                style={{
                  backgroundColor: completeColor,
                  outline: "none",
                  boxShadow: "none",
                  padding: "15px",
                  width: "100%",
                  borderBottomLeftRadius: "0",
                  borderBottomRightRadius: "0",
                }}
                type="button"
                aria-expanded="true"
              >
                Post Informed Meeting
              </button>
              {obsDetail.meetings?.postObservation ? (
                <>
                  {isOpen === "open" && (
                    <div className="accordion-body px-2 user-status table-responsive latest-order-table">
                      <Table borderless>
                        <thead>
                          <tr>
                            {/* <th scope="col">Id</th> */}
                            <th scope="col">Reflection Plan</th>
                            <th scope="col">Artifacts</th>
                            <th scope="col">Schedule On</th>
                            <th scope="col">Location</th>
                            <th scope="col">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            {[0, 1].map((item) => (
                              <td
                                key={item}
                                className="digits"
                                title="Download"
                              >
                                {obsDetail?.meetings?.postObservation
                                  ?.reflectionPlan[0]?.editedBy && (
                                  <span
                                    className="d-flex alogn-items-center"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => alert("PDF Downloaded")}
                                  >
                                    <DownloadCloud
                                      className="mx-2"
                                      color={completeColor}
                                      size={20}
                                    />{" "}
                                    Download
                                  </span>
                                )}
                              </td>
                            ))}
                            <td>
                              {dateFormater2(
                                obsDetail?.meetings?.postObservation
                                  ?.scheduledOn
                              )}
                            </td>
                            <td>
                              {obsDetail?.meetings?.postObservation?.location}
                            </td>
                            <td
                              className={`digits ${
                                obsDetail?.meetings.postObservation.status ===
                                "Completed"
                                  ? "text-success"
                                  : "text-primary"
                              }`}
                            >
                              {obsDetail?.meetings.postObservation.status}
                            </td>
                          </tr>
                        </tbody>
                      </Table>

                      <div style={{ textAlign: "right" }}>
                        <NavLink
                          to={`/observations/post-observation-meeting/${id}`}
                          className="btn btn-primary mx-2"
                        >
                          Open
                        </NavLink>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <>
                  {isOpen === "open" && (
                    <div className="accordion-body text-center">
                      <strong>Not started!</strong>
                      <br />
                      {obsDetail?.meetings?.informedObservation
                        ?.facultyScore !== 0 &&
                      obsDetail?.meetings?.informedObservation
                        ?.observerScore !== 0 &&
                      user.role === "Observer" ? (
                        <NavLink
                          to={`/observations/post-observation-meeting/${id}`}
                          className="btn btn-primary mt-2 mx-2"
                        >
                          Schedule Post Observation
                        </NavLink>
                      ) : (
                        <></>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
          <div className="accordion">
            <div className="accordion-item overflow-hidden mb-5">
              <button
                className="btn btn-block text-light"
                // onClick={() => handleAccordion("uninformed")}
                style={{
                  backgroundColor: completeColor,
                  outline: "none",
                  boxShadow: "none",
                  padding: "15px",
                  width: "100%",
                  borderBottomLeftRadius: "0",
                  borderBottomRightRadius: "0",
                }}
                type="button"
                aria-expanded="true"
              >
                Uninformed Observation
              </button>
              {obsDetail.meetings?.uninformedObservation ? (
                <>
                  {isOpen === "open" && (
                    <div className="accordion-body">
                      <strong>Ruko zara, sabar karo!</strong>
                    </div>
                  )}
                </>
              ) : (
                <>
                  {isOpen === "open" && (
                    <div className="accordion-body text-center">
                      <strong>Not started!</strong>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </Container>
      )}
      {!obsDetail && (
        <Loader size={28} style={{ display: "block", margin: "1.5rem auto" }} />
      )}
    </Fragment>
  );
};

const Spanner = ({ day, time }) => {
  return (
    <span
      style={{
        background: completeColor2,
        color: "#fff",
        padding: "0.1rem 0.4rem",
        marginRight: "0.2rem",
        borderRadius: "5px",
      }}
    >
      {day} {time}
    </span>
  );
};

export default Detail_observation;
