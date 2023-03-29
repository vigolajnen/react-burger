import React from 'react';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

export default class BurgerIngredients extends React.Component {
  render() {
    const [current, setCurrent] = 'Булки';
    // const [current, setCurrent] = React.useState('Булки');
    return (
      <section style={{ display: 'flex' }} className='custom-scroll'>
        <Tab value='Булки' active={current === 'Булки'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value='Соусы' active={current === 'Соусы'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab
          value='Начинки'
          active={current === 'Начинки'}
          onClick={setCurrent}
        >
          Начинки
        </Tab>
      </section>
    );
  }
}
