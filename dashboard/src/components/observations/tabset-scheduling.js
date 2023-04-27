import React, { Fragment, useState } from "react";
import { useParams } from "react-router-dom";
import { Tabs, TabList, TabPanel, Tab } from "react-tabs";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
// import { useStateValue } from "../../StateProvider";

const TabsetScheduling = () => {
  //   const [{ user, users }] = useStateValue();

  const [obsSchedule, setObsSchedule] = useState({
    observerTeaching: "",
    observerReflection: "",
    observerArtifacts: "",
    error: "",
    success: "",
    loader: false,
  });
  const {
    observerTeaching,
    observerReflection,
    error,
    success,
    observerArtifacts,
    loader,
  } = obsSchedule;

  const { id } = useParams();

  const onObservationScheduling = () => {
    const obsDetail = {
      teachingPlanByObserver: observerTeaching,
      refelectionPlanByObserver: observerReflection,
      artifacts: observerArtifacts,
      observationsId: Number(id),
    };
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
          // observerTeaching: "",
          // observerReflection: "",
          // observerArtifacts: "",
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
    setObsSchedule({
      ...obsSchedule,
      error: "",
      success: "",
      loader: true,
    });
    setTimeout(() => {
      if (!observerArtifacts || !observerReflection || !observerTeaching) {
        setObsSchedule({
          ...obsSchedule,
          error: "Provide all the documents",
          success: "",
          loader: false,
        });
      } else {
        postObs();
      }
    }, 1000);
  };

  return (
    <Fragment>
      <Tabs>
        <TabList className="nav nav-tabs tab-coupon">
          <Tab className="nav-link">Observation Scheduling</Tab>
        </TabList>
        <TabPanel>
          <Form className="needs-validation user-add" noValidate="">
            <h4>Scheduling Details</h4>
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
                  value={observerTeaching}
                  onChange={(e) =>
                    setObsSchedule({
                      ...obsSchedule,
                      observerTeaching: e.target.value,
                    })
                  }
                />
              </div>
            </FormGroup>
            <FormGroup className="row">
              <Label className="col-xl-3 col-md-4">
                <span>*</span> Reflection Plan
              </Label>
              <div className="col-xl-8 col-md-7">
                <Input
                  className="form-control"
                  id="validationCustom3"
                  type="file"
                  required={true}
                  value={observerReflection}
                  onChange={(e) =>
                    setObsSchedule({
                      ...obsSchedule,
                      observerReflection: e.target.value,
                    })
                  }
                />
              </div>
            </FormGroup>
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
                  value={observerArtifacts}
                  onChange={(e) =>
                    setObsSchedule({
                      ...obsSchedule,
                      observerArtifacts: e.target.value,
                    })
                  }
                />
              </div>
            </FormGroup>
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
