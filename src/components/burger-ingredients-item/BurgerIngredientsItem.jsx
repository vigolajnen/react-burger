import React from 'react';

import { Counter  } from '@ya.praktikum/react-developer-burger-ui-components';

export default class BurgerIngredientsItem extends React.Component {
  render() {

    const item = this.props.item;

    return <div className='p-1'>
      <Counter count={1} size="default" extraClass="m-1" />
      <img src={item.image} alt={item.name} />
      <div>{item.price}</div>
      <h3>{item.name}</h3>
    </div>;
  }
}
