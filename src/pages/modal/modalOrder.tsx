import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from '../../hooks';
import { useNavigate, useParams } from 'react-router-dom';
import Modal from '../../components/modal/Modal';
import { WS_URL_ALL, WS_URL } from '../../utils/constants';
import {
  wsConnectionClosed,
  wsConnectionStart,
} from '../../services/actions/wsActions';

import { TIngredient } from '../../utils/types';
import OrderItemDetails from '../../components/order-item-details/OrderItemDetails';
import { getCookie } from '../../services/utils';
import { FeedOrder } from '../../services/types/live-orders';

type Props = {
  authUser: boolean;
};

const ModalOrderPage = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.user.isAuth);

  useEffect(() => {
    const accessToken = getCookie('token')?.split('Bearer ')[1];
    setTimeout(() => {
      isAuth
      ? dispatch(wsConnectionStart(`${WS_URL}?token=${accessToken}`))
      : dispatch(wsConnectionStart(WS_URL_ALL));
    }, 15000);
    
    return () => {
      dispatch(wsConnectionClosed());
    };
  }, [isAuth]);

  const navigate = useNavigate();
  const { id } = useParams();

  const orders = useSelector((store) => store.feedList.orders);
  const order = orders.find((item: FeedOrder) => item._id === id);

  return (
    <>
      {/* {order &&
        <Modal onClose={() => navigate(-1)}>
          <OrderItemDetails order={order} />
        </Modal>
      } */}
    </>
  );
};

export { ModalOrderPage };
