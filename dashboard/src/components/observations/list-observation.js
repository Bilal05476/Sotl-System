import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../common/breadcrumb";
// import data from "../../assets/data/listUser";
// import Datatable from "../common/datatable";
import {
  Card,
  CardBody,
  CardHeader,
  Container,
  Table,
  Col,
  Row,
} from "reactstrap";
import { useStateValue } from "../../StateProvider";
import { Eye } from "react-feather";

const List_observation = () => {
  const [{ user }] = useStateValue();
  const viewObs = async (id) => {
    try {
      const res = await fetch(`http://localhost:8080/api/observation/${id}`, {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const data = await res.json();

      // dispatch({
      //   type: "SET_USER_DATA",
      //   payload: specificData,
      // });
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <Fragment>
      <Breadcrumb title="Observation List" parent="Observations" />
      <Container fluid={true}>
        <Row>
          <Col xl="6 xl-100">
            <Card>
              <CardHeader className="d-flex align-items-center justify-content-between">
                <h5>All Observations</h5>
                {user.role === "Head_of_Department" && (
                  <Link
                    to="/observations/create-observation"
                    className="btn btn-primary"
                  >
                    Create Observation
                  </Link>
                )}
              </CardHeader>

              <CardBody>
                <div className="user-status table-responsive latest-order-table">
                  <Table borderless>
                    <thead>
                      <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Course</th>
                        <th scope="col">Semester</th>
                        <th scope="col">Faculty</th>
                        <th scope="col">Observer</th>
                        <th scope="col">Head of department</th>
                        <th scope="col">Date&amp;Time</th>
                        <th scope="col">Progress</th>
                        <th scope="col">Status</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {user?.observations.map((item) => (
                        <tr key={item.id}>
                          <td>{item.id}</td>
                          <td className="digits">
                            {item.course ? item.course : "--"}
                          </td>
                          <td className="digits">{item.semester}</td>
                          <td className="digits">{item.faculty.name}</td>
                          {/* // font-danger */}
                          <td className="digits">{item.observer.name}</td>
                          <td className="digits">{item.hod.name}</td>
                          <td className="digits">{item.timeSlot[0]}</td>
                          <td className="digits">
                            {item.observationProgress}%
                          </td>
                          <td
                            className={`digits ${
                              item.observationStatus === "Ongoing"
                                ? "text-primary"
                                : item.observationStatus === "Completed"
                                ? "text-success"
                                : "text-danger"
                            }`}
                          >
                            {item.observationStatus}
                          </td>
                          <td className="digits font-primary">
                            <Eye onClick={() => viewObs(item.id)} size={20} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default List_observation;
