import React, { Fragment, useState } from "react";
import { Tabs, TabList, TabPanel, Tab } from "react-tabs";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { useStateValue } from "../../StateProvider";

const TabsetObservation = () => {
  const [{ user, users }] = useStateValue();
  const [createObs, setCreateObs] = useState({
    facultyId: "Select",
    observerId: "Select",
    error: "",
    success: "",
  });
  const { facultyId, observerId, error, success } = createObs;

  const onCreateObservation = () => {
    const obsDetail = {
      facultyId,
      observerId,
      hodId: user.id,
    };
    async function postObs() {
      const res = await fetch("http://localhost:8080/api/initiate-obs", {
        method: "POST",
        body: JSON.stringify(obsDetail),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const data = await res.json();
      if (data.error) {
        setCreateObs({
          ...createObs,
          error: data.error,
          success: "",
        });
      } else {
        setCreateObs({
          ...createObs,
          success: "Observation initiated successfully",
        });

        setTimeout(() => {
          setCreateObs({
            ...createObs,
            error: "",
            facultyId: "Select",
            observerId: "Select",
            success: "",
          });
        }, 2000);
      }
    }
    if (facultyId === "Select" || observerId === "Select") {
      setCreateObs({
        ...createObs,
        error: "Provide both faculty and observer",
        success: "",
      });
    } else {
      postObs();
    }
  };

  return (
    <Fragment>
      <Tabs>
        <TabList className="nav nav-tabs tab-coupon">
          <Tab className="nav-link">Create Observation</Tab>
        </TabList>
        <TabPanel>
          <Form className="needs-validation user-add" noValidate="">
            <h4>Observation Details</h4>
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
                <span>*</span> Faculty Observer
              </Label>
              <div className="col-xl-8 col-md-7">
                <Input
                  className="form-control"
                  id="validationCustom3"
                  type="select"
                  required={true}
                  value={observerId}
                  onChange={(e) =>
                    setCreateObs({
                      ...createObs,
                      observerId: e.target.value,
                    })
                  }
                >
                  <option value="Select">Select</option>
                  {users.map(
                    (item) =>
                      item.role === "Observer" && (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      )
                  )}
                </Input>
              </div>
            </FormGroup>
            <FormGroup className="row">
              <Label className="col-xl-3 col-md-4">
                <span>*</span> Faculty Member
              </Label>
              <div className="col-xl-8 col-md-7">
                <Input
                  className="form-control"
                  id="validationCustom4"
                  type="select"
                  required={true}
                  value={facultyId}
                  onChange={(e) =>
                    setCreateObs({
                      ...createObs,
                      facultyId: e.target.value,
                    })
                  }
                >
                  <option value="Select">Select</option>
                  {users.map(
                    (item) =>
                      item.role === "Faculty" && (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      )
                  )}
                </Input>
              </div>
            </FormGroup>
          </Form>
        </TabPanel>
      </Tabs>
      <div className="pull-right">
        <Button
          onClick={() => onCreateObservation()}
          type="button"
          color="primary"
        >
          Initiate
        </Button>
      </div>
    </Fragment>
  );
};

export default TabsetObservation;
