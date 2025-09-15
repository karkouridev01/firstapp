import React, { useState, useEffect } from "react";
import { fetchTasks, addTask, toggleTask, deleteTask } from "../api";

export default function Tasks({ token }) {
  const [tasks, setTasks] = useState([]);
  const [newTitle, setNewTitle] = useState("");

  async function loadTasks() {
    const data = await fetchTasks(token);
    setTasks(data);
  }

  useEffect(() => {
    if (token) loadTasks();
  }, [token]);

  async function handleAdd(e) {
    e.preventDefault();
    if (!newTitle) return;
    await addTask(token, newTitle);
    setNewTitle("");
    loadTasks();
  }

  async function handleToggle(id) {
    await toggleTask(token, id);
    loadTasks();
  }

  async function handleDelete(id) {
    await deleteTask(token, id);
    loadTasks();
  }

  if (!token) return <p>Please login first</p>;

  return (
    <div>
      <h2>Tasks</h2>
      <form onSubmit={handleAdd}>
        <input value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="New task..." />
        <button type="submit">Add</button>
      </form>
      <ul>
        {tasks.map(t => (
          <li key={t.id}>
            <span style={{ textDecoration: t.done ? "line-through" : "none" }}>{t.title}</span>
            <button onClick={() => handleToggle(t.id)}>Toggle</button>
            <button onClick={() => handleDelete(t.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
