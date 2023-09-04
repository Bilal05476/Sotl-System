import React, { Fragment, useEffect, useState } from "react";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import Breadcrumb from "../common/breadcrumb";
import { Button, Form, FormGroup, Label } from "reactstrap";
import { Tabs, TabList, TabPanel, Tab } from "react-tabs";
import { Loader } from "../common/Loader";

// import MultiStepForm from "../MultiStep";
import { getTemplate } from "../Endpoints";

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

const FormPool = ({ label, value, onChange, type, id }) => {
  return (
    <FormGroup className="row">
      <Label className="col-xl-3 col-md-4">{label}</Label>
      <div className="col-xl-8 col-md-7">
        <textarea
          className="form-control"
          id="validationCustom0"
          type={type}
          value={value}
          onChange={onChange}
          placeholder={label}
          rows={3}
        />
        <div className="pull-right mt-2">
          <Button disabled onClick={() => {}} type="button" color="danger">
            Update
          </Button>
        </div>
      </div>
    </FormGroup>
  );
};

export default Reflection;
