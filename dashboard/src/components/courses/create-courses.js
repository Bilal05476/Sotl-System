import React, { Fragment } from "react";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import Breadcrumb from "../common/breadcrumb";
import TabsetCourses from "./tabset-courses";
// import { useStateValue } from "../../StateProvider";

const Create_courses = () => {
  return (
    <Fragment>
      <Breadcrumb title="Create Courses" parent="Courses" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardBody>
                <TabsetCourses />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Create_courses;

// async function fetchHodData() {
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
