import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { completeColor2 } from "./colors";

function PopupModal({
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
  console.log(facultycourses);
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

export default PopupModal;
