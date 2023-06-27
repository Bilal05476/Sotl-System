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
import { fetchObservation, submitScore } from "../Endpoints";
// import DiscreteSlider from "../DiscreteSlider";
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

  const facultySc = obsDetails?.meetings?.informedObservation?.facultyScore
    ? obsDetails?.meetings?.informedObservation?.facultyScore
    : 0;
  const observerSc = obsDetails?.meetings?.informedObservation?.observerScore
    ? obsDetails?.meetings?.informedObservation?.observerScore
    : 0;

  // avgSc = true && true ? (12 + 12) / 2 : 0;
  const avgSc =
    obsDetails?.meetings?.informedObservation?.observerScore &&
    obsDetails?.meetings?.informedObservation?.facultyScore
      ? (obsDetails?.meetings?.informedObservation?.observerScore +
          obsDetails?.meetings?.informedObservation?.facultyScore) /
        2
      : 0;

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
                score: facultySc,
              },
              {
                color: completeColor2,
                text: "SCORE BY OBSERVER",
                score: observerSc,
              },
              {
                color: completeColor,
                text: "TOTAL SCORE",
                score: avgSc,
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
          obsDetails={obsDetails}
        />
        {/* <RubricAccordion
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
        /> */}

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

export default Observation_rubric;

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

const RubricAccordion = ({
  title,
  setIsOpen,
  isOpen,
  accordname,
  accordCode,
  obsDetails = { obsDetails },
}) => {
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
            Rubric Score: 0.00
            {isOpen === accordname ? (
              <ChevronsUp style={{ marginLeft: "1.5rem" }} />
            ) : (
              <ChevronsDown style={{ marginLeft: "1.5rem" }} />
            )}
          </span>
        </button>

        {isOpen === accordname && (
          <div className="accordion-body">
            {obsDetails?.meetings?.informedObservation?.rubrics.map(
              (item, ind) => {
                if (item.code === accordCode)
                  return (
                    <AccordionSubHeading
                      key={item.id}
                      title={item.title}
                      ind={ind + 1}
                      rubricScore={rubricScore}
                      rubricSelected={rubricSelected}
                    />
                  );
              }
            )}

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

const AccordionSubHeading = ({ title, ind, rubricScore, rubricSelected }) => {
  return (
    <div
      className="p-4"
      style={{
        fontStyle: "italic",
        fontWeight: "800",
        boxShadow: "1px 1px 2px #1e1e1e56s",
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
            rubricSelected={rubricSelected}
          />
        ))}
      </div>
    </div>
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
