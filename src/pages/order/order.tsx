import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../hooks';
import { useParams } from 'react-router-dom';
import { TOrder } from '../../utils/types';
import IngredientDetails from '../../components/ingredient-details/IngredientDetails';

import { getCookie } from '../../services/utils';
import { WS_URL, WS_URL_ALL } from '../../utils/constants';
import {
  wsConnectionClosed,
  wsConnectionStart,
} from '../../services/actions/wsActions';

type Props = {
  isAuth: Boolean;
};

const OrderPage: FC<Props> = ({ isAuth }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const accessToken = getCookie('accessToken')?.split('Bearer ')[1];
    isAuth
      ? dispatch(wsConnectionStart(WS_URL_ALL))
      : dispatch(wsConnectionStart(`${WS_URL}?token=${accessToken}`));
    return () => {
      dispatch(wsConnectionClosed());
    };
  }, [isAuth]);

  const orders = useSelector((store) => store.feedList.orders);
  const { id } = useParams();
  const order = orders.find((item: TOrder) => item._id === id);

  return <>{order && <IngredientDetails />}</>;
};

export default OrderPage;
