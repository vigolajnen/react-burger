import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../hooks';

type Props = {
  authUser: boolean | any;
  children: JSX.Element;
}; 

const ProtectedRoute = ({ authUser, children }: Props) => {
  const user = useSelector((state) => state.user.user);
  const location = useLocation();

  if (!authUser && !user) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
