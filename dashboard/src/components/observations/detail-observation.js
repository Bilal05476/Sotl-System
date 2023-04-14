import React, { Fragment } from "react";
import { Container } from "reactstrap";
import Breadcrumb from "../common/breadcrumb";

const Detail_observation = () => {
  return (
    <Fragment>
      <Breadcrumb title="Detail Observation" parent="Observations" />
      <Container fluid={true}>
        <div className="accordion" id="accordionExample">
          {[
            "Observation Scheduling",
            "Informed Observation",
            "Post Informed Meeting",
            "Uninformed Observation",
            "Professional Development Plan",
          ].map((item) => (
            <div className="accordion-item mb-5">
              <h2 className="accordion-header" id="headingOne">
                <button
                  className="accordion-button text-light"
                  style={{
                    backgroundColor: "#040b5b",
                    outline: "none",
                    boxShadow: "none",
                  }}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  {item}
                </button>
              </h2>
              {/* <div> */}
              <div
                //   className="accordion-body"
                id="collapseOne"
                className="accordion-body accordion-collapse collapsed"
                //collapsed show
                aria-labelledby="headingOne"
                data-bs-parent="#accordionExample"
              >
                <strong>Ruko zara, sabar karo!</strong>
              </div>
              {/* </div> */}
            </div>
          ))}
        </div>
      </Container>
    </Fragment>
  );
};

export default Detail_observation;
