import React, { Fragment, useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Tabs, TabList, TabPanel, Tab } from "react-tabs";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { useStateValue } from "../../StateProvider";
import { errors, successes, info, warning } from "../../constants/Toasters";
import { completeColor } from "../colors";
import FileBase from "react-file-base64";
import { fetchObservation } from "../Endpoints";
import { Frown } from "react-feather";
import MultiStepForm from "../MultiStep";
import { toast } from "react-toastify";
import { dateFormater2 } from "../DateFormater";

const BASEURL = process.env.REACT_APP_BASE_URL;

const TabsetScheduling = ({ role }) => {
  const [{ user }] = useStateValue();
  const { id } = useParams();
  const [obs, setObs] = useState("");
  const nav = useNavigate();

  const toastId = useRef(null);

  const [obsSchedule, setObsSchedule] = useState({
    timeSlotsByFaculty: [],
    timeSlotByObserver: [],
    scheduledOn: "",
  });

  const [reasons, setReasons] = useState("");

  const onAddReason = () => {
    const reason = {
      senderId: user.id,
      receiverId: role === "Observer" ? obs?.facultyId : obs?.observerId,
      schedulingId: obs?.obsRequest?.id,
      reason: "This is reason!",
    };
    setReasons(reason);
  };

  const { timeSlotsByFaculty, timeSlotByObserver, scheduledOn } = obsSchedule;

  const editDetail = {
    timeSlotsByFaculty: timeSlotsByFaculty && timeSlotsByFaculty,
    timeSlotByObserver: timeSlotByObserver && timeSlotByObserver,
    scheduledOn: scheduledOn && scheduledOn,
    reasons: reasons && reasons,
  };

  const editedObsDetail = {};
  Object.keys(editDetail).forEach((key) => {
    if (editDetail[key].length > 0) {
      editedObsDetail[key] = editDetail[key];
    }
  });

  async function editObs() {
    editedObsDetail.observationsId = Number(id);
    if (scheduledOn) {
      const selectedDate = new Date(scheduledOn);
      const formattedDate = selectedDate.toISOString();
      editedObsDetail.scheduledOn = formattedDate;
    }

    // return editedObsDetail;

    info("Scheduling uppdating...");
    try {
      const res = await fetch(`${BASEURL}/observation/scheduling`, {
        method: "PUT",
        body: JSON.stringify(editedObsDetail),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const data = await res.json();

      if (data.error) {
        toast.dismiss(toastId.current);
        errors(data.error);
      } else {
        toast.dismiss(toastId.current);
        successes("Observation updated!");
        fetchObservation(setObs, Number(id));
        setObsSchedule({
          timeSlotsByFaculty: [],
          timeSlotByObserver: [],
          scheduledOn: "",
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  const onObservationEditing = () => {
    if (role === "Faculty") {
      if (timeSlotsByFaculty.length === 0) {
        info("Provide your slots!");
      } else {
        editObs();
      }
    }
    if (role === "Observer") {
      if (!scheduledOn || timeSlotByObserver.length === 0) {
        info("Provide all required fields!");
      } else {
        editObs();
      }
    }
  };

  const onSchedulingAccept = () => {
    const accepted = {
      observationsId: Number(id),
    };

    async function acceptScheduling() {
      info("Observation accepting...");
      const res = await fetch(`${BASEURL}/observation/scheduling`, {
        method: "PUT",
        body: JSON.stringify(accepted),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const data = await res.json();

      if (data.error) {
        errors(data.error);
      } else {
        successes("Observation Accepted");
        fetchObservation(setObs, Number(id));
      }
    }

    if (role === "Faculty") {
      accepted.facultyAccepted = true;
      acceptScheduling();
    }
    if (role === "Observer") {
      accepted.observerAccepted = true;
      acceptScheduling();
    }
  };

  const onSchedulingDone = async () => {
    const finalObsDetails = {
      observationsId: Number(id),
      status: "Completed",
    };

    info("Done Scheduling...");
    const res = await fetch(`${BASEURL}/observation/scheduling`, {
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
      successes("Observation Scheduling Completed!");
      fetchObservation(setObs, Number(id));
      setTimeout(() => {
        nav(`/observations/detail-observation/${id}`);
      }, 3000);
    }
  };

  const onSelectSlotFaculty = (id) => {
    if (timeSlotsByFaculty.includes(id)) {
      const temp = timeSlotsByFaculty.filter((item) => item !== id);
      setObsSchedule({
        ...obsSchedule,
        timeSlotsByFaculty: temp,
      });
    } else {
      setObsSchedule({
        ...obsSchedule,
        timeSlotsByFaculty: [...timeSlotsByFaculty, id],
      });
    }
  };

  const onSelectSlotObserver = (id) => {
    if (timeSlotByObserver.includes(id)) {
      const temp = timeSlotByObserver.filter((item) => item !== id);
      setObsSchedule({
        ...obsSchedule,
        timeSlotByObserver: temp,
      });
    } else {
      setObsSchedule({
        ...obsSchedule,
        timeSlotByObserver: [...timeSlotByObserver, id],
      });
    }
  };

  // console.log(obs);

  useEffect(() => {
    fetchObservation(setObs, Number(id));
    window.scrollTo(0, 0);
  }, []);

  console.log(obs);

  return (
    <Fragment>
      {role === "Observer" && (
        <>
          {!obs?.obsRequest?.teachingPlan?.editedBy ? (
            <Tabs>
              <span
                style={{
                  fontStyle: "italic",
                }}
                className="d-flex align-items-center justify-content-center"
              >
                The teaching plan cannot be submitted by the faculty yet...{" "}
                <Frown color="brown" size={18} />{" "}
              </span>
            </Tabs>
          ) : (
            <>
              <Tabs>
                <TabList className="nav nav-tabs tab-coupon">
                  <Tab className="nav-link">Update Scheduling</Tab>
                </TabList>
                <TabPanel>
                  <Form className="needs-validation user-add" noValidate="">
                    <FormGroup className="row">
                      <Label className="col-xl-3 col-md-4">
                        <span>*</span> Select Faculty Slot
                      </Label>
                      <div className="col-xl-8 col-md-7 d-flex flex-wrap">
                        {obs?.obsRequest?.timeSlotsByFaculty.map((item) => (
                          <TimeSlotSpan
                            key={item.id}
                            id={item.id}
                            location={item.location}
                            time={item.time}
                            day={item.day}
                            onClick={() => onSelectSlotObserver(item.id)}
                            slots={timeSlotByObserver}
                            cursor={true}
                          />
                        ))}
                        {obs?.obsRequest?.timeSlotsByFaculty.length === 0 && (
                          <span
                            style={{
                              fontStyle: "italic",
                            }}
                            className="d-flex align-items-center justify-content-center"
                          >
                            Faculty not provided any time slots yet...{" "}
                            <Frown color="brown" size={18} />{" "}
                          </span>
                        )}
                      </div>
                    </FormGroup>
                    <FormPool
                      required={true}
                      label={"Provide Date"}
                      value={scheduledOn}
                      onChange={(e) =>
                        setObsSchedule({
                          ...obsSchedule,
                          scheduledOn: e.target.value,
                        })
                      }
                      type={"date"}
                    />
                  </Form>
                </TabPanel>
              </Tabs>

              {obs?.obsRequest?.facultyAccepted &&
              obs?.obsRequest?.observerAccepted ? (
                <div className="pull-right">
                  {obs?.obsRequest?.facultyAccepted &&
                    obs?.obsRequest?.observerAccepted && (
                      <Button
                        onClick={() => onSchedulingDone()}
                        type="button"
                        color="primary"
                      >
                        Done
                      </Button>
                    )}
                </div>
              ) : (
                <div className="pull-right">
                  {obs?.obsRequest?.timeSlotsByFaculty.length > 0 &&
                  !obs?.obsRequest?.facultyAccepted ? (
                    <Button
                      onClick={() => onObservationEditing()}
                      type="button"
                      color="primary"
                    >
                      Update
                    </Button>
                  ) : (
                    <Button disabled color="primary">
                      Faculty Accepted Day and Slot
                    </Button>
                  )}
                  {obs?.obsRequest?.scheduledOn &&
                    obs?.obsRequest?.facultyAccepted && (
                      <Button
                        onClick={() => onSchedulingAccept()}
                        type="button"
                        color="primary"
                        className="mx-3"
                      >
                        Confirm
                      </Button>
                    )}
                </div>
              )}
            </>
          )}
        </>
      )}
      {role === "Faculty" && (
        <>
          {!obs?.obsRequest?.teachingPlan?.editedBy && (
            <MultiStepForm
              tabtitle={"Provide Teaching Plan Details (Words limit: 500 each)"}
              steps={obs?.obsRequest?.teachingPlan?.steps}
              tempId={obs?.obsRequest?.teachingPlan?.steps?.templatePlanId}
              observationsId={Number(id)}
              setObs={setObs}
              tempType={"Teaching"}
            />
          )}

          <Tabs>
            <TabPanel>
              {obs?.obsRequest?.teachingPlan?.editedBy && (
                <>
                  <Form className="needs-validation user-add" noValidate="">
                    <FormGroup className="row">
                      <Label className="col-xl-3 col-md-4">
                        <span>*</span> Provide Avalaible Slots
                      </Label>
                      <div className="col-xl-8 col-md-7 d-flex flex-wrap">
                        {obs?.faculty.courseSlots.map((item) => (
                          <TimeSlotSpan
                            key={item.id}
                            id={item.id}
                            location={item.location}
                            time={item.time}
                            day={item.day}
                            cursor={true}
                            onClick={() => onSelectSlotFaculty(item.id)}
                            slots={timeSlotsByFaculty}
                          />
                        ))}
                      </div>
                    </FormGroup>
                    {obs?.obsRequest?.timeSlotByObserver.length > 0 && (
                      <FormGroup className="row">
                        <Label className="col-xl-3 col-md-4">
                          <span>*</span> Slot(s) Selected by Observer
                        </Label>
                        <div className="col-xl-8 col-md-7 d-flex flex-wrap">
                          {obs?.obsRequest?.timeSlotByObserver?.map((item) => {
                            return (
                              <TimeSlotSpan
                                key={item.id}
                                id={item.id}
                                location={item.location}
                                time={item.time}
                                day={item.day}
                                cursor={false}
                                // onClick={() => onSelectSlotFaculty(item.id)}
                                slots={timeSlotsByFaculty}
                                date={dateFormater2(
                                  obs?.obsRequest?.scheduledOn
                                )}
                              />
                            );
                          })}
                        </div>
                      </FormGroup>
                    )}
                  </Form>
                  {!obs?.obsRequest?.facultyAccepted && (
                    <div className="pull-right">
                      <Button
                        onClick={() => onObservationEditing()}
                        type="button"
                        color="primary"
                        className="mx-3"
                      >
                        Update
                      </Button>
                      {obs?.obsRequest?.scheduledOn && (
                        <Button
                          onClick={() => onSchedulingAccept()}
                          type="button"
                          color="primary"
                        >
                          Confirm
                        </Button>
                      )}
                    </div>
                  )}
                  {obs?.obsRequest?.facultyAccepted &&
                    !obs?.obsRequest?.observerAccepted && (
                      <span
                        style={{
                          fontStyle: "italic",
                        }}
                        className="d-flex align-items-center justify-content-center"
                      >
                        Observer not confirmed yet... You will receive
                        notification once confirmed...
                      </span>
                    )}
                </>
              )}
            </TabPanel>
          </Tabs>
        </>
      )}

      {/* <div className="pull-right">
        
      </div> */}
    </Fragment>
  );
};

const TimeSlotSpan = ({
  key,
  onClick,
  location,
  time,
  day,
  slots,
  id,
  cursor,
  date,
}) => {
  return (
    <span
      className="mb-2"
      key={key}
      style={{
        border: `1px solid ${completeColor}`,
        marginRight: "0.5rem",
        padding: "0.2rem 0.8rem",
        borderRadius: "5px",
        cursor: cursor && "pointer",
        backgroundColor:
          (slots.includes(id) && completeColor) || (!cursor && completeColor),
        color: (slots.includes(id) && "#fff") || (!cursor && "#fff"),
      }}
      onClick={onClick}
    >
      {day} | {time} | {location} {date && date?.slice(0, 16)}
    </span>
  );
};

// const DocumentsForm = ({ required, label, onDone }) => {
//   return (
//     <FormGroup className="row">
//       <Label className="col-xl-3 col-md-4">
//         {required && <span>*</span>} {label}
//       </Label>
//       <div className="col-xl-8 col-md-7">
//         <span
//           style={{
//             border: "1px solid #5673ED",
//             padding: "0.3rem",
//             borderRadius: "5px",
//             display: "flex",
//             alignItems: "center",
//           }}
//         >
//           <FileBase
//             className="form-control"
//             type="file"
//             required={required}
//             multiple={false}
//             onDone={onDone}
//           />
//         </span>
//       </div>
//     </FormGroup>
//   );
// };

const FormPool = ({ label, value, onChange, type, required }) => {
  return (
    <FormGroup className="row">
      <Label className="col-xl-3 col-md-4">
        {required && <span>*</span>} {label}
      </Label>
      <div className="col-xl-8 col-md-7">
        <Input
          required={required}
          className="form-control"
          id="validationCustom0"
          type={type}
          value={value}
          onChange={onChange}
        />
      </div>
    </FormGroup>
  );
};

export default TabsetScheduling;
