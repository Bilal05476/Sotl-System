import React, { Fragment, useEffect } from "react";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import Breadcrumb from "../common/breadcrumb";
import MultiStepForm from "../MultiStep";
// import TabsetObservation from "./tabset-observation";
// import { useStateValue } from "../../StateProvider";
// import { fetchCoursesAndUsers } from "../Endpoints";

const Teaching = () => {
  //   const [{}, dispatch] = useStateValue();
  //   useEffect(() => {
  //     fetchCoursesAndUsers(dispatch);
  //   }, []);
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
