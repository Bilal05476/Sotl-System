import React, { Fragment } from "react";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import Breadcrumb from "../common/breadcrumb";
import TabsetAssignCourses from "./tabset-assign-courses";
// import TabsetCourses from "./tabset-courses";

const Assign_courses = () => {
  return (
    <Fragment>
      <Breadcrumb title="Assign Courses" parent="Courses" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardBody>
                <TabsetAssignCourses />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Assign_courses;
