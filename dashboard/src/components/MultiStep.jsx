import React, { useState, Fragment } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Tabs, TabList, TabPanel, Tab } from "react-tabs";
import { Button, FormGroup, Label } from "reactstrap";

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

// Define form steps
const steps = [
  {
    fields: ["Program Outcomes for this program (PLOs)"],
  },
  {
    fields: ["Learning Outcomes for this course (CLOs)", "Learning Resources"],
  },
  {
    fields: ["Teaching Summary", "Pre-Teaching / Warm-up", "Post Teaching"],
  },
  {
    fields: [
      "Learning Feedbacks (activity, quiz, no-graded/graded assessments)",
    ],
  },
];

const MultiStepForm = ({ tabtitle }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <Fragment>
      <Tabs>
        <TabList className="nav nav-tabs tab-coupon">
          <Tab className="nav-link">{tabtitle}</Tab>
        </TabList>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            // Handle form submission
            console.log(values);
          }}
        >
          {({ isSubmitting }) => (
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
                      {/* <h2>{step.label}</h2> */}
                      {step.fields.map((field) => (
                        <div key={field} className="row mb-2">
                          <Label htmlFor={field} className="col-xl-3 col-md-4">
                            {field.charAt(0).toUpperCase() + field.slice(1)}
                          </Label>

                          <textarea
                            className="col-xl-8 col-md-7"
                            rows={5}
                            required={true}
                            type="text"
                            id={field}
                            name={field}
                          ></textarea>
                        </div>
                      ))}
                    </div>
                  ))}
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
                        onClick={handleNextStep}
                        type="button"
                        color="primary"
                      >
                        Next
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        color="primary"
                      >
                        Submit
                      </Button>
                    )}
                  </div>
                </div>
              </FormGroup>
            </Form>
          )}
        </Formik>
      </Tabs>
    </Fragment>
  );
};

export default MultiStepForm;
