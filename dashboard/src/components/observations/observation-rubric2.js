import React, { Fragment, useEffect, useState } from "react";
import { Col, Container, Row, Table } from "reactstrap";
// import { useParams } from "react-router-dom";
import Breadcrumb from "../common/breadcrumb";
import { ChevronsDown, ChevronsUp } from "react-feather";
import { Loader } from "../common/Loader";
import { useParams } from "react-router-dom";

import { completeColor, completeColor2 } from "../colors";
import { Applink, AccordButton } from "../applink";
import { info, successes } from "../../constants/Toasters";
import { doneScore2, fetchObservation, submitScore2 } from "../Endpoints";
import { useStateValue } from "../../StateProvider";
import { ConfirmModal } from "../PopupModal";
// import DiscreteSlider from "../DiscreteSlider";
const URL = process.env.PUBLIC_URL;

const Observation_rubric2 = () => {
  const [{ user }] = useStateValue();
  const [isOpen, setIsOpen] = useState("");
  const [accordionTab, setaccordionTab] = useState([]);
  const { id } = useParams();
  const [obsDetails, setObsDetail] = useState("");
  const [loader, setLoader] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchObservation(setObsDetail, Number(id));
  }, []);

  const updateTotal = () => {
    const rubricsFinal = [];
    if (accordionTab.length === 4) {
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
      info("Saving rubrics scores...");
      // let count = 0;
      // rubricsFinal.map((item) => {
      //   count += item.score;
      // });
      // console.log(count);
      // return;
      submitScore2(
        user.role,
        rubricsFinal,
        setLoader,
        obsDetails?.meetings?.uninformedObservation?.id,
        obsDetails?.meetings?.observationsId,
        setObsDetail
      );
    } else {
      info("Please save all rubrics scores!");
    }
  };

  const facultySc = obsDetails
    ? obsDetails?.meetings?.uninformedObservation?.facultyScore
    : 0;
  const observerSc = obsDetails
    ? obsDetails?.meetings?.uninformedObservation?.observerScore
    : 0;

  // avgSc = true && true ? (12 + 12) / 2 : 0;
  const avgSc =
    obsDetails?.meetings?.uninformedObservation?.observerScore &&
    obsDetails?.meetings?.uninformedObservation?.facultyScore
      ? (obsDetails?.meetings?.uninformedObservation?.observerScore +
          obsDetails?.meetings?.uninformedObservation?.facultyScore) /
        2
      : 0;

  const perSc =
    obsDetails?.meetings?.uninformedObservation?.observerScore &&
    obsDetails?.meetings?.uninformedObservation?.facultyScore
      ? ((obsDetails?.meetings?.uninformedObservation?.observerScore +
          obsDetails?.meetings?.uninformedObservation?.facultyScore) /
          160) *
        100
      : 0;

  const DoneRubricScoring = () => {
    setOpenConfirm(!openConfirm);
    info("Locking rubrics scores...");
    doneScore2(
      obsDetails?.meetings?.uninformedObservation?.id,
      setLoader,
      obsDetails?.meetings?.observationsId,
      setObsDetail
    );
  };

  return (
    <Fragment>
      <Breadcrumb
        title="Observation Rubrics"
        parent="Un-informed Observation"
      />
      <ConfirmModal
        open={openConfirm}
        setOpen={setOpenConfirm}
        DoneRubricScoring={DoneRubricScoring}
      />
      {obsDetails && (
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
              ].map((item, index) => {
                if (
                  user.role === "Faculty" &&
                  item.text === "SCORE BY OBSERVER"
                ) {
                  return;
                } else {
                  return (
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
                  );
                }
              })}
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
                {obsDetails?.meetings?.uninformedObservation?.status !== // update after testing !==
                  "Completed" && (
                  <div className="d-flex align-items-center justify-content-between">
                    <AccordButton
                      text={loader ? <Loader /> : "Submit Score"}
                      backgroundColor={completeColor2}
                      onClick={() => updateTotal()}
                      loader={loader}
                    />
                    {user.role === "Observer" &&
                      obsDetails?.meetings?.uninformedObservation
                        ?.facultyScore > 0 &&
                      obsDetails?.meetings?.uninformedObservation
                        ?.observerScore > 0 && (
                        <AccordButton
                          text={loader ? <Loader /> : "Done"}
                          backgroundColor={completeColor}
                          onClick={() => setOpenConfirm(!openConfirm)}
                          loader={loader}
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
      )}
      {!obsDetails && <Loader />}
    </Fragment>
  );
};

export default Observation_rubric2;

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
  const [loader, setLoader] = useState(false);

  const updateAccordionscore = () => {
    let count = 0;
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
      if (subSections.length > 0 && subSections.length === 5) {
        setIsOpen("");
      }
    }, 1000);

    if (subSections.length > 0 && subSections.length === 5) {
      successes("Rubrics Point Saved!");
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
      // setLoader(false);
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
          <div className="accordion-body" style={{ padding: "2rem" }}>
            {obsDetails?.meetings?.uninformedObservation?.rubrics.map(
              (item, ind) => {
                if (item.code === accordCode)
                  return (
                    <AccordionSubHeading
                      keys={item.id}
                      rid={item.id}
                      title={item.title}
                      ind={ind + 1}
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
                  borderRadius: "0px",
                }}
              >
                <AccordButton
                  backgroundColor={completeColor2}
                  text={loader ? <Loader /> : "Save Score"}
                  onClick={() => updateAccordionscore()}
                  loader={loader}
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
  keys,
  title,
  ind,
  subSections,
  setSubSections,
  accordCode,
  fs,
  os,
  role,
}) => {
  const [rubricSc, setRubricSc] = useState(
    role === "Faculty" ? fs : role === "Observer" ? os : (os + fs) / 2
  );
  // range input
  const handleChange = (event) => {
    setRubricSc(Number(event.target.value));
    if (subSections.some((obj) => obj.rid === rid)) {
      const updatedArray = subSections.map((obj) => {
        if (obj.rid === rid) {
          return { ...obj, sc: Number(event.target.value) };
        }
        return obj;
      });
      setSubSections(updatedArray);
    } else {
      setSubSections([
        ...subSections,
        {
          rid,
          sc: Number(event.target.value),
          code: accordCode,
        },
      ]);
    }
  };
  const renderBreakpoints = () => {
    const breakpoints = [];
    let scoringDesc = [
      "Not Demonstrating",
      "Limiting",
      "Developing",
      "Applying",
      "Innovating",
    ];
    for (let i = 0; i <= 4; i += 1) {
      breakpoints.push(
        <div key={i} className="breakpoint">
          {i}. {scoringDesc[i]}
        </div>
      );
    }
    return breakpoints;
  };
  const getThumbLevel = () => {
    if (rubricSc === 1) {
      return ".level-1";
    } else if (rubricSc === 2) {
      return ".level-2";
    } else if (rubricSc === 3) {
      return ".level-3";
    } else if (rubricSc === 4) {
      return ".level-4";
    } else {
      return ".level-0";
    }
  };

  return (
    <div
      className="p-4"
      style={{
        fontWeight: "500",
        borderBottom: "1px solid #ccc",
        marginBottom: "1rem",
        boxShadow: "0px 1px 2px #1e1e1e56",
      }}
      key={keys}
    >
      <h5>
        {ind}. {title}
      </h5>

      <div className="d-flex align-items-center justify-content-end my-2">
        <small
          style={{
            fontSize: "0.9rem",
            backgroundColor: completeColor2,
            color: "#fff",
            padding: "0.1rem 2rem",
            borderTopLeftRadius: "5px",
            borderBottomLeftRadius: "5px",
          }}
        >
          {role === "Faculty" || role === "Observer"
            ? "Rubric Score:"
            : "Aggregate Score:"}
          <span style={{ fontWeight: "800" }}> {rubricSc}</span>
        </small>
      </div>

      {role === "Faculty" || role === "Observer" ? (
        <div className="range-container">
          <div className="breakpoints d-flex justify-content-between">
            {renderBreakpoints()}
          </div>
          <input
            type="range"
            min="0"
            max="4"
            step="1"
            value={rubricSc}
            onChange={handleChange}
            className={`range w-100 ${getThumbLevel()}`}
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
