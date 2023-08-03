import React, { Fragment, useEffect, useState } from "react";
import { Tabs, TabList, TabPanel, Tab } from "react-tabs";
import { Button, Form, Table } from "reactstrap";
import { useStateValue } from "../../StateProvider";
import { toast } from "react-toastify";
import { successes, errors, info, warning } from "../../constants/Toasters";
import { useRef } from "react";
import { SelectInput, TextInput, TextInputReadOnly } from "../Input";
import { PlusCircle } from "react-feather";
import { fetchDepartments } from "../Endpoints";

const TabsetCourses = () => {
  const [{ user }] = useStateValue();
  const [slotsLength, setSlotsLength] = useState([1]);
  const [alldept, setAllDept] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [createCourse, setCreateCourse] = useState({
    courseCode: "",
    name: "",

    campus: user.campus.replaceAll("_", " "),
    credits: "",
    loader: false,
  });

  const [createSlot, setCreateSlot] = useState({
    sectionCode: "",
    day: "",
    time: "",
    location: "",
  });

  const { courseCode, name, campus, credits, loader } = createCourse;
  const { sectionCode, day, time, location } = createSlot;

  const toastId = useRef(null);

  const [createSlots, setCreateSlots] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchDepartments(user.id, setAllDept);
  }, []);

  const onCreateCourse = () => {
    const courseDetails = {
      courseCode,
      name,
      departments,
      campus: user.campus,
      credits: Number(credits),
      slots: createSlots,
    };
    async function addCourse() {
      info("Course creating...");
      setCreateCourse({
        ...createCourse,
        loader: true,
      });
      try {
        const res = await fetch(`${process.env.REACT_APP_BASE_URL}/course`, {
          method: "POST",
          body: JSON.stringify(courseDetails),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            // Authorization: `Bearer ${user.token}`,
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
            courseCode: "",
            name: "",
            credits: "",
            departments: [],
          });
          successes("Course created successfully!");
          setTimeout(() => {
            setCreateSlots([]);
          }, 1500);
        }
      } catch (err) {
        errors(err.message);
        setCreateCourse({
          ...createCourse,
          loader: false,
        });
      }
    }
    if (!courseCode || !name || !credits) {
      info("Provide course details properly!");
    } else if (createSlots.length === 0) {
      info("Please provide and save minimum 1 slot details!");
    } else {
      addCourse();
      // console.log(courseDetails);
    }
  };

  const onSaveAddSlot = async () => {
    if (sectionCode && day && time && location) {
      setSlotsLength([...slotsLength, slotsLength.length + 1]);
      setCreateSlots([
        ...createSlots,
        {
          sectionCode,
          day,
          time,
          location,
        },
      ]);
      setCreateSlot({
        sectionCode: "",
        day: "",
        time: "",
        location: "",
      });
    } else {
      info("Please provide complete slot details if you want to add!");
    }
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
              value={courseCode}
              onChange={(e) =>
                setCreateCourse({
                  ...createCourse,
                  courseCode: e.target.value,
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
            <SelectInput
              label="Departments"
              value={departments}
              departments={departments}
              setDepartments={setDepartments}
              options={alldept}
              onChange={(e) =>
                setDepartments([...departments, Number(e.target.value)])
              }
            />
            {/* <TextInputReadOnly label="Department" value={department} /> */}
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
              value={sectionCode}
              onChange={(e) =>
                setCreateSlot({
                  ...createSlot,
                  sectionCode: e.target.value,
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

      <div className="d-flex align-items-center justify-content-center">
        <span
          onClick={onSaveAddSlot}
          className="d-flex align-items-center justify-content-center px-2 mb-4"
          style={{ cursor: "pointer" }}
        >
          <PlusCircle size={20} className="mx-2" /> Save &amp; Add Slot
        </span>
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
                  <tr key={item.sectionCode}>
                    <td>{item.sectionCode}</td>
                    <td>{item.day}</td>
                    <td>{item.time}</td>
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
            Create
          </Button>
        )}
      </div>
    </Fragment>
  );
};

export default TabsetCourses;
