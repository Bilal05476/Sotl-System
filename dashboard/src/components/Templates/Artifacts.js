import React, { Fragment, useEffect } from "react";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import Breadcrumb from "../common/breadcrumb";
// import TabsetObservation from "./tabset-observation";
// import { useStateValue } from "../../StateProvider";
// import { fetchHodData } from "../Endpoints";

const Artifacts = () => {
  //   const [{}, dispatch] = useStateValue();
  //   useEffect(() => {
  //     fetchHodData(dispatch);
  //   }, []);
  return (
    <Fragment>
      <Breadcrumb title="Artifacts Template" parent="Templates" />
      <Container fluid={true}>
        <Row>
          <Col sm="12"></Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Artifacts;
