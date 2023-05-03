import { Fragment } from "react";
import { useStateValue } from "../../StateProvider";
import Breadcrumb from "../common/breadcrumb";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import TabsetScheduling from "./tabset-scheduling";

const Scheuling_Page = () => {
  const [{ user }] = useStateValue();
  return (
    <Fragment>
      <Breadcrumb title="Observation Scheduling" parent="Observations" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5> Observation Scheduling</h5>
              </CardHeader>
              <CardBody>
                <TabsetScheduling role={user.role} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Scheuling_Page;
