import React, { Fragment, useState, useEffect } from "react";
import { Tabs, TabList, TabPanel, Tab } from "react-tabs";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { XCircle } from "react-feather";
import { useStateValue } from "../../StateProvider";
const TabsetUser = () => {
  const [{ courses }] = useStateValue();
  const [createUser, setCreateUser] = useState({
    fullname: "",
    email: "",
    role: "Select",
    campus: "Select",
    department: "Select",
    coursesIds: [],
    password: "",
    cPassword: "",
    error: "",
    success: "",
  });
  const {
    fullname,
    email,
    password,
    role,
    campus,
    department,
    cPassword,
    coursesIds,
    error,
    success,
  } = createUser;

  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  const onCreateUser = () => {
    const userDetail = {
      name: fullname,
      email,
      password,
      role,
      campus,
      department,
      courses: coursesIds,
    };
    async function postUser() {
      const res = await fetch("http://localhost:8080/api/create", {
        method: "POST",
        body: JSON.stringify(userDetail),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const data = await res.json();
      if (data.error) {
        setCreateUser({
          ...createUser,
          error: data.error,
          success: "",
        });
      } else {
        setCreateUser({
          ...createUser,
          success: "User created successfully",
        });

        setTimeout(() => {
          setCreateUser({
            ...createUser,
            error: "",
            fullname: "",
            email: "",
            password: "",
            cPassword: "",
            courses: [],
            role: "Select",
            campus: "Select",
            department: "Select",
            success: "",
          });
        }, 2000);
      }
    }
    if (role === "Select" || department === "Select" || campus === "Select") {
      setCreateUser({
        ...createUser,
        error: "Missing some details",
        success: "",
      });
    } else if (password.length < 8) {
      setCreateUser({
        ...createUser,
        error: "Password should be minimum 8 character long",
        success: "",
      });
    } else if (password !== cPassword) {
      setCreateUser({
        ...createUser,
        error: "Passwords should be same",
        success: "",
      });
    } else if (!email.includes("iqra.edu.pk")) {
      setCreateUser({
        ...createUser,
        error: "Only @iqra.edu.pk domain allowed",
        success: "",
      });
    } else if (!validateEmail(email)) {
      setCreateUser({
        ...createUser,
        error: "Please enter valid email address",
        success: "",
      });
    } else if (role === "Faculty" || role === "Observer") {
      if (coursesIds.length < 1) {
        setCreateUser({
          ...createUser,
          error: `Assign Courses to ${role}`,
          success: "",
        });
      } else {
        console.log(userDetail);
        // postUser();
      }
    } else {
      console.log(userDetail);
      // postUser();
    }
  };

  const handleCourseRemove = (id) => {
    const deleteCourse = coursesIds.filter((item) => item !== id);
    setCreateUser({
      ...createUser,
      coursesIds: deleteCourse,
    });
  };

  return (
    <Fragment>
      <Tabs>
        <TabList className="nav nav-tabs tab-coupon">
          <Tab className="nav-link">Create User</Tab>
        </TabList>
        <TabPanel>
          <Form className="needs-validation user-add" noValidate="">
            <h4>User Details</h4>
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
                <span>*</span> Full Name
              </Label>
              <div className="col-xl-8 col-md-7">
                <Input
                  className="form-control"
                  id="validationCustom0"
                  type="text"
                  placeholder="John Smith"
                  required={true}
                  value={fullname}
                  onChange={(e) =>
                    setCreateUser({
                      ...createUser,
                      fullname: e.target.value,
                    })
                  }
                />
              </div>
            </FormGroup>

            <FormGroup className="row">
              <Label className="col-xl-3 col-md-4">
                <span>*</span> Email
              </Label>
              <div className="col-xl-8 col-md-7">
                <Input
                  className="form-control"
                  id="validationCustom2"
                  type="text"
                  placeholder="john@iqra.edu.pk"
                  required={true}
                  value={email}
                  onChange={(e) =>
                    setCreateUser({
                      ...createUser,
                      email: e.target.value,
                    })
                  }
                />
              </div>
            </FormGroup>
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
                    setCreateUser({
                      ...createUser,
                      campus: e.target.value,
                    })
                  }
                >
                  <option value="Select">Select</option>
                  <option value="Main_Campus">Main Campus</option>
                  <option value="Gulshan_Campus">Gulshan Campus</option>
                  <option value="North_Campus">North Campus</option>
                  <option value="Airport_Campus">Airport Campus</option>
                  <option value="Bahria_Campus">Bahria Campus</option>
                  <option value="Islamabad_Campus">Islamabad Campus</option>
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
                  value={department}
                  onChange={(e) =>
                    setCreateUser({
                      ...createUser,
                      department: e.target.value,
                    })
                  }
                >
                  <option value="Select">Select</option>
                  <option value="Fest">FEST</option>
                  <option value="Aifd">AIFD</option>
                  <option value="Media">Media</option>
                  <option value="Business">Business</option>
                </Input>
              </div>
            </FormGroup>
            <FormGroup className="row">
              <Label className="col-xl-3 col-md-4">
                <span>*</span> Role
              </Label>
              <div className="col-xl-8 col-md-7">
                <Input
                  className="form-control"
                  id="validationCustom5"
                  type="select"
                  required={true}
                  value={role}
                  onChange={(e) =>
                    setCreateUser({
                      ...createUser,
                      role: e.target.value,
                    })
                  }
                >
                  <option value="Select">Select</option>
                  <option value="Campus_Director">Campus Director</option>
                  <option value="Head_of_Department">Head of Department</option>
                  <option value="Observer">Observer</option>
                  <option value="Faculty">Faculty</option>
                </Input>
              </div>
            </FormGroup>
            {role === "Faculty" || role === "Observer" ? (
              <FormGroup className="row">
                <Label className="col-xl-3 col-md-4">
                  <span>*</span> Courses
                </Label>
                <div className="col-xl-8 col-md-7">
                  <Input
                    className="form-control"
                    id="validationCustom5"
                    type="select"
                    required={true}
                    value={coursesIds}
                    onChange={(e) =>
                      setCreateUser({
                        ...createUser,
                        coursesIds: [...coursesIds, Number(e.target.value)],
                      })
                    }
                  >
                    <option value="Select">Select</option>
                    {courses.map((item) => (
                      <>
                        {!coursesIds.includes(item.id) && (
                          <option key={item.id} value={item.id}>
                            {item.courseName} {"->"} {item.day} {"->"}{" "}
                            {item.timeSlot} {"->"} {item.room}
                          </option>
                        )}
                      </>
                    ))}
                  </Input>
                </div>
              </FormGroup>
            ) : (
              ""
            )}

            {role === "Faculty" || role === "Observer" ? (
              <FormGroup className="row">
                <Label className="col-xl-3 col-md-4"></Label>
                <div className="col-xl-8 col-md-7 d-flex flex-wrap">
                  {courses.map((item) => (
                    <>
                      {coursesIds.includes(item.id) && (
                        <span
                          style={{
                            backgroundColor: "#040b5b",
                            color: "#fff",
                            padding: "0.2rem 0.5rem",
                            borderRadius: "5px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            width: "auto",
                            marginRight: "0.2rem",
                            marginBottom: "0.2rem",
                          }}
                        >
                          <span
                            style={{
                              color: "#fff",
                              marginRight: "0.5rem",
                            }}
                          >
                            {item.courseName} {"->"} {item.day} {"->"}{" "}
                            {item.timeSlot} {"->"} {item.room}
                          </span>
                          <XCircle
                            style={{
                              cursor: "pointer",
                            }}
                            onClick={() => handleCourseRemove(item.id)}
                            size={20}
                          />
                        </span>
                      )}
                    </>
                  ))}
                </div>
              </FormGroup>
            ) : (
              ""
            )}
            <FormGroup className="row">
              <Label className="col-xl-3 col-md-4">
                <span>*</span> Password
              </Label>
              <div className="col-xl-8 col-md-7">
                <Input
                  className="form-control"
                  id="validationCustom6"
                  type="password"
                  placeholder="*********"
                  required={true}
                  value={password}
                  onChange={(e) =>
                    setCreateUser({
                      ...createUser,
                      password: e.target.value,
                    })
                  }
                />
              </div>
            </FormGroup>
            <FormGroup className="row">
              <Label className="col-xl-3 col-md-4">
                <span>*</span> Confirm Password
              </Label>
              <div className="col-xl-8 col-md-7">
                <Input
                  className="form-control"
                  id="validationCustom7"
                  type="password"
                  placeholder="*********"
                  required={true}
                  value={cPassword}
                  onChange={(e) =>
                    setCreateUser({
                      ...createUser,
                      cPassword: e.target.value,
                    })
                  }
                />
              </div>
            </FormGroup>
          </Form>
        </TabPanel>
      </Tabs>
      <div className="pull-right">
        <Button onClick={() => onCreateUser()} type="button" color="primary">
          Add User
        </Button>
      </div>
    </Fragment>
  );
};

export default TabsetUser;
