// Base URL kosong ('') supaya request memakai path relatif '/api/...'
// yang di-proxy oleh Vite ke backend (lihat vite.config.js) saat development.
// Untuk production, set VITE_API_URL ke alamat backend, misal https://api-domain.com
const API_BASE_URL = import.meta.env.VITE_API_URL || '';

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE_URL}/api${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  });

  let data = {};
  try {
    data = await res.json();
  } catch {
    // respons tanpa body (mis. error 404 polos)
  }

  if (!res.ok) {
    throw new Error(data.message || `Terjadi kesalahan (${res.status})`);
  }
  return data;
}

// --- Auth: Sesuai route backend baru (/api/auth/login & /api/auth/register) ---
export function loginUser({ email, password }) {
  return request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export function registerUser(payload) {
  return request('/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

// --- Profile: Diperbarui menjadi /user/profile ---
export function fetchProfile(token) {
  return request('/user/profile', { // <-- PERBAIKAN: Menambahkan /user
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