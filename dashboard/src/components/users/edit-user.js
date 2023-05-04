import React, { Fragment } from "react";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import Breadcrumb from "../common/breadcrumb";
import TabsetProfile from "./tabset-profile";

const Edit_user = () => {
  return (
    <Fragment>
      <Breadcrumb title="Edit Profile" parent="Profile" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardBody>
                <TabsetProfile />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Edit_user;
