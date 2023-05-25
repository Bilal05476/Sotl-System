import React, { useState, Fragment } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Tabs, TabList, TabPanel, Tab } from "react-tabs";
import { Button, FormGroup, Label } from "reactstrap";
import { Loader } from "react-feather";
import { info } from "../constants/Toasters";
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

// Define initial form values
const initialValues = {
  programOutcomes: "",
  learningOutcomes: "",
  teachingSummary: "",
  preTeaching: "",
  postTeaching: "",
  feedback: "",
};

const MultiStepForm = ({ tabtitle, steps }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [text, setText] = useState("");
  const [loader, setLoader] = useState(false);

  const handleNextStep = (id) => {
    if (text) {
      addText(id);
      setLoader(true);
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setText("");
        setLoader(false);
      }, 1000);
    } else {
      info("Please provide required information!");
    }
  };

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const addText = (id) => {
    const [filtered] = steps.filter((item) => item.id === id);
    filtered.response = text;
  };

  return (
    <Fragment>
      <Tabs>
        <TabList className="nav nav-tabs tab-coupon">
          <Tab className="nav-link">{tabtitle}</Tab>
        </TabList>

        {steps && (
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              // Handle form submission
              console.log(values);
            }}
          >
            {({}) => (
              <Form className="needs-validation" noValidate="">
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
                          <Label
                            htmlFor={step.field}
                            className="col-xl-3 col-md-4"
                          >
                            {step.field.charAt(0).toUpperCase() +
                              step.field.slice(1)}
                          </Label>

                          <textarea
                            className="col-xl-8 col-md-7"
                            rows={5}
                            required={true}
                            type="text"
                            id={step.field}
                            name={step.field}
                            onChange={(e) => setText(e.target.value)}
                          ></textarea>
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
                              onClick={() => handleNextStep(step.id)}
                              type="button"
                              color="primary"
                            >
                              {/* {loader ? <Loader size={18} /> : "Next"} */}
                              Next
                            </Button>
                          ) : (
                            <Button
                              type="submit"
                              // disabled={isSubmitting}
                              color="primary"
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
            )}
          </Formik>
        )}
      </Tabs>
    </Fragment>
  );
};

export default MultiStepForm;
