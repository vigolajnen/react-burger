import { Navigate, useLocation } from 'react-router-dom';
import { getCookie } from '../../services/utils';

type Props = {
  authUser?: boolean | any;
  children: JSX.Element | any;
  anonymous?: boolean;
};

const ProtectedRoute = ({ anonymous = false, children }: Props) => {
  const location = useLocation();
  const isToken = getCookie('token') !== undefined;
  const from = location.state?.from || '/';

  if (!anonymous && !isToken) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  if (anonymous && isToken) {
    return <Navigate to={from} />;
  }

  // Если все ок, то рендерим внутреннее содержимое
  return children;
};

export default ProtectedRoute;
