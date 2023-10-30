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
