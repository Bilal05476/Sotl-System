import Observations from "./Observations";

const ObserverView = () => {
  return (
    <div className="observer-view container-fluid">
      <div className="container">
        <div className="row meetings-list">
          <h3 className="heading">Ongoing Meeting</h3>
          <Observations />
        </div>
        <div className="row meetings-list">
          <h3 className="heading">Completed Meeting</h3>
          <Observations />
        </div>
      </div>
    </div>
  );
};

export default ObserverView;
