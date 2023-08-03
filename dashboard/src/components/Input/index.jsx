import { FormGroup, Input, Label } from "reactstrap";
import { completeColor, ongoingColor } from "../colors";

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

export const SelectInput = ({
  label,
  value,
  options,
  onChange,
  departments,
  setDepartments,
}) => {
  const deleteDept = (id) => {
    setDepartments(departments.filter((item) => item !== id));
  };
  return (
    <FormGroup className="row">
      <Label className="col-xl-3 col-md-4">
        <span>*</span> {label}
      </Label>
      <div className="col-xl-8 col-md-7">
        <Input
          className="form-control"
          type="select"
          required={true}
          value={value}
          onChange={onChange}
        >
          <option value="Select">Select</option>
          {options?.map(
            (item) =>
              departments.includes(item.id) === false && (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              )
          )}
        </Input>
        {departments.length > 0 && (
          <div className="d-flex align-items-center flex-wrap">
            {options?.map(
              (item) =>
                departments.includes(item.id) && (
                  <span
                    className="px-2 py-1 m-1 text-dark"
                    style={{
                      background: ongoingColor,
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                    key={item.id}
                    onClick={() => deleteDept(item.id)}
                  >
                    {item.name}
                  </span>
                )
            )}
          </div>
        )}
      </div>
    </FormGroup>
  );
};
