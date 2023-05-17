import React, { Fragment, useState } from "react";
import { Tabs, TabList, TabPanel, Tab } from "react-tabs";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { useStateValue } from "../../StateProvider";
import { toast } from "react-toastify";
import { successes, errors, info, warning } from "../../constants/Toasters";
import { useRef } from "react";

const TabsetObservation = () => {
  const [{ user, usersandcourses }] = useStateValue();
  const [createObs, setCreateObs] = useState({
    facultyId: "Select",
    observerId: "Select",
    semester: "Select",
    loader: false,
    courseId: "",
  });
  const { facultyId, observerId, semester, loader, courseId } = createObs;

  const toastId = useRef(null);

  const onCreateObservation = () => {
    const obsDetail = {
      facultyId: Number(facultyId),
      observerId: Number(observerId),
      courseId: courseId,
      hodId: user.id,
      semester,
    };
    async function postObs() {
      info("Observation initiating...");
      setCreateObs({
        ...createObs,
        loader: true,
      });

      try {
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
              courseId: "",
            });
          }, 2000);
        }
      } catch (error) {
        toast.dismiss(toastId.current);
        errors("Something went wrong, Try again in a moment!");
        setCreateObs({
          ...createObs,
          loader: false,
        });
      }
    }

    if (observerId === "Select" || facultyId === "Select") {
      info("Provide select observer and faculty both!");
    } else if (semester === "Select") {
      info("Provide select semester!");
    } else if (!courseId) {
      info("Provide select course for faculty!");
    } else {
      // postObs();
      console.log(obsDetail);
    }
  };

  const [fCourses, setFCourses] = useState([]);
  const onSelectFaculty = async (e) => {
    setFCourses([]);
    let fid = e.target.value;

    if (fid !== "Select") {
      let id = Number(fid);
      setCreateObs({
        ...createObs,
        facultyId: id,
        courseId: "",
      });
      const findCourse = await fetch(
        `${process.env.REACT_APP_BASE_URL}/user/${id}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      const data = await findCourse.json();
      if (data.error) {
        errors(data.error);
      } else {
        setFCourses(data.slots);
      }
    } else {
      setCreateObs({
        ...createObs,
        facultyId: fid,
        courseId: "",
      });
    }
  };

  // return null;

  console.log(fCourses);

  return (
    <Fragment>
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
                  {usersandcourses?.users.map(
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
                  onChange={(e) => onSelectFaculty(e)}
                >
                  <option value="Select">Select</option>
                  {usersandcourses?.users.map(
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
                <span>*</span> Faculty Course
              </Label>
              <div className="col-xl-8 col-md-7">
                <Input
                  className="form-control"
                  id="validationCustom4"
                  type="select"
                  required={true}
                  value={courseId}
                  onChange={(e) =>
                    setCreateObs({
                      ...createObs,
                      courseId: e.target.value,
                    })
                  }
                >
                  <option value="Select">Select</option>
                  {fCourses.map((item) => (
                    <option key={item.id} value={item.course.id}>
                      {item.course.name}
                    </option>
                  ))}
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
