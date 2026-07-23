import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
});

// Interceptor Req
api.interceptors.request.use(
  (config) => {
    const { token } = getSession();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor Res
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      clearSession();
      // Hanya paksa lempar ke '/login' jika user TIDAK sedang berada di halaman login.
      if (window.location.pathname !== '/login') {
        window.location.href = '/login'; 
      }
    }

    const errorMessage = error.response?.data?.message 
      || `Terjadi kesalahan (${error.response?.status || 'Network Error'})`;
      
    return Promise.reject(new Error(errorMessage));
  }
);

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
  if (!token) {
    throw new Error("Token tidak ditemukan");
  }

  localStorage.setItem("token", token);
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
  localStorage.removeItem('user');
}

// --- API Service Functions (Menggunakan Axios Instance) ---

export function loginUser({ email, password }) {
  console.log("loginUser dipanggil");
  return api.post('/auth/login', { email, password });
}

export function registerUser(payload) {
  return api.post('/auth/register', payload); 
}

export function logoutUser() {
  return api.post('/auth/logout');
}

export function fetchProfile() {
  return api.get('/user/profile'); 
}

export function fetchBooks(limit=null) {
  const url = limit ? `/books?limit=${limit}` : '/books';
  return api.get('/books');
}

export function fetchBookById(id) {
  return api.get(`/books/${id}`);
}

export default api;