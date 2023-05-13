import React, { Fragment, useEffect, useState } from "react";
import { Tabs, TabList, TabPanel, Tab } from "react-tabs";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { useStateValue } from "../../StateProvider";
import { toast } from "react-toastify";
import { successes, errors, info, warning } from "../../constants/Toasters";
import { useRef } from "react";
import { completeColor, ongoingColor, pendingColor } from "../colors";

const TabsetAssignCourses = () => {
  const [{ usersandcourses }] = useStateValue();
  const [selectedCourse, setselectedCourse] = useState("");

  const [assignCourses, setassignCourses] = useState({
    slots: [],
    loader: false,
    facultyId: "Select",
    courseId: "Select",
  });
  const { slots, facultyId, courseId, loader } = assignCourses;

  const toastId = useRef(null);

  const onassignCourses = () => {
    const courseDetails = {
      slots,
    };
    async function assignCourse() {
      info("Course assigning...");
      setassignCourses({
        ...assignCourses,
        loader: true,
      });
      try {
        const res = await fetch(
          `${process.env.REACT_APP_BASE_URL}/courses/user/${facultyId}`,
          {
            method: "PUT",
            body: JSON.stringify(courseDetails),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
              // Authorization: `Bearer ${user.token}`,
            },
          }
        );
        const data = await res.json();
        if (data.error) {
          toast.dismiss(toastId.current);
          setassignCourses({
            ...assignCourses,
            loader: false,
          });
          errors(data.error);
        } else {
          toast.dismiss(toastId.current);
          setassignCourses({
            ...assignCourses,
            loader: false,
          });
          successes(data.message);
          clear();
        }
      } catch (err) {
        toast.dismiss(toastId.current);
        errors(err.message);
      }
    }
    if (facultyId === "Select" || courseId === "Select") {
      info("Provide details properly!");
    } else if (slots.length === 0) {
      info("Please select the slots!");
    } else {
      assignCourse();
      // console.log(courseDetails);
    }
  };

  const onSelectCousre = async () => {
    warning("Slots loading...");
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/course/${courseId}`,
        {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            // Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const data = await res.json();
      if (data.error) {
        toast.dismiss(toastId.current);
        errors(data.error);
      } else {
        toast.dismiss(toastId.current);
        setselectedCourse(data);
        successes("Slots load sucessfully!");
      }
    } catch (err) {
      toast.dismiss(toastId.current);
      errors(err.message);
    }
  };

  useEffect(() => {
    setselectedCourse([]);
    setassignCourses({
      ...assignCourses,
      slots: [],
    });
    if (courseId !== "Select") {
      onSelectCousre();
    }
  }, [courseId]);

  const onRmoveSlot = (id) => {
    const removeSlotId = slots.filter((item) => item !== id);
    setassignCourses({
      ...assignCourses,
      slots: removeSlotId,
    });
  };

  const clear = () => {
    setassignCourses({
      slots: [],
      facultyId: "Select",
      courseId: "Select",
    });
  };

  return (
    <Fragment>
      <Tabs>
        <TabList className="nav nav-tabs tab-coupon">
          <Tab className="nav-link">Select Faculty, Courses, &amp; Slots</Tab>
        </TabList>
        <TabPanel>
          <Form className="needs-validation user-add" noValidate="">
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
                    setassignCourses({
                      ...assignCourses,
                      facultyId: e.target.value,
                    })
                  }
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
                <span>*</span> Course
              </Label>
              <div className="col-xl-8 col-md-7">
                <Input
                  className="form-control"
                  id="validationCustom4"
                  type="select"
                  required={true}
                  value={courseId}
                  onChange={(e) =>
                    setassignCourses({
                      ...assignCourses,
                      courseId: e.target.value,
                    })
                  }
                >
                  <option value="Select">Select</option>
                  {usersandcourses?.courses.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </Input>
              </div>
            </FormGroup>
            <FormGroup className="row">
              <Label className="col-xl-3 col-md-4">
                <span>*</span> Select Slots
              </Label>
              <div className="col-xl-8 col-md-7">
                <Input
                  className="form-control"
                  id="validationCustom4"
                  type="select"
                  required={true}
                  value={slots}
                  onChange={(e) =>
                    setassignCourses({
                      ...assignCourses,
                      slots: [...slots, e.target.value],
                    })
                  }
                >
                  <option value="Select">Select</option>
                  {selectedCourse?.slots?.map((item) => {
                    if (!slots.includes(item.id) && item.facultyId === null) {
                      return (
                        <option key={item.id} value={item.id}>
                          {item.day} | {item.time} | {item.location}
                        </option>
                      );
                    }
                  })}
                </Input>
              </div>
            </FormGroup>
            {slots.length > 0 && (
              <FormGroup className="row">
                <Label className="col-xl-3 col-md-4">
                  <span>*</span> Selected Slots
                </Label>
                <div className="col-xl-8 col-md-7">
                  {selectedCourse?.slots?.map((item) => {
                    if (slots.includes(item.id))
                      return (
                        <span
                          className="mb-2"
                          style={{
                            border: `1px solid ${pendingColor}`,
                            marginRight: "0.5rem",
                            padding: "0.2rem 0.8rem",
                            borderRadius: "15px",
                            cursor: "pointer",
                            backgroundColor: pendingColor,
                            color: "#000",
                          }}
                          onClick={() => onRmoveSlot(item.id)}
                        >
                          {item.day} | {item.time} | {item.location}
                        </span>
                      );
                  })}
                </div>
              </FormGroup>
            )}
          </Form>
        </TabPanel>
      </Tabs>

      <div className="pull-right">
        {loader ? (
          <Button type="button" color="primary" style={{ cursor: "progress" }}>
            Assigning...
          </Button>
        ) : (
          <Button
            onClick={() => onassignCourses()}
            type="button"
            color="primary"
          >
            Assign
          </Button>
        )}
      </div>
    </Fragment>
  );
};

export default TabsetAssignCourses;
