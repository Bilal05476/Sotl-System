import React, { Fragment, useEffect, useState } from "react";
import { Tabs, TabList, TabPanel, Tab } from "react-tabs";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { Loader } from "../common/Loader";
import { useStateValue } from "../../StateProvider";
import { toast } from "react-toastify";
import { successes, errors, info, warning } from "../../constants/Toasters";
import { useRef } from "react";
import { completeColor2 } from "../colors";
import { useNavigate } from "react-router-dom";

const BASEURL =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_DEV_URL
    : process.env.REACT_APP_PROD_URL;

const TabsetObservation = () => {
  const nav = useNavigate();
  const [{ user, usersandcourses }] = useStateValue();
  const [availableFaculty, setAvailableFaculty] = useState([]);
  const [createObs, setCreateObs] = useState({
    observerId: "Select",
    semester: "Select",
    loader: false,
    faculties: [],
  });
  const { observerId, semester, loader, faculties } = createObs;

  const toastId = useRef(null);

  const filterOutFaculty = () => {
    // find faculty with not ongoing or pending observation
    const faculty = usersandcourses?.users.filter(
      (item) => item.role === "Faculty" && item.facultyObs.length === 0
    );

    setAvailableFaculty(faculty);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (usersandcourses) {
      filterOutFaculty();
    }
  }, [usersandcourses]);

  const onCreateObservation = () => {
    const obsDetail = {
      facultyIds: faculties,
      observerId: Number(observerId),
      hodId: Number(user.id),
      semester,
    };
    async function postObs() {
      info("Observation(s) initiating...");
      setCreateObs({
        ...createObs,
        loader: true,
      });

      try {
        const res = await fetch(`${BASEURL}/observation/initiate`, {
          method: "POST",
          body: JSON.stringify(obsDetail),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${user.token}`,
          },
        });
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
          successes("Observation(s) initiated successfully!");
          setTimeout(() => {
            setCreateObs({
              ...createObs,
              facultyId: "Select",
              observerId: "Select",
              semester: "Select",
              faculties: [],
              loader: false,
            });
            nav("/observations/list-observation");
          }, 2500);
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
    if (observerId === "Select" || faculties.length === 0) {
      info("Provide select observer and faculties both!");
    } else if (semester === "Select") {
      info("Provide select semester!");
    } else {
      postObs();
      // console.log(obsDetail);
    }
  };

  // const onSelectFaculty = async (e) => {
  //   setFCourses([]);
  //   let fid = e.target.value;

  //   if (fid !== "Select") {
  //     let id = Number(fid);
  //     setCreateObs({
  //       ...createObs,
  //       facultyId: id,
  //       courseId: "",
  //     });
  //     const findCourse = await fetch(
  //       `${process.env.REACT_APP_BASE_URL}/user/${id}`,
  //       {
  //         method: "GET",
  //         headers: {
  //           "Content-type": "application/json; charset=UTF-8",
  //         },
  //       }
  //     );
  //     const data = await findCourse.json();
  //     if (data.error) {
  //       errors(data.error);
  //     } else {
  //       setFCourses(data.slots);
  //     }
  //   } else {
  //     setCreateObs({
  //       ...createObs,
  //       facultyId: fid,
  //       courseId: "",
  //     });
  //   }
  // };

  // return null;

  // console.log(fCourses);

  const onSelectFaculty = async (e) => {
    const id = Number(e);
    if (faculties.includes(id)) {
      const filtered = faculties.filter((item) => item !== id);
      setCreateObs({
        ...createObs,
        faculties: filtered,
      });
    } else {
      setCreateObs({
        ...createObs,
        faculties: [...faculties, id],
      });
    }
  };

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
                          {item.name} ({item.id})
                        </option>
                      )
                  )}
                </Input>
              </div>
            </FormGroup>
            <FormGroup className="row">
              <Label className="col-xl-3 col-md-4">
                <span>*</span> Faculty (one atleast)
              </Label>
              <div className="col-xl-8 col-md-7">
                <Input
                  className="form-control"
                  id="validationCustom4"
                  type="select"
                  required={true}
                  // value={facultyId}
                  onChange={(e) => onSelectFaculty(e.target.value)}
                >
                  <option value="Select">Select</option>
                  {availableFaculty.map(
                    (item) =>
                      !faculties.includes(item.id) && (
                        <option key={item.id} value={item.id}>
                          {item.name} ({item.id})
                        </option>
                      )
                  )}
                  {availableFaculty.length === 0 && (
                    <option disabled>
                      No available faculty for observation at the moment!
                    </option>
                  )}
                </Input>
              </div>
            </FormGroup>
            {faculties.length > 0 && (
              <FormGroup className="row">
                <Label className="col-xl-3 col-md-4">Selected Faculty</Label>
                <div className="col-xl-8 col-md-7 d-flex flex-wrap">
                  {availableFaculty.map(
                    (item) =>
                      faculties.includes(item.id) && (
                        <span
                          style={{
                            backgroundColor: completeColor2,
                            padding: "0.2rem 0.6rem",
                            marginRight: "0.3rem",
                            marginBottom: "0.3rem",
                            borderRadius: "5px",
                            color: "white",
                            boxShadow: "1px 1px 1px #1e1e1e54",
                            cursor: "pointer",
                          }}
                          key={item.id}
                          value={item.id}
                          onClick={() => onSelectFaculty(item.id)}
                        >
                          {item.name} ({item.id})
                        </span>
                      )
                  )}
                </div>
              </FormGroup>
            )}
            {/* <FormGroup className="row">
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
            </FormGroup> */}
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
        <Button
          onClick={() => onCreateObservation()}
          type="button"
          color="primary"
          disabled={loader}
          style={{ cursor: loader && "progress" }}
        >
          {loader ? <Loader /> : "Initiate"}
        </Button>
      </div>
    </Fragment>
  );
};

export default TabsetObservation;
