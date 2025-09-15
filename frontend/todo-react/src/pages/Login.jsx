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
      alert("Login failed");
    }
  }

  async function handleRegister() {
    await register(username, password);
    alert("Registered, now login!");
  }

  return (
    <div>
      <h2>Login / Register</h2>
      <form onSubmit={handleLogin}>
        <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
        <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}
