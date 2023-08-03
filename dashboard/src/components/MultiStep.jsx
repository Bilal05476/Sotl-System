import React, { useState, Fragment, useEffect } from "react";
// import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Tabs, TabList, TabPanel, Tab } from "react-tabs";
import { Button, FormGroup, Label, Form } from "reactstrap";
import { info } from "../constants/Toasters";
import { submitTemplate } from "./Endpoints";
import { useStateValue } from "../StateProvider";

const MultiStepForm = ({
  tabtitle,
  steps,
  tempId,
  observationsId,
  setObs,
  tempType,
}) => {
  const [{ user }] = useStateValue();
  // const [currentStep, setCurrentStep] = useState(0);
  const [loader, setLoader] = useState(false);

  const [text, setText] = useState({
    ProgramOutcomes: "",
    LearningOutcomes: "",
    LearningResources: "",
    TeachingSummary: "",
    PreTeaching: "",
    PostTeaching: "",
    Feedback: "",
    Perception: "",
    StrategiesWork: "",
    StrategiesNeverWork: "",
    ForwardStrategies: "",
    RemoveStrategies: "",
    WordsRemember: "",
    SupportiveFactors: "",
    TeachingConstrain: "",
    CiteOfStudent: "",
    CourseLeaning: "",
    PlanAndImplementation: "",
    ConstrainingFactors: "",
    IdealTeaching: "",
  });

  const {
    ProgramOutcomes,
    LearningOutcomes,
    LearningResources,
    TeachingSummary,
    PreTeaching,
    PostTeaching,
    Feedback,
    Perception,
    StrategiesWork,
    StrategiesNeverWork,
    ForwardStrategies,
    RemoveStrategies,
    WordsRemember,
    SupportiveFactors,
    TeachingConstrain,
    CiteOfStudent,
    CourseLeaning,
    PlanAndImplementation,
    ConstrainingFactors,
    IdealTeaching,
  } = text;

  if (tempType === "Reflection") {
    const handleNextStep = () => {
      let templateResponse = [];
      const tempRes = [
        Perception,
        StrategiesWork,
        StrategiesNeverWork,
        ForwardStrategies,
        RemoveStrategies,
        WordsRemember,
        SupportiveFactors,
        TeachingConstrain,
        CiteOfStudent,
        CourseLeaning,
        PlanAndImplementation,
        ConstrainingFactors,
        IdealTeaching,
      ];
      if (
        Perception &&
        StrategiesWork &&
        StrategiesNeverWork &&
        ForwardStrategies &&
        RemoveStrategies &&
        WordsRemember &&
        SupportiveFactors &&
        TeachingConstrain &&
        CiteOfStudent &&
        CourseLeaning &&
        PlanAndImplementation &&
        ConstrainingFactors &&
        IdealTeaching
      ) {
        for (let t = 0; t < tempRes.length; t++) {
          templateResponse.push({
            id: steps[t].id,
            response: tempRes[t],
          });
        }
        return templateResponse;
      }
      return null;
    };

    const submitTemplateReposne = () => {
      const tempResponses = handleNextStep();
      if (tempResponses) {
        setLoader(true);
        submitTemplate(
          tempResponses,
          tempId,
          user?.id,
          observationsId,
          setObs,
          setLoader,
          tempType
        );
      } else {
        info("Please provide all the required details...");
      }
    };

    const changeText = (e) => {
      const { name, value } = e.target;
      setText((text) => ({
        ...text,
        [name]: value,
      }));
    };
    return (
      <Fragment>
        <Tabs>
          <TabList className="nav nav-tabs tab-coupon">
            <Tab className="nav-link">{tabtitle}</Tab>
          </TabList>

          {steps && (
            <Form className="needs-validation user-add" noValidate="">
              <TemplateHeader
                header={"Teacher Perspective"}
                subHeader={"(Single sentence listing/bullets required)"}
                pointer={"1"}
              />
              <FormGroup className="row mb-5">
                <div className="col-12">
                  {steps.map((step, index) => {
                    if (step.code === "Teacher Perspective")
                      return (
                        <div key={index}>
                          <div key={step.field} className="row mb-2">
                            <Label
                              htmlFor={step.field}
                              className="col-xl-3 col-md-4"
                            >
                              {index + 1}).{" "}
                              {step.field.charAt(0).toUpperCase() +
                                step.field.slice(1)}
                            </Label>
                            <div className="col-xl-8 col-md-7">
                              <textarea
                                className="form-control"
                                rows={5}
                                required={true}
                                type="text"
                                id={step.field}
                                name={step.name}
                                value={text[step.name]}
                                onChange={(e) => changeText(e)}
                              ></textarea>
                            </div>
                          </div>
                        </div>
                      );
                  })}
                </div>
              </FormGroup>
              <TemplateHeader
                header={"Teaching Context"}
                subHeader={"(Single sentence listing/bullets required)"}
                pointer={"2"}
              />
              <FormGroup className="row mb-5">
                <div className="col-12">
                  {steps.map((step, index) => {
                    if (step.code === "Teaching Context")
                      return (
                        <div key={index}>
                          <div key={step.field} className="row mb-2">
                            <Label
                              htmlFor={step.field}
                              className="col-xl-3 col-md-4"
                            >
                              {index + 1}).{" "}
                              {step.field.charAt(0).toUpperCase() +
                                step.field.slice(1)}
                            </Label>
                            <div className="col-xl-8 col-md-7">
                              <textarea
                                className="form-control"
                                rows={5}
                                required={true}
                                type="text"
                                id={step.field}
                                name={step.name}
                                value={text[step.name]}
                                onChange={(e) => changeText(e)}
                              ></textarea>
                            </div>
                          </div>
                        </div>
                      );
                  })}
                </div>
              </FormGroup>
              <TemplateHeader
                header={"Student Learning"}
                subHeader={
                  "(These are narratives. Be as descriptive or analytical as you want)"
                }
                pointer={"3"}
              />
              <FormGroup className="row mb-5">
                <div className="col-12">
                  {steps.map((step, index) => {
                    if (step.code === "Student Learning")
                      return (
                        <div key={index}>
                          <div key={step.field} className="row mb-2">
                            <Label
                              htmlFor={step.field}
                              className="col-xl-3 col-md-4"
                            >
                              {index + 1}).{" "}
                              {step.field.charAt(0).toUpperCase() +
                                step.field.slice(1)}
                            </Label>
                            <div className="col-xl-8 col-md-7">
                              <textarea
                                className="form-control"
                                rows={5}
                                required={true}
                                type="text"
                                id={step.field}
                                name={step.name}
                                value={text[step.name]}
                                onChange={(e) => changeText(e)}
                              ></textarea>
                            </div>
                          </div>
                        </div>
                      );
                  })}
                </div>
              </FormGroup>
              <TemplateHeader
                header={"Reflective Write-ups"}
                subHeader={
                  "(At least 60-word narratives, please avoid bullets/listing for this section)"
                }
                pointer={"4"}
              />
              <FormGroup className="row">
                <div className="col-12">
                  {steps.map((step, index) => {
                    if (step.code === "Reflective Write-ups")
                      return (
                        <div key={index}>
                          <div key={step.field} className="row mb-2">
                            <Label
                              htmlFor={step.field}
                              className="col-xl-3 col-md-4"
                            >
                              {index + 1}).{" "}
                              {step.field.charAt(0).toUpperCase() +
                                step.field.slice(1)}
                            </Label>
                            <div className="col-xl-8 col-md-7">
                              <textarea
                                className="form-control"
                                rows={5}
                                required={true}
                                type="text"
                                id={step.field}
                                name={step.name}
                                value={text[step.name]}
                                onChange={(e) => changeText(e)}
                              ></textarea>
                            </div>
                          </div>
                        </div>
                      );
                  })}
                </div>
              </FormGroup>
              <div className="text-center mt-5">
                <Button
                  color="primary"
                  onClick={() => {
                    submitTemplateReposne();
                  }}
                  disabled={loader}
                >
                  {loader ? "Submiting..." : "Submit"}
                </Button>
              </div>
            </Form>
          )}
        </Tabs>
      </Fragment>
    );
  } else {
    const handleNextStep = () => {
      let templateResponse = [];
      const tempRes = [
        ProgramOutcomes,
        LearningOutcomes,
        LearningResources,
        TeachingSummary,
        PreTeaching,
        PostTeaching,
        Feedback,
      ];
      if (
        ProgramOutcomes &&
        LearningOutcomes &&
        LearningResources &&
        TeachingSummary &&
        PreTeaching &&
        PostTeaching &&
        Feedback
      ) {
        for (let t = 0; t < tempRes.length; t++) {
          templateResponse.push({
            id: steps[t].id,
            response: tempRes[t],
          });
        }

        return templateResponse;
      }
      return null;
    };

    const submitTemplateReposne = () => {
      const tempResponses = handleNextStep();
      if (tempResponses) {
        setLoader(true);
        submitTemplate(
          tempResponses,
          tempId,
          user?.id,
          observationsId,
          setObs,
          setLoader,
          tempType
        );
      } else {
        info("Please provide all the required details...");
      }
    };

    const changeText = (e) => {
      const { name, value } = e.target;
      setText((text) => ({
        ...text,
        [name]: value,
      }));
    };
    return (
      <Fragment>
        <Tabs>
          <TabList className="nav nav-tabs tab-coupon">
            <Tab className="nav-link">{tabtitle}</Tab>
          </TabList>

          {steps && (
            <Form className="needs-validation user-add" noValidate="">
              <FormGroup className="row">
                <div className="col-12">
                  {steps.map((step, index) => (
                    <div key={index}>
                      <div key={step.field} className="row mb-2">
                        <Label
                          htmlFor={step.field}
                          className="col-xl-3 col-md-4"
                        >
                          {step.field.charAt(0).toUpperCase() +
                            step.field.slice(1)}
                        </Label>
                        <div className="col-xl-8 col-md-7">
                          <textarea
                            className="form-control"
                            rows={5}
                            required={true}
                            type="text"
                            id={step.field}
                            name={step.name}
                            value={text[step.name]}
                            onChange={(e) => changeText(e)}
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="text-center mt-5">
                    <Button
                      color="primary"
                      onClick={() => {
                        submitTemplateReposne();
                      }}
                      disabled={loader}
                    >
                      {loader ? "Submiting..." : "Submit"}
                    </Button>
                    {/* )} */}
                  </div>
                </div>
              </FormGroup>
            </Form>
          )}
        </Tabs>
      </Fragment>
    );
  }
};

const TemplateHeader = ({ pointer, header, subHeader }) => {
  return (
    <div className="mb-3">
      <h4 className="m-0">
        {pointer}). {header}
      </h4>
      <small className="m-4">{subHeader}</small>
    </div>
  );
};

export default MultiStepForm;
