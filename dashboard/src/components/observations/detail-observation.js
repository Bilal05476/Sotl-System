import React, { Fragment, useEffect, useRef, useState } from "react";
import { Button, Col, Container, Row, Table } from "reactstrap";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import Breadcrumb from "../common/breadcrumb";
import { DownloadCloud, Eye, EyeOff } from "react-feather";
import { Loader } from "../common/Loader";
import { useStateValue } from "../../StateProvider";
import logo from "../../assets/images/blue-version.png";

import {
  createRubricScoring,
  deleteObservation,
  fetchHodData,
  fetchObservation,
  startScheduling,
} from "../Endpoints";
import { errors, info, successes } from "../../constants/Toasters";
import { completeColor, completeColor2 } from "../colors";
import { dateFormater, dateFormater2 } from "../DateFormater";
import { PopupModal } from "../PopupModal";
import { useReactToPrint } from "react-to-print";

const BASEURL =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_DEV_URL
    : process.env.REACT_APP_PROD_URL;

const Detail_observation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // const [isOpen, setIsOpen] = useState("open");
  const [obsDetail, setObsDetail] = useState("");
  const [openPopup, setOpenPopup] = useState(false);
  const [cid, setcid] = useState("");
  const [facultycourses, setfacultycourses] = useState([]);
  const toastId = useRef(null);
  const [loader, setLoader] = useState(false);
  const [facultySchedule, setFacultySchedule] = useState([]);

  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    fetchObservation(setObsDetail, Number(id));
    if (user.role === "Head_of_Department")
      fetchHodData(dispatch, user.department.id, user.role, user.id);
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
          n: item.course.name,
          // n: `${item.course.name} on ${item.day} ${item.time} at ${item.location}`,
        },
      ])
    );
  };

  // return;

  // const [postTimingOpen, setPostTimingOpen] = useState(false);

  const [teahingTempView, setTeachingTempView] = useState(false);
  const [refTempView, setRefTempView] = useState(false);

  const componentRef = useRef();
  const printTemplatePlan = useReactToPrint({
    content: () => componentRef.current,
  });

  const TemplatePrint = React.forwardRef((props, ref) => {
    const currentDate = new Date();
    const { template, obsId, type, faculty, observer } = props;

    const formattedDate = `${currentDate.getDate()}-${
      currentDate.getMonth() + 1
    }-${currentDate.getFullYear()}`;

    const divStyle = {
      background: "white",
      position: "relative",
    };

    return (
      <div className="p-4" style={divStyle} ref={ref}>
        <img
          src={logo}
          style={{
            position: "absolute",
            width: "110px",
            height: "100px",
            opacity: 1,
            right: 20,
            top: 62,
          }}
        />
        <div className="d-flex flex-wrap align-items-center justify-content-between">
          <small>Date: {formattedDate}</small>
          <small>SOTL | Observation Portal</small>
          <small>Observation ID: {obsId}</small>
        </div>
        <div className="d-flex flex-wrap align-items-center justify-content-between">
          <small>Faculty: {faculty}</small>
          <small>Obsever: {observer} </small>
        </div>
        <div className="mt-4 text-center">
          <h3 className="text-dark" style={{ fontWeight: "600" }}>
            {type} PLAN
          </h3>
        </div>

        {template.map((item, ind) => (
          <Content
            key={item.id}
            field={item.field}
            response={item?.response}
            index={ind}
            len={template.length}
          />
        ))}

        {/* <div className="d-flex my-5 align-items-center justify-content-between">
          <p className="m-0 text-dark">
            Signature of Obsever:{" "}
            <span style={{ color: completeColor2 }}>_____________</span>
          </p>
          <p className="m-0 text-dark">
            Signature of Head of Department:{" "}
            <span style={{ color: completeColor2 }}>_____________</span>
          </p>
        </div> */}
      </div>
    );
  });
  const Content = ({ field, response, index, len }) => {
    let humanIndex = index + 1;
    return (
      <div
        style={{
          padding: "1rem 0rem",
          borderBottom: humanIndex !== len && "1px dotted #ccc",
        }}
      >
        <h5>
          {humanIndex}. {field}
        </h5>
        <p className="m-0">{response}</p>
      </div>
    );
  };

  // CSV download
  // Function to convert API response to CSV format
  const convertToCSV = (data) => {
    const csvRows = [];

    // Determine the fields you want to include in the CSV header
    const fields = Object.keys(data[0]).filter(
      (field) => field === "field" || field === "response"
    );
    csvRows.push(fields.join(","));

    // Add data rows
    data.forEach((row) => {
      const values = fields.map((field) => row[field]);
      csvRows.push(values.join(","));
    });

    return csvRows.join("\n");
  };

  const downloadCsv = (data, name) => {
    const csvContent = convertToCSV(data);
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${name} Teaching Plan.csv`;
    document.body.appendChild(link);
    link.click();

    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const AccordButton = ({ onClick, icon }) => {
    return (
      <Button
        color="primary"
        className="d-flex align-items-center justify-content-center mx-2"
        onClick={onClick}
      >
        {icon}
      </Button>
    );
  };

  const onPosObsDone = async () => {
    const finalObsDetails = {
      observationsId: Number(id),
      status: "Completed",
    };

    info("Done Post Observation Scheduling...");
    const res = await fetch(`${BASEURL}/observation/post-scheduling`, {
      method: "PUT",
      body: JSON.stringify(finalObsDetails),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const data = await res.json();

    if (data.error) {
      errors(data.error);
    } else {
      successes(data.message);
      fetchObservation(setObsDetail, Number(id));
    }
  };
  const showFacultySchedule = async (id) => {
    const BASEURL =
      process.env.NODE_ENV === "development"
        ? process.env.REACT_APP_DEV_URL
        : process.env.REACT_APP_PROD_URL;

    if (facultySchedule.length === 0) {
      setLoader(true);
      try {
        const res = await fetch(`${BASEURL}/user/${id}`, {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
        setLoader(false);

        const data = await res.json();
        setFacultySchedule(data.slots);
      } catch (error) {
        console.log(error.message);
        setLoader(false);
      }
    } else {
      setFacultySchedule([]);
    }
  };

  console.log(obsDetail?.meetings?.postObservation?.reflectionPlan?.editedBy);

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
          {user.role === "Super_Admin" && (
            <Row className="mb-3 d-flex justify-content-end">
              <Col className="col-3 d-flex justify-content-end">
                <Button
                  disabled={loader}
                  onClick={() =>
                    deleteObservation(
                      Number(id),
                      setLoader,
                      navigate,
                      user.token
                    )
                  }
                  className="btn btn-danger"
                >
                  {loader ? <Loader /> : "Delete Observation"}
                </Button>
              </Col>
            </Row>
          )}

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
                Informed Observation Scheduling
              </button>
              {obsDetail.obsRequest ? (
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
                        <td className="digits">
                          {obsDetail?.obsRequest?.teachingPlan?.editedBy && (
                            <span
                              className="d-flex alogn-items-center"
                              style={{ cursor: "pointer" }}
                            >
                              {teahingTempView && (
                                <>
                                  <AccordButton
                                    onClick={() =>
                                      downloadCsv(
                                        obsDetail?.obsRequest?.teachingPlan
                                          .steps,
                                        obsDetail?.obsRequest?.teachingPlan
                                          .editedBy.name
                                      )
                                    }
                                    icon=".CSV"
                                  />
                                  <AccordButton
                                    onClick={() => printTemplatePlan()}
                                    icon=".PDF"
                                  />
                                </>
                              )}
                              {teahingTempView ? (
                                <AccordButton
                                  onClick={() => setTeachingTempView(false)}
                                  icon={<EyeOff color="white" size={20} />}
                                />
                              ) : (
                                <AccordButton
                                  onClick={() => setTeachingTempView(true)}
                                  icon={<Eye color="white" size={20} />}
                                />
                              )}
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
                  {teahingTempView && (
                    <TemplatePrint
                      ref={componentRef}
                      template={obsDetail?.obsRequest?.teachingPlan.steps}
                      obsId={obsDetail?.id}
                      type={"TEACHING"}
                      faculty={obsDetail?.faculty.name}
                      observer={obsDetail?.observer.name}
                    />
                  )}
                  {obsDetail.obsRequest?.status !== "Completed" && (
                    <div
                      style={{
                        textAlign: "right",
                      }}
                    >
                      {user.role === "Faculty" ||
                      (user.role === "Observer" &&
                        obsDetail?.obsRequest?.teachingPlan?.editedBy) ? (
                        <NavLink
                          to={`/observations/observation-scheduling/${obsDetail?.id}`}
                          className="btn btn-primary mx-2"
                        >
                          Edit Scheduling
                        </NavLink>
                      ) : (
                        <></>
                      )}
                    </div>
                  )}
                </div>
              ) : (
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
                <div className="accordion-body px-2 user-status table-responsive latest-order-table">
                  <Table borderless>
                    <thead>
                      <tr>
                        {/* <th scope="col">Id</th> */}
                        <th scope="col">
                          Rubrics Score{" "}
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
                        <td className={"digits "} style={{ fontWeight: "800" }}>
                          {(
                            (obsDetail?.meetings.informedObservation
                              .observerScore +
                              obsDetail?.meetings.informedObservation
                                .facultyScore) /
                            2
                          ).toFixed(1)}{" "}
                          / 80.0
                        </td>
                        {dateFormater(obsDetail?.starting)}
                        <td
                          className={`digits ${
                            obsDetail?.meetings.informedObservation.status ===
                            "Completed"
                              ? "text-success"
                              : "text-primary"
                          }`}
                        >
                          {obsDetail?.meetings.informedObservation.status}
                        </td>
                      </tr>
                    </tbody>
                  </Table>

                  <div className="pull-right">
                    <NavLink
                      to={`/observations/observation-rubric/${id}`}
                      className="btn btn-primary mx-2"
                    >
                      Open Rubrics
                    </NavLink>
                  </div>
                </div>
              ) : (
                <div className="accordion-body text-center">
                  <strong>Not started!</strong>
                </div>
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
                <div className="accordion-body px-2 user-status table-responsive latest-order-table">
                  <Table borderless>
                    <thead>
                      <tr>
                        {/* <th scope="col">Id</th> */}
                        <th scope="col">
                          Rubrics Score{" "}
                          <span
                            style={{ color: "#f1f1f1", fontSize: "0.8rem" }}
                          >
                            (avg. observer and faculty)
                          </span>
                        </th>
                        {/* <th scope="col">Schedule on</th> */}
                        <th scope="col">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        {/* <td className={"digits"}>
                              {obsDetail?.meetings.informedObservation.id}
                            </td> */}
                        <td className={"digits "} style={{ fontWeight: "800" }}>
                          {(
                            (obsDetail?.meetings.uninformedObservation
                              .observerScore +
                              obsDetail?.meetings.uninformedObservation
                                .facultyScore) /
                            2
                          ).toFixed(1)}{" "}
                          / 80.0
                        </td>
                        {/* {dateFormater(obsDetail?.starting)} */}
                        <td
                          className={`digits ${
                            obsDetail?.meetings.uninformedObservation.status ===
                            "Completed"
                              ? "text-success"
                              : "text-primary"
                          }`}
                        >
                          {obsDetail?.meetings.uninformedObservation.status}
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                  <div className="pull-right">
                    {obsDetail?.meetings?.uninformedObservation && (
                      <>
                        {user.role !== "Faculty" && (
                          <button
                            disabled={loader}
                            className="btn btn-primary mt-2 mx-2"
                            onClick={() =>
                              showFacultySchedule(obsDetail.facultyId)
                            }
                          >
                            {loader ? (
                              <Loader />
                            ) : (
                              <>
                                {facultySchedule.length > 0
                                  ? "Hide Faculty Schedule"
                                  : "Show Faculty Schedule"}
                              </>
                            )}
                          </button>
                        )}
                        <NavLink
                          className="btn btn-primary mt-2 mx-2"
                          to={`/observations/uninformed-observation-rubric/${id}`}
                        >
                          Open Rubrics
                        </NavLink>
                      </>
                    )}
                  </div>
                </div>
              ) : (
                <div className="accordion-body text-center">
                  <strong>Not started!</strong>
                  <br />

                  {!obsDetail?.meetings?.uninformedObservation &&
                    obsDetail?.meetings?.informedObservation?.status ===
                      "Completed" &&
                    user.role === "Observer" && (
                      <>
                        <button
                          disabled={loader}
                          className="btn btn-primary mt-2 mx-2"
                          onClick={() =>
                            showFacultySchedule(obsDetail.facultyId)
                          }
                        >
                          {loader ? (
                            <Loader />
                          ) : (
                            <>
                              {facultySchedule.length > 0
                                ? "Hide Faculty Schedule"
                                : "Show Faculty Schedule"}
                            </>
                          )}
                        </button>
                        <button
                          disabled={loader}
                          className="btn btn-primary mt-2 mx-2"
                          onClick={() =>
                            createRubricScoring(
                              obsDetail.id,
                              setLoader,
                              setObsDetail
                            )
                          }
                        >
                          {loader ? <Loader /> : "Start Rubric Scoring"}
                        </button>
                      </>
                    )}
                </div>
              )}
              <div className="px-3 text-center">
                {facultySchedule.length > 0 && (
                  <Table borderless>
                    <thead>
                      <tr>
                        <th scope="col">Course code</th>
                        <th scope="col">Course</th>
                        <th scope="col">Time slot</th>
                      </tr>
                    </thead>
                    <tbody>
                      {facultySchedule.map((item) => (
                        <tr>
                          <td style={{ width: "33.33%" }} className="digits">
                            {item.course.courseCode}
                          </td>
                          <td
                            style={{
                              width: "33.33%",
                              borderRight: "1px solid #ccc",
                              borderLeft: "1px solid #ccc",
                            }}
                            className="digits"
                          >
                            {item.course.name}
                          </td>
                          <td style={{ width: "33.33%" }} className="digits">
                            {item.day}-{item.time}-{item.location}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                )}
              </div>
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
                Post Observation Meeting Scheduling (Face to Face)
              </button>
              {obsDetail.meetings?.postObservation ? (
                <div className="accordion-body px-2 user-status table-responsive latest-order-table">
                  <Table borderless>
                    <thead>
                      <tr>
                        {/* <th scope="col">Id</th> */}
                        <th scope="col">Reflection Plan</th>
                        {/* <th scope="col">Artifacts</th> */}
                        <th scope="col">Schedule On</th>
                        <th scope="col">Location</th>
                        <th scope="col">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="digits">
                          {obsDetail?.meetings?.postObservation?.reflectionPlan
                            ?.editedBy && (
                            <span
                              className="d-flex alogn-items-center"
                              style={{ cursor: "pointer" }}
                            >
                              {refTempView && (
                                <>
                                  <AccordButton
                                    onClick={() =>
                                      downloadCsv(
                                        obsDetail?.meetings?.postObservation
                                          ?.reflectionPlan.steps,
                                        obsDetail?.meetings?.postObservation
                                          ?.reflectionPlan.editedBy.name
                                      )
                                    }
                                    icon=".CSV"
                                  />
                                  <AccordButton
                                    onClick={() => printTemplatePlan()}
                                    icon=".PDF"
                                  />
                                </>
                              )}
                              {refTempView ? (
                                <AccordButton
                                  onClick={() => setRefTempView(false)}
                                  icon={<EyeOff color="white" size={20} />}
                                />
                              ) : (
                                <AccordButton
                                  onClick={() => setRefTempView(true)}
                                  icon={<Eye color="white" size={20} />}
                                />
                              )}
                            </span>
                          )}
                        </td>
                        {/* <td className="digits"></td> */}
                        <td>
                          {dateFormater2(
                            obsDetail?.meetings?.postObservation?.scheduledOn
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

                  {refTempView && (
                    <TemplatePrint
                      ref={componentRef}
                      template={
                        obsDetail?.meetings?.postObservation?.reflectionPlan
                          ?.steps
                      }
                      obsId={obsDetail?.id}
                      type={"REFLECTION"}
                      faculty={obsDetail?.faculty.name}
                      observer={obsDetail?.observer.name}
                      // obsSign={}
                      // headSign={}
                    />
                  )}

                  <div style={{ textAlign: "right" }}>
                    {obsDetail?.meetings.postObservation.status === "Ongoing" &&
                      (user.role === "Observer" || user.role === "Faculty") && (
                        <NavLink
                          to={`/observations/post-observation-meeting/${id}`}
                          className="btn btn-primary mx-2"
                        >
                          Edit Scheduling
                        </NavLink>
                      )}
                    {obsDetail?.meetings.postObservation.status ===
                      "Scheduled" &&
                      user.role === "Observer" && (
                        <NavLink
                          to={`/observations/post-observation-meeting/${id}`}
                          className="btn btn-primary mx-2"
                        >
                          Complete Observation
                        </NavLink>
                      )}
                  </div>
                </div>
              ) : (
                <div className="accordion-body text-center">
                  <strong>Not started!</strong>
                  <br />
                  {!obsDetail?.meetings?.postObservation &&
                    obsDetail?.meetings?.informedObservation?.status ===
                      "Completed" &&
                    obsDetail?.meetings?.uninformedObservation?.status ===
                      "Completed" &&
                    user.role === "Observer" && (
                      <NavLink
                        to={`/observations/post-observation-meeting/${id}`}
                        className="btn btn-primary mt-2 mx-2"
                      >
                        Schedule Post Observation
                      </NavLink>
                    )}
                </div>
              )}
            </div>
          </div>
        </Container>
      )}
      {!obsDetail && <Loader />}
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
