import React, { Fragment, useEffect } from "react";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import Breadcrumb from "../common/breadcrumb";
import TabsetObservation from "./tabset-observation";
import { useStateValue } from "../../StateProvider";
import { fetchCoursesAndUsers } from "../Endpoints";

const Create_observation = () => {
  const [{}, dispatch] = useStateValue();
  useEffect(() => {
    fetchCoursesAndUsers(dispatch);
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
