import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

export default function PublicRoute({ children }) {
  const { user } = useAuth();

  if (user) {
    // Redirect based on role
    return <Navigate to={user.role === 'admin' ? '/admin/dashboard' : '/customer/home'} replace />;
  }

  return children;
}
