import { useState } from "react";

import Signin from "./components/Signin";
import Dashboard from "./components/Dashboard";
import { useStateValue } from "./StateProvider";

function App() {
  const [{ user }] = useStateValue();
  const [role, setRole] = useState("admin");

  // useEffect(() => {
  //   async function fetchData() {
  //     const res = await fetch("http://localhost:8080/api/user/dashboard");
  //     const data = await res.json();
  //     setDummy(data);
  //   }
  //   fetchData();
  // }, []);
  return (
    <div className="app">
      {!user ? (
        <Signin role={role} setRole={setRole} />
      ) : (
        <Dashboard role={role} />
      )}
    </div>
  );
}

export default App;
