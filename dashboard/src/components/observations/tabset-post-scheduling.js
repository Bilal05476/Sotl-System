import React, { Fragment, useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Tabs, TabList, TabPanel, Tab } from "react-tabs";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { useStateValue } from "../../StateProvider";
import { errors, successes, info, warning } from "../../constants/Toasters";
import {
  completeColor,
  completeColor2,
  pendingColor,
  ongoingColor,
} from "../colors";
import FileBase from "react-file-base64";
import { fetchObservation } from "../Endpoints";
import { Frown, PlusCircle } from "react-feather";
import MultiStepForm from "../MultiStep";
import { toast } from "react-toastify";
import { dateFormater2 } from "../DateFormater";

const BASEURL = process.env.REACT_APP_BASE_URL;

const TabsetPostScheduling = ({ role }) => {
  const [{ user }] = useStateValue();
  const { id } = useParams();
  const [obs, setObs] = useState("");

  const toastId = useRef(null);

  const [obsSchedule, setObsSchedule] = useState({
    timeSlotByFaculty: "",
    timeSlotsByObserver: [],
    providedDate: "",
    location: "",
  });

  const { timeSlotsByObserver, providedDate, location } = obsSchedule;

  const createPostDetail = {
    observationsId: Number(id),
    facultyId: obs?.facultyId,
    timeSlotsByObserver,
    location,
  };

  async function createPostObs() {
    if (timeSlotsByObserver && location) {
      console.log(createPostDetail);
      info("Post Observation Scheduling Creating...");
      try {
        const res = await fetch(`${BASEURL}/observation/post-scheduling`, {
          method: "POST",
          body: JSON.stringify(createPostDetail),
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
          successes("Post Observation created!");
          fetchObservation(setObs, Number(id));
          setObsSchedule({
            timeSlotsByObserver: [],
            providedDate: "",
            location: "",
          });
        }
      } catch (err) {
        toast.dismiss(toastId.current);
        console.log(err);
        errors("Server not responding at that time!");
      }
    } else {
      info("Please provide appropriate timings or loaction...");
    }
  }

  async function updatePostObsSlots() {
    if (timeSlotsByObserver.length > 0) {
      const modified = {
        observationsId: Number(id),
        timeSlotsByObserver,
        location: location
          ? location
          : obs?.meetings?.postObservation?.location,
      };
      console.log(modified);
      info("Post Observation Scheduling Updating...");
      try {
        const res = await fetch(`${BASEURL}/observation/post-scheduling`, {
          method: "PUT",
          body: JSON.stringify(modified),
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
          successes("Post Observation updated!");
          fetchObservation(setObs, Number(id));
          setObsSchedule({
            timeSlotsByObserver: [],
            providedDate: "",
            location: "",
          });
        }
      } catch (err) {
        toast.dismiss(toastId.current);
        console.log(err);
        errors("Server not responding at that time!");
      }
    } else {
      info("Please provide appropriate timings...");
    }
  }

  // const onObservationEditing = () => {
  //   if (role === "Faculty") {
  //     if (timeSlotsByFaculty.length === 0) {
  //       info("Provide your slots!");
  //     } else {
  //       editObs();
  //     }
  //   }
  //   if (role === "Observer") {
  //     if (!scheduledOn || timeSlotByObserver.length === 0) {
  //       info("Provide all required fields!");
  //     } else {
  //       editObs();
  //     }
  //   }
  // };

  // const onSchedulingAccept = () => {
  //   const accepted = {
  //     observationsId: Number(id),
  //   };

  //   async function acceptScheduling() {
  //     info("Observation accepting...");
  //     const res = await fetch(`${BASEURL}/observation/scheduling`, {
  //       method: "PUT",
  //       body: JSON.stringify(accepted),
  //       headers: {
  //         "Content-type": "application/json; charset=UTF-8",
  //       },
  //     });
  //     const data = await res.json();

  //     if (data.error) {
  //       errors(data.error);
  //     } else {
  //       successes("Observation Accepted");
  //       fetchObservation(setObs, Number(id));
  //     }
  //   }

  //   if (role === "Faculty") {
  //     accepted.facultyAccepted = true;
  //     acceptScheduling();
  //   }
  //   if (role === "Observer") {
  //     accepted.observerAccepted = true;
  //     acceptScheduling();
  //   }
  // };

  // const onSchedulingDone = async () => {
  //   const finalObsDetails = {
  //     observationsId: Number(id),
  //     status: "Completed",
  //   };

  //   info("Done Scheduling...");
  //   const res = await fetch(`${BASEURL}/observation/scheduling`, {
  //     method: "PUT",
  //     body: JSON.stringify(finalObsDetails),
  //     headers: {
  //       "Content-type": "application/json; charset=UTF-8",
  //     },
  //   });
  //   const data = await res.json();

  //   if (data.error) {
  //     errors(data.error);
  //   } else {
  //     successes("Observation Scheduling Done!");
  //     fetchObservation(setObs, Number(id));
  //   }
  // };

  // const onSelectSlotFaculty = (id) => {
  //   if (timeSlotsByFaculty.includes(id)) {
  //     const temp = timeSlotsByFaculty.filter((item) => item !== id);
  //     setObsSchedule({
  //       ...obsSchedule,
  //       timeSlotsByFaculty: temp,
  //     });
  //   } else {
  //     setObsSchedule({
  //       ...obsSchedule,
  //       timeSlotsByFaculty: [...timeSlotsByFaculty, id],
  //     });
  //   }
  // };

  useEffect(() => {
    fetchObservation(setObs, Number(id));
    window.scrollTo(0, 0);
  }, []);

  const addProvidedDate = () => {
    if (providedDate) {
      setObsSchedule({
        ...obsSchedule,
        timeSlotsByObserver: [
          ...timeSlotsByObserver,
          `${providedDate}:00.000Z`,
        ],
      });
    }
  };
  const deleteProvidedDate = (indx) => {
    const filtered = timeSlotsByObserver.filter((item, ind) => ind !== indx);
    setObsSchedule({
      ...obsSchedule,
      timeSlotsByObserver: filtered,
    });
  };

  return (
    <Fragment>
      {role === "Observer" && (
        <>
          {obs?.meetings?.postObservation?.reflectionPlan[0]?.editedBy ? (
            <Tabs>
              <span
                style={{
                  fontStyle: "italic",
                }}
                className="d-flex align-items-center justify-content-center"
              >
                The reflection plan cannot be submitted by the faculty yet...{" "}
                <Frown color="brown" size={18} />{" "}
              </span>
            </Tabs>
          ) : (
            <>
              <Tabs>
                <TabList className="nav nav-tabs tab-coupon">
                  <Tab className="nav-link">Scheduling Timings</Tab>
                </TabList>
                <TabPanel>
                  <Form className="needs-validation user-add" noValidate="">
                    {obs?.meetings?.postObservation?.timeSlotsByObserver
                      .length > 0 && (
                      <FormGroup className="row">
                        <Label className="col-xl-3 col-md-4">
                          <span>*</span> Provided By Observer
                        </Label>
                        <div className="col-xl-8 col-md-7 d-flex flex-wrap">
                          {obs?.meetings?.postObservation?.timeSlotsByObserver.map(
                            (item) => (
                              <TimeSlotSpan
                                key={item.id}
                                id={item.id}
                                location={
                                  obs?.meetings?.postObservation?.location
                                }
                                time={item.dateTime}
                                slots={timeSlotsByObserver}
                                cursor={false}
                              />
                            )
                          )}
                        </div>
                      </FormGroup>
                    )}
                    {obs?.meetings?.postObservation?.timeSlotsByFaculty.length >
                      0 && (
                      <FormGroup className="row">
                        <Label className="col-xl-3 col-md-4">
                          <span>*</span> Select By Faculty
                        </Label>
                        <div className="col-xl-8 col-md-7 d-flex flex-wrap">
                          {obs?.meetings?.postObservation?.timeSlotsByFaculty.map(
                            (item) => (
                              <TimeSlotSpan
                                key={item.id}
                                id={item.id}
                                location={item.location}
                                time={item.date}
                                slots={timeSlotsByObserver}
                                cursor={false}
                              />
                            )
                          )}
                        </div>
                      </FormGroup>
                    )}

                    <FormPool
                      required={true}
                      label={"Provide Date(s)"}
                      value={providedDate}
                      timeSlotsByObserver={timeSlotsByObserver}
                      onChange={(e) =>
                        setObsSchedule({
                          ...obsSchedule,
                          providedDate: e.target.value,
                        })
                      }
                      type={"dateTime-local"}
                      addProvidedDate={addProvidedDate}
                      deleteProvidedDate={deleteProvidedDate}
                    />
                    <FormPool
                      required={true}
                      label={"Provide Location"}
                      value={location}
                      timeSlotsByObserver={timeSlotsByObserver}
                      onChange={(e) =>
                        setObsSchedule({
                          ...obsSchedule,
                          location: e.target.value,
                        })
                      }
                      type="text"
                    />
                  </Form>
                </TabPanel>
              </Tabs>

              <div className="pull-right">
                {obs?.meetings?.postObservation?.timeSlotsByObserver.length ===
                0 ? (
                  <Button
                    onClick={() => createPostObs()}
                    type="button"
                    color="primary"
                  >
                    Create
                  </Button>
                ) : (
                  <>
                    {!obs?.meetings?.postObservation?.observerAccepted && (
                      <Button
                        onClick={() => updatePostObsSlots()}
                        type="button"
                        color="primary"
                      >
                        Update
                      </Button>
                    )}
                  </>
                )}
              </div>
            </>
          )}
        </>
      )}
      {role === "Faculty" && (
        <>
          {!obs?.obsRequest?.teachingPlan[0]?.editedBy && (
            <MultiStepForm
              tabtitle={"Provide Teaching Plan Details"}
              steps={obs?.obsRequest?.teachingPlan[0]?.steps}
              tempId={
                obs?.obsRequest?.teachingPlan[0]?.steps[0]?.templatePlanId
              }
              observationsId={Number(id)}
              setObs={setObs}
            />
          )}

          <Tabs>
            <TabPanel>
              {obs?.obsRequest?.teachingPlan[0]?.editedBy && (
                <>
                  <Form className="needs-validation user-add" noValidate="">
                    <FormGroup className="row">
                      <Label className="col-xl-3 col-md-4">
                        <span>*</span> Provide Avalaible Slots
                      </Label>
                      <div className="col-xl-8 col-md-7 d-flex flex-wrap">
                        {obs?.course?.slots.map((item) => {
                          if (item.facultyId === user.id)
                            return (
                              <TimeSlotSpan
                                key={item.id}
                                id={item.id}
                                location={item.location}
                                time={item.time}
                                day={item.day}
                                cursor={true}
                                // onClick={() => onSelectSlotFaculty(item.id)}
                                slots={timeSlotsByObserver}
                              />
                            );
                        })}
                      </div>
                    </FormGroup>
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
                              slots={timeSlotsByObserver}
                            />
                          );
                        })}
                      </div>
                    </FormGroup>
                  </Form>
                  <div className="pull-right">
                    {!obs?.obsRequest?.facultyAccepted && (
                      <Button
                        // onClick={() => onObservationEditing()}
                        type="button"
                        color="primary"
                      >
                        Update
                      </Button>
                    )}
                  </div>
                </>
              )}
            </TabPanel>
          </Tabs>
        </>
      )}

      <div className="pull-right">
        {obs?.obsRequest?.facultyAccepted &&
        obs?.obsRequest?.observerAccepted ? (
          <Button
            // onClick={() => onSchedulingDone()}
            type="button"
            color="primary"
          >
            Done
          </Button>
        ) : (
          <>
            {obs?.obsRequest?.scheduledOn && (
              <Button
                // onClick={() => onSchedulingAccept()}
                type="button"
                color="primary"
                className="mx-3"
              >
                Confirm
              </Button>
            )}
          </>
        )}
      </div>
    </Fragment>
  );
};

