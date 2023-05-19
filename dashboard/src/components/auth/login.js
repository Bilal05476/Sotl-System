import React, { Fragment } from "react";
import LoginTabset from "./loginTabset";
import Slider from "react-slick";
import logo from "../../assets/images/sotllogo-white.png";
import logo2 from "../../assets/images/white-version.png";
import "../../assets/scss/slick.scss";
import "../../assets/scss/slick-theme.scss";
import { Card, CardBody, Col, Container, Row } from "reactstrap";

const Login = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: false,
  };

  return (
    <Fragment>
      <div className="page-wrapper">
        <div className="authentication-box">
          <Container>
            <Row>
              <Col className="col-md-5 p-0 card-left">
                <Card className="bg-primary">
                  {/* <div className="svg-icon"> */}
                  <img
                    alt="SOTL Logo"
                    src={logo2}
                    className="Img-fluid site-logo-main"
                  />
                  <img
                    alt="SOTL Logo"
                    src={logo}
                    className="Img-fluid site-logo"
                  />
                  {/* </div> */}
                  <Slider className="single-item" {...settings}>
                    <div>
                      <div>
                        <p style={{ fontSize: "0.8rem" }}>
                          SOTL observation system is a state-of-the-art tool
                          that addresses the challenges of observing,
                          evaluating, and improving teaching practices in
                          today's educational landscape.
                        </p>
                      </div>
                    </div>
                    <div>
                      <div>
                        <p style={{ fontSize: "0.8rem" }}>
                          SOTL observation system is a state-of-the-art tool
                          that addresses the challenges of observing,
                          evaluating, and improving teaching practices in
                          today's educational landscape.
                        </p>
                      </div>
                    </div>
                  </Slider>
                </Card>
              </Col>
              <Col className="col-md-7 p-0 m-0  card-right">
                <Card className="tab2-card">
                  <CardBody className="py-5">
                    <LoginTabset />
                  </CardBody>
                </Card>
              </Col>
            </Row>
            {/* <a
              href="https://multikart-react.vercel.app/"
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary back-btn"
            >
              <ArrowLeft />
              back
            </a> */}
          </Container>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
