import React, { Fragment, useEffect } from "react";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import Breadcrumb from "../common/breadcrumb";
// import TabsetObservation from "./tabset-observation";
// import { useStateValue } from "../../StateProvider";
// import { fetchCoursesAndUsers } from "../Endpoints";

const Reflection = () => {
  //   const [{}, dispatch] = useStateValue();
  //   useEffect(() => {
  //     fetchCoursesAndUsers(dispatch);
  //   }, []);
  return (
    <Fragment>
      <Breadcrumb title="Reflection Template" parent="Templates" />
      <Container fluid={true}>
        <Row>
          <Col sm="12"></Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Reflection;
