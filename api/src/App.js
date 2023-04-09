import { NavLink, Route, Routes } from "react-router-dom";
import Users from "./components/Users";
import Observations from "./components/Observations";

function App() {
  return (
    <div className="conatiner-fluid">
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
      <Routes>
        <Route path="/user" element={<Users />} />
      </Routes>
      <Routes>
        <Route path="/observation" element={<Observations />} />
      </Routes>
    </div>
  );
}

const HomePage = () => {
  return (
    <div className="container home-component">
      <NavLink className="link" to="/user">
        User Routes
      </NavLink>
      <NavLink className="link" to="/observation">
        Observation Routes
      </NavLink>
      <NavLink className="link" to="/courses">
        Course Routes
      </NavLink>
    </div>
  );
};

export default App;
