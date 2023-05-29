import { SidebarOptions } from "./utils";
import { EndPoint, Parameters } from "./utils";

const Observations = () => {
  return (
    <div className="users container-fluid">
      <div className="sidebar">
        <h4
          style={{
            color: "#fff",
            textTransform: "uppercase",
            marginBottom: "2rem",
            textShadow: "1px 1px 1px #fff",
          }}
        >
          Observations
        </h4>
        <SidebarOptions optionName="Initiate Observation" href="#initiate" />
        <SidebarOptions optionName="Start Meeting Scheduling" href="#start" />
        <SidebarOptions optionName="Update Meeting Scheduling" href="#update" />
        <SidebarOptions optionName="Get Observations" href="#allObs" />
        <SidebarOptions optionName="One Observation" href="#oneObs" />
      </div>
      <div className="routes-deck">
        <div id="initiate" className="mb-5">
          <h4>Initiate Observation</h4>
          <EndPoint endpoint="/api/observation/initiate" method="POST" />
          <h4>
            Available Parameters + User Token in header (Only
            Head_of_Department) e.g: Bearer eyJh.....
          </h4>
          <Parameters
            params={[
              {
                name: "facultyId",
                type: "int",
                def: "",
                avail: "",
                req: true,
              },
              {
                name: "observerId",
                type: "int",
                def: "",
                avail: "",
                req: true,
              },
              {
                name: "hodId",
                type: "int",
                def: "",
                avail: "",
                req: true,
              },
              {
                name: "semester",
                type: "string",
                def: "",
                avail: "Fall | Summer | Spring",
                req: true,
              },
              {
                name: "courseId",
                type: "string",
                def: "",
                avail: "",
                req: true,
              },
            ]}
          />
        </div>
        <div id="start" className="mb-5">
          <h4>Create Meeting Scheduling</h4>
          <EndPoint endpoint="/api/observation/scheduling/" method="POST" />
          <h4>-</h4>
          <Parameters
            params={[
              {
                name: "observationsId",
                type: "int",
                def: "",
                avail: "",
                req: true,
              },
              {
                name: "facultyId",
                type: "int",
                def: "",
                avail: "",
                req: true,
              },
            ]}
          />
        </div>
        <div id="update" className="mb-5">
          <h4>Update Meeting Scheduling</h4>
          <EndPoint endpoint="/api/observation/scheduling/" method="PUT" />
          <h4>-</h4>
          <Parameters
            params={[
              {
                name: "observationsId",
                type: "int",
                def: "",
                avail: "",
                req: true,
              },
              {
                name: "timeSlotsByFaculty",
                type: "array",
                def: "[]",
                avail: "CourseSlots",
                req: false,
              },
              {
                name: "timeSlotByObserver",
                type: "array",
                def: "[]",
                avail: "CourseSlots",
                req: false,
              },
              {
                name: "scheduledOn",
                type: "dateTime",
                def: "",
                avail: "",
                req: false,
              },
              {
                name: "facultyAccepted",
                type: "boolean",
                def: "false",
                avail: "",
                req: false,
              },
              {
                name: "observerAccepted",
                type: "boolean",
                def: "false",
                avail: "",
                req: false,
              },
              {
                name: "reasons",
                type: "array",
                def: "[]",
                avail:
                  "[{senderId : int, receiverId: int, reason: string, schedulingId: int}]",
                req: false,
              },
            ]}
          />
        </div>
        <div id="getObs" className="mb-5">
          <h4>Get All Scheduling</h4>
          <EndPoint endpoint="/api/observations/" method="GET" />
        </div>
        <div id="oneObs" className="mb-5">
          <h4>Get Unique Scheduling</h4>
          <EndPoint endpoint="/api/observation/:id" method="GET" />
        </div>
      </div>
    </div>
  );
};

export default Observations;
