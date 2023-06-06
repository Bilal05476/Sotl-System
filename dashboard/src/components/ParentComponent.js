import React, { useState } from "react";
import ChildComponent from "./ChildComponent";

const ParentComponent = () => {
  const [dataFromChild, setDataFromChild] = useState("");

  const handleDataFromChild = (data) => {
    setDataFromChild(data);
  };

  return (
    <div>
      <ChildComponent sendDataToParent={handleDataFromChild} />
      <p>Data from child: {dataFromChild}</p>
    </div>
  );
};

export default ParentComponent;
