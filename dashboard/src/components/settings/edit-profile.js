import React, { Fragment } from "react";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import Breadcrumb from "../common/breadcrumb";
import TabsetEditProfile from "./tabset-edit-profile";
import TabsetEditProfile2 from "./tabset-edit-profile";

const Edit_Profile = () => {
  return (
    <Fragment>
      <Breadcrumb title="Edit Profile" parent="Profile" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardBody>
                <TabsetEditProfile />
              </CardBody>
            </Card>
          </Col>
          <Col sm="12">
            <Card>
              <CardBody>
                <TabsetEditProfile />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Edit_Profile;
