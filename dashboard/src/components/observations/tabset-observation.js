import React, { Fragment, useState } from "react";
import { Tabs, TabList, TabPanel, Tab } from "react-tabs";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { useStateValue } from "../../StateProvider";

const TabsetObservation = () => {
  const [{ user, users }] = useStateValue();
  const [createObs, setCreateObs] = useState({
    facultyId: "Select",
    observerId: "Select",
    semester: "",
    error: "",
    success: "",
    loader: false,
  });
  const { facultyId, observerId, error, success, semester, loader } = createObs;

  const onCreateObservation = () => {
    const obsDetail = {
      facultyId: Number(facultyId),
      observerId: Number(observerId),
      hodId: user.id,
      semester,
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
          loader: false,
        });
      } else {
        setCreateObs({
          ...createObs,
          success: "Observation initiated successfully",
          loader: false,
        });

        setTimeout(() => {
          setCreateObs({
            ...createObs,
            error: "",
            facultyId: "Select",
            observerId: "Select",
            success: "",
            semester: "",
          });
        }, 2000);
      }
    }

    setCreateObs({
      ...createObs,
      error: "",
      success: "",
      loader: true,
    });

    setTimeout(() => {
      if (facultyId === "Select" || observerId === "Select" || !semester) {
        setCreateObs({
          ...createObs,
          error: "Provide fill all the fields",
          success: "",
          loader: false,
        });
      } else {
        postObs();
      }
    }, 1500);
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
                <span>*</span> Observer
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
                <span>*</span> Faculty
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
            <FormGroup className="row">
              <Label className="col-xl-3 col-md-4">
                <span>*</span> Semester
              </Label>
              <div className="col-xl-8 col-md-7">
                <Input
                  className="form-control"
                  id="validationCustom4"
                  placeholder="Fall 2023"
                  type="text"
                  required={true}
                  value={semester}
                  onChange={(e) =>
                    setCreateObs({
                      ...createObs,
                      semester: e.target.value,
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
            onClick={() => onCreateObservation()}
            type="button"
            color="primary"
          >
            Initiate
          </Button>
        )}
      </div>
    </Fragment>
  );
};

export default TabsetObservation;
