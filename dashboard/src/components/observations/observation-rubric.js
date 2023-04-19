import React, { Fragment, useEffect, useState } from "react";
import { Col, Container, Row, Table } from "reactstrap";
// import { useParams } from "react-router-dom";
import Breadcrumb from "../common/breadcrumb";
import { Loader } from "react-feather";

const Observation_rubric = () => {
  const [isOpen, setIsOpen] = useState("");
  const [rubric, setRubric] = useState("");

  return (
    <Fragment>
      <Breadcrumb title="Observation Rubrics" parent="Informed Observations" />
      <Container fluid={true}>
        <Row className="mb-2">
          <Col className="xl-100">
            {" "}
            <span style={{ fontWeight: "500" }}>Rubric Score: 0</span>
          </Col>
        </Row>
        <div className="accordion">
          <div className="accordion-item overflow-hidden mb-5">
            <button
              className="btn btn-block text-light"
              onClick={() => setIsOpen("Content")}
              style={{
                backgroundColor: "#040b5b",
                outline: "none",
                boxShadow: "none",
                padding: "15px",
                width: "100%",
                borderBottomLeftRadius: "0",
                borderBottomRightRadius: "0",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
              type="button"
              aria-expanded="true"
            >
              1.A Demonstrating Knowledge of Content
              <span>Total Score: 0</span>
            </button>

            {isOpen === "Content" && (
              <div className="accordion-body text-center">
                {/* <div className="d-flex"> */}
                <div className="d-flex align-items-center justify-content-between">
                  <RadioInput
                    value="Innovating"
                    rubric={rubric}
                    setRubric={setRubric}
                  />
                  <RadioInput
                    value="Applying"
                    rubric={rubric}
                    setRubric={setRubric}
                  />
                  <RadioInput
                    value="Developing"
                    rubric={rubric}
                    setRubric={setRubric}
                  />
                  <RadioInput
                    value="Not Demonstrating"
                    rubric={rubric}
                    setRubric={setRubric}
                  />
                </div>
                {rubric && <RubricPoints rubric={rubric} />}
                {/* </div> */}
              </div>
            )}
          </div>
        </div>
        <div className="accordion">
          <div className="accordion-item overflow-hidden mb-5">
            <button
              className="btn btn-block text-light"
              onClick={() => setIsOpen("Pedagogy")}
              style={{
                backgroundColor: "#040b5b",
                outline: "none",
                boxShadow: "none",
                padding: "15px",
                width: "100%",
                borderBottomLeftRadius: "0",
                borderBottomRightRadius: "0",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
              type="button"
              aria-expanded="true"
            >
              1-B. Demonstrating Knowledge of Pedagogy
              <span>Total Score: 0</span>
            </button>

            {isOpen === "Pedagogy" && (
              <div className="accordion-body text-center">
                {/* <div className="d-flex"> */}
                <div className="d-flex align-items-center justify-content-between">
                  <RadioInput
                    value="Innovating"
                    rubric={rubric}
                    setRubric={setRubric}
                  />
                  <RadioInput
                    value="Applying"
                    rubric={rubric}
                    setRubric={setRubric}
                  />
                  <RadioInput
                    value="Developing"
                    rubric={rubric}
                    setRubric={setRubric}
                  />
                  <RadioInput
                    value="Not Demonstrating"
                    rubric={rubric}
                    setRubric={setRubric}
                  />
                </div>
                {rubric && <RubricPoints rubric={rubric} />}
                {/* </div> */}
              </div>
            )}
          </div>
        </div>

        <button
          style={{
            backgroundColor: "#040b5b",
            outline: "none",
            boxShadow: "none",
            padding: "15px",
            width: "20%",
            border: "0",
            color: "#fff",
            borderRadius: "5px",
            marginRight: "1rem",
            fontWeight: "700",
          }}
        >
          DRAFT SCORE
        </button>
        <button
          style={{
            backgroundColor: "#040b5b",
            outline: "none",
            boxShadow: "none",
            padding: "15px",
            width: "20%",
            border: "0",
            color: "#fff",
            borderRadius: "5px",
            marginRight: "1rem",
            fontWeight: "700",
          }}
        >
          SUBMIT SCORE
        </button>
      </Container>
    </Fragment>
  );
};
export default Observation_rubric;

const RadioInput = ({ value, rubric, setRubric }) => {
  return (
    <label className="d-flex align-items-center">
      <input
        type="radio"
        value={value}
        checked={rubric === value && true}
        style={{ marginRight: "0.5rem" }}
        onChange={() => setRubric(value)}
      />
      {value}
    </label>
  );
};

const RubricPoints = ({ rubric }) => {
  return (
    <div className="rubric-points my-2 d-flex flex-wrap align-items-start">
      {rubricDesc.map((item) => (
        <>
          {item.type === rubric && (
            <div key={item.id} className="d-flex align-items-center">
              <input
                type="checkbox"
                className="mx-2"
                onChange={() => console.log(item.score)}
              />
              {item.text}
            </div>
          )}
        </>
      ))}
    </div>
  );
};

const rubricDesc = [
  {
    id: 1,
    text: "Frequently engages students in learning experiences focused on disciplinary knowledge and content specific skills.",
    score: 3.33,
    type: "Innovating",
  },
  {
    id: 2,
    text: "Teaching demonstrates extensive knowledge of the content area, its discipline-specific terminology, and academic language demands.",
    score: 3.33,
    type: "Innovating",
  },
  {
    id: 3,
    text: "Complete alignment (90%-100%) with adopted standards, program goals, and CLOs.",
    score: 3.33,
    type: "Innovating",
  },
  {
    id: 4,
    text: "Sometimes engages students in learning experiences focused on disciplinary knowledge and content specific skills. ",
    score: 3.33,
    type: "Applying",
  },
];
