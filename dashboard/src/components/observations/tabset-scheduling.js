import React, { Fragment, useState } from "react";
import { useParams } from "react-router-dom";
import { Tabs, TabList, TabPanel, Tab } from "react-tabs";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
// import { useStateValue } from "../../StateProvider";

const TabsetScheduling = ({ role }) => {
  //   const [{ user, users }] = useStateValue();

  const [obsSchedule, setObsSchedule] = useState({
    teaching: "",
    reflection: "",
    artifacts: "",
    error: "",
    success: "",
    loader: false,
  });
  const { teaching, reflection, error, success, artifacts, loader } =
    obsSchedule;

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
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/observation/scheduling`,
        {
          method: "POST",
          body: JSON.stringify(obsDetail),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      const data = await res.json();

      if (data.error) {
        setObsSchedule({
          ...obsSchedule,
          error: data.error,
          success: "",
          loader: false,
        });
      } else {
        setObsSchedule({
          ...obsSchedule,
          success: "Observation scheduled successfully",
          loader: false,
        });
        setTimeout(() => {
          setObsSchedule({
            ...obsSchedule,
            error: "",
            success: "",
          });
        }, 2000);
      }
    }
    async function editObs() {}
    setObsSchedule({
      ...obsSchedule,
      error: "",
      success: "",
      loader: true,
    });
    setTimeout(() => {
      if (role === "Observer") {
        if (!artifacts || !reflection || !teaching) {
          setObsSchedule({
            ...obsSchedule,
            error: "Provide all the documents",
            success: "",
            loader: false,
          });
        } else {
          postObs();
        }
      } else {
        if (!teaching) {
          setObsSchedule({
            ...obsSchedule,
            error: "Provide all teaching plan",
            success: "",
            loader: false,
          });
        } else {
          editObs();
        }
      }
    }, 1000);
  };

  return (
    <Fragment>
      <Tabs>
        <TabList className="nav nav-tabs tab-coupon">
          <Tab className="nav-link">Required for Scheduling</Tab>
        </TabList>
        <TabPanel>
          <Form className="needs-validation user-add" noValidate="">
            {/* <h4></h4> */}
            {error && (
              <FormGroup className="row">
                <Label className="col-xl-3 col-md-4">
                  <span></span>
                </Label>
                <div className="col-xl-8 col-md-7">
                  <span
                    style={{
                      background: "pink",
                      color: "crimson",
                      padding: "0.5rem 1rem",
                      borderRadius: "5px",
                      width: "100%",
                      fontWeight: "600",
                    }}
                  >
                    {error}
                  </span>
                </div>
              </FormGroup>
            )}
            {success && (
              <FormGroup className="row">
                <Label className="col-xl-3 col-md-4">
                  <span></span>
                </Label>
                <div className="col-xl-8 col-md-7">
                  <span
                    style={{
                      background: "greenyellow",
                      color: "green",
                      padding: "0.5rem 1rem",
                      borderRadius: "5px",
                      width: "100%",
                      fontWeight: "600",
                    }}
                  >
                    {success}
                  </span>
                </div>
              </FormGroup>
            )}

            <FormGroup className="row">
              <Label className="col-xl-3 col-md-4">
                <span>*</span> Teaching Plan
              </Label>
              <div className="col-xl-8 col-md-7">
                <Input
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
                />
              </div>
            </FormGroup>
            <FormGroup className="row">
              <Label className="col-xl-3 col-md-4">
                {role === "Observer" && <span>*</span>} Reflection Plan
              </Label>
              <div className="col-xl-8 col-md-7">
                <Input
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
                />
              </div>
            </FormGroup>
            {role === "Observer" && (
              <FormGroup className="row">
                <Label className="col-xl-3 col-md-4">
                  <span>*</span> Artifacts
                </Label>
                <div className="col-xl-8 col-md-7">
                  <Input
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
                  />
                </div>
              </FormGroup>
            )}
            {role === "Faculty" && (
              <FormGroup className="row">
                <Label className="col-xl-3 col-md-4">
                  <span>*</span> Select Course
                </Label>
                <div className="col-xl-8 col-md-7">
                  <Input
                    className="form-control"
                    id="validationCustom3"
                    type="select"
                    required={true}
                    value={artifacts}
                    onChange={(e) =>
                      setObsSchedule({
                        ...obsSchedule,
                        artifacts: e.target.value,
                      })
                    }
                  />
                </div>
              </FormGroup>
            )}
          </Form>
        </TabPanel>
      </Tabs>
      <div className="pull-right">
        {loader ? (
          <Button type="button" color="primary" style={{ cursor: "progress" }}>
            Processing...
          </Button>
        ) : (
          <Button
            onClick={() => onObservationScheduling()}
            type="button"
            color="primary"
          >
            Create
          </Button>
        )}
      </div>
    </Fragment>
  );
};

export default TabsetScheduling;
