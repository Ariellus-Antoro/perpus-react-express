import { Navigate } from 'react-router-dom';
import { getSession } from '../services/api';

function RequireAuth({ children }) {
  const { token } = getSession();
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default RequireAuth;
