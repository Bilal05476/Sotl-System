import React, { Fragment, useEffect } from "react";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import Breadcrumb from "../common/breadcrumb";
import TabsetObservation from "./tabset-observation";
import { useStateValue } from "../../StateProvider";
import { fetchCoursesAndUsers } from "../Endpoints";

const Create_observation = () => {
  const [{ user }, dispatch] = useStateValue();
  useEffect(() => {
    fetchCoursesAndUsers(dispatch, user.department.id, user.role);
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
