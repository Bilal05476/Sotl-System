import React, { Fragment, useState } from "react";
import { Tabs, TabList, TabPanel, Tab } from "react-tabs";
import { Button, Form, Table } from "reactstrap";
import { useStateValue } from "../../StateProvider";
import { toast } from "react-toastify";
import { successes, errors, info, warning } from "../../constants/Toasters";
import { useRef } from "react";
import { TextInput, TextInputReadOnly } from "../Input";
import { PlusCircle } from "react-feather";

const TabsetCourses = () => {
  const [{ user, users }] = useStateValue();
  const [slotsLength, setSlotsLength] = useState([1]);
  const [createCourse, setCreateCourse] = useState({
    id: "",
    name: "",
    department: user.department.replaceAll("_", " "),
    campus: user.campus.replaceAll("_", " "),
    credits: "",
    loader: false,
  });

  const [createSlot, setCreateSlot] = useState({
    sid: "",
    day: "",
    time: "",
    location: "",
  });

  const { id, name, department, campus, credits, slots, loader } = createCourse;
  const { sid, day, time, location } = createSlot;

  const toastId = useRef(null);

  const [createSlots, setCreateSlots] = useState([]);

  const onCreateCourse = () => {
    const courseDetails = {
      id,
      name,
      department,
      campus,
      credits: Number(credits),
      slots: createSlots,
    };
    async function addCourse() {
      info("Course creating...");
      setCreateCourse({
        ...createCourse,
        loader: true,
      });
      const res = await fetch(`${process.env.REACT_APP_BASE_URL}/courses`, {
        method: "POST",
        body: JSON.stringify(courseDetails),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await res.json();
      if (data.error) {
        toast.dismiss(toastId.current);
        setCreateCourse({
          ...createCourse,
          loader: false,
        });
        errors(data.error);
      } else {
        toast.dismiss(toastId.current);
        setCreateCourse({
          ...createCourse,
          loader: false,
        });
        successes("Observation initiated successfully!");

        // setTimeout(() => {
        //   setCreateCourse({
        //     ...createCourse,
        //     facultyId: "Select",
        //     observerId: "Select",
        //     semester: "Select",
        //     courseId: "",
        //   });
        // }, 2000);
      }
    }
    if (!id || !name || !credits) {
      info("Provide course details properly!");
    } else if (createSlots.length === 0) {
      info("Please provide and save your slot details!");
    } else {
      // postObs();
      console.log(courseDetails);
    }
  };

  const onSaveAddSlot = async () => {
    setSlotsLength([...slotsLength, slotsLength.length + 1]);
    setCreateSlots([
      ...createSlots,
      {
        id: sid,
        day,
        time,
        location,
      },
    ]);
    setCreateSlot({
      sid: "",
      day: "",
      time: "",
      location: "",
    });
  };

  return (
    <Fragment>
      <Tabs>
        <TabList className="nav nav-tabs tab-coupon">
          <Tab className="nav-link">Provide Course Details</Tab>
        </TabList>
        <TabPanel>
          <Form className="needs-validation user-add" noValidate="">
            <TextInput
              label="Course code"
              placeholder="CSC-011"
              value={id}
              onChange={(e) =>
                setCreateCourse({
                  ...createCourse,
                  id: e.target.value,
                })
              }
            />
            <TextInput
              label="Course name"
              placeholder="Applied Physics"
              value={name}
              onChange={(e) =>
                setCreateCourse({
                  ...createCourse,
                  name: e.target.value,
                })
              }
            />
            <TextInput
              label="Credit hours"
              placeholder="1,2,3"
              value={credits}
              onChange={(e) =>
                setCreateCourse({
                  ...createCourse,
                  credits: e.target.value,
                })
              }
            />
            <TextInputReadOnly label="Department" value={department} />
            <TextInputReadOnly label="Campus" value={campus} />
          </Form>
        </TabPanel>
      </Tabs>
      <Tabs>
        <TabList className="nav nav-tabs tab-coupon">
          <Tab className="nav-link">
            Provide Slot Details {slotsLength.length}
          </Tab>
        </TabList>
        <TabPanel>
          <Form className="needs-validation user-add" noValidate="">
            <TextInput
              label="Slot code"
              placeholder="0210000"
              value={sid}
              onChange={(e) =>
                setCreateSlot({
                  ...createSlot,
                  sid: e.target.value,
                })
              }
            />
            <TextInput
              label="Slot day"
              placeholder="Monday"
              value={day}
              onChange={(e) =>
                setCreateSlot({
                  ...createSlot,
                  day: e.target.value,
                })
              }
            />
            <TextInput
              label="Slot timing"
              placeholder="11:45 (without am/pm) 24 hours"
              value={time}
              onChange={(e) =>
                setCreateSlot({
                  ...createSlot,
                  time: e.target.value,
                })
              }
            />
            <TextInput
              label="Slot location"
              placeholder="E501"
              value={location}
              onChange={(e) =>
                setCreateSlot({
                  ...createSlot,
                  location: e.target.value,
                })
              }
            />
          </Form>
        </TabPanel>
      </Tabs>

      <div
        onClick={onSaveAddSlot}
        className="d-flex align-items-center justify-content-center mx-4 mb-4"
        style={{ cursor: "pointer" }}
      >
        <PlusCircle size={20} className="mx-2" /> Save &amp; Add Slot
      </div>
      {createSlots.length > 0 && (
        <Tabs>
          <TabList className="nav nav-tabs tab-coupon">
            <Tab className="nav-link">Saved Slots {createSlots.length}</Tab>
          </TabList>
          <TabPanel>
            <Table borderless>
              <thead>
                <tr>
                  <th>Section code</th>
                  <th>Day</th>
                  <th>Time</th>
                  <th>Location</th>
                </tr>
              </thead>
              <tbody>
                {createSlots.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.day}</td>
                    <td>{item.day}</td>
                    <td>{item.location}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TabPanel>
        </Tabs>
      )}
      <div className="pull-right">
        {loader ? (
          <Button type="button" color="primary" style={{ cursor: "progress" }}>
            Processing...
          </Button>
        ) : (
          <Button
            onClick={() => onCreateCourse()}
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

export default TabsetCourses;
