import React, { useState, Fragment, useEffect } from "react";
// import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Tabs, TabList, TabPanel, Tab } from "react-tabs";
import { Button, FormGroup, Label, Form } from "reactstrap";
import { info } from "../constants/Toasters";
import { submitTeachingTemplate } from "./Endpoints";
import { useStateValue } from "../StateProvider";

const MultiStepForm = ({ tabtitle, steps, tempId, observationsId, setObs }) => {
  const [{ user }] = useStateValue();
  // const [currentStep, setCurrentStep] = useState(0);
  const [text, setText] = useState({
    ProgramOutcomes: "",
    LearningOutcomes: "",
    LearningResources: "",
    TeachingSummary: "",
    PreTeaching: "",
    PostTeaching: "",
    Feedback: "",
  });

  const {
    ProgramOutcomes,
    LearningOutcomes,
    LearningResources,
    TeachingSummary,
    PreTeaching,
    PostTeaching,
    Feedback,
  } = text;

  const [loader, setLoader] = useState(false);

  // const [templateResponse, setTemplateResponse] = useState([]);

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

    for (let t = 0; t < tempRes.length; t++) {
      templateResponse.push({
        id: steps[t].id,
        response: tempRes[t],
      });
    }

    return templateResponse;
  };

  // const handlePreviousStep = () => {
  //   setCurrentStep(currentStep - 1);
  // };

  const submitTemplateReposne = () => {
    if (
      ProgramOutcomes &&
      LearningOutcomes &&
      LearningResources &&
      TeachingSummary &&
      PreTeaching &&
      PostTeaching &&
      Feedback
    ) {
      setLoader(true);
      const tempResponses = handleNextStep();
      if (tempResponses?.length > 0) {
        submitTeachingTemplate(
          tempResponses,
          setLoader,
          tempId,
          user?.id,
          observationsId,
          setObs
        );
      }
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
                      <Label htmlFor={step.field} className="col-xl-3 col-md-4">
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
                  {/* {currentStep > 0 && (
                        <Button
                          onClick={handlePreviousStep}
                          type="button"
                          color="primary"
                          className="mx-2"
                        >
                          Previous
                        </Button>
                      )} */}

                  {/* {currentStep < steps.length - 1 ? (
                        <Button
                          onClick={() => handleNextStep(step.id, step.name)}
                          type="button"
                          color="primary"
                        >
                          Next
                        </Button>
                      ) : ( */}
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
          //   )}
          // </Formik>
        )}
      </Tabs>
    </Fragment>
  );
};

export default MultiStepForm;
