import React from 'react';
import {
  Button,
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import stylesConstructor from './BurgerConstructor.module.css';

export default class BurgerConstructor extends React.Component {
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
      <section className={stylesConstructor.wrapper}>
        <section className={stylesConstructor.list}>
          <ConstructorElement
            type='top'
            isLocked={true}
            text={this.props.firstElement.name}
            price={this.props.firstElement.price}
            thumbnail={this.props.firstElement.image}
          />

          <div className={stylesConstructor.inner}>
            <div className='custom-scroll'>{scrollList}</div>
          </div>

          <ConstructorElement
            type='bottom'
            isLocked={true}
            text={this.props.lastElement.name}
            price={this.props.lastElement.price}
            thumbnail={this.props.firstElement.image}
          />
        </section>
        <div className={stylesConstructor.footer}>
          <div className={stylesConstructor.price}>
            <span>610</span>
            <CurrencyIcon type='primary' />
          </div>
          <Button htmlType='button' type='primary' size='medium'>
            Оформить заказ
          </Button>
        </div>
      </section>
    );
  }
}
