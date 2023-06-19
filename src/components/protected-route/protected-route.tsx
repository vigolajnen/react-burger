import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../hooks';
import { getCookie } from '../../services/utils';

type Props = {
  authUser?: boolean | any;
  children: JSX.Element | any;
  anonymous?: boolean;
};

const ProtectedRoute = ({ anonymous = false, children }: Props) => {
  const location = useLocation();
  const localToken = !getCookie('token');
  const from = location.state?.from || '/';
  const { isLoggedIn } = useSelector((store) => store.user);
  console.log(anonymous && isLoggedIn);
  console.log(!anonymous && !isLoggedIn);


  if (!anonymous && localToken) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  if (anonymous && !localToken) {
    return <Navigate to={from} />;
  }

  // Если все ок, то рендерим внутреннее содержимое
  return children;
};

export default ProtectedRoute;
