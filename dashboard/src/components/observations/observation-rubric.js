import React, { Fragment, useEffect, useState } from "react";
import { Col, Container, Row, Table } from "reactstrap";
// import { useParams } from "react-router-dom";
import Breadcrumb from "../common/breadcrumb";
import {
  ChevronDown,
  ChevronsDown,
  ChevronsUp,
  Loader,
  Trash,
  Trash2,
} from "react-feather";
import { NavLink, useParams } from "react-router-dom";

import { completeColor, ongoingColor, pendingColor } from "../colors";

const Observation_rubric = () => {
  const [isOpen, setIsOpen] = useState("");
  const [selectedRubric, setSelectedRubric] = useState([]);
  const [rubricScore, setRubricScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const { id } = useParams();

  return (
    <Fragment>
      <Breadcrumb title="Observation Rubrics" parent="Informed Observations" />
      <Container fluid={true}>
        <Row className="mb-2">
          <Col className="xl-100 d-flex align-items-center justify-content-end">
            {" "}
            <span
              className="digits"
              style={{
                fontWeight: "500",
                backgroundColor: completeColor,
                color: "#fff",
                padding: "0.5rem 1rem",
                borderRadius: "5px",
                // fontSize: "0.9rem",
                fontWeight: "700",
              }}
            >
              TOTAL SCORE: {totalScore.toFixed(2)}
            </span>
          </Col>
        </Row>
        <div className="accordion">
          <div className="accordion-item overflow-hidden mb-5">
            <button
              className="btn btn-block text-light"
              onClick={() => setIsOpen(isOpen === "Content" ? "" : "Content")}
              style={{
                backgroundColor: completeColor,
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
                Rubric Score: {rubricScore.toFixed(2)}
                {/* Rubric Score: {Math.ceil(rubricScore)} */}
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
                      <RadioInput value={"Innovating"} />
                    </th>
                    <th className="col">
                      <RadioInput value={"Applying"} />
                    </th>
                    <th className="col">
                      <RadioInput value={"Developing"} />
                    </th>
                    <th className="col">
                      <RadioInput value={"Not Demonstrating"} />
                    </th>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <RubricPoints
                          rubricDesc={innovative}
                          setSelected={setSelectedRubric}
                          selected={selectedRubric}
                          score={rubricScore}
                          setScore={setRubricScore}
                        />
                      </td>
                      <td>
                        <RubricPoints
                          rubricDesc={applying}
                          setSelected={setSelectedRubric}
                          selected={selectedRubric}
                          score={rubricScore}
                          setScore={setRubricScore}
                        />
                      </td>
                      <td>
                        <RubricPoints
                          rubricDesc={developing}
                          setSelected={setSelectedRubric}
                          selected={selectedRubric}
                          score={rubricScore}
                          setScore={setRubricScore}
                        />
                      </td>
                      <td>
                        <RubricPoints
                          rubricDesc={notDemostrating}
                          setSelected={setSelectedRubric}
                          selected={selectedRubric}
                          score={rubricScore}
                          setScore={setRubricScore}
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
                backgroundColor: completeColor,
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
                Rubric Score: {rubricScore.toFixed(2)}
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
        <div
          style={{
            textAlign: "right",
          }}
        >
          <NavLink
            to={`${process.env.PUBLIC_URL}/observations/detail-observation/${id}`}
            style={{
              backgroundColor: pendingColor,
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
              backgroundColor: ongoingColor,
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
              backgroundColor: completeColor,
              outline: "none",
              boxShadow: "none",
              padding: "15px",
              width: "20%",
              border: "0",
              color: "#fff",
              borderRadius: "5px",
              fontWeight: "700",
            }}
          >
            SUBMIT SCORE
          </button>
        </div>
      </Container>
    </Fragment>
  );
};
export default Observation_rubric;

const RadioInput = ({ value }) => {
  return (
    <label className="col d-flex align-items-center">
      {/* <input
        type="radio"
        value={value}
        checked={rubric === value && true}
        style={{ marginRight: "0.5rem" }}
        onChange={() => setRubric(value)}
      /> */}
      {value}
    </label>
  );
};

const RubricPoints = ({
  rubricDesc,
  selected,
  setSelected,
  score,
  setScore,
}) => {
  const toggleSelected = (id, sc) => {
    if (selected.includes(id)) {
      const dRubric = selected.filter((item) => item !== id);
      setSelected(dRubric);
      let newScore = score - sc;
      setScore(newScore);
    } else {
      setSelected([...selected, id]);
      let newScore = score + sc;
      setScore(newScore);
    }
  };

  // const deleteSelected = (id, sc) => {

  // };

  return (
    <div className="my-2 d-flex flex-column flex-wrap align-items-start">
      {rubricDesc.map((item) => (
        <div
          key={item.id}
          className="rubric-points d-flex align-items-start my-2 "
          style={{
            backgroundColor: selected.includes(item.id) && ongoingColor,
            boxShadow:
              selected.includes(item.id) &&
              "0.1rem 0.1rem 0.2rem rgba(109, 158, 207, 0.823)",
          }}
          onClick={() => toggleSelected(item.id, item.score)}
        >
          <input
            type="radio"
            className="mt-1"
            checked={selected.includes(item.id) && true}
            style={{ marginRight: "0.5rem" }}
          />

          <span
            // className="digits"
            style={{
              textAlign: "left",
            }}
          >
            {item.text}
          </span>
          {/* {selected.includes(item.id) && (
              <span
                onClick={() => deleteSelected(item.id, item.score)}
                className="rubric-point-delete"
              >
                <Trash2 size={18} color="white" />
              </span>
            )} */}
        </div>
      ))}
    </div>
  );
};

const innovative = [
  {
    id: 1,
    text: "Frequently engages students in learning experiences focused on disciplinary knowledge and content specific skills.",
    score: 3,
  },
  {
    id: 2,
    text: "Teaching demonstrates extensive knowledge of the content area, its discipline-specific terminology, and academic language demands.",
    score: 3,
  },
  {
    id: 3,
    text: "Complete alignment (90%-100%) with adopted standards, program goals, and CLOs.",
    score: 3,
  },
];

const applying = [
  {
    id: 4,
    text: "Sometimes engages students in learning experiences focused on disciplinary knowledge and content specific skills.",
    score: 3,
  },
  {
    id: 5,
    text: "Teaching demonstrates reasonable knowledge of the content area, its discipline-specific terminology, and academic language demands.",
    score: 3,
  },
  {
    id: 6,
    text: "Content teaching shows partial alignment (50%-90%) with adopted standards, program goals, and CLOs.",
    score: 3,
  },
];

const developing = [
  {
    id: 7,
    text: "Rarely engages students in learning experiences focused on disciplinary knowledge and content specific skills",
    score: 3,
  },
  {
    id: 8,
    text: "Teaching demonstrates partial knowledge of the content area, its discipline-specific terminology, and academic language demands.",
    score: 3,
  },
  {
    id: 9,
    text: "Content teaching shows limited alignment (<50%) with adopted standards, program goals, and CLOs.",
    score: 3,
  },
];
const notDemostrating = [
  {
    id: 10,
    text: "Does not engage students in learning experiences focused on disciplinary knowledge and content specific skills.",
    score: 3,
  },
  {
    id: 11,
    text: "Teaching demonstrates limited knowledge of the content area, its discipline-specific terminology, and academic language demands.",
    score: 3,
  },
  {
    id: 12,
    text: "Content teaching shows no alignment with adopted standards, program goals, and CLOs.",
    score: 3,
  },
];
