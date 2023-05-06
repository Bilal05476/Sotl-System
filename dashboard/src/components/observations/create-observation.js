import React, { Fragment, useEffect } from "react";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import Breadcrumb from "../common/breadcrumb";
import TabsetObservation from "./tabset-observation";
import { useStateValue } from "../../StateProvider";

const Create_observation = () => {
  const [{ user }, dispatch] = useStateValue();
  async function fetchUsers() {
    try {
      const usersres = await fetch(`${process.env.REACT_APP_BASE_URL}/users/`, {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const udata = await usersres.json();
      dispatch({
        type: "SET_USERS",
        payload: udata,
      });
    } catch (error) {
      console.log(error.message);
    }
  }
  useEffect(() => {
    if (user.role === "Head_of_Department") fetchUsers();
  }, []);
  return (
    <Fragment>
      <Breadcrumb title="Initiate Observation" parent="Observations" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardBody>
                <TabsetObservation />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Create_observation;

// async function fetchCoursesAndUsers() {
//   try {
//     const usersres = await fetch(`${process.env.REACT_APP_BASE_URL}/users/`, {
//       headers: {
//         "Content-type": "application/json; charset=UTF-8",
//       },
//     });
//     const coursesres = await fetch(
//       `${process.env.REACT_APP_BASE_URL}/courses/`,
//       {
//         headers: {
//           "Content-type": "application/json; charset=UTF-8",
//         },
//       }
//     );
//     const cdata = await coursesres.json();
//     const udata = await usersres.json();

//     dispatch({
//       type: "SET_COURSES",
//       payload: cdata,
//     });
//     dispatch({
//       type: "SET_USERS",
//       payload: udata,
//     });
//   } catch (error) {
//     console.log(error.message);
//   }
// }
