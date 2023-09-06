import React, { useState } from "react";
import { Button, FormGroup, Input } from "reactstrap";
import { updateTemplate } from "../Endpoints";
import { Loader } from "../common/Loader";

export const FormPool = ({ label, value, type, id, setPlan }) => {
  const [state, setState] = useState({
    formName: label,
    formField: value,
  });
  const [loader, setLoader] = useState(false);
  const { formName, formField } = state;
  const handleChange = () => {
    const obj = {
      id,
      field: formField,
      name: formName,
    };
    setLoader(true);
    updateTemplate(setPlan, type, obj, setLoader);
  };
  return (
    <FormGroup className="row">
      <div className="col-xl-3 col-md-4">
        <Input
          className="form-control"
          value={formName}
          onChange={(e) =>
            setState({
              ...state,
              formName: e.target.value,
            })
          }
        />
      </div>
      <div className="col-xl-8 col-md-7">
        <textarea
          className="form-control"
          id="validationCustom0"
          value={formField}
          onChange={(e) =>
            setState({
              ...state,
              formField: e.target.value,
            })
          }
          placeholder={label}
          rows={3}
        />
        <div className="pull-right mt-2">
          <Button
            disabled={formField === value && formName === label}
            onClick={() => handleChange()}
            type="button"
            color={"primary"}
          >
            {loader ? <Loader /> : "Update"}
          </Button>
        </div>
      </div>
    </FormGroup>
  );
};
