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
import { NavLink, useFetcher, useParams } from "react-router-dom";

import {
  blue1,
  blue2,
  blue3,
  blue4,
  completeColor,
  ongoingColor,
  pendingColor,
} from "../colors";

const URL = process.env.PUBLIC_URL;

const Observation_rubric = () => {
  const [isOpen, setIsOpen] = useState("");
  const [totalScore, setTotalScore] = useState(0);
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
        <RubricAccordion
          title="1-A Demonstrating Pedagogical Content Knowledge"
          accordname={"Content"}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          totalScore={totalScore}
          setTotalScore={setTotalScore}
        />
        <RubricAccordion
          title=" 1-B Demonstrating Knowledge of Pedagogy"
          accordname={"Pedagogy"}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          totalScore={totalScore}
          setTotalScore={setTotalScore}
        />

        <div
          style={{
            textAlign: "right",
          }}
        >
          <NavLink
            to={`${URL}/observations/detail-observation/${id}`}
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
              backgroundColor: "#f1f1f1",
              outline: "none",
              boxShadow: "none",
              padding: "15px",
              width: "20%",
              border: "0",
              color: "#1e1e1e",
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

const RubricAccordion = ({
  title,
  setIsOpen,
  isOpen,
  accordname,
  totalScore,
  setTotalScore,
}) => {
  const [accordionScore, setAccordionScore] = useState(0);
  return (
    <div className="accordion">
      <div className="accordion-item overflow-hidden mb-5">
        <button
          className="btn btn-block text-light"
          onClick={() => setIsOpen(isOpen === accordname ? "" : accordname)}
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
          {title}
          <span className="d-flex align-items-center">
            Rubric Score: {accordionScore.toFixed(2)}
            {/* Rubric Score: {Math.ceil(rubricScore)} */}
            {isOpen === accordname ? (
              <ChevronsUp style={{ marginLeft: "1.5rem" }} />
            ) : (
              <ChevronsDown style={{ marginLeft: "1.5rem" }} />
            )}
          </span>
        </button>

        {isOpen === accordname && (
          <div className="accordion-body text-center">
            <h5
              className="d-flex"
              style={{
                fontStyle: "italic",
                fontWeight: "800",
              }}
            >
              {alignmentPLO.title}
            </h5>
            <RubricTable
              type={alignmentPLO}
              setAccordionScore={setAccordionScore}
              accordionScore={accordionScore}
              setTotalScore={setTotalScore}
              totalScore={totalScore}
            />
            <h5
              className="d-flex"
              style={{
                fontStyle: "italic",
                fontWeight: "800",
              }}
            >
              {demonnstratingDSK.title}
            </h5>
            <RubricTable
              type={demonnstratingDSK}
              setAccordionScore={setAccordionScore}
              accordionScore={accordionScore}
              setTotalScore={setTotalScore}
              totalScore={totalScore}
            />
            <h5
              className="d-flex"
              style={{
                fontStyle: "italic",
                fontWeight: "800",
              }}
            >
              {studentEng.title}
            </h5>
            <RubricTable
              type={studentEng}
              setAccordionScore={setAccordionScore}
              accordionScore={accordionScore}
              setTotalScore={setTotalScore}
              totalScore={totalScore}
            />
          </div>
        )}
      </div>
    </div>
  );
};

const RadioInput = ({ value }) => {
  return (
    <label
      className="col d-flex align-items-center"
      style={{ fontWeight: "600" }}
    >
      {value}
    </label>
  );
};

const RubricPoints = ({
  rubricDesc,
  selected,
  setSelected,
  rubricScore,
  setRubricScore,
  // setAccordionScore,
  // accordionScore,
  // setTotalScore,
  // totalScore,
}) => {
  const toggleSelected = (id, sc) => {
    if (selected.includes(id)) {
      const dRubric = selected.filter((item) => item !== id);
      setSelected(dRubric);
      let newScore = rubricScore - sc;
      setRubricScore(newScore);
    } else {
      setSelected([...selected, id]);
      let newScore = rubricScore + sc;
      setRubricScore(newScore);
    }
  };

  return (
    <div className="my-2 d-flex flex-column flex-wrap align-items-start">
      <div
        key={rubricDesc.id}
        className="rubric-points d-flex align-items-start my-2 "
        style={{
          backgroundColor:
            selected.includes(rubricDesc.id) && rubricDesc.score === 1
              ? blue3
              : selected.includes(rubricDesc.id) && rubricDesc.score === 2
              ? blue2
              : selected.includes(rubricDesc.id) && rubricDesc.score === 3
              ? blue1
              : selected.includes(rubricDesc.id) && rubricDesc.score === 4
              ? blue4
              : "",
          boxShadow:
            selected.includes(rubricDesc.id) &&
            "0.1rem 0.1rem 0.2rem rgba(109, 158, 207, 0.823)",
        }}
        onClick={() => toggleSelected(rubricDesc.id, rubricDesc.score)}
      >
        <input
          type="radio"
          className="mt-1"
          checked={selected.includes(rubricDesc.id) && true}
          style={{ marginRight: "0.5rem" }}
        />

        <span
          style={{
            textAlign: "left",
          }}
        >
          {rubricDesc.text}
          {/* {rubricScore > 0 ? rubricScore / selected.length : 0} */}
        </span>
      </div>
    </div>
  );
};

const alignmentPLO = {
  code: "1-A.1",
  title: "1-A.1 Alignment with Program and Course Learning Goals",
};

const demonnstratingDSK = {
  code: "1-A.2",
  title: "1-A.2 Demonstrating Discipline-Specific Knowledge",
};

const studentEng = {
  code: "1-A.3",
  title: "1-A.3 Student Engagement in Discipline-Specific Learning Experiences",
};

const insStrategies = {
  code: "1-B.1",
  title: "1-B.1 Instructional Strategies",
};

const rubrics = [
  {
    id: 1,
    text: "Instruction shows no alignment with adopted standards, PLOs and CLOs.",
    score: 1,
    code: "1-A.1",
  },
  {
    id: 7,
    text: "Instruction shows partial alignment (< 50%) with adopted standards, PLOs and CLOs.",
    score: 2,
    code: "1-A.1",
  },
  {
    id: 4,
    text: "Instruction shows reasonable alignment (50% - 90%) with adopted standards, PLOs and CLOs.",
    score: 3,
    code: "1-A.1",
  },
  {
    id: 10,
    text: "Instruction shows consistent alignment (90% - 100%) with adopted standards, PLOs and CLOs.",
    score: 4,
    code: "1-A.1",
  },
  {
    id: 11,
    text: "Instruction demonstrates limited knowledge of the content area, its discipline-specific terminology and academic language demands.",
    score: 1,
    code: "1-A.2",
  },
  {
    id: 8,
    text: " Instruction demonstrates partial knowledge of the content area, its discipline-specific terminology and academic language demands.",
    score: 2,
    code: "1-A.2",
  },
  {
    id: 5,
    text: "Instruction demonstrates reasonable knowledge of the content area, its discipline-specific terminology and academic language demands.",
    score: 3,
    code: "1-A.2",
  },

  {
    id: 2,
    text: "Instruction demonstrates extensive knowledge of the content area, its discipline-specific terminology and academic language demands.",
    score: 4,
    code: "1-A.2",
  },
  {
    id: 12,
    text: "Instruction does not engage students in learning experiences focused on disciplinary knowledge and content specific skills.",
    score: 1,
    code: "1-A.3",
  },
  {
    id: 9,
    text: "Instruction partially engages students in learning experiences focused on disciplinary knowledge and content specific skills.",
    score: 2,
    code: "1-A.3",
  },
  {
    id: 6,
    text: "Instruction reasonably engages students in learning experiences focused on disciplinary knowledge and content specific skills.",
    score: 3,
    code: "1-A.3",
  },

  {
    id: 3,
    text: "Instruction consistently engages students in learning experiences focused on disciplinary knowledge and content specific skills.",
    score: 4,
    code: "1-A.3",
  },
  {
    id: 13,
    text: "Instruction does not demonstrate any of the following: student-centered approaches (e.g. Active Learning), differentiated instruction (e.g. Universal Design for Learning), experiential learning approaches (e.g. field tours, authentic real-world connections) and/or resources to fit varied student learning styles and needs.",
    score: 1,
    code: "1-B.1",
  },
  {
    id: 14,
    text: "Instruction partially demonstrates any of the following: student-centered approaches (e.g. Active Learning), differentiated instruction (e.g. Universal Design for Learning), experiential learning approaches (e.g. field tours, authentic real-world connections) and/or resources to fit varied student learning styles and needs.",
    score: 2,
    code: "1-B.1",
  },
  {
    id: 15,
    text: "Instruction reasonably demonstrates any of the following: student-centered approaches (e.g. Active Learning), differentiated instruction (e.g. Universal Design for Learning), experiential learning approaches (e.g. field tours, authentic real-world connections) and/or resources to fit varied student learning styles and needs.",
    score: 3,
    code: "1-B.1",
  },
  {
    id: 16,
    text: "Instruction consistently demonstrates any of the following: student-centered approaches (e.g. Active Learning), differentiated instruction (e.g. Universal Design for Learning), experiential learning approaches (e.g. field tours, authentic real-world connections) and/or resources to fit varied student learning styles and needs.",
    score: 4,
    code: "1-B.1",
  },
];

const RubricTable = ({ type, setAccordionScore, accordionScore }) => {
  const [rubricScore, setRubricScore] = useState(0);
  const [selectedRubric, setSelectedRubric] = useState([]);

  return (
    <>
      <Table borderless>
        <thead>
          <th className="col">
            <RadioInput value={"Not Demonstrating (1)"} />
          </th>
          <th className="col">
            <RadioInput value={"Developing (2)"} />
          </th>
          <th className="col">
            <RadioInput value={"Applying (3)"} />
          </th>
          <th className="col">
            <RadioInput value={"Innovating (4)"} />
          </th>
        </thead>
        <tbody>
          <tr>
            {rubrics.map((item) => {
              if (item.code === type.code)
                return (
                  <td>
                    <RubricPoints
                      rubricDesc={item}
                      setSelected={setSelectedRubric}
                      selected={selectedRubric}
                      rubricScore={rubricScore}
                      setRubricScore={setRubricScore}
                    />
                  </td>
                );
            })}
          </tr>
        </tbody>
      </Table>
      <button
        style={{
          backgroundColor: pendingColor,
          outline: "none",
          boxShadow: "none",
          padding: "15px",
          width: "20%",
          border: "0",
          color: "#fff",
          borderRadius: "5px",
          fontWeight: "700",
          marginBottom: "1rem",
        }}
        onClick={() =>
          setAccordionScore(
            accordionScore + rubricScore / selectedRubric.length
          )
        }
      >
        ADD SCORE
      </button>
    </>
  );
};
