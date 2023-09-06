import React, { Fragment, useEffect, useState } from "react";
import { Loader } from "../common/Loader";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import Breadcrumb from "../common/breadcrumb";
import { useParams } from "react-router-dom";
import { getEmailTemplate, updateEmailTemplate } from "../Endpoints";
import { Button, Form, FormGroup } from "reactstrap";
import { Tabs, TabList, TabPanel, Tab } from "react-tabs";
import { useStateValue } from "../../StateProvider";

const EmailTemplate = () => {
  const [{ user }] = useStateValue();
  const [emailTemplate, setEmailTemplate] = useState("");
  const [email, setEmail] = useState("");
  const [loader, setLoader] = useState(false);
  const params = useParams();
  useEffect(() => {
    if (params.slug === "new-user") {
      getEmailTemplate(setEmailTemplate, "CreateUser", user.token, setEmail);
    }
    if (params.slug === "initiate-observation") {
      getEmailTemplate(setEmailTemplate, "InitiateObs", user.token, setEmail);
    }
    window.scrollTo(0, 0);
  }, []);

  const handleChange = () => {
    const obj = {
      id,
      email,
    };
    setLoader(true);
    if (params.slug === "new-user") {
      updateEmailTemplate(
        setEmailTemplate,
        "CreateUser",
        user.token,
        setEmail,
        obj,
        setLoader
      );
    }
    if (params.slug === "initiate-observation") {
      updateEmailTemplate(
        setEmailTemplate,
        "InitiateObs",
        user.token,
        setEmail,
        obj,
        setLoader
      );
    }
  };
  return (
    <Fragment>
      <Breadcrumb title="New User Email" parent="Email Template" />
      {!emailTemplate && <Loader />}
      {emailTemplate && (
        <Container fluid={true}>
          <Row>
            <Col sm="12">
              <Card>
                <CardBody>
                  <Tabs>
                    <TabList className="nav nav-tabs tab-coupon">
                      <Tab className="nav-link">
                        Email Template (Max 500 Words)
                      </Tab>
                    </TabList>
                    <TabPanel>
                      <div className="mb-3">
                        Add:
                        {[
                          { name: "line break", tag: "<br />" },
                          { name: "receiver name", tag: "{{name}}" },
                          { name: "receiver email", tag: "{{email}}" },
                        ].map((item) => (
                          <span
                            className="p-2 px-3 mx-2 bg-primary rounded"
                            style={{ cursor: "pointer" }}
                            onClick={() => setEmail(`${email}${item.tag}`)}
                          >
                            {item.name}
                          </span>
                        ))}
                      </div>
                      <Form className="needs-validation user-add" noValidate="">
                        <FormGroup className="row">
                          <div className="col-xl-12 col-md-12">
                            <textarea
                              className="form-control"
                              id="validationCustom0"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              rows={16}
                            />
                            <div className="pull-right mt-2">
                              <Button
                                disabled={emailTemplate?.email === email}
                                onClick={() => handleChange()}
                                type="button"
                                color={"primary"}
                              >
                                {loader ? <Loader /> : "Update"}
                              </Button>
                            </div>
                          </div>
                        </FormGroup>
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

export default EmailTemplate;
