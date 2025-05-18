import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ 
  isAuthPage = false,  // ← New prop for auth pages (login/register)
  adminOnly = false,
  redirectPath = '/'
}) => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  // For auth pages (login/register) - only show if NOT logged in
  if (isAuthPage && user) {
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  // For protected pages - only show if logged in
  if (!isAuthPage && !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // For admin pages
  if (adminOnly && user?.role !== 'admin') {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;