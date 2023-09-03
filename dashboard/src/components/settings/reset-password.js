import React, { Fragment } from "react";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import Breadcrumb from "../common/breadcrumb";
import TabsetResetPassword from "./tabset-reset-password";

const Reset_Password = () => {
  return (
    <Fragment>
      <Breadcrumb title="Reset Password" parent="Profile" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardBody>
                <TabsetResetPassword />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Reset_Password;
