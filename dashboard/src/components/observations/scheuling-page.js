import { Fragment } from "react";
import { useStateValue } from "../../StateProvider";
import Breadcrumb from "../common/breadcrumb";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import TabsetScheduling from "./tabset-scheduling";

const Scheduling_Page = () => {
  const [{ user }] = useStateValue();
  return (
    <Fragment>
      <Breadcrumb title="Observation Scheduling" parent="Observations" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardBody>
                <TabsetScheduling role={user?.role} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Scheduling_Page;
