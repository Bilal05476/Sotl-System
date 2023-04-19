import React, { Fragment, useEffect, useState } from "react";
import { Col, Container, Row, Table } from "reactstrap";
import { NavLink, useParams } from "react-router-dom";
import Breadcrumb from "../common/breadcrumb";
import { Loader } from "react-feather";

const Detail_observation = () => {
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState("scheduling");
  const [obsDetail, setObsDetail] = useState("");
  const viewObs = async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/observation/${id}`, {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const data = await res.json();
      if (!data.error) {
        setObsDetail(data);
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
  // return null;
  return (
    <Fragment>
      <Breadcrumb title="Detail Observation" parent="Observations" />
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
            </Col>
          </Row>
          <div className="accordion">
            <div className="accordion-item overflow-hidden mb-5">
              <button
                className="btn btn-block text-light"
                onClick={() => setIsOpen("scheduling")}
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
              {obsDetail?.obsRequest ? (
                <>
                  {isOpen === "scheduling" && (
                    <div className="accordion-body px-2 user-status table-responsive latest-order-table">
                      <Table borderless>
                        <thead>
                          <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Course</th>
                            <th scope="col">TimeSlot (O)</th>
                            <th scope="col">TimeSlots (F)</th>
                            <th scope="col">Artifact</th>
                            <th scope="col">Teaching Plan (F)</th>
                            <th scope="col">Teaching Plan (O)</th>
                            <th scope="col">Reflection Plan (F)</th>
                            <th scope="col">Reflection Plan (O)</th>
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
                              {obsDetail?.obsRequest.timeSlotsByFaculty.map(
                                (item) => `${item} `
                              )}
                            </td>
                            <td className="digits">
                              {obsDetail?.obsRequest.timeSlotsByObserver.map(
                                (item) => `${item} `
                              )}
                            </td>
                            <td className="digits">
                              {obsDetail?.obsRequest.artifcats}
                            </td>

                            <td className="digits">
                              {obsDetail?.obsRequest.teachingPlanByFaculty}
                            </td>
                            <td className="digits">
                              {obsDetail?.obsRequest.teachingPlanByObserver}
                            </td>
                            <td className="digits">
                              {obsDetail?.obsRequest.refelectionPlanByFaculty
                                ? obsDetail?.obsRequest.refelectionPlanByFaculty
                                : "--"}
                            </td>
                            <td className="digits">
                              {obsDetail?.obsRequest.refelectionPlanByObserver}
                            </td>
                            <td
                              className={`digits ${
                                obsDetail?.obsRequest.status === "Completed"
                                  ? "text-success"
                                  : "text-danger"
                              }`}
                            >
                              {obsDetail?.obsRequest.status}
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                  )}
                </>
              ) : (
                <>
                  {isOpen === "scheduling" && (
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
                onClick={() => setIsOpen("informed")}
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
              {obsDetail?.meetings.informedObservation ? (
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
                onClick={() => setIsOpen("post")}
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
              {obsDetail?.meetings.postObservation ? (
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
                onClick={() => setIsOpen("uninformed")}
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
              {obsDetail?.meetings.uninformedObservation ? (
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
      {!obsDetail && <Loader />}
    </Fragment>
  );
};

export default Detail_observation;
