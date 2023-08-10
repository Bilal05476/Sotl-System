import React, { Fragment, useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Tabs, TabList, TabPanel, Tab } from "react-tabs";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { errors, successes, info, warning } from "../../constants/Toasters";
import { completeColor, completeColor2 } from "../colors";
import { fetchObservation } from "../Endpoints";
import { Frown, PlusCircle } from "react-feather";
import MultiStepForm from "../MultiStep";
import { toast } from "react-toastify";
import { dateFormater2 } from "../DateFormater";
import { useStateValue } from "../../StateProvider";

const BASEURL = process.env.REACT_APP_BASE_URL;

const TabsetPostScheduling = ({ role }) => {
  const { id } = useParams();
  const [{ user }] = useStateValue();
  const [obs, setObs] = useState("");

  const toastId = useRef(null);

  const [obsSchedule, setObsSchedule] = useState({
    timeSlotByFaculty: "",
    timeSlotsByObserver: [],
    providedDate: "",
    location: "",
  });

  const [facultySelect, setFacultySelect] = useState("");

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
    if (role === "Observer") {
      if (timeSlotsByObserver.length > 0) {
        const modified = {
          observationsId: Number(id),
          timeSlotsByObserver,
          location: location
            ? location
            : obs?.meetings?.postObservation?.location,
        };
        // console.log(modified);
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
    } else {
      if (facultySelect) {
        const fSlot = {
          observationsId: Number(id),
          timeSlotByFaculty: facultySelect,
        };
        info("Post Observation Scheduling Updating...");
        try {
          const res = await fetch(`${BASEURL}/observation/post-scheduling`, {
            method: "PUT",
            body: JSON.stringify(fSlot),
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
            setFacultySelect("");
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
  }

  const onPosObsDone = async () => {
    const finalObsDetails = {
      observationsId: Number(id),
      status: "Scheduled",
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
      fetchObservation(setObs, Number(id));
    }
  };

  const SlotSelectFaculty = (id) => {
    const [findTime] =
      obs?.meetings?.postObservation?.timeSlotsByObserver.filter(
        (item) => item.id === id
      );
    setFacultySelect(findTime.dateTime);
  };

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

  const checkRole = (role) => {
    if (role === "Faculty") {
      if (obs?.meetings?.postObservation?.reflectionPlan[0]?.editedById) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  };

  console.log(obs);
  return (
    <Fragment>
      {role === "Observer" && (
        <>
          <Tabs>
            <TabList className="nav nav-tabs tab-coupon">
              <Tab className="nav-link">Scheduling Timings</Tab>
            </TabList>
            <TabPanel>
              <Form className="needs-validation user-add" noValidate="">
                {obs?.meetings?.postObservation?.timeSlotsByObserver?.length >
                  0 && (
                  <FormGroup className="row">
                    <Label className="col-xl-3 col-md-4">
                      <span>*</span> Provided Slots
                    </Label>
                    <div className="col-xl-8 col-md-7 d-flex flex-wrap">
                      {obs?.meetings?.postObservation?.timeSlotsByObserver.map(
                        (item) => (
                          <TimeSlotSpan
                            key={item.id}
                            location={obs?.meetings?.postObservation?.location}
                            time={item.dateTime}
                            slot={timeSlotsByObserver}
                            cursor={false}
                          />
                        )
                      )}
                    </div>
                  </FormGroup>
                )}
                {obs?.meetings?.postObservation?.timeSlotByFaculty && (
                  <FormGroup className="row">
                    <Label className="col-xl-3 col-md-4">
                      <span>*</span> Select By Faculty
                    </Label>
                    <div className="col-xl-8 col-md-7 d-flex flex-wrap">
                      <TimeSlotSpan
                        location={obs?.meetings?.postObservation?.location}
                        time={obs?.meetings?.postObservation?.timeSlotByFaculty}
                        cursor={false}
                      />
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
        </>
      )}
      {role === "Faculty" && (
        <>
          {!obs?.meetings?.postObservation?.reflectionPlan[0]?.editedById ? (
            <MultiStepForm
              tabtitle={"Provide Relfection Plan Details"}
              steps={obs?.meetings?.postObservation?.reflectionPlan[0]?.steps}
              tempId={
                obs?.meetings?.postObservation?.reflectionPlan[0]?.steps[0]
                  ?.templatePlanId
              }
              observationsId={Number(id)}
              setObs={setObs}
              tempType={"Reflection"}
            />
          ) : (
            <>
              <Tabs>
                <TabPanel>
                  <Form className="needs-validation user-add" noValidate="">
                    <FormGroup className="row">
                      <Label className="col-xl-3 col-md-4">
                        <span>*</span> Select One Available Slot
                      </Label>
                      <div className="col-xl-8 col-md-7 d-flex flex-wrap">
                        {obs?.meetings?.postObservation?.timeSlotsByObserver.map(
                          (item) => (
                            <TimeSlotSpan
                              key={item.id}
                              time={item.dateTime}
                              cursor={true}
                              location={
                                obs?.meetings?.postObservation?.location
                              }
                              onClick={() => SlotSelectFaculty(item.id)}
                              slot={facultySelect}
                            />
                          )
                        )}
                      </div>
                    </FormGroup>
                    {obs?.meetings?.postObservation?.timeSlotByFaculty && (
                      <FormGroup className="row">
                        <Label className="col-xl-3 col-md-4">
                          <span>*</span> Selected Slot
                        </Label>
                        <div className="col-xl-8 col-md-7 d-flex flex-wrap">
                          <TimeSlotSpan
                            location={obs?.meetings?.postObservation?.location}
                            time={
                              obs?.meetings?.postObservation?.timeSlotByFaculty
                            }
                            cursor={false}
                          />
                        </div>
                      </FormGroup>
                    )}
                  </Form>
                </TabPanel>
              </Tabs>
              {/* <div className="pull-right">
                {obs?.meetings?.postObservation?.status === "Ongoing" && (
                  <Button
                    onClick={() => updatePostObsSlots()}
                    type="button"
                    color="primary"
                  >
                    Update
                  </Button>
                )}
              </div> */}
            </>
          )}
        </>
      )}
      <div className="pull-right">
        {!obs?.meetings?.postObservation && user.role === "Observer" ? (
          <Button
            onClick={() => createPostObs()}
            type="button"
            color="primary"
            className="mx-2"
          >
            Create
          </Button>
        ) : (
          <>
            {obs?.meetings?.postObservation?.status === "Ongoing" &&
              checkRole(user.role) && (
                <Button
                  onClick={() => updatePostObsSlots()}
                  type="button"
                  color="primary"
                  className="mx-2"
                >
                  Update
                </Button>
              )}
          </>
        )}
        {obs?.meetings?.postObservation?.timeSlotByFaculty &&
          obs?.meetings?.postObservation?.status === "Ongoing" &&
          user?.role === "Observer" && (
            <Button
              onClick={() => onPosObsDone()}
              type="button"
              color="primary"
            >
              Mark Scheduled
            </Button>
          )}
      </div>
    </Fragment>
  );
};

const TimeSlotSpan = ({ key, onClick, time, slot, cursor, location }) => {
  console.log(slot);
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
          (slot === time && completeColor) || (!cursor && completeColor),
        color: (slot === time && "#fff") || (!cursor && "#fff"),
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
