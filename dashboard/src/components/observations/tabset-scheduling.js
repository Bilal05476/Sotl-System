import React, { Fragment, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Tabs, TabList, TabPanel, Tab } from "react-tabs";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { useStateValue } from "../../StateProvider";
import { errors, successes, info, warning } from "../../constants/Toasters";
import { completeColor } from "../colors";
import FileBase from "react-file-base64";
import { fetchObservation } from "../Endpoints";
import { Frown } from "react-feather";
import MultiStepForm from "../MultiStep";

const BASEURL = process.env.REACT_APP_BASE_URL;

const TabsetScheduling = ({ role }) => {
  const [{ user }] = useStateValue();
  const { id } = useParams();

  const [availableSlot, setAvailableSlots] = useState("");

  console.log(availableSlot);

  const [obsSchedule, setObsSchedule] = useState({
    teachingPlanByObserver: "",
    refelectionPlanByObserver: "",
    artifacts: "",
    teachingPlanByFaculty: "",
    refelectionPlanByFaculty: "",
    timeSlotsByFaculty: [],
    timeSlotByObserver: [],
    scheduledOn: "",
  });

  const [reasons, setReasons] = useState("");

  const onAddReason = () => {
    const reason = {
      senderId: user.id,
      receiverId:
        role === "Observer"
          ? availableSlot?.facultyId
          : availableSlot?.observerId,
      schedulingId: availableSlot?.obsRequest?.id,
      reason: "This is reason!",
    };
    setReasons(reason);
  };

  const {
    teachingPlanByObserver,
    refelectionPlanByObserver,
    artifacts,
    teachingPlanByFaculty,
    refelectionPlanByFaculty,
    timeSlotsByFaculty,
    timeSlotByObserver,
    scheduledOn,
  } = obsSchedule;

  const editDetail = {
    teachingPlanByObserver:
      teachingPlanByObserver && teachingPlanByObserver.slice(0, 10),
    teachingPlanByFaculty:
      teachingPlanByFaculty && teachingPlanByFaculty.slice(0, 10),

    refelectionPlanByObserver:
      refelectionPlanByObserver && refelectionPlanByObserver.slice(0, 10),

    refelectionPlanByFaculty:
      refelectionPlanByFaculty && refelectionPlanByFaculty.slice(0, 10),

    artifacts: artifacts && artifacts.slice(0, 10),

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
        errors(data.error);
      } else {
        successes("Observation Updated successfully!");
      }
    } catch (err) {
      console.log(err);
    }
  }

  const onObservationEditing = () => {
    if (role === "Faculty") {
      if (!teachingPlanByFaculty || timeSlotsByFaculty.length === 0) {
        info("Provide all required fields!");
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

  const onObservationScheduling = () => {
    const ObsDetail = {
      observationsId: Number(id),
      teachingPlanByObserver,
      refelectionPlanByObserver,
      artifacts,
    };
    async function postObs() {
      info("Observation scheduling...");
      const res = await fetch(`${BASEURL}/observation/scheduling`, {
        method: "POST",
        body: JSON.stringify(ObsDetail),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const data = await res.json();

      if (data.error) {
        errors(data.error);
      } else {
        successes(data.message);
      }
    }

    if (!artifacts || !refelectionPlanByObserver || !teachingPlanByObserver) {
      info("Provide all the documents!");
    } else {
      postObs();
      // console.log(ObsDetail);
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
      successes("Observation Scheduling Done!");
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

  useEffect(() => {
    fetchObservation(setAvailableSlots, id, errors);
  }, []);

  console.log(availableSlot?.obsRequest?.teachingPlan[0]?.steps);

  return (
    <Fragment>
      {role === "Observer" && (
        <>
          {!availableSlot?.obsRequest?.teachingPlan[0]?.filledBy ? (
            <Tabs className="text-center">
              <span>
                No templates filled by faculty yet...{" "}
                <Frown color="brown" size={18} />{" "}
              </span>
            </Tabs>
          ) : (
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
                      {availableSlot?.obsRequest?.timeSlotsByFaculty.map(
                        (item) => (
                          <TimeSlotSpan
                            key={item.id}
                            id={item.id}
                            location={item.location}
                            time={item.time}
                            day={item.day}
                            onClick={() => onSelectSlotObserver(item.id)}
                            slots={timeSlotByObserver}
                          />
                        )
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
          )}
        </>
      )}
      {role === "Faculty" && (
        <>
          <MultiStepForm
            tabtitle={"Provide Teaching Plan Details Step By Step"}
            steps={availableSlot?.obsRequest?.teachingPlan[0]?.steps}
          />
          <MultiStepForm
            tabtitle={"Provide Reflection Plan Details Step By Step"}
            steps={availableSlot?.obsRequest?.reflectionPlan[0]?.steps}
          />
          {availableSlot.obsRequest.teachingPlan[0].filledBy &&
          availableSlot.obsRequest.reflectionPlan[0].filledBy ? (
            <Tabs>
              <TabPanel>
                <Form className="needs-validation user-add" noValidate="">
                  <FormGroup className="row">
                    <Label className="col-xl-3 col-md-4">
                      <span>*</span> Provide Avalaible Slots
                    </Label>
                    <div className="col-xl-8 col-md-7 d-flex flex-wrap">
                      {availableSlot?.course?.slots.map((item) => {
                        if (item.facultyId === user.id)
                          return (
                            <TimeSlotSpan
                              key={item.id}
                              id={item.id}
                              location={item.location}
                              time={item.time}
                              day={item.day}
                              onClick={() => onSelectSlotFaculty(item.id)}
                              slots={timeSlotsByFaculty}
                            />
                          );
                      })}
                    </div>
                  </FormGroup>
                </Form>
              </TabPanel>
            </Tabs>
          ) : (
            <></>
          )}
        </>
      )}

      <div className="pull-right">
        {availableSlot?.obsRequest?.teachingPlan[0]?.filledBy && (
          <>
            <Button
              onClick={() => onObservationEditing()}
              type="button"
              color="primary"
            >
              Update
            </Button>
          </>
        )}

        {availableSlot?.obsRequest?.facultyAccepted &&
        availableSlot?.obsRequest?.observerAccepted ? (
          <Button
            onClick={() => onSchedulingDone()}
            type="button"
            color="primary"
          >
            Done
          </Button>
        ) : (
          <>
            {availableSlot?.obsRequest?.scheduledOn && (
              <Button
                onClick={() => onSchedulingAccept()}
                type="button"
                color="primary"
                className="mx-3"
              >
                Accept
              </Button>
            )}
          </>
        )}
      </div>
    </Fragment>
  );
};

const TimeSlotSpan = ({ key, onClick, location, time, day, slots, id }) => {
  return (
    <span
      className="mb-2"
      key={key}
      style={{
        border: `1px solid ${completeColor}`,
        marginRight: "0.5rem",
        padding: "0.2rem 0.8rem",
        borderRadius: "5px",
        cursor: "pointer",
        backgroundColor: slots.includes(id) && completeColor,
        color: slots.includes(id) && "#fff",
      }}
      onClick={onClick}
    >
      {day} | {time} | {location}
    </span>
  );
};

const DocumentsForm = ({ required, label, onDone }) => {
  return (
    <FormGroup className="row">
      <Label className="col-xl-3 col-md-4">
        {required && <span>*</span>} {label}
      </Label>
      <div className="col-xl-8 col-md-7">
        <span
          style={{
            border: "1px solid #5673ED",
            padding: "0.3rem",
            borderRadius: "5px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <FileBase
            className="form-control"
            type="file"
            required={required}
            multiple={false}
            onDone={onDone}
          />
        </span>
      </div>
    </FormGroup>
  );
};

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
