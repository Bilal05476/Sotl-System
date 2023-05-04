import React, { Fragment, useState, useRef } from "react";
import { Tabs, TabList, TabPanel, Tab } from "react-tabs";
import { Button, Col, Form, FormGroup, Input, Label, Table } from "reactstrap";
import { XCircle } from "react-feather";
import { useStateValue } from "../../StateProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { successes, errors, info, warning } from "../../constants/Toasters";

const TabsetUser = () => {
  const [{ courses, user }] = useStateValue();
  // console.log(user);
  const [createUser, setCreateUser] = useState({
    fullname: "",
    email: "",
    role: "Select",
    campus: user?.campus?.replaceAll("_", " "),
    department: user?.department,
    coursesIds: [],
    password: "",
    cPassword: "",
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
  } = createUser;

  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  const toastId = useRef(null);

  const onCreateUser = () => {
    const userDetail = {
      name: fullname,
      email,
      password,
      role,
      campus: user?.campus,
      department: user?.department,
      courses: coursesIds,
    };
    async function postUser() {
      info("User Creating...");
      const res = await fetch(`${process.env.REACT_APP_BASE_URL}/create`, {
        method: "POST",
        body: JSON.stringify(userDetail),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await res.json();
      if (data.error) {
        toast.dismiss(toastId.current);
        errors(data.error);
      } else {
        toast.dismiss(toastId.current);
        successes("User created successfully");
        setTimeout(() => {
          setCreateUser({
            ...createUser,
            fullname: "",
            email: "",
            password: "",
            cPassword: "",
            coursesIds: [],
            role: "Select",
            campus: user.campus ? user.campus : "Select",
            department: user.department ? user.department : "Select",
          });
        }, 2000);
      }
    }
    if (role === "Select" || department === "Select" || campus === "Select") {
      info("Missing some user fields!");
    } else if (password.length < 8) {
      info("Password should be minimum 8 characters long!");
    } else if (password !== cPassword) {
      warning("Passwords should be same!");
    } else if (!email.includes("iqra.edu.pk")) {
      info("Only @iqra.edu.pk email domain allowed!");
    } else if (!validateEmail(email)) {
      warning("Please enter valid email address!");
    } else if (role === "Faculty" || role === "Observer") {
      if (coursesIds.length < 1) {
        info(`Assign Courses to ${role}`);
      } else {
        postUser();
      }
    } else {
      postUser();
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
      <ToastContainer position="top-center" />
      <Tabs>
        <TabList className="nav nav-tabs tab-coupon">
          <Tab className="nav-link">User Details</Tab>
        </TabList>
        <TabPanel>
          <Form className="needs-validation user-add" noValidate="">
            {/* <h4></h4> */}
            {/* {error && (
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
            )} */}
            {/* {success && (
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
            )} */}
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
                  type="text"
                  // required={true}
                  readOnly={true}
                  value={campus}
                  // onChange={(e) =>
                  //   setCreateUser({
                  //     ...createUser,
                  //     campus: e.target.value,
                  //   })
                  // }
                />

                {/* 
                <option value="Select">Select</option>
                  <option value="Main_Campus">Main Campus</option>
                  <option value="Gulshan_Campus">Gulshan Campus</option>
                  <option value="North_Campus">North Campus</option>
                  <option value="Airport_Campus">Airport Campus</option>
                  <option value="Bahria_Campus">Bahria Campus</option>
                  <option value="Islamabad_Campus">Islamabad Campus</option> 
                  </Input>
                  */}
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
                  type="text"
                  readOnly={true}
                  value={department}
                  // onChange={(e) =>
                  //   setCreateUser({
                  //     ...createUser,
                  //     department: e.target.value,
                  //   })
                  // }
                />
                {/* <option value="Select">Select</option>
                  <option value="Fest">FEST</option>
                  <option value="Aifd">AIFD</option>
                  <option value="Media">Media</option>
                  <option value="Business">Business</option>
                </Input> */}
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
                  {user.role === "Admin" && (
                    <>
                      <option value="Campus_Director">Campus Director</option>
                      <option value="Head_of_Department">
                        Head of Department
                      </option>
                      <option value="Observer">Observer</option>
                      <option value="Faculty">Faculty</option>
                    </>
                  )}
                  {user.role === "Campus_Director" && (
                    <>
                      <option value="Head_of_Department">
                        Head of Department
                      </option>
                      <option value="Observer">Observer</option>
                      <option value="Faculty">Faculty</option>
                    </>
                  )}
                  {user.role === "Head_of_Department" && (
                    <>
                      <option value="Observer">Observer</option>
                      <option value="Faculty">Faculty</option>
                    </>
                  )}
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
                  <Table borderless>
                    <thead>
                      <tr>
                        <th scope="col">Course</th>
                        <th scope="col">Day</th>
                        <th scope="col">Time</th>
                        <th scope="col">Room</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {courses.map((item) => (
                        <>
                          {coursesIds.includes(item.id) && (
                            <tr key={item.id}>
                              <td className="digits">{item.courseName}</td>
                              <td className="digits">{item.day}</td>
                              <td className="digits">{item.timeSlot}</td>
                              <td className="digits">{item.room}</td>
                              <td>
                                <XCircle
                                  style={{
                                    cursor: "pointer",
                                  }}
                                  onClick={() => handleCourseRemove(item.id)}
                                  size={20}
                                  color="crimson"
                                />
                              </td>
                            </tr>
                          )}
                        </>
                      ))}
                      {coursesIds.length === 0 && (
                        <tr>
                          <td colSpan="5" className=" text-center digits">
                            No Courses assigned!
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
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
