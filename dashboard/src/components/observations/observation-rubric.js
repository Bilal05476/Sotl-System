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
import { useParams } from "react-router-dom";

import {
  blue1,
  blue2,
  blue3,
  blue4,
  completeColor,
  completeColor2,
  ongoingColor,
  pendingColor,
} from "../colors";
import Applink from "../applink";
import { info } from "../../constants/Toasters";
const URL = process.env.PUBLIC_URL;

const Observation_rubric = () => {
  const [isOpen, setIsOpen] = useState("");
  const [totalScore, setTotalScore] = useState(0);
  const [rubricSection, setRubricSection] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const updateTotal = () => {
    let count = 0;
    rubricSection.map((item) => {
      count += item.accordionScore;
      return null;
    });
    setTotalScore(count);
  };

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
          accordCode={"1-A"}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          updateTotal={updateTotal}
          rubricSection={rubricSection}
          setRubricSection={setRubricSection}
        />
        {/* <RubricAccordion
          title=" 1-B Demonstrating Knowledge of Pedagogy"
          accordname={"Pedagogy"}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          totalScore={totalScore}
          setTotalScore={setTotalScore}
        /> */}

        <div className="d-flex align-items-center justify-content-between py-3">
          <Applink
            to={`${URL}/observations/detail-observation/${id}`}
            backgroundColor={completeColor2}
            text="Back"
          />

          <div className="d-flex align-items-center justify-content-between">
            <AccordButton text="Save Score" backgroundColor={completeColor2} />
            <AccordButton text="Submit Score" backgroundColor={completeColor} />
          </div>
        </div>
      </Container>
    </Fragment>
  );
};

const AccordButton = ({ backgroundColor, text, onClick }) => {
  return (
    <button
      style={{
        backgroundColor: backgroundColor,
        outline: "none",
        boxShadow: "none",
        padding: "15px",
        marginLeft: "0.4rem",
        border: "0",
        color: "#fff",
        borderRadius: "5px",
        fontWeight: "700",
      }}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
export default Observation_rubric;

const RubricAccordion = ({
  title,
  setIsOpen,
  isOpen,
  accordname,
  accordCode,
  updateTotal,
  rubricSection,
  setRubricSection,
}) => {
  const [accordionScore, setAccordionScore] = useState(0);
  const [rubricFinal, setRubricFinal] = useState(0);

  const addAccordionScore = () => {
    setAccordionScore(rubricFinal);
    const existed = rubricSection.filter(
      (item) => item.accordionCode !== accordCode
    );
    if (existed) {
      setRubricSection([
        ...existed,
        {
          accordionCode: accordCode,
          accordionScore: rubricFinal,
        },
      ]);
      updateTotal();
    } else {
      setRubricSection([
        ...rubricSection,
        {
          accordionCode: accordCode,
          accordionScore: rubricFinal,
        },
      ]);
      updateTotal();
    }
  };

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
            {isOpen === accordname ? (
              <ChevronsUp style={{ marginLeft: "1.5rem" }} />
            ) : (
              <ChevronsDown style={{ marginLeft: "1.5rem" }} />
            )}
          </span>
        </button>

        {isOpen === accordname && (
          <div className="accordion-body">
            <h5
              className="d-flex  p-2"
              style={{
                fontStyle: "italic",
                fontWeight: "800",
                boxShadow: "1px 1px 2px #1e1e1e56",
                borderRadius: "2px",
              }}
            >
              {alignmentPLO.title}
            </h5>

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
              <RubricTable
                type={alignmentPLO}
                // rubricFinal={rubricFinal}
                // setRubricFinal={setRubricFinal}
              />
            </Table>
            <h5
              className="d-flex p-2"
              style={{
                fontStyle: "italic",
                fontWeight: "800",
                boxShadow: "1px 1px 2px #1e1e1e56",
                borderRadius: "2px",
              }}
            >
              {demonnstratingDSK.title}
            </h5>
            <Table borderless>
              <RubricTable
                type={demonnstratingDSK}
                // rubricFinal={rubricFinal}
                // setRubricFinal={setRubricFinal}
              />
            </Table>
            <h5
              className="d-flex p-2"
              style={{
                fontStyle: "italic",
                fontWeight: "800",
                boxShadow: "1px 1px 2px #1e1e1e56",
                borderRadius: "2px",
              }}
            >
              {studentEng.title}
            </h5>
            <Table borderless>
              <RubricTable
                type={studentEng}
                // rubricFinal={rubricFinal}
                // setRubricFinal={setRubricFinal}
              />
            </Table>

            <div
              className="bg-light py-3 text-center"
              style={{
                boxShadow: "1px 1px 2px #1e1e1e56",
                borderRadius: "2px",
              }}
            >
              <AccordButton
                backgroundColor={completeColor2}
                text="Submit Rubric Score"
                onClick={() => addAccordionScore()}
              />
            </div>
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
  rubricScore,
  setRubricScore,
  rubricSelected,
  setRubricSelected,
}) => {
  const toggleSelected = (id, sc) => {
    if (rubricSelected.includes(id)) {
      const filtered = rubricSelected.filter((item) => item !== id);
      setRubricSelected(filtered);
      setRubricScore(rubricScore - sc);
    } else {
      if (rubricSelected.length < 2) {
        setRubricSelected([...rubricSelected, id]);
        setRubricScore(rubricScore + sc);
      } else {
        info("You can only select any two of the rubric sub points...");
      }
    }
  };
  const avgRubricScore = () => {
    const avg = rubricScore / rubricSelected.length;
    // setRubricScore(avg);
  };

  useEffect(() => {
    setTimeout(() => {
      avgRubricScore();
      // console.log(rubricScore);
    }, 2000);
  }, [rubricSelected]);

  return (
    <div className="my-2 d-flex flex-column flex-wrap align-items-start">
      <div
        key={rubricDesc.id}
        className="rubric-points d-flex align-items-start my-2 "
        style={{
          backgroundColor:
            rubricSelected.includes(rubricDesc.id) && rubricDesc.score === 1
              ? blue3
              : rubricSelected.includes(rubricDesc.id) && rubricDesc.score === 2
              ? blue2
              : rubricSelected.includes(rubricDesc.id) && rubricDesc.score === 3
              ? blue1
              : rubricSelected.includes(rubricDesc.id) && rubricDesc.score === 4
              ? blue4
              : "",
          boxShadow:
            rubricSelected.includes(rubricDesc.id) &&
            "0.1rem 0.1rem 0.2rem rgba(109, 158, 207, 0.823)",
        }}
        onClick={() => toggleSelected(rubricDesc.id, rubricDesc.score)}
      >
        <input
          type="radio"
          className="mt-1"
          checked={rubricSelected.includes(rubricDesc.id) && true}
          style={{ marginRight: "0.5rem" }}
          readOnly={true}
        />

        <span
          style={{
            textAlign: "left",
          }}
        >
          {rubricDesc.text}
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

const RubricTable = ({ type }) => {
  const [rubricScore, setRubricScore] = useState(0);
  const [rubricSelected, setRubricSelected] = useState([]);

  return (
    <tbody>
      <tr>
        {rubrics.map((item) => {
          if (item.code === type.code)
            return (
              <td key={item.id}>
                <RubricPoints
                  rubricDesc={item}
                  rubricScore={rubricScore}
                  setRubricScore={setRubricScore}
                  rubricSelected={rubricSelected}
                  setRubricSelected={setRubricSelected}
                />
              </td>
            );
        })}
      </tr>
    </tbody>
  );
};
