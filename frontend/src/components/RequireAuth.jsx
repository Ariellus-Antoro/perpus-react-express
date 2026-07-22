import { Navigate, Outlet } from 'react-router-dom';
import { getSession } from '../services/api'; // Sesuaikan lokasi fungsi session-mu

export default function RequireAuth() {
  const session = getSession();

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  if (session.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  // Jika lolos (Admin), tampilkan halaman admin
  return <Outlet />;
}