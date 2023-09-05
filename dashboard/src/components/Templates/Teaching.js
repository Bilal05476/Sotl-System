import React, { Fragment, useEffect, useState } from "react";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import Breadcrumb from "../common/breadcrumb";
import { Form } from "reactstrap";
import { Tabs, TabList, TabPanel, Tab } from "react-tabs";
import { Loader } from "../common/Loader";

import { getTemplate } from "../Endpoints";
import { FormPool } from "./FormPool";

const Teaching = () => {
  const [teachingPlan, setTeachingPlan] = useState("");

  useEffect(() => {
    getTemplate(setTeachingPlan, "Teaching");
    window.scrollTo(0, 0);
  }, []);

  return (
    <Fragment>
      <Breadcrumb title="Teaching Plan" parent="Academic Plan" />
      {!teachingPlan && <Loader />}
      {teachingPlan && (
        <Container fluid={true}>
          <Row>
            <Col sm="12">
              <Card>
                <CardBody>
                  <Tabs>
                    <TabList className="nav nav-tabs tab-coupon">
                      <Tab className="nav-link">Teaching Plan Questinaire</Tab>
                    </TabList>
                    <TabPanel>
                      <Form className="needs-validation user-add" noValidate="">
                        {teachingPlan?.steps?.map((item) => (
                          <FormPool
                            label={item.name}
                            value={item.field}
                            id={item.id}
                            type={teachingPlan?.type}
                            setPlan={setTeachingPlan}
                          />
                        ))}
                      </Form>
                    </TabPanel>
                  </Tabs>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      )}
    </Fragment>
  );
};

export default Teaching;
