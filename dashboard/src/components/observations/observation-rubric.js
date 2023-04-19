import React, { Fragment, useEffect, useState } from "react";
import { Col, Container, Row, Table } from "reactstrap";
// import { useParams } from "react-router-dom";
import Breadcrumb from "../common/breadcrumb";
import { ChevronDown, ChevronsDown, ChevronsUp, Loader } from "react-feather";
import { NavLink, useParams } from "react-router-dom";

const Observation_rubric = () => {
  const [isOpen, setIsOpen] = useState("");
  const [rubric, setRubric] = useState("");
  const { id } = useParams();

  return (
    <Fragment>
      <Breadcrumb title="Observation Rubrics" parent="Informed Observations" />
      <Container fluid={true}>
        <Row className="mb-2">
          <Col className="xl-100">
            {" "}
            <span style={{ fontWeight: "500" }}>Total Score: 0</span>
          </Col>
        </Row>
        <div className="accordion">
          <div className="accordion-item overflow-hidden mb-5">
            <button
              className="btn btn-block text-light"
              onClick={() => setIsOpen(isOpen === "Content" ? "" : "Content")}
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
              <span className="d-flex align-items-center">
                Rubric Score: 0
                {isOpen === "Content" ? (
                  <ChevronsUp style={{ marginLeft: "1.5rem" }} />
                ) : (
                  <ChevronsDown style={{ marginLeft: "1.5rem" }} />
                )}
              </span>
            </button>

            {isOpen === "Content" && (
              <div className="accordion-body text-center">
                <Table borderless>
                  <thead>
                    <th className="col">
                      <RadioInput
                        rubric={rubric}
                        setRubric={setRubric}
                        value={"Innovating"}
                      />
                    </th>
                    <th className="col">
                      <RadioInput
                        rubric={rubric}
                        setRubric={setRubric}
                        value={"Applying"}
                      />
                    </th>
                    <th className="col">
                      <RadioInput
                        rubric={rubric}
                        setRubric={setRubric}
                        value={"Developing"}
                      />
                    </th>
                    <th className="col">
                      <RadioInput
                        rubric={rubric}
                        setRubric={setRubric}
                        value={"Not Demonstrating"}
                      />
                    </th>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <RubricPoints
                          rubricDesc={innovative}
                          rubric={rubric}
                          setRubric={setRubric}
                          title="Innovating"
                        />
                      </td>
                      <td>
                        <RubricPoints
                          rubricDesc={applying}
                          rubric={rubric}
                          setRubric={setRubric}
                          title="Applying"
                        />
                      </td>
                      <td>
                        <RubricPoints
                          rubricDesc={developing}
                          rubric={rubric}
                          setRubric={setRubric}
                          title="Developing"
                        />
                      </td>
                      <td>
                        <RubricPoints
                          rubricDesc={notDemostrating}
                          rubric={rubric}
                          setRubric={setRubric}
                          title="Not Demonstrating"
                        />
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            )}
          </div>
        </div>
        <div className="accordion">
          <div className="accordion-item overflow-hidden mb-5">
            <button
              className="btn btn-block text-light"
              onClick={() => setIsOpen(isOpen === "Pedagogy" ? "" : "Pedagogy")}
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
              <span className="d-flex align-items-center">
                Rubric Score: 0
                {isOpen === "Pedagogy" ? (
                  <ChevronsUp style={{ marginLeft: "1.5rem" }} />
                ) : (
                  <ChevronsDown style={{ marginLeft: "1.5rem" }} />
                )}
              </span>
            </button>

            {isOpen === "Pedagogy" && (
              <div className="accordion-body text-center"></div>
            )}
          </div>
        </div>
        <NavLink
          to={`${process.env.PUBLIC_URL}/observations/detail-observation/${id}`}
          style={{
            backgroundColor: "#040b5b",
            outline: "none",
            boxShadow: "none",
            padding: "15px",
            border: "0",
            color: "#fff",
            borderRadius: "5px",
            marginRight: "1rem",
            fontWeight: "700",
            textDecoration: "none",
          }}
        >
          BACK
        </NavLink>
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
    <label className="col d-flex align-items-center">
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

const RubricPoints = ({ rubric, title, rubricDesc }) => {
  return (
    <div className=" my-2 d-flex flex-column flex-wrap align-items-start">
      {/* <RadioInput value={title} rubric={rubric} setRubric={setRubric} /> */}
      <div
        className="rubric-points"
        style={{
          backgroundColor: rubric === title ? "#6fa2d83e" : "#6fa2d815",
        }}
      >
        {rubricDesc.map((item) => (
          <div key={item.id} className="d-flex align-items-start my-2">
            {/* {rubric === title && ( */}
            <input
              type="checkbox"
              className="mt-1"
              style={{ marginRight: "0.5rem" }}
              onChange={() => console.log(item.score)}
            />
            {/* )} */}
            <span
              className="digits"
              style={{
                textAlign: "left",
                fontWeight: rubric === title ? "600" : "300",
              }}
            >
              {item.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const innovative = [
  {
    id: 1,
    text: "Frequently engages students in learning experiences focused on disciplinary knowledge and content specific skills.",
    score: 3.33,
  },
  {
    id: 2,
    text: "Teaching demonstrates extensive knowledge of the content area, its discipline-specific terminology, and academic language demands.",
    score: 3.33,
  },
  {
    id: 3,
    text: "Complete alignment (90%-100%) with adopted standards, program goals, and CLOs.",
    score: 3.33,
  },
];

const applying = [
  {
    id: 1,
    text: "Sometimes engages students in learning experiences focused on disciplinary knowledge and content specific skills.",
    score: 3.33,
  },
  {
    id: 2,
    text: "Teaching demonstrates reasonable knowledge of the content area, its discipline-specific terminology, and academic language demands.",
    score: 3.33,
  },
  {
    id: 3,
    text: "Content teaching shows partial alignment (50%-90%) with adopted standards, program goals, and CLOs.",
    score: 3.33,
  },
];

const developing = [
  {
    id: 1,
    text: "Rarely engages students in learning experiences focused on disciplinary knowledge and content specific skills",
    score: 3.33,
  },
  {
    id: 2,
    text: "Teaching demonstrates partial knowledge of the content area, its discipline-specific terminology, and academic language demands.",
    score: 3.33,
  },
  {
    id: 3,
    text: "Content teaching shows limited alignment (<50%) with adopted standards, program goals, and CLOs.",
    score: 3.33,
  },
];
const notDemostrating = [
  {
    id: 1,
    text: "Does not engage students in learning experiences focused on disciplinary knowledge and content specific skills.",
    score: 3.33,
  },
  {
    id: 2,
    text: "Teaching demonstrates limited knowledge of the content area, its discipline-specific terminology, and academic language demands.",
    score: 3.33,
  },
  {
    id: 3,
    text: "Content teaching shows no alignment with adopted standards, program goals, and CLOs.",
    score: 3.33,
  },
];
