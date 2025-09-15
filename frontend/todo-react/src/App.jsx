import React, { useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Tasks from "./pages/Tasks";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={{ fontFamily: "sans-serif", padding: "20px" }}>
      <nav>
        <Link to="/tasks">Tasks</Link> |{" "}
        {!token ? <Link to="/login">Login</Link> : <button onClick={handleLogout}>Logout</button>}
      </nav>

      <Routes>
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/tasks" element={<Tasks token={token} />} />
      </Routes>
    </div>
  );
}

export default App;
