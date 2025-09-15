import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, register } from "../api";

export default function Login({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    const data = await login(username, password);
    if (data.access) {
      localStorage.setItem("token", data.access);
      setToken(data.access);
      navigate("/tasks");
    } else {
      alert(data?.detail || "Login failed");
    }
  }

  async function handleRegister() {
    const res = await register(username, password);
    if(res?.status === "ok") alert("Registered! Now login.");
    else alert(res?.error || "Register failed");
  }

  return (
    <div style={{maxWidth:420, margin:"0 auto"}}>
      <div className="toolbar" style={{marginBottom:12}}>
        <span className="kbd">Demo</span>
        <span className="kbd">React + DRF + JWT</span>
      </div>

      <form onSubmit={handleLogin} className="toolbar" style={{flexDirection:"column", gap:12}}>
        <input className="input" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
        <input className="input" placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <div className="toolbar" style={{justifyContent:"space-between", width:"100%"}}>
          <button type="submit" className="btn">Login</button>
          <button type="button" className="btn ghost" onClick={handleRegister}>Register</button>
        </div>
      </form>
    </div>
  );
}
