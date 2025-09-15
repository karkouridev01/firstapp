import React, { useState, useEffect } from "react";
import { fetchTasks, addTask, toggleTask, deleteTask } from "../api";

export default function Tasks({ token }) {
  const [tasks, setTasks] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [loading, setLoading] = useState(false);

  async function loadTasks() {
    if (!token) return;
    setLoading(true);
    const data = await fetchTasks(token);
    setTasks(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  useEffect(() => { loadTasks(); }, [token]);

  async function handleAdd(e) {
    e.preventDefault();
    if (!newTitle.trim()) return;
    await addTask(token, newTitle.trim());
    setNewTitle("");
    loadTasks();
  }

  async function handleToggle(id, done) {
    // نستعمل PATCH اللي عندك فـ API (بدّل إذا كتستعمل toggle endpoint)
    await fetch(`http://127.0.0.1:8000/api/tasks/${id}/`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ done: !done }),
    });
    loadTasks();
  }

  async function handleDelete(id) {
    await deleteTask(token, id);
    loadTasks();
  }

  if (!token) return <p className="empty">Please login to see your tasks.</p>;
  if (loading) return <p className="empty">Loading…</p>;

  return (
    <>
      <form onSubmit={handleAdd} className="toolbar" style={{marginBottom:16}}>
        <input className="input" value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="Add a new task…" />
        <button className="btn" type="submit">Add</button>
      </form>

      {tasks.length === 0 ? (
        <div className="empty">
          No tasks yet. Add your first task 👇
        </div>
      ) : (
        <ul className="list">
          {tasks.map(t => (
            <li key={t.id} className="item">
              <button
                className={`checkbox ${t.done ? 'done' : ''}`}
                onClick={() => handleToggle(t.id, t.done)}
                aria-label="toggle task"
                title="Toggle"
              >
                {t.done ? '✓' : ''}
              </button>

              <div className={`title ${t.done ? 'done' : ''}`}>{t.title}</div>

              <div className="actions">
                <button className="btn ghost" onClick={() => handleToggle(t.id, t.done)}>
                  {t.done ? 'Undo' : 'Done'}
                </button>
                <button className="btn danger" onClick={() => handleDelete(t.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
