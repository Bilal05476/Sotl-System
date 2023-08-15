import React, { Fragment, useEffect, useRef, useState } from "react";
import { Button, Col, Container, Row, Table } from "reactstrap";
import { NavLink, useParams } from "react-router-dom";
import Breadcrumb from "../common/breadcrumb";
import { Loader, DownloadCloud, Eye, EyeOff } from "react-feather";
import { useStateValue } from "../../StateProvider";
import logo from "../../assets/images/blue-version.png";
// import { stringify } from "csv-stringify/sync";

import {
  fetchCoursesAndUsers,
  fetchObservation,
  startScheduling,
} from "../Endpoints";
import { errors, info, successes } from "../../constants/Toasters";
import { completeColor, completeColor2 } from "../colors";
import { dateFormater, dateFormater2 } from "../DateFormater";
import { PopupModal, PostTimeModal } from "../PopupModal";
import { useReactToPrint } from "react-to-print";

const BASEURL = process.env.REACT_APP_BASE_URL;

const Detail_observation = () => {
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState("open");
  const [obsDetail, setObsDetail] = useState("");
  const [openPopup, setOpenPopup] = useState(false);
  const [cid, setcid] = useState("");
  const [facultycourses, setfacultycourses] = useState([]);
  const toastId = useRef(null);

  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    fetchObservation(setObsDetail, Number(id));
    if (user.role === "Head_of_Department")
      fetchCoursesAndUsers(dispatch, user.department.id, user.role);
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
            {type} TEMPLATE
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
                Informed Observation Scheduling
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
                            <td className="digits">
                              {obsDetail?.obsRequest?.teachingPlan
                                ?.editedBy && (
                                <span
                                  className="d-flex alogn-items-center"
                                  style={{ cursor: "pointer" }}
                                >
                                  {/* // <DownloadCloud
                                        //   color="white"
                                        //   size={20}
                                        // /> */}
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
                          {/* {user.role === "Head_of_Department" ||
                          user.role === "Observer" ? (
                            <Button
                              className="mx-2 btn btn-primary"
                              // onClick={() => selectCourse()}
                            >
                              Sign Template
                            </Button>
                          ) : (
                            <></>
                          )} */}
                          {user.role === "Faculty" ||
                          user.role === "Observer" ? (
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
                            <td
                              className={"digits "}
                              style={{ fontWeight: "800" }}
                            >
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
                Post Informed Observation Meeting Scheduling (Face to Face)
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
                            <td className="digits">
                              {obsDetail?.meetings?.postObservation
                                ?.reflectionPlan?.editedBy && (
                                <span
                                  className="d-flex alogn-items-center"
                                  style={{ cursor: "pointer" }}
                                >
                                  {refTempView ? (
                                    <AccordButton
                                      onClick={() => printTemplatePlan()}
                                      icon={
                                        <DownloadCloud
                                          color="white"
                                          size={20}
                                        />
                                      }
                                    />
                                  ) : (
                                    <AccordButton
                                      onClick={() => setRefTempView(true)}
                                      icon={<Eye color="white" size={20} />}
                                    />
                                  )}
                                  {refTempView && (
                                    <AccordButton
                                      onClick={() => setRefTempView(false)}
                                      icon={<EyeOff color="white" size={20} />}
                                    />
                                  )}
                                </span>
                              )}
                            </td>
                            <td className="digits"></td>
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
                        {/* {user.role === "Head_of_Department" ||
                        user.role === "Observer" ? (
                          <Button
                            className="mx-2 btn btn-primary"
                            // onClick={() => selectCourse()}
                          >
                            Sign Template
                          </Button>
                        ) : (
                          <></>
                        )} */}
                        {obsDetail?.meetings.postObservation.status ===
                          "Ongoing" &&
                          (user.role === "Observer" ||
                            user.role === "Faculty") && (
                            <NavLink
                              to={`/observations/post-observation-meeting/${id}`}
                              className="btn btn-primary mx-2"
                            >
                              Edit Scheduling
                            </NavLink>
                          )}
                        {/* {obsDetail?.meetings.postObservation.status ===
                          "Scheduled" &&
                          user.role === "Observer" && (
                            <Button
                              onClick={() => onPosObsDone()}
                              type="button"
                              color="primary"
                              className="mx-2"
                            >
                              Mark Completed
                            </Button>
                          )} */}
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
                      {obsDetail?.meetings?.informedObservation &&
                      obsDetail?.meetings?.informedObservation?.facultyScore !==
                        0 &&
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
          {/* <div className="accordion">
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
          </div> */}
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