const TimeSlotSpan = ({ key, onClick, location, time, slots, id, cursor }) => {
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
      {dateFormater2(time)} at {location}
    </span>
  );
};

const FormPool = ({
  label,
  value,
  onChange,
  type,
  required,
  addProvidedDate,
  timeSlotsByObserver,
  deleteProvidedDate,
}) => {
  return (
    <FormGroup className="row">
      <Label className="col-xl-3 col-md-4">
        {required && <span>*</span>} {label}
      </Label>
      <div className="col-xl-8 col-md-7">
        <div className="d-flex align-items-center mb-2">
          <Input
            required={required}
            className="form-control"
            id="validationCustom0"
            type={type}
            value={value}
            onChange={onChange}
          />
          {type !== "text" && value && (
            <PlusCircle
              onClick={() => addProvidedDate()}
              size={24}
              style={{ cursor: "pointer" }}
              className="mx-2"
            />
          )}
        </div>
        {type === "text" && (
          <small>
            {" "}
            <i>Eg: (BIC Meeting Room)</i>
          </small>
        )}
        {type !== "text" && (
          <div className="d-flex flex-wrap">
            {timeSlotsByObserver.map((item, ind) => (
              <div
                className="p-1 px-2 mb-2"
                style={{
                  background: ind % 2 === 0 ? completeColor : completeColor2,
                  color: "white",
                  marginRight: "0.5rem",
                  borderRadius: "5px",
                  minWidth: "22%",
                  textAlign: "center",
                }}
                onClick={() => deleteProvidedDate(ind)}
              >
                {dateFormater2(item)}
              </div>
            ))}
          </div>
        )}
      </div>
    </FormGroup>
  );
};

export default TabsetPostScheduling;
