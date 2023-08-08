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
  blue5,
  completeColor,
  completeColor2,
  pendingColor,
} from "../colors";
import { Applink, AccordButton } from "../applink";
import { info } from "../../constants/Toasters";
import { fetchObservation, submitScore } from "../Endpoints";
import { useStateValue } from "../../StateProvider";
import { ConfirmModal } from "../PopupModal";
// import DiscreteSlider from "../DiscreteSlider";
const URL = process.env.PUBLIC_URL;

const Observation_rubric = () => {
  const [{ user }] = useStateValue();
  const [isOpen, setIsOpen] = useState("");
  const [accordionTab, setaccordionTab] = useState([]);
  const { id } = useParams();
  const [obsDetails, setObsDetail] = useState("");
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchObservation(setObsDetail, Number(id));
  }, []);

  const updateTotal = () => {
    const rubricsFinal = [];

    if (accordionTab.length > 0) {
      setLoader(true);
      accordionTab.map((item) => {
        // count += item.accordionScore;
        item.accordionSections.map((item) => {
          rubricsFinal.push({
            rid: item.rid,
            score: item.sc,
          });
          return null;
        });
        return null;
      });

      // console.log(rubricsFinal, user.role);

      // return null;

      submitScore(
        user.role,
        rubricsFinal,
        setLoader,
        obsDetails?.meetings?.informedObservation?.id,
        obsDetails?.meetings?.observationsId,
        setObsDetail
      );
    } else {
      info("Submit Rubrics scores for atleast one!");
    }
  };

  const facultySc = obsDetails?.meetings?.informedObservation?.facultyScore;
  const observerSc = obsDetails?.meetings?.informedObservation?.observerScore;

  // avgSc = true && true ? (12 + 12) / 2 : 0;
  const avgSc =
    obsDetails?.meetings?.informedObservation?.observerScore &&
    obsDetails?.meetings?.informedObservation?.facultyScore
      ? (obsDetails?.meetings?.informedObservation?.observerScore +
          obsDetails?.meetings?.informedObservation?.facultyScore) /
        2
      : 0;

  const perSc =
    obsDetails?.meetings?.informedObservation?.observerScore &&
    obsDetails?.meetings?.informedObservation?.facultyScore
      ? ((obsDetails?.meetings?.informedObservation?.observerScore +
          obsDetails?.meetings?.informedObservation?.facultyScore) /
          160) *
        100
      : 0;

  const [openConfirm, setOpenConfirm] = useState(false);
  const doneRubricScoring = () => {
    setOpenConfirm(!openConfirm);
  };
  return (
    <Fragment>
      <Breadcrumb title="Observation Rubrics" parent="Informed Observations" />
      <ConfirmModal open={openConfirm} setOpen={setOpenConfirm} />
      <Container fluid={true}>
        <Row className="mb-2">
          <Col className="xl-100 d-flex align-items-center justify-content-end">
            {[
              {
                color: completeColor2,
                text: "SCORE BY FACULTY",
                score: `${facultySc?.toFixed(1)} / 80.0`,
              },
              {
                color: completeColor2,
                text: "SCORE BY OBSERVER",
                score: `${observerSc?.toFixed(1)} / 80.0`,
              },
              {
                color: completeColor,
                text: "FINAL SCORE",
                score: `${avgSc?.toFixed(1)} / 80.0`,
              },
              {
                color: completeColor,
                text: "SCORE PERCENTAGE",
                score: `${perSc?.toFixed(1)}%`,
              },
            ].map((item, index) => (
              <span
                key={index}
                style={{
                  backgroundColor: item.color,
                  color: "#fff",
                  fontSize: "0.8rem",
                  padding: "0.5rem 0.8rem",
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
                  {item.score}
                </span>
              </span>
            ))}
          </Col>
        </Row>

        <RubricAccordion
          title="1-A Knowledge of Content"
          accordCode={"1-A"}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          accordionTab={accordionTab}
          setaccordionTab={setaccordionTab}
          obsDetails={obsDetails}
          role={user.role}
        />
        <RubricAccordion
          title="1-B Knowledge of Pedagogy"
          accordCode={"1-B"}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          accordionTab={accordionTab}
          setaccordionTab={setaccordionTab}
          obsDetails={obsDetails}
          role={user.role}
        />

        <RubricAccordion
          title="1-C Student Assessment"
          accordCode={"1-C"}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          accordionTab={accordionTab}
          setaccordionTab={setaccordionTab}
          obsDetails={obsDetails}
          role={user.role}
        />

        <RubricAccordion
          title="1-D Learning Environment"
          accordCode={"1-D"}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          accordionTab={accordionTab}
          setaccordionTab={setaccordionTab}
          obsDetails={obsDetails}
          role={user.role}
        />

        <div className="d-flex align-items-center justify-content-between py-3">
          <Applink
            to={`${URL}/observations/detail-observation/${id}`}
            backgroundColor={completeColor2}
            text="Back"
          />

          {user.role === "Observer" || user.role === "Faculty" ? (
            <div>
              {obsDetails?.meetings?.informedObservation?.status !==
                "Completed" && (
                <div className="d-flex align-items-center justify-content-between">
                  <AccordButton
                    text="Save Score"
                    backgroundColor={completeColor2}
                    onClick={() => updateTotal()}
                  />
                  {avgSc > 0 && user.role === "Observer" && (
                    <AccordButton
                      text="Done"
                      backgroundColor={completeColor}
                      onClick={() => doneRubricScoring()}
                    />
                  )}
                </div>
              )}
            </div>
          ) : (
            <></>
          )}
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
  accordCode,
  obsDetails,
  accordionTab,
  setaccordionTab,
  role,
}) => {
  const [accordionScore, setAccordionScore] = useState(0);
  const [subSections, setSubSections] = useState([]);

  const updateAccordionscore = () => {
    let count = 0;

    if (subSections.length > 0 && subSections.length === 5) {
      subSections.map((item) => {
        if (item.code === accordCode) count += item.sc;
      });
      setAccordionScore(count);
      if (accordionTab.some((obj) => obj.accordCode === accordCode)) {
        const popPrev = accordionTab.filter(
          (item) => item.accordCode !== accordCode
        );
        setaccordionTab([
          ...popPrev,
          {
            accordCode,
            accordionScore: count,
            accordionSections: subSections,
          },
        ]);
      } else {
        setaccordionTab([
          ...accordionTab,
          {
            accordCode,
            accordionScore: count,
            accordionSections: subSections,
          },
        ]);
      }
    } else {
      info("Please Select all Rubrics Point!");
    }
  };

  return (
    <div className="accordion">
      <div className="accordion-item overflow-hidden mb-5">
        <button
          className="btn btn-block text-light"
          onClick={() => setIsOpen(isOpen === accordCode ? "" : accordCode)}
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
            {isOpen === accordCode ? (
              <ChevronsUp style={{ marginLeft: "1.5rem" }} />
            ) : (
              <ChevronsDown style={{ marginLeft: "1.5rem" }} />
            )}
          </span>
        </button>

        {isOpen === accordCode && (
          <div className="accordion-body">
            {obsDetails?.meetings?.informedObservation?.rubrics.map(
              (item, ind) => {
                if (item.code === accordCode)
                  return (
                    <AccordionSubHeading
                      key={item.id}
                      rid={item.id}
                      title={item.title}
                      ind={ind + 1}
                      // rubricScore={
                      //   role === "Faculty"
                      //     ? item.facultyScore
                      //     : item.observerScore
                      // }
                      subSections={subSections}
                      setSubSections={setSubSections}
                      accordCode={accordCode}
                      fs={item.facultyScore}
                      os={item.observerScore}
                      role={role}
                    />
                  );
              }
            )}
            {role === "Observer" || role === "Faculty" ? (
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
            ) : (
              <></>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const AccordionSubHeading = ({
  rid,
  title,
  ind,
  // rubricScore,
  subSections,
  setSubSections,
  accordCode,
  fs,
  os,
  role,
}) => {
  const [rubricSc, setRubricSc] = useState();
  const [scoreSelected, setScoreSelected] = useState([]);

  useEffect(() => {
    let score = 0;
    let sclen = 0;
    if (scoreSelected[0]?.sc) {
      scoreSelected[0]?.sc.map((obj) => {
        score += obj;
        sclen += 1;
        return null;
      });
      setRubricSc(score / sclen);
      if (subSections.some((obj) => obj.rid === rid)) {
        const updatedArray = subSections.map((obj) => {
          if (obj.rid === rid) {
            return { ...obj, sc: score / sclen };
          }
          return obj;
        });
        setSubSections(updatedArray);
      } else {
        setSubSections([
          ...subSections,
          { rid: scoreSelected[0].rid, sc: score / sclen, code: accordCode },
        ]);
      }
    }
  }, [scoreSelected]);

  return (
    <div
      className="p-4"
      style={{
        fontStyle: "italic",
        fontWeight: "500",
        // marginBottom: "1rem",
        borderBottom: "1px solid #ccc",
      }}
    >
      <h5>
        {ind}. {title}
        <span
          style={{
            fontWeight: "600",
            marginLeft: "0.4rem",
          }}
        >
          {rubricSc > 0 && `(${rubricSc})`}
        </span>
      </h5>
      <div className="d-flex align-items-center justify-content-end mb-2 mx-2">
        <small className="mx-2" style={{ fontSize: "0.9rem" }}>
          Score by Faculty:
          <span style={{ fontWeight: "800" }}> {fs}</span>
        </small>
        <small style={{ fontSize: "0.9rem" }}>
          Score by Observer:
          <span style={{ fontWeight: "800" }}> {os}</span>
        </small>
      </div>

      {role === "Faculty" || role === "Observer" ? (
        <div className="d-flex align-items-center justify-content-between">
          {ScoringPlot.map((item) => (
            <RubricPoints
              scorePlot={item}
              rubricSc={rubricSc}
              setRubricSc={setRubricSc}
              scoreSelected={scoreSelected}
              setScoreSelected={setScoreSelected}
              rid={rid}
              k={item.score}
            />
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

const ScoringPlot = [
  {
    score: 0,
    text: "Non Demonstrating",
  },
  {
    score: 1,
    text: "Limiting",
  },
  {
    score: 2,
    text: "Developing",
  },
  {
    score: 3,
    text: "Applying",
  },
  {
    score: 4,
    text: "Innovating",
  },
];

const RubricPoints = ({
  scorePlot,
  // rubricSc,
  // setRubricSc,
  scoreSelected,
  setScoreSelected,
  rid,
  k,
}) => {
  const toggleSelected = (sc) => {
    const ridExists = scoreSelected.findIndex((obj) => obj.rid === rid);
    if (ridExists !== -1) {
      const scoreExists = scoreSelected[ridExists].sc.includes(sc);
      if (scoreExists) {
        const updatedArray = scoreSelected.map((obj) => {
          if (obj.rid === rid) {
            const popScore = obj.sc.filter((sco) => sco !== sc);
            return { ...obj, sc: popScore };
          }
          return obj;
        });
        setScoreSelected(updatedArray);
      } else {
        const updatedArray = scoreSelected.map((obj) => {
          if (obj.rid === rid && obj.sc.length < 2) {
            return { ...obj, sc: [...obj.sc, sc] };
          } else {
            info("You can only select any two of the rubric sub points...");
            return obj;
          }
        });
        setScoreSelected(updatedArray);
      }
    } else {
      setScoreSelected([...scoreSelected, { rid, sc: [sc] }]);
    }
  };
  return (
    <div
      key={k}
      className="rubric-points d-flex align-items-start my-1 mx-1"
      style={{
        backgroundColor:
          scoreSelected.some((obj) => obj.sc.includes(scorePlot.score)) &&
          scorePlot.score === 1
            ? blue3
            : scoreSelected.some((obj) => obj.sc.includes(scorePlot.score)) &&
              scorePlot.score === 2
            ? blue2
            : scoreSelected.some((obj) => obj.sc.includes(scorePlot.score)) &&
              scorePlot.score === 3
            ? blue1
            : scoreSelected.some((obj) => obj.sc.includes(scorePlot.score)) &&
              scorePlot.score === 4
            ? blue4
            : scoreSelected.some((obj) => obj.sc.includes(scorePlot.score)) &&
              scorePlot.score === 0
            ? blue5
            : "",
        boxShadow:
          scoreSelected.some((obj) => obj.sc.includes(scorePlot.score)) &&
          "0.1rem 0.1rem 0.2rem rgba(109, 158, 207, 0.823)",
      }}
      onClick={() => toggleSelected(scorePlot.score)}
    >
      <input
        type="radio"
        className="mt-1"
        checked={
          scoreSelected.some((obj) => obj.sc.includes(scorePlot.score)) && true
        }
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
