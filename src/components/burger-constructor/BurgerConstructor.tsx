import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

import { useSelector, useDispatch } from '../../hooks';
import { useModal } from '../../hooks/useModal';

import Modal from '../modal/Modal';
import OrderDetails from '../order-details/OrderDetails';
import AllPrice from '../all-price/AllPrice';
import BoardBun from '../board-bun/BoardBun';
import BoardIngredients from '../board-ingredients/BoardIngredients';

import { UPDATE_ORDERS, GET_ORDER_PRICE } from '../../services/constants';
import { loadOrder } from '../../services/actions/order';
import { ClearConstructorItemAction } from '../../services/actions/constructor-items';

import { TIngredient } from '../../utils/types';

// css
import stylesConstructor from './BurgerConstructor.module.css';

const BurgerConstructor = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isModalOpen, openModal, closeModal } = useModal();
  const isAuth = useSelector((store) => store.user.isAuth);
  const orders = useSelector((store) => store.orders.orders);
  const { number } = useSelector((store) => store.orders.orders);

  const ingredientsArr = useSelector(
    (store) => store.constructorItemsList.constructorItems,
  );
  const bunArr = useSelector(
    (store) => store.constructorItemsList.constructorBun,
  );
  const boards = useSelector((store) => store.boardList.boards);

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
  const handleCloseModal = () => {
    if (number !== undefined) {
      closeModal();
      dispatch(ClearConstructorItemAction());
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
            data-cy="constructor-item"
          />
          <div className={stylesConstructor.inner}>
            <div className='custom-scroll'>
              <BoardIngredients
                items={ingredientsArr}
                board={boards[1]}
                classIngredients={stylesConstructor.empty}
                data-cy="constructor-item"
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
        <Modal onClose={handleCloseModal}>
          <OrderDetails orderId={orders.number} />
        </Modal>
      )}
    </>
  );
};

export default BurgerConstructor;
