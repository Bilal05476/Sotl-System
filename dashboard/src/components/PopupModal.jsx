import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from "reactstrap";
import { completeColor, completeColor2 } from "./colors";
import warning from "../assets/images/dashboard/redwarning.png";
import { info } from "../constants/Toasters";

export function PopupModal({
  open,
  setOpen,
  facultycourses,
  setfacultycourses,
  course,
  setCourse,
  startSchedule,
}) {
  const [ssid, setsid] = useState("");

  const toggleCourse = (cid, sid) => {
    if (Number(ssid) === Number(sid)) {
      setsid("");
    } else {
      if (!course) {
        setCourse(Number(cid));
        console.log("called");
      }
      setsid(Number(sid));
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
              backgroundColor: ssid === item.sid && completeColor2,
              padding: "0.2rem 0.6rem",
              marginRight: "0.3rem",
              borderRadius: "5px",
              color: ssid === item.sid && "white",
              boxShadow: ssid === item.sid && "2px 2px 4px #1e1e1e54",
              border: `1px solid ${completeColor2}`,
              cursor: "pointer",
            }}
            key={item.sid}
            onClick={() => toggleCourse(item.cid, item.sid)}
          >
            {item.n}
          </span>
        ))}
      </ModalBody>
      <ModalFooter style={{ border: "0" }}>
        <Button color="primary" onClick={startSchedule}>
          Start Scheduling
        </Button>
        <Button
          color="secondary"
          onClick={() => {
            setCourse("");
            setsid("");
            setfacultycourses([]);
            setOpen(!open);
          }}
        >
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export function ConfirmModal({ open, setOpen, DoneRubricScoring }) {
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
          <Button
            className="mx-1"
            color="secondary"
            onClick={() => setOpen(!open)}
          >
            No, Go Back
          </Button>
          <Button
            className="mx-1"
            color="primary"
            onClick={() => DoneRubricScoring()}
          >
            Yes, Done Scoring
          </Button>
        </div>
      </ModalBody>
    </Modal>
  );
}

// export function PostTimeModal({ open, setOpen }) {
//   const [dates, setDates] = useState([]);
//   const [location, setLocation] = useState("");

//   function getNextSevenDates() {
//     const today = new Date();
//     const nextSevenDates = [];

//     // Loop to get the next 7 dates
//     for (let i = 0; i < 7; i++) {
//       // Get the date of the next day
//       const nextDate = new Date(today);
//       nextDate.setDate(today.getDate() + i + 1);

//       // Push the next date into the array
//       // Check if the day is not Friday, Saturday, Sunday
//       let datesToInc = [1, 2, 3, 4, 5];
//       if (datesToInc.includes(nextDate.getDay())) {
//         nextSevenDates.push(nextDate.toDateString());
//       }
//     }

//     return nextSevenDates;
//   }

//   const upcomingDates = getNextSevenDates();

//   const startPostScheduling = () => {
//     let ISODates = [];
//     let utc = "";
//     for (let i = 0; i < dates.length; i++) {
//       utc = new Date(dates[i]).toUTCString();
//       ISODates.push(new Date(utc).toISOString());
//     }
//     console.log(dates, ISODates, utc);
//   };

//   function toDateStringToISOString(toDateString) {
//     const localDate = new Date(toDateString);
//     const offset = localDate.getTimezoneOffset(); // Get the time zone offset in minutes
//     const offsetInMilliseconds = offset * 60 * 1000; // Convert offset to milliseconds
//     const utcDate = new Date(localDate.getTime() + offsetInMilliseconds); // Adjust the date to UTC

//     return utcDate.toISOString();
//   }

//   const toDateString = "Mon Jul 25 2023";
//   const isoString = toDateStringToISOString(toDateString);
//   console.log(isoString);

//   return (
//     <Modal isOpen={open} centered={true} size="lg">
//       {/* <ModalHeader>Select Faculty Course</ModalHeader> */}
//       <ModalBody
//         style={{ border: "0" }}
//         className="d-flex flex-column align-items-center justify-content-center py-5"
//       >
//         {/* <img src={warning} width={150} /> */}
//         <p
//           style={{
//             textAlign: "center",
//             margin: "0",
//             marginBottom: "0.5rem",
//             fontSize: "1.2rem",
//             color: "black",
//             width: "80%",
//           }}
//         >
//           Provide timing slots and also time for selected slots! <br />{" "}
//           <i>(select one or max 3)</i>
//         </p>
//         <div className="d-flex flex-wrap align-items-center justify-content-center">
//           {upcomingDates?.map((item) => (
//             <span
//               key={item}
//               className={`${
//                 dates.includes(item) && "bg-primary"
//               } p-1 px-4 mx-1 mb-2`}
//               style={{
//                 borderRadius: "5px",
//                 border: `1px solid ${completeColor}`,
//                 cursor: "pointer",
//               }}
//               onClick={() => {
//                 if (!dates.includes(item) && dates.length === 3) {
//                   info("Oops, Maximum 3 slots are allowed to select!");
//                 } else if (dates.includes(item))
//                   setDates(dates.filter((exist) => exist !== item));
//                 else setDates([...dates, item]);
//               }}
//             >
//               {item}
//             </span>
//           ))}
//         </div>
//         <div>
//           <Input
//             className="my-1 mt-3 text-center px-5"
//             placeholder="Provide meeting location..."
//             style={{ outline: "none !important" }}
//             value={location}
//             onChange={(e) => setLocation(e.target.value)}
//           />
//         </div>
//         <div className="mt-3">
//           <Button
//             className="mx-1"
//             color="secondary"
//             onClick={() => {
//               setDates([]);
//               setOpen(!open);
//             }}
//           >
//             No, Go Back
//           </Button>
//           <Button
//             className="mx-1"
//             color="primary"
//             onClick={() => startPostScheduling()}
//           >
//             Start Post Meeting Scheduling
//           </Button>
//         </div>
//       </ModalBody>
//     </Modal>
//   );
// }
