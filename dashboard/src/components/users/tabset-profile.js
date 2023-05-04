import React, { Fragment, useState, useRef } from "react";
import { Tabs, TabList, TabPanel, Tab } from "react-tabs";
import { Button, Col, Form, FormGroup, Input, Label, Table } from "reactstrap";
import { XCircle } from "react-feather";
import { useStateValue } from "../../StateProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { successes, errors, info, warning } from "../../constants/Toasters";

const TabsetProfile = () => {
  const [{ user }] = useStateValue();
  // console.log(user);
  const [updateUser, setUpdateUser] = useState({
    fullname: user?.name,
    email: user?.email,
    role: user?.role.replaceAll("_", " "),
    campus: user?.campus?.replaceAll("_", " "),
    department: user?.department?.replaceAll("_", " "),
    avatar: "",
    dateOfBirth: "",
    designation: "",
    institute: "",
    degree: "",
    starting: "",
    ending: "",
    phone: "",
  });
  const {
    fullname,
    email,
    avatar,
    dateOfBirth,
    designation,
    institute,
    degree,
    starting,
    ending,
    phone,
    role,
    campus,
    department,
  } = updateUser;

  const toastId = useRef(null);

  const onUpdateUser = () => {
    const userDetail = {
      avatar: avatar ? avatar : null,
      dateOfBirth: dateOfBirth ? dateOfBirth : null,
      designation: designation ? designation : null,
      institute: institute ? institute : null,
      degree: degree ? degree : null,
      starting: starting ? starting : null,
      ending: ending ? ending : null,
      phone: phone ? phone : null,
    };
    async function putUser() {
      info("Profile Updating...");
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/update/${user.id}`,
        {
          method: "PUT",
          body: JSON.stringify(userDetail),
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
        successes("Profile updated successfully");
        setTimeout(() => {
          setUpdateUser({
            ...updateUser,
            avatar: "",
            dateOfBirth: "",
            designation: "",
            institute: "",
            degree: "",
            starting: "",
            ending: "",
            phone: "",
          });
        }, 2000);
      }
    }
    putUser();
  };

  return (
    <Fragment>
      <ToastContainer position="top-center" />
      <Tabs>
        <TabList className="nav nav-tabs tab-coupon">
          <Tab className="nav-link">Edit Details</Tab>
        </TabList>
        <TabPanel>
          <Form className="needs-validation user-add" noValidate="">
            <FormPoolReadOnly value={fullname} label="Full Name" />
            <FormPoolReadOnly value={email} label="Email" />
            <FormPoolReadOnly value={campus} label="Campus" />
            <FormPoolReadOnly value={department} label="Department" />
            <FormPoolReadOnly value={role} label="Role" />
            <FormPool
              value={phone}
              type="text"
              label="Phone"
              onChange={(e) =>
                setUpdateUser({
                  ...updateUser,
                  phone: e.target.value,
                })
              }
            />
            <FormPool
              value={avatar}
              type="file"
              label="Avatar"
              onChange={(e) =>
                setUpdateUser({
                  ...updateUser,
                  avatar: e.target.value,
                })
              }
            />
            <FormPool
              value={dateOfBirth}
              type="date"
              label="Date of Birth"
              onChange={(e) =>
                setUpdateUser({
                  ...updateUser,
                  dateOfBirth: e.target.value,
                })
              }
            />
            <FormPool
              value={designation}
              type="text"
              label="Designation"
              onChange={(e) =>
                setUpdateUser({
                  ...updateUser,
                  designation: e.target.value,
                })
              }
            />
            <FormPool
              value={institute}
              type="text"
              label="Institute"
              onChange={(e) =>
                setUpdateUser({
                  ...updateUser,
                  institute: e.target.value,
                })
              }
            />

            <FormPool
              value={degree}
              type="text"
              label="Degree"
              onChange={(e) =>
                setUpdateUser({
                  ...updateUser,
                  degree: e.target.value,
                })
              }
            />
            <FormPool
              value={starting}
              type="date"
              label="Degree Starting"
              onChange={(e) =>
                setUpdateUser({
                  ...updateUser,
                  starting: e.target.value,
                })
              }
            />
            <FormPool
              value={ending}
              type="date"
              label="Degree Ending"
              onChange={(e) =>
                setUpdateUser({
                  ...updateUser,
                  ending: e.target.value,
                })
              }
            />
          </Form>
        </TabPanel>
      </Tabs>
      <div className="pull-right">
        <Button onClick={() => onUpdateUser()} type="button" color="primary">
          Update
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
      <Label className="col-xl-3 col-md-4">{label}</Label>
      <div className="col-xl-8 col-md-7">
        <Input
          className="form-control"
          id="validationCustom0"
          type={type}
          value={value}
          onChange={onChange}
        />
      </div>
    </FormGroup>
  );
};

export default TabsetProfile;
