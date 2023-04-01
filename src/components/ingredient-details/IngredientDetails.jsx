import React from 'react';

import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import stylesItem from './IngredientDetails.module.css';

export default class IngredientDetails extends React.Component {
  state = {
    count: 0,
  }
  render() {

    const item = this.props.item;

    return (<a href="#modalDetails" className={stylesItem.item} data-id={item._id} data-value={item.type}>

      {this.state.count !== 0 && <Counter count={this.state.count} size="default" extraClass="m-1" />}

      <img className={stylesItem.pic} src={item.image} alt={item.name} />
      <div className={stylesItem.price}>
        <span>{item.price}</span>
        <CurrencyIcon type='primary' />
      </div>
      <h3 className={stylesItem.title}>{item.name}</h3>
    </a>);
  }
}
