import React, { Fragment, useEffect } from "react";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import Breadcrumb from "../common/breadcrumb";
import TabsetPrompt from "./tabset-prompt";
import { useStateValue } from "../../StateProvider";
import { fetchSotlData } from "../Endpoints";
import { Loader } from "../common/Loader";

const PromptObservation = () => {
  const [{ userData, user }, dispatch] = useStateValue();
  useEffect(() => {
    if (user.role === "Super_Admin") {
      fetchSotlData(dispatch, user.token);
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <Fragment>
      <Breadcrumb title="Prompt Observation" parent="Observations" />
      {!userData && <Loader />}
      {userData && (
        <Container fluid={true}>
          <Row>
            <Col sm="12">
              <Card>
                <CardBody>
                  <TabsetPrompt />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      )}
    </Fragment>
  );
};

export default PromptObservation;
