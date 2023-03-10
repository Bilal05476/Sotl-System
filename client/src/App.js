import { useState } from "react";

import Signin from "./components/Signin";
import Dashboard from "./components/Dashboard";
import { useStateValue } from "./StateProvider";

function App() {
  const [{ user }] = useStateValue();

  return <div className="app">{!user ? <Signin /> : <Dashboard />}</div>;
}

export default App;
