import React, { Fragment, useState } from "react";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import Breadcrumb from "../common/breadcrumb";
import MultiStepForm from "../MultiStep";
// import { getTemplate } from "../Endpoints";

const Teaching = () => {
  const [teachingPlan, setTeachingPlan] = useState("");

  // useEffect(() => {
  //   getTemplate(setTeachingPlan, 2);
  // }, []);
  return (
    <Fragment>
      <Breadcrumb title="Teaching Plan" parent="Templates" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardBody>
                <MultiStepForm
                  tabtitle={"Provide Teaching Plan Details Step By Step"}
                  steps={teachingPlan}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Teaching;
