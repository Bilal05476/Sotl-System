import React, { Fragment, useEffect, useState } from "react";
import { Col, Container, Row, Table } from "reactstrap";
// import { useParams } from "react-router-dom";
import Breadcrumb from "../common/breadcrumb";
import { ChevronsDown, ChevronsUp, Loader } from "react-feather";
import { useParams } from "react-router-dom";

import {
  blue1,
  blue2,
  blue3,
  blue4,
  completeColor,
  completeColor2,
} from "../colors";
import Applink from "../applink";
import { info } from "../../constants/Toasters";
import { rubrics } from "./rubric-list";
import { fetchObservation, submitScore } from "../Endpoints";
import DiscreteSlider from "../DiscreteSlider";
const URL = process.env.PUBLIC_URL;

const Observation_rubric = () => {
  const [isOpen, setIsOpen] = useState("");
  const [totalScore, setTotalScore] = useState(0);
  const [rubricSection, setRubricSection] = useState([]);
  const { id } = useParams();
  const [obsDetails, setObsDetail] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchObservation(setObsDetail, Number(id));
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
            {[
              {
                color: completeColor2,
                text: "SCORE BY FACULTY",
                score: obsDetails?.meetings?.informedObservation?.facultyScore,
              },
              {
                color: completeColor2,
                text: "SCORE BY OBSERVER",
                score: obsDetails?.meetings?.informedObservation?.observerScore,
              },
              {
                color: completeColor,
                text: "TOTAL SCORE",
                score:
                  (obsDetails?.meetings?.informedObservation?.facultyScore +
                    obsDetails?.meetings?.informedObservation?.observerScore) /
                  2,
              },
            ].map((item) => (
              <span
                className="digits"
                style={{
                  backgroundColor: item.color,
                  color: "#fff",
                  fontSize: "0.8rem",
                  padding: "0.5rem 1rem",
                  borderRadius: "5px",
                  marginLeft: "0.3rem",
                  fontWeight: "500",
                }}
              >
                {item.text}:
                <span
                  style={{
                    marginLeft: "0.3rem",
                    fontWeight: "700",
                  }}
                >
                  {item.score?.toFixed(2)}
                </span>
              </span>
            ))}
          </Col>
        </Row>
        <RubricAccordion
          title="1-A Knowledge of Content"
          accordname={"Content"}
          accordCode={"1-A"}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          updateTotal={updateTotal}
          rubricSection={rubricSection}
          setRubricSection={setRubricSection}
        />
        <RubricAccordion
          title="1-B Knowledge of Pedagogy"
          accordname={"Pedagogy"}
          accordCode={"1-B"}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          updateTotal={updateTotal}
          rubricSection={rubricSection}
          setRubricSection={setRubricSection}
        />

        <RubricAccordion
          title="1-C Student Assessment"
          accordname={"Assessment"}
          accordCode={"1-C"}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          updateTotal={updateTotal}
          rubricSection={rubricSection}
          setRubricSection={setRubricSection}
        />

        <RubricAccordion
          title="1-D Learning Environment"
          accordname={"Environment"}
          accordCode={"1-C"}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          updateTotal={updateTotal}
          rubricSection={rubricSection}
          setRubricSection={setRubricSection}
        />

        <div className="d-flex align-items-center justify-content-between py-3">
          <Applink
            to={`${URL}/observations/detail-observation/${id}`}
            backgroundColor={completeColor2}
            text="Back"
          />

          <div className="d-flex align-items-center justify-content-between">
            <AccordButton
              text="Save Score"
              backgroundColor={completeColor2}
              onClick={() =>
                submitScore(obsDetails?.meetings?.informedObservation?.id, 23)
              }
            />
            <AccordButton
              text="Submit Score"
              backgroundColor={completeColor}
              onClick={() =>
                submitScore(obsDetails?.meetings?.informedObservation?.id, 23)
              }
            />
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
  // updateTotal,
  // rubricSection,
  // setRubricSection,
}) => {
  // const [accordionScore, setAccordionScore] = useState(0);
  // const [subSections, setSubSections] = useState([]);

  // const addAccordionScore = (code, score) => {
  //   const filterPrev = subSections.filter((item) => item.code !== code);
  //   setSubSections([...filterPrev, { code, score }]);
  // };

  const updateAccordionscore = () => {
    let count = 0;
    // subSections.map((item) => {
    //   count += item.score;
    //   return null;
    // });
    // setAccordionScore(count);
  };

  const [rubricScore, setRubricScore] = useState(0);
  const [rubricSelected, setRubricSelected] = useState([]);

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
            {/* Rubric Score: {accordionScore?.toFixed(2)} */}
            {isOpen === accordname ? (
              <ChevronsUp style={{ marginLeft: "1.5rem" }} />
            ) : (
              <ChevronsDown style={{ marginLeft: "1.5rem" }} />
            )}
          </span>
        </button>

        {isOpen === accordname && (
          <div className="accordion-body">
            {/* {rubrics.map((item) => (
              <SubAccordion
                title={item.title}
                type={item.item}
                addAccordionScore={addAccordionScore}
                code={item.code}
              />
            ))} */}

            {rubrics.map((item, ind) => {
              if (item.code === accordCode)
                return (
                  <AccordionSubHeading
                    key={item.id}
                    title={item.text}
                    ind={ind + 1}
                    rubricScore={rubricScore}
                    rubricSelected={rubricSelected}
                    // addAccordionScore={addAccordionScore}
                    // code={code}
                  />
                );
            })}

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
                onClick={() => updateAccordionscore()}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// const SubAccordion = ({ title, type, addAccordionScore, code }) => {
//   return (
//     <AccordionSubHeading
//       title={title}
//       // rubricScore={rubricScore}
//       // rubricSelected={rubricSelected}
//       // addAccordionScore={addAccordionScore}
//       // code={code}
//     />
//   );
// };

const AccordionSubHeading = ({
  title,
  ind,
  rubricScore,
  rubricSelected,
  addAccordionScore,
  code,
}) => {
  // const avgScore = rubricScore / rubricSelected.length;
  // useEffect(() => {
  //   if (avgScore > 0) {
  //     addAccordionScore(code, avgScore);
  //   }
  // }, [avgScore]);
  // const [rubricScore, setRubricScore] = useState(0);
  // const [rubricSelected, setRubricSelected] = useState(0);
  return (
    <div
      className="p-4"
      style={{
        fontStyle: "italic",
        fontWeight: "800",
        boxShadow: "inset 2px 0px 5px #1e1e1e45",
        borderRadius: "2px",
        marginBottom: "1rem",
      }}
    >
      <h5>
        {ind}. {title}
        {/* {rubricScore > 0 && `(${rubricScore / rubricSelected.length})`} */}
      </h5>
      <div className="d-flex align-items-center justify-content-between">
        {ScoringPlot.map((item) => (
          <RubricPoints
            scorePlot={item}
            rubricScore={rubricScore}
            // setRubricScore={setRubricScore}
            rubricSelected={rubricSelected}
            // setRubricSelected={setRubricSelected}
          />
        ))}
      </div>
    </div>
  );
};
// const TableHead = () => {
//   return (
//     <thead>
//       <tr>
//         <th className="col">
//           <RadioInput value={"Not Demonstrating (0)"} />
//         </th>
//         <th className="col">
//           <RadioInput value={"Limitng (1)"} />
//         </th>
//         <th className="col">
//           <RadioInput value={"Developing (2)"} />
//         </th>
//         <th className="col">
//           <RadioInput value={"Applying (3)"} />
//         </th>
//         <th className="col">
//           <RadioInput value={"Innovating (4)"} />
//         </th>
//       </tr>
//     </thead>
//   );
// };

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

const ScoringPlot = [
  {
    id: 0,
    score: 0,
    text: "Non Demonstrating",
  },
  {
    id: 1,
    score: 1,
    text: "Limiting",
  },
  {
    id: 2,
    score: 2,
    text: "Developing",
  },
  {
    id: 3,
    score: 3,
    text: "Applying",
  },
  {
    id: 4,
    score: 4,
    text: "Innovating",
  },
];

const RubricPoints = ({
  scorePlot,
  rubricScore,
  setRubricScore,
  rubricSelected,
  setRubricSelected,
  // addAccordionScore,
  // code,
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

  // useEffect(() => {
  //     addAccordionScore(code, rubricScore);
  // }, [rubricSelected]);

  return (
    <div
      key={scorePlot.id}
      className="rubric-points d-flex align-items-start my-1 mx-1"
      style={{
        backgroundColor:
          rubricSelected.includes(scorePlot.id) && scorePlot.score === 1
            ? blue3
            : rubricSelected.includes(scorePlot.id) && scorePlot.score === 2
            ? blue2
            : rubricSelected.includes(scorePlot.id) && scorePlot.score === 3
            ? blue1
            : rubricSelected.includes(scorePlot.id) && scorePlot.score === 4
            ? blue4
            : "",
        boxShadow:
          rubricSelected.includes(scorePlot.id) &&
          "0.1rem 0.1rem 0.2rem rgba(109, 158, 207, 0.823)",
      }}
      onClick={() => toggleSelected(scorePlot.id, scorePlot.score)}
    >
      <input
        type="radio"
        className="mt-1"
        checked={rubricSelected.includes(scorePlot.id) && true}
        style={{ marginRight: "0.5rem" }}
        readOnly={true}
      />

      <span
        style={{
          textAlign: "left",
        }}
      >
        {scorePlot.text}
      </span>
    </div>
  );
};

// const alignmentPLO = {
//   code: "1-A.1",
//   title: "1-A.1 Alignment with Program and Course Learning Goals",
// };
// const demonnstratingDSK = {
//   code: "1-A.2",
//   title: "1-A.2 Demonstrating Discipline-Specific Knowledge",
// };

// const studentEng = {
//   code: "1-A.3",
//   title: "1-A.3 Student Engagement in Discipline-Specific Learning Experiences",
// };

// const insStrategies = {
//   code: "1-B.1",
//   title: "1-B.1 Instructional Strategies",
// };
// const knowledgeApp = {
//   code: "1-B.2",
//   title: "1-B.2 Knowledge and Application of Learning Levels",
// };

// const studentEngB = {
//   code: "1-B.3",
//   title: "1-B.3 Student Engagement Strategies",
// };

// const studentQues = {
//   code: "1-B.4",
//   title: "1-B.4 Responsiveness to Student Questions, Input and Examples",
// };

const RubricTable = ({
  type,
  rubricScore,
  setRubricScore,
  rubricSelected,
  setRubricSelected,
  // addAccordionScore,
  // code,
}) => {
  // const [rubricScore, setRubricScore] = useState(0);
  // const [rubricSelected, setRubricSelected] = useState([]);

  return (
    <tbody>
      <tr>
        {rubrics.map((item) => {
          if (item.code === type.code)
            return (
              <td key={item.id}>
                <RubricPoints
                  // addAccordionScore={addAccordionScore}
                  // code={code}
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
