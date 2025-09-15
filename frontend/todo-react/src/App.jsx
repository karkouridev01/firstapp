import React, { useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Tasks from "./pages/Tasks";
import "./styles.css";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <header className="nav">
        <div className="nav-inner">
          <div className="brand">
            <div className="logo" />
            <span>Todo<span style={{color:"var(--primary)"}}>Flow</span></span>
          </div>
          <nav className="toolbar">
            <Link className="btn ghost" to="/tasks">Tasks</Link>
            {!token ? (
              <Link className="btn" to="/login">Login</Link>
            ) : (
              <button className="btn ghost" onClick={handleLogout}>Logout</button>
            )}
          </nav>
        </div>
      </header>

      <main className="container">
        <section className="card panel">
          <div className="panel-header">
            <h2 style={{margin:0}}>Your Tasks</h2>
            <span className="kbd">JWT Protected</span>
          </div>

          <Routes>
            <Route path="/login" element={<Login setToken={setToken} />} />
            <Route path="/tasks" element={<Tasks token={token} />} />
            <Route path="*" element={<Tasks token={token} />} />
          </Routes>
        </section>
      </main>
    </>
  );
}

export default App;
