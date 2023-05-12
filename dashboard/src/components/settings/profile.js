import React, { Fragment } from "react";

import avatar from "../../assets/images/dashboard/avatar.png";
import TabsetProfile from "./tabset-profile";
import Breadcrumb from "../common/breadcrumb";
import { Card, CardBody, Col, Container, Media, Row, Button } from "reactstrap";
import { useStateValue } from "../../StateProvider";
import { Link } from "react-router-dom";

const Profile = () => {
  const [{ user }] = useStateValue();
  return (
    <Fragment>
      <Breadcrumb title="Profile" parent="Settings" />
      <Container fluid={true}>
        <Row>
          <Col xl="12">
            <Card>
              <CardBody>
                <div className="profile-details d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <img
                      src={user?.avatar ? user.avatar : avatar}
                      alt=""
                      style={{
                        width: "30%",
                      }}
                      className="img-fluid rounded-circle blur-up lazyloaded mx-3"
                    />
                    <div>
                      <h5 className="f-w-600 f-16 mb-0">{user.name}</h5>
                      <p className="m-0">{user.email}</p>
                      <span className="f-w-600 f-11">
                        {user.role.replaceAll("_", " ")}
                      </span>
                    </div>
                  </div>
                  <Link
                    to="/settings/edit-profile"
                    className=" btn btn-primary"
                  >
                    Edit Profile
                  </Link>
                </div>

                {/* <div className="social">
                    <div className="form-group btn-showcase">
                      <Button color="btn social-btn btn-fb d-inline-block">
                        {" "}
                        <i className="fa fa-facebook"></i>
                      </Button>
                      <Button color="btn social-btn btn-twitter d-inline-block">
                        <i className="fa fa-google"></i>
                      </Button>
                      <Button color="btn social-btn btn-google d-inline-block me-0">
                        <i className="fa fa-twitter"></i>
                      </Button>
                    </div>
                  </div> */}
                {/* <hr /> */}
                {/* <div className="project-status">
                  <h5 className="f-w-600 f-16">
                    {user.role.replaceAll("_", " ")}
                  </h5>
                  <Media>
                    <Media body>
                      <h6>
                        Performance <span className="pull-right">80%</span>
                      </h6>
                      <div className="progress sm-progress-bar">
                        <div
                          className="progress-bar bg-primary"
                          role="progressbar"
                          style={{ width: "90%" }}
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </Media>
                  </Media>
                  <Media>
                    <Media body>
                      <h6>
                        Overtime <span className="pull-right">60%</span>
                      </h6>
                      <div className="progress sm-progress-bar">
                        <div
                          className="progress-bar bg-secondary"
                          role="progressbar"
                          style={{ width: "60%" }}
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </Media>
                  </Media>
                  <Media>
                    <Media body>
                      <h6>
                        Leaves taken <span className="pull-right">50%</span>
                      </h6>
                      <div className="progress sm-progress-bar">
                        <div
                          className="progress-bar bg-danger"
                          role="progressbar"
                          style={{ width: "50%" }}
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </Media>
                  </Media>
                </div> */}
              </CardBody>
            </Card>
          </Col>
          <Col xl="12">
            <Card className="profile-card">
              <CardBody>
                <TabsetProfile user={user} personal={true} academic={false} />
              </CardBody>
            </Card>
          </Col>
          <Col xl="12">
            <Card className="profile-card">
              <CardBody>
                <TabsetProfile user={user} personal={false} academic={true} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Profile;
