
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

async function request(path, options = {}) {
  const headers = { ...options.headers };

  //Setting FormData dan JSON
  if (!(options.body instanceof FormData)) {
      headers['Content-Type'] = headers['Content-Type'] || 'application/json';
  }

  const res = await fetch(`${API_BASE_URL}/api${path}`, {
    ...options,
    headers, 
  });

  let data = {};
  try {
    data = await res.json();
  } catch {
  }

  if (!res.ok) {
    throw new Error(data.message || `Terjadi kesalahan (${res.status})`);
  }
  return data;
}

// --- Auth: sesuai route backend yang ada (POST /api/login, POST /api/register) ---

export function loginUser({ email, password }) {
  return request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export function registerUser(payload) {
  return request('/auth/register', {
    method: 'POST',
    body: payload,
  });
}

export function fetchProfile(token) {
  return request('/user/profile', {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });
}

export function fetchBooks() {
  return request('/books', {
    method: 'GET',
  });
}

export function fetchBookById(id) {
  return request(`/books/${id}`, {
    method: 'GET',
  });
}

// --- Sesi login (disimpan di localStorage) ---

function decodeToken(token) {
  try {
    const payload = token.split('.')[1];
    const json = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export function saveSession(token) {
  localStorage.setItem('token', token);
}

export function getSession() {
  const token = localStorage.getItem('token');
  const claims = token ? decodeToken(token) : null;

  // Token kedaluwarsa? bersihkan otomatis.
  if (claims?.exp && claims.exp * 1000 < Date.now()) {
    localStorage.removeItem('token');
    return { token: null, claims: null };
  }

  return { token, claims };
}

export function clearSession() {
  localStorage.removeItem('token');
}
