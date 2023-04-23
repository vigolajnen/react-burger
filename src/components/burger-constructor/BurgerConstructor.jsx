import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  ConstructorElement,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';

import Modal from '../modal/Modal';
import OrderDetails from '../order-details/OrderDetails';
import BurgerConstructorIngredients from '../burger-constructor-ingredients/BurgerConstructorIngredients';
import stylesConstructor from './BurgerConstructor.module.css';
import AllPrice from '../all-price/AllPrice';
import { GET_ORDER_PRICE, loadOrder } from '../../services/actions/order.js';
import {
  UPDATE_CONSTRUCTOR_ITEMS,
  ADD_CONSTRUCTOR_ITEM,
} from '../../services/actions/constructor-items';

const BurgerConstructor = () => {
  const boards = useSelector((state) => state.boardList.boards);

  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders);
  const { ingredients } = useSelector((state) => state.ingredients);
  const listArr = useSelector(
    (state) => state.constructorItemsList.constructorItems,
  );

  const bunArr = [];
  const allArr = [...listArr, ...bunArr];

  if (allArr.length !== 0) {
    dispatch({ type: GET_ORDER_PRICE });
  }

  useEffect(() => {
    dispatch(loadOrder());
  }, [dispatch]);

  const [{ isHover }, dropTarget] = useDrop({
    accept: 'ingredients',
    drop(itemId) {
      dispatch({
        type: ADD_CONSTRUCTOR_ITEM,
        payload: ingredients.filter((item) => item.id === itemId.id),
      });
      dispatch({
        type: UPDATE_CONSTRUCTOR_ITEMS,
        ...itemId
      })
    },
    collect: (monitor) => (
      console.log('moving item:', monitor.itemId),
      {
        isHover: monitor.isOver(),
      }
    ),
  });

  const borderColor = isHover ? 'lightgreen' : 'transparent';

  const newList = useMemo(() => {
    return <BurgerConstructorIngredients items={listArr} />;
  }, [listArr]);

  const newBunTop = useMemo(() => {
    return bunArr.map((item) => {
      return (
        <ConstructorElement
          type='top'
          isLocked={true}
          text={item.name + ' (верх)'}
          price={item.price}
          thumbnail={item.image}
          {...item}
        />
      );
    });
  }, [bunArr]);

  const newBunBottom = useMemo(() => {
    return bunArr.map((item) => {
      return (
        <ConstructorElement
          type='bottom'
          isLocked={true}
          text={item.name + ' (низ)'}
          price={item.price}
          thumbnail={item.image}
          {...item}
        />
      );
    });
  }, [bunArr]);

  const [open, setOpen] = useState();
  const handleOpenModal = () => {
    setOpen(true);
  };
  const handleCloseModal = () => {
    setOpen(false);
  };

  return (
    <>
      <section className={stylesConstructor.wrapper}>
        <section className={stylesConstructor.list}>
          <div board={boards[0]} style={{ borderColor }} ref={dropTarget}>
            {newBunTop.length !== 0 ? (
              newBunTop
            ) : (
              <div className={stylesConstructor.emptyBunTop}>
                Выберите булку
              </div>
            )}
          </div>
          <div
            className={stylesConstructor.inner}
            board={boards[1]}
            ref={dropTarget}
          >
            <div className='custom-scroll'>
              <div className={stylesConstructor.border} style={{ borderColor }}>
                {listArr.length !== 0 ? (
                  newList
                ) : (
                  <div className={stylesConstructor.empty}>
                    Выберите ингредиенты
                  </div>
                )}
              </div>
            </div>
          </div>
          <div board={boards[0]} style={{ borderColor }} ref={dropTarget}>
            {newBunBottom.length !== 0 ? (
              newBunBottom
            ) : (
              <div className={stylesConstructor.emptyBunBottom}>
                Выберите булку
              </div>
            )}
          </div>
        </section>
        <div className={stylesConstructor.footer}>
          <AllPrice items={allArr} />
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

BurgerConstructor.propTypes = {
  // bun: PropTypes.object.isRequired,
  // onDropHandler: PropTypes.func.isRequired,
};

export default BurgerConstructor;
