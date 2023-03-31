import React from 'react';

import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';

import stylesItem from './BurgerIngredientsItem.module.css';

export default class BurgerIngredientsItem extends React.Component {
  render() {

    const item = this.props.item;

    return <a href={item._id} className={stylesItem.item}>
      <Counter count={1} size="default" extraClass="m-1" />
      <img src={item.image} alt={item.name} />
      <div>{item.price}</div>
      <h3>{item.name}</h3>
    </a>;
  }
}
