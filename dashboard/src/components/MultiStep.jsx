import React, { useState, Fragment, useEffect } from "react";
// import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Tabs, TabList, TabPanel, Tab } from "react-tabs";
import { Button, FormGroup, Label, Form } from "reactstrap";
import { info } from "../constants/Toasters";
import { submitTeachingTemplate } from "./Endpoints";
import { useStateValue } from "../StateProvider";

const MultiStepForm = ({ tabtitle, steps, tempId, observationsId }) => {
  const [{ user }] = useStateValue();
  const [currentStep, setCurrentStep] = useState(0);
  const [text, setText] = useState({
    ProgramOutcomes: { id: 0, response: "" },
    LearningOutcomes: { id: 0, response: "" },
    LearningResources: { id: 0, response: "" },
    TeachingSummary: { id: 0, response: "" },
    PreTeaching: { id: 0, response: "" },
    PostTeaching: { id: 0, response: "" },
    Feedback: { id: 0, response: "" },
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

  const [templateResponse, setTemplateResponse] = useState([]);

  // const handleNextStep = () => {
  //   const tempRes = {
  //     ProgramOutcomes,
  //     LearningOutcomes,
  //     LearningResources,
  //     TeachingSummary,
  //     PreTeaching,
  //     PostTeaching,
  //     Feedback,
  //   };
  //   return tempRes;
  // };

  // const handlePreviousStep = () => {
  //   setCurrentStep(currentStep - 1);
  // };

  const submitTemplateReposne = () => {
    // setLoader(true);
    // const res = handleNextStep();
    // console.log(res);
    // setTimeout(() => {
    //   submitTeachingTemplate(
    //     templateResponse,
    //     setLoader,
    //     tempId,
    //     user?.id,
    //     observationsId
    //   );
    // }, 2500);
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
                          value={text[step.name]["response"]}
                          onChange={(e) => {
                            const { name, value } = e.target;
                            setText((prev) => ({
                              ...prev,
                              [name.response]: value,
                              [name.id]: step.id,
                            }));
                          }}
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
