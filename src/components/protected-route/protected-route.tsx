import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../hooks';
import { getCookie } from '../../services/utils';

type Props = {
  authUser: boolean | any;
  children: JSX.Element | any;
};

const ProtectedRoute = ({ authUser, children }: Props) => {
  const localToken = !localStorage.getItem('token');
  const location = useLocation();
  const from = location.state?.from.pathname;

  const user = useSelector((state) => state.user.user);

  if (!authUser && !user && localToken) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  if (!!localToken) {

    return <Navigate to={from} />;
  }

  return children;
};

export default ProtectedRoute;
