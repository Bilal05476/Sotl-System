import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../common/breadcrumb";
import data from "../../assets/data/listUser";
import Datatable from "../common/datatable";
import { Card, CardBody, CardHeader, Container } from "reactstrap";
import { useStateValue } from "../../StateProvider";

const List_observation = () => {
  const [{ allObs }] = useStateValue();
  const [obsUsers, setObsUsers] = useState({
    facultyName: "",
    observerName: "",
    hodName: "",
    courseName: "",
  });
  // console.log(allObs);
  const { facultyName, observerName, hodName, courseName } = obsUsers;
  const getUserForObs = async (fid, oid, hid, cid) => {
    const fres = await fetch(`http://localhost:8080/api/get-user/${fid}`, {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const ores = await fetch(`http://localhost:8080/api/get-user/${oid}`, {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const hres = await fetch(`http://localhost:8080/api/get-user/${hid}`, {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const cres = await fetch(`http://localhost:8080/api/get-course/${cid}`, {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const faculty = await fres.json();
    const observer = await ores.json();
    const hod = await hres.json();
    // const course = await cres.json();
    setObsUsers({
      facultyName: faculty.name,
      observerName: observer.name,
      hodName: hod.name,
      // courseName: course.courseName,
    });
  };
  return (
    <Fragment>
      <Breadcrumb title="Observation List" parent="Observations" />
      <Container fluid={true}>
        <Card>
          <CardHeader>
            <h5>Observation Details</h5>
          </CardHeader>
          <CardBody>
            <div className="btn-popup pull-right">
              <Link
                to="/observations/create-observation"
                className="btn btn-primary"
              >
                Create Observation
              </Link>
            </div>
            <div className="clearfix"></div>
            <div
              id="batchDelete"
              className="category-table user-list order-table coupon-list-delete"
            >
              {/* <Datatable
                multiSelectOption={true}
                myData={data}
                pageSize={10}
                pagination={true}
                // className="-striped -highlight"
              /> */}
              <table>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Course</th>
                    <th>Faculty</th>
                    <th>Observer</th>
                    <th>Head of department</th>
                    <th>Date&amp;Time</th>
                    <th>Progress</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {allObs.map((item) => {
                    getUserForObs(
                      item.facultyId,
                      item.observerId,
                      item.hodId,
                      item?.courseId
                    );
                    return (
                      <tr>
                        <td>{item.id}</td>
                        <td>{item.courseId ? courseName : "Not Assigned"}</td>
                        <td>{facultyName}</td>
                        <td>{observerName}</td>
                        <td>{hodName}</td>
                        <td>
                          {item.timeSlot ? item.timeSlot : "Not Allocated"}
                        </td>
                        <td>{item.observationProgress}%</td>
                        <td>
                          {item.observationStatus === "Ongoing"
                            ? "Ongoing"
                            : item.observationStatus === "Completed"
                            ? "Completed"
                            : "Pending"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>
      </Container>
    </Fragment>
  );
};

export default List_observation;
