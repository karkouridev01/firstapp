const API_URL = "http://127.0.0.1:8000";

export async function login(username, password) {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  return res.json();
}

export async function register(username, password) {
  const res = await fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  return res.json();
}

export async function fetchTasks(token) {
  const res = await fetch(`${API_URL}/api/tasks/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

export async function addTask(token, title) {
  const res = await fetch(`${API_URL}/api/tasks/`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
  return res.json();
}

export async function toggleTask(token, id) {
  const res = await fetch(`${API_URL}/api/tasks/${id}/`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ done: true }),
  });
  return res.json();
}

export async function deleteTask(token, id) {
  return fetch(`${API_URL}/api/tasks/${id}/`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
}
