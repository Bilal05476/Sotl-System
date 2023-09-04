import React, { Fragment, useEffect, useState } from "react";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import Breadcrumb from "../common/breadcrumb";
// import MultiStepForm from "../MultiStep";
import { Button, Form, FormGroup, Label } from "reactstrap";
import { Tabs, TabList, TabPanel, Tab } from "react-tabs";
import { Loader } from "../common/Loader";

import { getTemplate } from "../Endpoints";

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
          <Button disabled onClick={() => {}} type="button" color="primary">
            Update
          </Button>
        </div>
      </div>
    </FormGroup>
  );
};

export default Teaching;
