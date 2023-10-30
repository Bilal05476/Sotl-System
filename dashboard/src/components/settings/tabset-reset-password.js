import React, { Fragment, useState, useRef } from "react";
import { Tabs, TabList, TabPanel, Tab } from "react-tabs";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
// import { XCircle } from "react-feather";
import { useStateValue } from "../../StateProvider";
import { toast } from "react-toastify";
import { successes, errors, info } from "../../constants/Toasters";
// import FileBase from "react-file-base64";

const BASEURL =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_DEV_URL
    : process.env.REACT_APP_PROD_URL;

const Tabset_Reset_Password = () => {
  const [{ user }] = useStateValue();
  const [updateUser, setUpdateUser] = useState({
    email: user?.email,
    oldPassword: "",
    newPassword: "",
    confirmpassword: "",
  });
  const { email, oldPassword, newPassword, confirmpassword } = updateUser;

  const toastId = useRef(null);
  const checkLength = (password) => (password.length >= 8 ? true : false);
  const onUpdateUser = () => {
    const userDetail = {
      email,
      oldPassword,
      newPassword,
    };

    async function resetPassword() {
      info("Password Reseting...");
      const res = await fetch(`${BASEURL}/auth/reset-password`, {
        method: "PUT",
        body: JSON.stringify(userDetail),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const data = await res.json();
      if (data.error) {
        toast.dismiss(toastId.current);
        errors(data.error);
      } else {
        toast.dismiss(toastId.current);
        successes(data.message);
        setUpdateUser({
          oldPassword: "",
          newPassword: "",
          confirmpassword: "",
        });
      }
    }
    if (!newPassword || !oldPassword || !confirmpassword) {
      info("Provide all required fields!");
    } else if (newPassword !== confirmpassword) {
      errors("New password and confirm password should be same!");
    } else if (!checkLength(newPassword)) {
      info("New password should be minimum of 8 characters!");
    } else {
      resetPassword();
    }
  };

  return (
    <Fragment>
      <Tabs>
        <TabList className="nav nav-tabs tab-coupon">
          <Tab className="nav-link">Provide Old and New Passowrd</Tab>
        </TabList>
        <TabPanel>
          <Form className="needs-validation user-add" noValidate="">
            <FormPoolReadOnly value={email} label="Email" />
            <FormPool
              value={oldPassword}
              type="password"
              label="Old Password"
              onChange={(e) =>
                setUpdateUser({
                  ...updateUser,
                  oldPassword: e.target.value,
                })
              }
            />

            <FormPool
              value={newPassword}
              type="password"
              label="New Password"
              onChange={(e) =>
                setUpdateUser({
                  ...updateUser,
                  newPassword: e.target.value,
                })
              }
            />
            <FormPool
              value={confirmpassword}
              type="password"
              label="Confirm Password"
              onChange={(e) =>
                setUpdateUser({
                  ...updateUser,
                  confirmpassword: e.target.value,
                })
              }
            />
          </Form>
        </TabPanel>
      </Tabs>
      <div className="pull-right">
        <Button onClick={() => onUpdateUser()} type="button" color="primary">
          Reset
        </Button>
      </div>
    </Fragment>
  );
};

const FormPoolReadOnly = ({ label, value }) => {
  return (
    <FormGroup className="row">
      <Label className="col-xl-3 col-md-4">{label}</Label>
      <div className="col-xl-8 col-md-7">
        <Input
          className="form-control"
          id="validationCustom0"
          type="text"
          readOnly={true}
          value={value}
        />
      </div>
    </FormGroup>
  );
};
const FormPool = ({ label, value, onChange, type }) => {
  return (
    <FormGroup className="row">
      <Label className="col-xl-3 col-md-4">
        {" "}
        <span className="text-danger">*</span> {label}
      </Label>
      <div className="col-xl-8 col-md-7">
        <Input
          className="form-control"
          id="validationCustom0"
          type={type}
          value={value}
          onChange={onChange}
          placeholder={label}
        />
      </div>
    </FormGroup>
  );
};

export default Tabset_Reset_Password;
