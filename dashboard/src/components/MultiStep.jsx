import React, { useState, Fragment, useEffect } from "react";
// import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Tabs, TabList, TabPanel, Tab } from "react-tabs";
import { Button, FormGroup, Label, Form } from "reactstrap";
import { info } from "../constants/Toasters";
import { submitTeachingTemplate } from "./Endpoints";
import { useStateValue } from "../StateProvider";
// Define validation schema for each step
const validationSchema = Yup.object({
  programOutcomes: Yup.string().required("Program outcomes are required!"),
  learningOutcomes: Yup.string().required("Learning outcomes are required!"),
  teachingSummary: Yup.string().required("Teaching Summary is required!"),
  preTeaching: Yup.string().required("Pre Teaching Practices are required!"),
  postTeaching: Yup.string().required("Post Teaching Practices are required!"),
  feedback: Yup.string().required(
    "Activities are required, provide minimum one!"
  ),
});

const MultiStepForm = ({ tabtitle, steps, tempId, observationsId }) => {
  const [{ user }] = useStateValue();
  const [currentStep, setCurrentStep] = useState(0);
  const [text, setText] = useState({
    ProgramOutcomes: steps && steps[0]?.response ? steps[0]?.response : "",
    LearningOutcomes: steps && steps[1]?.response ? steps[1]?.response : "",
    LearningResources: steps && steps[2]?.response ? steps[2]?.response : "",
    TeachingSummary: steps && steps[3]?.response ? steps[3]?.response : "",
    PreTeaching: steps && steps[4]?.response ? steps[4]?.response : "",
    PostTeaching: steps && steps[5]?.response ? steps[5]?.response : "",
    Feedback: steps && steps[6]?.response ? steps[6]?.response : "",
  });

  const [loader, setLoader] = useState(false);

  const [templateResponse, setTemplateResponse] = useState([]);

  const handleNextStep = (id, name) => {
    if (text[name]) {
      const foundObject = templateResponse.find((obj) => obj.id === id);

      if (foundObject) {
        const filteredTemp = templateResponse.filter(
          (item) => item.id !== foundObject.id
        );

        setTemplateResponse([
          ...filteredTemp,
          {
            id,
            response: text[name],
          },
        ]);
      } else {
        setTemplateResponse([
          ...templateResponse,
          {
            id,
            response: text[name],
          },
        ]);
      }

      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    } else {
      info("Please provide required information!");
    }
  };

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const submitTemplateReposne = (id, name) => {
    setLoader(true);
    handleNextStep(id, name);
    setTimeout(() => {
      submitTeachingTemplate(
        templateResponse,
        setLoader,
        tempId,
        user?.id,
        observationsId
      );
    }, 2500);
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
                  <div
                    key={index}
                    style={{
                      display: index === currentStep ? "block" : "none",
                    }}
                  >
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
                          onChange={(e) => {
                            const { name, value } = e.target;
                            setText((text) => ({
                              ...text,
                              [name]: value,
                            }));
                          }}
                        ></textarea>
                      </div>
                    </div>
                    <div className="text-center mt-5">
                      {currentStep > 0 && (
                        <Button
                          onClick={handlePreviousStep}
                          type="button"
                          color="primary"
                          className="mx-2"
                        >
                          Previous
                        </Button>
                      )}

                      {currentStep < steps.length - 1 ? (
                        <Button
                          onClick={() => handleNextStep(step.id, step.name)}
                          type="button"
                          color="primary"
                        >
                          Next
                        </Button>
                      ) : (
                        <Button
                          color="primary"
                          onClick={() => {
                            submitTemplateReposne(step.id, step.name);
                          }}
                          disabled={loader}
                        >
                          {loader ? "Submiting..." : "Submit"}
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
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
