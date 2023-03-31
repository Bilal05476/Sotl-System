import React, { Fragment, useState } from "react";
import { Tabs, TabList, TabPanel, Tab } from "react-tabs";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";

const TabsetUser = () => {
  const [createUser, setCreateUser] = useState({
    fullname: "",
    email: "",
    role: "",
    campus: "",
    department: "",
    password: "",
    cPassword: "",
    error: "",
  });
  const {
    fullname,
    email,
    password,
    role,
    campus,
    department,
    cPassword,
    error,
  } = createUser;

  const onCreateUser = () => {
    const userDetail = { fullname, email, password, role, campus, department };
    if (password.length < 8) {
      setCreateUser({
        ...createUser,
        error: "Password should be minimum 8 character long",
      });
    } else if (password !== cPassword) {
      setCreateUser({
        ...createUser,
        error: "Passwords should be same",
      });
    } else if (!email.includes("@iqra.edu.pk")) {
      setCreateUser({
        ...createUser,
        error: "Only @iqra.edu.pk domain allowed",
      });
    } else {
      console.log(userDetail);
      setCreateUser({
        ...createUser,
        error: "",
      });
    }
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
                    }}
                  >
                    {error}
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
                  <option value="Gulshan">Gulshan Campus</option>
                  <option value="North">North Campus</option>
                  <option value="Airport">Airport Campus</option>
                  <option value="Bahria">Bahria Campus</option>
                  <option value="Islamabad">Islamabad Campus</option>
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
                  <option value="Hod">Head of Department</option>
                  <option value="Observer">Observer</option>
                  <option value="Faculty">Faculty</option>
                </Input>
              </div>
            </FormGroup>
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
