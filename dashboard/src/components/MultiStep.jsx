import React, { useState, Fragment } from "react";
// import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Tabs, TabList, TabPanel, Tab } from "react-tabs";
import { Button, FormGroup, Label, Form } from "reactstrap";
import { info } from "../constants/Toasters";
import { submitTeachingTemplate } from "./Endpoints";
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

const MultiStepForm = ({ tabtitle, steps }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [text, setText] = useState({
    ProgramOutcomes: "Program",
    LearningOutcomes: "",
    LearningResources: "",
    TeachingSummary: "",
    PreTeaching: "",
    PostTeaching: "",
    Feedback: "",
  });

  const [loader, setLoader] = useState(false);
  const [templateResponse, setTemplateResponse] = useState([]);

  const handleNextStep = (id, name) => {
    if (text) {
      setLoader(true);
      console.log(name);
      console.log(text[name]);

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

      setTimeout(() => {
        if (currentStep < steps.length - 1) {
          setCurrentStep(currentStep + 1);
          setLoader(false);
          setText("");
        }
      }, 1000);
    } else {
      info("Please provide required information!");
    }
  };

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const submitTemplateReposne = (id, name) => {
    handleNextStep(id, name);
    setTimeout(() => {
      submitTeachingTemplate(templateResponse, setLoader, setText);
    }, 1500);
  };

  console.log(steps);

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
                            console.log(step.name, value);
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
                          {/* {loader ? <Loader size={18} /> : "Next"} */}
                          Next
                        </Button>
                      ) : (
                        <Button
                          // type="submit"
                          // disabled={isSubmitting}
                          color="primary"
                          onClick={() => {
                            submitTemplateReposne(step.id, step.name);
                          }}
                        >
                          Submit
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
