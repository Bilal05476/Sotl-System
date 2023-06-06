import React from "react";

const ChildComponent = ({ sendDataToParent }) => {
  const handleClick = () => {
    const data = "Hello, Parent!";
    sendDataToParent(data);
  };

  return (
    <div>
      <button onClick={handleClick}>Send Data to Parent</button>
    </div>
  );
};

export default ChildComponent;
