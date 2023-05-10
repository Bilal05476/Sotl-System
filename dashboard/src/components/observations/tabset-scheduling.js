import React, { Fragment, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Tabs, TabList, TabPanel, Tab } from "react-tabs";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
// import { useStateValue } from "../../StateProvider";
import { errors, successes, info } from "../../constants/Toasters";

import FileBase from "react-file-base64";

const BASEURL = process.env.REACT_APP_BASE_URL;

const TabsetScheduling = ({ role }) => {
  //   const [{ user, users }] = useStateValue();

  const [obsSchedule, setObsSchedule] = useState({
    teaching: "",
    reflection: "",
    artifacts: "",
    slots: [],
  });
  const { teaching, reflection, artifacts, slots } = obsSchedule;

  const { id } = useParams();

  const onObservationScheduling = () => {
    const obsDetail = {
      teachingPlanByObserver: teaching,
      refelectionPlanByObserver: reflection,
      artifacts,
      observationsId: Number(id),
    };
    // const editObsDetail = {}
    async function postObs() {
      const res = await fetch(`${BASEURL}/observation/scheduling`, {
        method: "POST",
        body: JSON.stringify(obsDetail),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const data = await res.json();

      if (data.error) {
        errors(data.error);
      } else {
        successes("Observation scheduled successfully!");
      }
    }
    async function editObs() {}

    if (role === "Observer") {
      if (!artifacts || !reflection || !teaching) {
        info("Provide all the documents!");
      } else {
        postObs();
      }
    }
    if (role === "Faculty") {
      if (!teaching || slots.length === 0) {
        info("Provide all required fields!");
      } else {
        editObs();
      }
    }
  };

  const onSelectSlot = (id) => {
    if (slots.includes(id)) {
      const temp = slots.filter((item) => item !== id);
      setObsSchedule({
        ...obsSchedule,
        slots: temp,
      });
    } else {
      setObsSchedule({
        ...obsSchedule,
        slots: [...slots, id],
      });
    }
  };

  const fetchObservation = async (id) => {
    try {
      const res = await fetch(`${BASEURL}/observation/${id}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      const data = await res.json();

      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchObservation(id);
  });

  return (
    <Fragment>
      <Tabs>
        <TabList className="nav nav-tabs tab-coupon">
          <Tab className="nav-link">Required for Scheduling</Tab>
        </TabList>
        <TabPanel>
          <Form className="needs-validation user-add" noValidate="">
            <FormGroup className="row">
              <Label className="col-xl-3 col-md-4">
                <span>*</span> Teaching Plan
              </Label>
              <div className="col-xl-8 col-md-7">
                {/* <Input
                  className="form-control"
                  id="validationCustom3"
                  type="file"
                  required={true}
                  value={teaching}
                  onChange={(e) =>
                    setObsSchedule({
                      ...obsSchedule,
                      teaching: e.target.value,
                    })
                  }
                /> */}
                <FileBase
                  className="form-control"
                  type="file"
                  required={true}
                  multiple={false}
                  onDone={({ base64 }) =>
                    setObsSchedule({ ...obsSchedule, teaching: base64 })
                  }
                />
              </div>
            </FormGroup>
            <FormGroup className="row">
              <Label className="col-xl-3 col-md-4">
                {role === "Observer" && <span>*</span>} Reflection Plan
              </Label>
              <div className="col-xl-8 col-md-7">
                {/* <Input
                  className="form-control"
                  id="validationCustom3"
                  type="file"
                  required={true}
                  value={reflection}
                  onChange={(e) =>
                    setObsSchedule({
                      ...obsSchedule,
                      reflection: e.target.value,
                    })
                  }
                /> */}
                <FileBase
                  className="form-control"
                  type="file"
                  required={true}
                  multiple={false}
                  onDone={({ base64 }) =>
                    setObsSchedule({ ...obsSchedule, reflection: base64 })
                  }
                />
              </div>
            </FormGroup>
            {role === "Observer" && (
              <FormGroup className="row">
                <Label className="col-xl-3 col-md-4">
                  <span>*</span> Artifacts
                </Label>
                <div className="col-xl-8 col-md-7">
                  {/* <Input
                    className="form-control"
                    id="validationCustom3"
                    type="file"
                    required={true}
                    value={artifacts}
                    onChange={(e) =>
                      setObsSchedule({
                        ...obsSchedule,
                        artifacts: e.target.value,
                      })
                    }
                  /> */}

                  <FileBase
                    className="form-control"
                    type="file"
                    required={true}
                    multiple={false}
                    onDone={({ base64 }) =>
                      setObsSchedule({ ...obsSchedule, artifacts: base64 })
                    }
                  />
                </div>
              </FormGroup>
            )}
            {role === "Faculty" && (
              <FormGroup className="row">
                <Label className="col-xl-3 col-md-4">
                  <span>*</span> Provide Avalaible Slots
                </Label>
                <div className="col-xl-8 col-md-7 d-flex flex-wrap">
                  <TimeSlotSpan
                    id="1"
                    location="E501"
                    time="11:45"
                    day="Monday"
                    onClick={() => onSelectSlot("1")}
                    slots={slots}
                  />
                  <TimeSlotSpan
                    id="2"
                    location="E501"
                    time="11:45"
                    day="Saturday"
                    onClick={() => onSelectSlot("2")}
                    slots={slots}
                  />

                  <TimeSlotSpan
                    id="4"
                    location="E501"
                    time="11:45"
                    day="Tuesday"
                    onClick={() => onSelectSlot("4")}
                    slots={slots}
                  />
                </div>
              </FormGroup>
            )}
          </Form>
        </TabPanel>
      </Tabs>
      <div className="pull-right">
        {role === "Observer" && (
          <Button
            onClick={() => onObservationScheduling()}
            type="button"
            color="primary"
          >
            Create
          </Button>
        )}
        {role === "Faculty" && (
          <Button
            onClick={() => onObservationScheduling()}
            type="button"
            color="primary"
          >
            Update
          </Button>
        )}
      </div>
    </Fragment>
  );
};

const TimeSlotSpan = ({ onClick, location, time, day, slots, id }) => {
  return (
    <span
      className="mb-2"
      style={{
        border: "1px solid #040b5b",
        marginRight: "0.5rem",
        padding: "0.2rem 0.8rem",
        borderRadius: "15px",
        cursor: "pointer",
        backgroundColor: slots.includes(id) && "#040b5b",
        color: slots.includes(id) && "#fff",
      }}
      onClick={onClick}
    >
      {day} | {time} | {location}
    </span>
  );
};

export default TabsetScheduling;
