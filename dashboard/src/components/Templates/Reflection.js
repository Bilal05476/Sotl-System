import React, { Fragment, useEffect, useState } from "react";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import Breadcrumb from "../common/breadcrumb";
import { Button, Form, FormGroup, Label } from "reactstrap";
import { Tabs, TabList, TabPanel, Tab } from "react-tabs";
import { Loader } from "../common/Loader";

// import MultiStepForm from "../MultiStep";
import { getTemplate } from "../Endpoints";
import { FormPool } from "./FormPool";

const Reflection = () => {
  const [reflectionPlan, setReflectionPlan] = useState("");

  useEffect(() => {
    getTemplate(setReflectionPlan, "Reflection");
    window.scrollTo(0, 0);
  }, []);

  return (
    <Fragment>
      <Breadcrumb title="Reflection Plan" parent="Academic Plan" />
      {!reflectionPlan && <Loader />}
      {reflectionPlan && (
        <Container fluid={true}>
          <Row>
            <Col sm="12">
              <Card>
                <CardBody>
                  <Tabs>
                    <TabList className="nav nav-tabs tab-coupon">
                      <Tab className="nav-link">
                        Reflection Plan Questinaire
                      </Tab>
                    </TabList>
                    <TabPanel>
                      <Form className="needs-validation user-add" noValidate="">
                        {reflectionPlan?.steps?.map((item) => (
                          <FormPool
                            label={item.name}
                            value={item.field}
                            id={item.id}
                            type={reflectionPlan?.type}
                            setPlan={setReflectionPlan}
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

export default Reflection;
