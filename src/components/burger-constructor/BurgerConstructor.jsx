import React from 'react';
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

class BurgerConstructor extends React.Component {
  state = {
    open: false,
  };

  setOpen = () => {
    this.setState({ open: !this.state.open });
  };
  render() {
    const list = this.props.listElements;
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
              text={this.props.firstElement.name + ' (верх)'}
              price={this.props.firstElement.price}
              thumbnail={this.props.firstElement.image}
            />

            <div className={stylesConstructor.inner}>
              <div className='custom-scroll'>{scrollList}</div>
            </div>

            <ConstructorElement
              type='bottom'
              isLocked={true}
              text={this.props.lastElement.name + ' (низ)'}
              price={this.props.lastElement.price}
              thumbnail={this.props.firstElement.image}
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
              onClick={this.setOpen}
            >
              Оформить заказ
            </Button>
          </div>
        </section>
        <Modal isOpen={this.state.open} onClose={this.setOpen}>
          <OrderDetails/>
        </Modal>
      </>
    );
  }
}

BurgerConstructor.propTypes = {
  firstElement: PropTypes.object.isRequired,
  lastElement: PropTypes.object.isRequired,
  listElements: PropTypes.array.isRequired,
};

export default BurgerConstructor;
