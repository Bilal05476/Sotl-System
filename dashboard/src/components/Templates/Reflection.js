import React, { Fragment, useEffect, useState } from "react";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import Breadcrumb from "../common/breadcrumb";
import MultiStepForm from "../MultiStep";
import { getTemplate } from "../Endpoints";

const Reflection = () => {
  const [reflectionPlan, setReflectionPlan] = useState("");

  useEffect(() => {
    getTemplate(setReflectionPlan, 2);
  }, []);

  return (
    <Fragment>
      <Breadcrumb title="Reflection Template" parent="Templates" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardBody>
                <MultiStepForm
                  tabtitle={"Provide Reflection Plan Details Step By Step"}
                  steps={reflectionPlan}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Reflection;
