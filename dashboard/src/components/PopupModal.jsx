import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { completeColor2 } from "./colors";
import warning from "../assets/images/dashboard/redwarning.png";

export function PopupModal({
  open,
  setOpen,
  facultycourses,
  course,
  setCourse,
  startSchedule,
}) {
  const toggleCourse = (id) => {
    if (Number(course) === Number(id)) {
      setCourse("");
    } else {
      setCourse(Number(id));
    }
  };
  return (
    <Modal isOpen={open} centered={true} size="lg">
      <ModalHeader>Select Faculty Course</ModalHeader>
      <ModalBody
        style={{ border: "0" }}
        className="d-flex align-items-center justify-content-center"
      >
        {facultycourses.map((item) => (
          <span
            style={{
              backgroundColor: course === item.id && completeColor2,
              padding: "0.2rem 0.6rem",
              marginRight: "0.3rem",
              borderRadius: "5px",
              color: course === item.id && "white",
              boxShadow: course === item.id && "1px 1px 1px #1e1e1e54",
              border: `1px solid ${completeColor2}`,
              cursor: "pointer",
            }}
            key={item.id}
            onClick={() => toggleCourse(item.id)}
          >
            {item.n}
          </span>
        ))}
      </ModalBody>
      <ModalFooter style={{ border: "0" }}>
        <Button color="primary" onClick={startSchedule}>
          Start Scheduling
        </Button>
        <Button color="secondary" onClick={() => setOpen(!open)}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export function ConfirmModal({ open, setOpen }) {
  return (
    <Modal isOpen={open} centered={true} size="lg">
      {/* <ModalHeader>Select Faculty Course</ModalHeader> */}
      <ModalBody
        style={{ border: "0" }}
        className="d-flex flex-column align-items-center justify-content-center py-5"
      >
        <img src={warning} width={150} />
        <p
          style={{
            textAlign: "center",
            margin: "0",
            fontSize: "1.2rem",
            color: "black",
            width: "80%",
          }}
        >
          Are you sure you want to done the rubric scoring? This action will not
          be reversed!
        </p>
        <div className="mt-3">
          <Button className="mx-1" color="secondary" onClick={() => {}}>
            No, Go Back
          </Button>
          <Button
            className="mx-1"
            color="primary"
            onClick={() => setOpen(!open)}
          >
            Yes, Done Scoring
          </Button>
        </div>
      </ModalBody>
    </Modal>
  );
}
