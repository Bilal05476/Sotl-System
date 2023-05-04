import React, { Fragment, useState } from "react";
import { Tabs, TabList, TabPanel, Tab } from "react-tabs";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { useStateValue } from "../../StateProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { successes, errors, info, warning } from "../../constants/Toasters";
import { useRef } from "react";

const TabsetObservation = () => {
  const [{ user, users }] = useStateValue();
  const [createObs, setCreateObs] = useState({
    facultyId: "Select",
    observerId: "Select",
    semester: "Select",
    loader: false,
  });
  const { facultyId, observerId, semester, loader } = createObs;

  const toastId = useRef(null);

  const onCreateObservation = () => {
    const obsDetail = {
      facultyId: Number(facultyId),
      observerId: Number(observerId),
      hodId: user.id,
      semester,
    };
    async function postObs() {
      info("Observation initiating...");
      setCreateObs({
        ...createObs,
        loader: true,
      });
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/observation/initiate`,
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
        setCreateObs({
          ...createObs,
          loader: false,
        });
        errors(data.error);
      } else {
        toast.dismiss(toastId.current);
        setCreateObs({
          ...createObs,
          loader: false,
        });
        successes("Observation initiated successfully!");

        setTimeout(() => {
          setCreateObs({
            ...createObs,
            facultyId: "Select",
            observerId: "Select",
            semester: "Select",
          });
        }, 2000);
      }
    }

    if (
      facultyId === "Select" ||
      observerId === "Select" ||
      semester === "Select"
    ) {
      info("Provide fill all the fields!");
    } else {
      postObs();
    }
  };

  return (
    <Fragment>
      <ToastContainer position="top-center" />
      <Tabs>
        <TabList className="nav nav-tabs tab-coupon">
          <Tab className="nav-link">Provide Observation Details</Tab>
        </TabList>
        <TabPanel>
          <Form className="needs-validation user-add" noValidate="">
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
                  type="select"
                  required={true}
                  value={semester}
                  onChange={(e) =>
                    setCreateObs({
                      ...createObs,
                      semester: e.target.value,
                    })
                  }
                >
                  <option value="Select">Select</option>
                  <option value="Spring">Spring</option>
                  <option value="Summer">Summer</option>
                  <option value="Fall">Fall</option>
                </Input>
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
