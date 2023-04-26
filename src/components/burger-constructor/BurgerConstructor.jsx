import React, { useEffect } from 'react';

import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from 'react-redux';

import Modal from '../modal/Modal';
import { useModal } from '../../hooks/useModal';
import OrderDetails from '../order-details/OrderDetails';
import AllPrice from '../all-price/AllPrice';
import BoardBun from '../board-bun/BoardBun';
import BoardIngredients from '../board-ingredients/BoardIngredients';
import {
  GET_ORDER_PRICE,
  UPDATE_ORDERS,
  loadOrder,
} from '../../services/actions/order.js';

import stylesConstructor from './BurgerConstructor.module.css';

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const { isModalOpen, openModal, closeModal } = useModal();

  const orders = useSelector((state) => state.orders.orders);

  const ingredientsArr = useSelector(
    (state) => state.constructorItemsList.constructorItems,
  );
  const bunArr = useSelector(
    (state) => state.constructorItemsList.constructorBun,
  );
  const boards = useSelector((state) => state.boardList.boards);

  const allOrderArr = [...bunArr, ...ingredientsArr];

  useEffect(() => {
    dispatch({ type: GET_ORDER_PRICE });
    dispatch({
      type: UPDATE_ORDERS,
      payload: [...bunArr, ...ingredientsArr],
    });
    
  }, [dispatch, ingredientsArr, bunArr]);

  const ordersId = (arr) => {
    const res = [];
    arr.forEach((item) => res.push(item._id));
    return res;
  };

  const handleOpenModal = () => {
    dispatch(loadOrder(ordersId(allOrderArr)));
    openModal();
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
