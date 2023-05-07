import { FormGroup, Input, Label } from "reactstrap";

export const TextInput = ({ label, placeholder, value, onChange }) => {
  return (
    <FormGroup className="row">
      <Label className="col-xl-3 col-md-4">
        <span>*</span> {label}
      </Label>
      <div className="col-xl-8 col-md-7">
        <Input
          className="form-control"
          type="text"
          placeholder={placeholder}
          required={true}
          value={value}
          onChange={onChange}
        />
      </div>
    </FormGroup>
  );
};

export const TextInputReadOnly = ({ label, value }) => {
  return (
    <FormGroup className="row">
      <Label className="col-xl-3 col-md-4">
        <span>*</span> {label}
      </Label>
      <div className="col-xl-8 col-md-7">
        <Input
          className="form-control"
          type="text"
          readOnly={true}
          value={value}
        />
      </div>
    </FormGroup>
  );
};
