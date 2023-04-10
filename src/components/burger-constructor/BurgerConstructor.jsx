import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import Modal from '../modal/Modal';
import OrderDetails from '../order-details/OrderDetails';

import stylesConstructor from './BurgerConstructor.module.css';

const BurgerConstructor = ({ ...props }) => {
  const [open, setOpen] = useState();

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const list = props.listElements;
  const scrollList = list.map((item) => (
    <div key={item._id}>
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
          <ConstructorElement
            type='top'
            isLocked={true}
            text={props.bun.name + ' (верх)'}
            price={props.bun.price}
            thumbnail={props.bun.image}
          />

          <div className={stylesConstructor.inner}>
            <div className='custom-scroll'>{scrollList}</div>
          </div>

          <ConstructorElement
            type='bottom'
            isLocked={true}
            text={props.bun.name + ' (низ)'}
            price={props.bun.price}
            thumbnail={props.bun.image}
          />
        </section>
        <div className={stylesConstructor.footer}>
          <div className={stylesConstructor.price}>
            <span>610</span>
            <CurrencyIcon type='primary' />
          </div>
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
          <OrderDetails />
        </Modal>
      )}
    </>
  );
};

BurgerConstructor.propTypes = {
  bun: PropTypes.object.isRequired,
  listElements: PropTypes.array.isRequired,
};

export default BurgerConstructor;
