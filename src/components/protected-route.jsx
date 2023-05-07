// import { useAuth } from '../services/auth';
import { Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { createTestUser } from '../services/api';
import { useSelector } from 'react-redux';

export const ProtectedRoute = ({ children }) => {
  const isAuth = useSelector((state) => state.user.isAuth);
  const location = useLocation();
  // let { getUser, ...auth } = useAuth();
  const [isUserLoaded, setUserLoaded] = useState(false);

  const init = async () => {
    // await getUser();
    setUserLoaded(true);
  };

  // const init = async () => {
  //   await getUser()
  //     .then((res) => {
  //       console.log(res);
  //       res.json();
  //     })
  //     .then((data) => {
  //       if (data.success) {
  //         if (!isUserLoaded) {
  //           return setUserLoaded(null);
  //         }
  //       }
  //     });
  // };

  useEffect(() => {
    // createTestUser();
    init();
  }, []);

  if (!isUserLoaded) {
    return null;
  }

  if (!isAuth) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return children;
};
