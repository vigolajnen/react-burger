import React, { useState, useEffect } from 'react';

import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from 'react-redux';

import Modal from '../modal/Modal';
import OrderDetails from '../order-details/OrderDetails';
import AllPrice from '../all-price/AllPrice';
import BoardBun from '../board-bun/BoardBun';
import BoardIngredients from '../board-ingredients/BoardIngredients';
import { GET_ORDER_PRICE, loadOrder } from '../../services/actions/order.js';

import stylesConstructor from './BurgerConstructor.module.css';

const BurgerConstructor = () => {
  const [open, setOpen] = useState();
  const handleOpenModal = () => {
    setOpen(true);
  };
  const handleCloseModal = () => {
    setOpen(false);
  };

  const orders = useSelector((state) => state.orders.orders);
  const ingredientsArr = useSelector(
    (state) => state.constructorItemsList.constructorItems,
  );
  const bunArr = useSelector(
    (state) => state.constructorItemsList.constructorBun,
  );
  const boards = useSelector((state) => state.boardList.boards);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadOrder());
    dispatch({ type: GET_ORDER_PRICE });
  }, [dispatch, ingredientsArr]);


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
          >
            Оформить заказ
          </Button>
        </div>
      </section>
      {open && (
        <Modal onClose={handleCloseModal}>
          <OrderDetails orderId={orders.number} />
        </Modal>
      )}
    </>
  );
};

export default BurgerConstructor;
