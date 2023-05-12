import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ authUser, children }) => {
  const user = useSelector((state) => state.user.user);
  const location = useLocation();

  if (!authUser && !user) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
