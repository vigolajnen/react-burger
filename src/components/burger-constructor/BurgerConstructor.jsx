import React, { useState, useMemo } from 'react';
// import PropTypes from 'prop-types';
import {
  Button,
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import Modal from '../modal/Modal';
import OrderDetails from '../order-details/OrderDetails';

import stylesConstructor from './BurgerConstructor.module.css';
import AllPrice from '../all-price/AllPrice';
import { useSelector, useDispatch } from 'react-redux';
import { GET_ORDER_PRICE, loadOrder } from '../../services/actions/order.js';
import { useDrop } from 'react-dnd';

const BurgerConstructor = ({ onDropHandler }) => {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.order.orderIngredients);
  const bun = useSelector((state) => state.order.orderBun);

  const [{ isHover }, dropTarget] = useDrop({
    accept: 'bun',
    drop(itemId) {
      onDropHandler(itemId);
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  const newList = useMemo(() => {
    return list.map((item) => {
      return (
        <div key={item._id} {...item}>
          <DragIcon type='primary' />
          <ConstructorElement
            text={item.name}
            price={item.price}
            thumbnail={item.image}
          />
        </div>
      );
    });
  }, [list]);

  const newBunTop = useMemo(() => {
    return bun.map((item) => {
      return (
        <ConstructorElement
          type='top'
          isLocked={true}
          text={item.name + ' (верх)'}
          price={item.price}
          thumbnail={item.image}
        />
      );
    });
  }, [bun]);


  const newBunBottom = useMemo(() => {
    return bun.map((item) => {
      return (
        <ConstructorElement
          type='bottom'
          isLocked={true}
          text={item.name + ' (низ)'}
          price={item.price}
          thumbnail={item.image}
        />
      );
    });
  }, [bun]);

  const borderColor = isHover ? 'lightgreen' : 'transparent';

  const [open, setOpen] = useState();
  const handleOpenModal = () => {
    dispatch(loadOrder());
    setOpen(true);
  };
  const handleCloseModal = () => {
    setOpen(false);
  };

  const allArr = [...list, ...bun];

  if (allArr.length !== 0) {
    dispatch({ type: GET_ORDER_PRICE });
  }

  const scrollList = list.map((item) => (
    <div key={item._id} ref={dropTarget}>
      <DragIcon type='primary' />
      <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item.image}
      />
    </div>
  ));

  return (
    <>
      <section className={stylesConstructor.wrapper}>
        <section className={stylesConstructor.list}>
          <div board='bun' style={{ borderColor }} ref={dropTarget}>
            {newBunTop.length !== 0 ? (
              { newBunTop }
            ) : (
              // <ConstructorElement
              //   type='top'
              //   isLocked={true}
              //   text={bun.name + ' (верх)'}
              //   price={bun.price}
              //   thumbnail={bun.image}
              //   ref={dropTarget}
              // />
              <div className={stylesConstructor.emptyBunTop}>
                Выберите булку
              </div>
            )}
          </div>
          <div className={stylesConstructor.inner}>
            <div
              className='custom-scroll'
              board='ingredients'
              style={{ borderColor }}
              ref={dropTarget}
            >
              {newList.length !== 0 ? (
                newList
              ) : (
                <div className={stylesConstructor.empty}>
                  Выберите ингредиент
                </div>
              )}
            </div>
          </div>

          <div board='bun' style={{ borderColor }} ref={dropTarget}>
            {newBunBottom.length !== 0 ? (
              { newBunBottom }
            ) : (
              // <ConstructorElement
              //   type='bottom'
              //   isLocked={true}
              //   text={bun.name + ' (низ)'}
              //   price={bun.price}
              //   thumbnail={bun.image}
              // />
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
          <OrderDetails orderId={1234} />
        </Modal>
      )}
    </>
  );
};

// BurgerConstructor.propTypes = {
//   bun: PropTypes.object.isRequired,
//   listElements: PropTypes.array.isRequired,
// };

export default BurgerConstructor;
