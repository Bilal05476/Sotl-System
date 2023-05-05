import React, { Fragment, useEffect, useState } from "react";
import { Col, Container, Row, Table } from "reactstrap";
import { NavLink, useParams } from "react-router-dom";
import Breadcrumb from "../common/breadcrumb";
import { Loader, DownloadCloud } from "react-feather";
import { useStateValue } from "../../StateProvider";

const Detail_observation = () => {
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState("");
  const [obsDetail, setObsDetail] = useState("");

  const [{ user }] = useStateValue();
  const viewObs = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/observation/${id}`,
        {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      const data = await res.json();
      if (!data.error) {
        setObsDetail(data);
        console.log(data);
      } else {
        console.log(data.error);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    viewObs();
  }, []);

  const handleAccordion = (selector) => {
    if (selector === isOpen) {
      setIsOpen("");
    } else {
      setIsOpen(selector);
    }
  };

  console.log(obsDetail);

  // return;
  return (
    <Fragment>
      <Breadcrumb title="Detail Observation" parent="Observations" />
      {/* <SchedulingModel id="exampleModal" /> */}
      {obsDetail && (
        <Container fluid={true}>
          <Row className="mb-3">
            <Col className="xl-25">
              {" "}
              <span style={{ fontWeight: "500" }}>Faculty:</span>{" "}
              {obsDetail?.faculty.name}
            </Col>
            <Col className="xl-25">
              {" "}
              <span style={{ fontWeight: "500" }}>Observer:</span>{" "}
              {obsDetail?.observer.name}
            </Col>
            <Col className="xl-25 text-right">
              <span style={{ fontWeight: "500" }}>Head of Department:</span>{" "}
              {obsDetail?.hod.name}
            </Col>
            <Col className="xl-25 text-right">
              <span style={{ fontWeight: "500" }}>Progress:</span>{" "}
              {obsDetail?.observationProgress}%
              <span style={{ marginLeft: "1rem", fontWeight: "500" }}>
                Status:
              </span>{" "}
              {obsDetail?.observationStatus}
            </Col>
          </Row>
          <Row className="mb-3">
            <Col className="xl-25 text-right">
              <span style={{ fontWeight: "500" }}>(F):</span> Faculty
              <span style={{ marginLeft: "1rem", fontWeight: "500" }}>
                (O):
              </span>{" "}
              Observer
            </Col>
          </Row>
          <div className="accordion">
            <div className="accordion-item overflow-hidden mb-5">
              <button
                className="btn btn-block text-light"
                onClick={() => handleAccordion("scheduling")}
                style={{
                  backgroundColor: "#040b5b",
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
                  {isOpen === "scheduling" && (
                    <div className="accordion-body px-2 user-status table-responsive latest-order-table">
                      <Table borderless>
                        <thead>
                          <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Course</th>
                            <th scope="col">Time (O)</th>
                            <th scope="col">Time (F)</th>
                            <th scope="col">Artifact</th>
                            <th scope="col">Teaching (F)</th>
                            <th scope="col">Teaching (O)</th>
                            <th scope="col">Reflection (F)</th>
                            <th scope="col">Reflection (O)</th>
                            <th scope="col">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>{obsDetail?.obsRequest.id}</td>
                            <td className="digits">
                              {obsDetail?.obsRequest.course
                                ? obsDetail?.obsRequest.course
                                : "--"}
                            </td>
                            <td className="digits">
                              {obsDetail?.obsRequest?.timeSlotsByFaculty?.map(
                                (item) => `${item} `
                              )}
                            </td>
                            <td className="digits">
                              {obsDetail?.obsRequest?.timeSlotsByObserver?.map(
                                (item) => `${item} `
                              )}
                            </td>
                            <td className="digits">
                              {obsDetail?.obsRequest.artifacts ? (
                                <a
                                  href={obsDetail?.obsRequest.artifacts}
                                  target="blank"
                                >
                                  <DownloadCloud size={20} />
                                </a>
                              ) : (
                                "--"
                              )}
                            </td>

                            <td className="digits">
                              {obsDetail?.obsRequest.teachingPlanByFaculty ? (
                                <a
                                  href={
                                    obsDetail?.obsRequest.teachingPlanByFaculty
                                  }
                                  target="blank"
                                >
                                  <DownloadCloud size={20} />
                                </a>
                              ) : (
                                "--"
                              )}
                            </td>
                            <td className="digits">
                              {obsDetail?.obsRequest.teachingPlanByObserver ? (
                                <a
                                  href={
                                    obsDetail?.obsRequest.teachingPlanByObserver
                                  }
                                  target="blank"
                                >
                                  <DownloadCloud size={20} />
                                </a>
                              ) : (
                                "--"
                              )}
                            </td>
                            <td className="digits">
                              {obsDetail?.obsRequest
                                .refelectionPlanByFaculty ? (
                                <a
                                  href={
                                    obsDetail?.obsRequest
                                      .refelectionPlanByFaculty
                                  }
                                  target="blank"
                                >
                                  <DownloadCloud size={20} />
                                </a>
                              ) : (
                                "--"
                              )}
                            </td>
                            <td className="digits">
                              {obsDetail?.obsRequest
                                .refelectionPlanByObserver ? (
                                <a
                                  href={
                                    obsDetail?.obsRequest
                                      .refelectionPlanByObserver
                                  }
                                  target="blank"
                                >
                                  <DownloadCloud size={20} />
                                </a>
                              ) : (
                                "--"
                              )}
                            </td>
                            <td
                              className={`digits ${
                                obsDetail?.obsRequest.status === "Completed"
                                  ? "text-success"
                                  : "text-danger"
                              }`}
                            >
                              {obsDetail.obsRequest.status}
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                      {user.role === "Faculty" || user.role === "Observer" ? (
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
                          {obsDetail?.obsRequest?.timeSlotsByObserver && (
                            <NavLink
                              to={`/observations/observation-scheduling/${obsDetail?.id}`}
                              className="btn btn-primary mx-2"
                            >
                              Done
                            </NavLink>
                          )}
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  )}
                </>
              ) : (
                <>
                  {isOpen === "scheduling" && (
                    <div className="accordion-body text-center">
                      <strong>No data!</strong>
                      <br />
                      {user.role === "Observer" && (
                        <NavLink to="/" className="mt-2 btn btn-primary">
                          Start Scheduling
                        </NavLink>
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
                onClick={() => handleAccordion("informed")}
                style={{
                  backgroundColor: "#040b5b",
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
                  {isOpen === "informed" && (
                    <div className="accordion-body px-2 user-status table-responsive latest-order-table">
                      <Table borderless>
                        <thead>
                          <tr>
                            <th scope="col">Id</th>
                            <th scope="col">
                              Rubric Score{" "}
                              <span
                                style={{ color: "gray", fontSize: "0.8rem" }}
                              >
                                (will be finalize after post informed meeting)
                              </span>
                            </th>
                            <th scope="col">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className={"digits"}>
                              {obsDetail?.meetings.informedObservation.id}
                            </td>
                            <td className={"digits"}>
                              {
                                obsDetail?.meetings.informedObservation
                                  .finalScore
                              }
                            </td>
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
                      <NavLink
                        style={{
                          backgroundColor: "#040b5b",
                          outline: "none",
                          boxShadow: "none",
                          padding: "15px",
                          width: "20%",
                          border: "0",
                          color: "#fff",
                          borderRadius: "5px",
                          marginRight: "1rem",
                          fontWeight: "700",
                          display: "block",
                          marginLeft: "auto",
                          cursor: "pointer",
                          textDecoration: "none",
                          textAlign: "center",
                        }}
                        to={`/observations/${id}/observation-rubric`}
                      >
                        RUBRICS
                      </NavLink>
                    </div>
                  )}
                </>
              ) : (
                <>
                  {isOpen === "informed" && (
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
                onClick={() => handleAccordion("post")}
                style={{
                  backgroundColor: "#040b5b",
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
                  {isOpen === "post" && (
                    <div className="accordion-body">
                      <strong>Ruko zara, sabar karo!</strong>
                    </div>
                  )}
                </>
              ) : (
                <>
                  {isOpen === "post" && (
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
                onClick={() => handleAccordion("uninformed")}
                style={{
                  backgroundColor: "#040b5b",
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
                  {isOpen === "uninformed" && (
                    <div className="accordion-body">
                      <strong>Ruko zara, sabar karo!</strong>
                    </div>
                  )}
                </>
              ) : (
                <>
                  {isOpen === "uninformed" && (
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

export default Detail_observation;
