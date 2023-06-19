import React, { useEffect } from 'react';

import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from '../../hooks';

import Modal from '../modal/Modal';
import { useModal } from '../../hooks/useModal';
import OrderDetails from '../order-details/OrderDetails';
import AllPrice from '../all-price/AllPrice';
import BoardBun from '../board-bun/BoardBun';
import BoardIngredients from '../board-ingredients/BoardIngredients';
import {
  loadOrder,
} from '../../services/actions/order';
import { UPDATE_ORDERS,  GET_ORDER_PRICE } from '../../services/constants';

import { useNavigate } from 'react-router-dom';

import stylesConstructor from './BurgerConstructor.module.css';
import { TIngredient } from '../../utils/types';
import { getCookie } from '../../services/utils';

const BurgerConstructor = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isModalOpen, openModal, closeModal } = useModal();
  const isAuth = useSelector((state) => state.user.isAuth);
  const orders = useSelector((state) => state.orders.orders);
  const order = useSelector((state) => state.orders.order);

  const ingredientsArr = useSelector(
    (state) => state.constructorItemsList.constructorItems,
  );
  const bunArr = useSelector(
    (state) => state.constructorItemsList.constructorBun,
  );
  const boards = useSelector((state) => state.boardList.boards);

  const allOrderArr: Array<TIngredient> = [...bunArr, ...ingredientsArr];

  useEffect(() => {
    dispatch({ type: GET_ORDER_PRICE });
    dispatch({
      type: UPDATE_ORDERS,
      payload: [...bunArr, ...ingredientsArr],
    });
  }, [dispatch, ingredientsArr, bunArr]);

  const ordersId = (arr: Array<TIngredient>) => {
    const res: Array<string> = [];
    arr.forEach((item) => res.push(item._id));
    return res;
  };

  const handleOpenModal = () => {
    if (!isAuth) {
      navigate('/login', { replace: true });
    } else {
      dispatch(loadOrder(allOrderArr));
      ordersId(allOrderArr);
      openModal();
    }
  };

  return (
    <>
      <section className={stylesConstructor.wrapper}>
        <section className={stylesConstructor.list}>
          <BoardBun
            items={bunArr}
            board={boards[0]}
            type='top'
            title=' (верх)'
            classBun={stylesConstructor.emptyBunTop}
          />
          <div className={stylesConstructor.inner}>
            <div className='custom-scroll'>
              <BoardIngredients
                items={ingredientsArr}
                board={boards[1]}
                classIngredients={stylesConstructor.empty}
              />
            </div>
          </div>
          <BoardBun
            items={bunArr}
            board={boards[0]}
            type='bottom'
            title=' (низ)'
            classBun={stylesConstructor.emptyBunBottom}
          />
        </section>
        <div className={stylesConstructor.footer}>
          <AllPrice bun={bunArr} ingredients={ingredientsArr} />
          <Button
            htmlType='button'
            type='primary'
            size='medium'
            onClick={handleOpenModal}
            disabled={bunArr.length === 0 ? true : false}
          >
            Оформить заказ
          </Button>
        </div>
      </section>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <OrderDetails orderId={orders.number} />
        </Modal>
      )}
    </>
  );
};

export default BurgerConstructor;
