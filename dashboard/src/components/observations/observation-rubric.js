import React, { Fragment, useEffect, useState } from "react";
import { Col, Container, Row, Table } from "reactstrap";
import { useParams } from "react-router-dom";
import Breadcrumb from "../common/breadcrumb";
import { Loader } from "react-feather";

const Observation_rubric = () => {
  const [isOpen, setIsOpen] = useState("content");

  return (
    <Fragment>
      <Breadcrumb title="Observation Rubrics" parent="Informed Observations" />
      <Container fluid={true}>
        <div className="accordion">
          <div className="accordion-item overflow-hidden mb-5">
            <button
              className="btn btn-block text-light"
              onClick={() => setIsOpen("content")}
              style={{
                backgroundColor: "#040b5b",
                outline: "none",
                boxShadow: "none",
                padding: "15px",
                width: "100%",
                borderBottomLeftRadius: "0",
                borderBottomRightRadius: "0",
              }}
              type="button"
              aria-expanded="true"
            >
              1.A Demonstrating Knowledge of Content
            </button>

            {isOpen === "content" && (
              <div className="accordion-body text-center">
                <RubricContent title="Innovating" />
                <RubricContent title="Applying" />
                <RubricContent title="Developing" />
                <RubricContent title="Not Demonstrating" />
              </div>
            )}
          </div>
        </div>
      </Container>
    </Fragment>
  );
};
export default Observation_rubric;

const RubricContent = ({ title }) => {
  return (
    <div className="accordion-content mt-2 mb-4">
      <strong className="d-flex align-items-center">
        <input type="checkbox" className="mx-2" /> {title}
      </strong>
      <ul className="d-flex flex-column align-items-start mx-2 my-2">
        <li>
          Does not engage students in learning experiences focused on
          disciplinary knowledge and content specific skills.
        </li>
        <li>
          Teaching demonstrates limited knowledge of the content area, its
          discipline-specific terminology, and academic language demands.
        </li>
        <li>
          Content teaching shows no alignment with adopted standards, program
          goals, and CLOs.
        </li>
      </ul>
    </div>
  );
};
