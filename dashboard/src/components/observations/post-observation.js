import { Fragment } from "react";
import { useStateValue } from "../../StateProvider";
import Breadcrumb from "../common/breadcrumb";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import TabsetPostScheduling from "./tabset-post-scheduling";

const Post_observation = () => {
  const [{ user }] = useStateValue();
  return (
    <Fragment>
      <Breadcrumb title="Post Observation" parent="Observations" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardBody>
                <TabsetPostScheduling role={user?.role} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};
export default Post_observation;
