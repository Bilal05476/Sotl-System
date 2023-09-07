import React, { Fragment, useEffect, useState } from "react";
import { Tabs, TabList, TabPanel, Tab } from "react-tabs";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { Loader } from "../common/Loader";
import { useStateValue } from "../../StateProvider";
import { toast } from "react-toastify";
import { successes, errors, info, warning } from "../../constants/Toasters";
import { useRef } from "react";
// import { completeColor2 } from "../colors";

const TabsetPrompt = () => {
  const [{ user, userData }] = useStateValue();
  const [createPrompt, setCreatePrompt] = useState({
    departmentId: "Select",
    campus: "Select",
    threshold: "",
    loader: false,
  });
  const { departmentId, loader, campus, threshold } = createPrompt;

  const toastId = useRef(null);

  const onCreatePrompt = () => {
    async function postObs(obsDetail) {
      info("Observation prompting...");
      setCreatePrompt({
        ...createPrompt,
        loader: true,
      });

      try {
        const res = await fetch(
          `${process.env.REACT_APP_BASE_URL}/observation/prompt`,
          {
            method: "POST",
            body: JSON.stringify(obsDetail),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        const data = await res.json();
        if (data.error) {
          toast.dismiss(toastId.current);
          setCreatePrompt({
            ...createPrompt,
            loader: false,
          });
          errors(data.error);
        } else {
          toast.dismiss(toastId.current);
          successes(data.message);
          setTimeout(() => {
            setCreatePrompt({
              ...createPrompt,
              departmentId: "Select",
              campus: "Select",
              threshold: "",
            });
          }, 2500);
        }
      } catch (error) {
        toast.dismiss(toastId.current);
        errors("Something went wrong, Try again in a moment!");
        setCreatePrompt({
          ...createPrompt,
          loader: false,
        });
      }
    }
    if (departmentId === "Select" || campus === "Select") {
      info("Provide select campus and department both!");
    } else if (threshold < 50) {
      info("Provide minimum 50 threshold!");
    } else {
      const obsDetail = {
        departmentId: Number(departmentId),
        campus,
        threshold: Number(threshold),
      };
      postObs(obsDetail);
      //   console.log(obsDetail);
    }
  };

  return (
    <Fragment>
      <Tabs>
        <TabList className="nav nav-tabs tab-coupon">
          <Tab className="nav-link">Provide Prompt Details</Tab>
        </TabList>
        <TabPanel>
          <Form className="needs-validation user-add" noValidate="">
            <FormGroup className="row">
              <Label className="col-xl-3 col-md-4">
                <span>*</span> Campus
              </Label>
              <div className="col-xl-8 col-md-7">
                <Input
                  className="form-control"
                  id="validationCustom3"
                  type="select"
                  required={true}
                  value={campus}
                  onChange={(e) =>
                    setCreatePrompt({
                      ...createPrompt,
                      campus: e.target.value,
                    })
                  }
                >
                  <option value="Select">Select</option>

                  <option value="Main_Campus">Main Campus</option>
                </Input>
              </div>
            </FormGroup>
            <FormGroup className="row">
              <Label className="col-xl-3 col-md-4">
                <span>*</span> Department
              </Label>
              <div className="col-xl-8 col-md-7">
                <Input
                  className="form-control"
                  id="validationCustom4"
                  type="select"
                  required={true}
                  onChange={(e) =>
                    setCreatePrompt({
                      ...createPrompt,
                      departmentId: e.target.value,
                    })
                  }
                >
                  <option value="Select">Select</option>
                  {userData.department.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                  {userData.department.length === 0 && (
                    <option disabled>
                      No available department at the moment!
                    </option>
                  )}
                </Input>
              </div>
            </FormGroup>
            <FormGroup className="row">
              <Label className="col-xl-3 col-md-4">
                <span>*</span> Observation Threshold
              </Label>
              <div className="col-xl-8 col-md-7">
                <Input
                  className="form-control"
                  id="validationCustom4"
                  placeholder="50-100"
                  type="number"
                  required={true}
                  value={threshold}
                  onChange={(e) =>
                    setCreatePrompt({
                      ...createPrompt,
                      threshold: e.target.value,
                    })
                  }
                />
              </div>
            </FormGroup>
          </Form>
        </TabPanel>
      </Tabs>
      <div className="pull-right">
        <Button
          onClick={() => onCreatePrompt()}
          type="button"
          color="primary"
          disabled={loader}
          style={{ cursor: loader && "progress" }}
        >
          {loader ? <Loader /> : "Genrate Prompt"}
        </Button>
      </div>
    </Fragment>
  );
};

export default TabsetPrompt;
