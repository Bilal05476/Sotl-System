import React, { Fragment, useEffect, useRef, useState } from "react";
import { Col, Container, Row, Table } from "reactstrap";
import { NavLink, useParams } from "react-router-dom";
import Breadcrumb from "../common/breadcrumb";
import { Loader, DownloadCloud, Eye } from "react-feather";
import { useStateValue } from "../../StateProvider";
import { fetchObservation, startScheduling } from "../Endpoints";
import { errors, info } from "../../constants/Toasters";
import { completeColor } from "../colors";

const Detail_observation = () => {
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState("open");
  const [obsDetail, setObsDetail] = useState("");

  const [{ user }] = useStateValue();

  useEffect(() => {
    fetchObservation(setObsDetail, Number(id));
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
    startScheduling(obsDetail?.facultyId, Number(id));
    info("Scheduling Creating...");
    setTimeout(() => {
      fetchObservation(setObsDetail, Number(id));
    }, 1500);
  };

  // return;
  // console.log(obsDetail);
  return (
    <Fragment>
      <Breadcrumb title="Detail Observation" parent="Observations" />
      {/* <SchedulingModel id="exampleModal" /> */}
      {obsDetail && (
        <Container fluid={true}>
          <Row className="mb-3">
            <Col className="xl-25">
              {" "}
              <span style={{ fontWeight: "200" }}>Faculty:</span>{" "}
              {obsDetail?.faculty.name}
            </Col>
            <Col className="xl-25">
              {" "}
              <span style={{ fontWeight: "200" }}>Observer:</span>{" "}
              {obsDetail?.observer.name}
            </Col>
            <Col className="xl-25 text-right">
              <span style={{ fontWeight: "200" }}>Head of Department:</span>{" "}
              {obsDetail?.hod.name}
            </Col>
            <Col className="xl-25 text-right">
              <span style={{ fontWeight: "200" }}>Progress:</span>{" "}
              {obsDetail?.observationProgress}%
              <span style={{ marginLeft: "1rem", fontWeight: "200" }}>
                Status:
              </span>{" "}
              {obsDetail?.observationStatus}
            </Col>
          </Row>
          <Row className="mb-3">
            <Col className="xl-50 text-right">
              <span style={{ fontWeight: "200" }}>Course:</span>{" "}
              {obsDetail?.course.name}
            </Col>
            <Col className="xl-25 text-right">
              <span style={{ fontWeight: "200" }}>(F):</span> Faculty
              <span style={{ marginLeft: "1rem", fontWeight: "200" }}>
                (O):
              </span>{" "}
              Observer
            </Col>
          </Row>
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
                                (item) => `${item.day} ${item.time} `
                              )}
                            </td>
                            <td className="digits">
                              {obsDetail?.obsRequest?.timeSlotsByFaculty?.map(
                                (item) => `${item.day} ${item.time} `
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
                      <strong>No data!</strong>
                      <br />
                      {user.role === "Observer" && (
                        <button
                          className="mt-2 btn btn-primary"
                          onClick={() => startSchedule()}
                        >
                          Start Scheduling
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
                            {dateFormated(obsDetail?.starting)}
                            {/* <td className="digits">{obsDetail?.starting}</td> */}
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
                      <strong>No data!</strong>
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
                    <div className="accordion-body">
                      <strong>Ruko zara, sabar karo!</strong>
                    </div>
                  )}
                </>
              ) : (
                <>
                  {isOpen === "open" && (
                    <div className="accordion-body text-center">
                      <strong>No data!</strong>
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
                      <strong>No data!</strong>
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

const dateFormated = (dateToFromat) => {
  const date = new Date(dateToFromat);
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return <td className="digits">{formattedDate}</td>;
};

export default Detail_observation;
