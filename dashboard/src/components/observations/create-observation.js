import React, { Fragment } from "react";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import Breadcrumb from "../common/breadcrumb";
import TabsetObservation from "./tabset-observation";

const Create_observation = () => {
  return (
    <Fragment>
      <Breadcrumb title="Create Observation" parent="Observations" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5> Initiate Observation</h5>
              </CardHeader>
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