import React from 'react';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import BurgerIngredientsItem from '../burger-ingredients-item/BurgerIngredientsItem';

export default class BurgerIngredients extends React.Component {
  render() {
    const bunIngredients = this.props.ingredients.filter(
      (item) => item.type === 'bun',
    );
    const mainIngredients = this.props.ingredients.filter(
      (item) => item.type === 'main',
    );
    const sauceIngredients = this.props.ingredients.filter(
      (item) => item.type === 'sauce',
    );

    const [current, setCurrent] = 'Булки';
    // const [current, setCurrent] = React.useState('Булки');
    return (
      <section>
        <div>
          <Tab
            value='Булки'
            active={current === 'Булки'}
            onClick={setCurrent}
            cards={bunIngredients}
          >
            Булки
          </Tab>
          <Tab
            value='Соусы'
            active={current === 'Соусы'}
            onClick={setCurrent}
            cards={sauceIngredients}
          >
            Соусы
          </Tab>
          <Tab
            value='Начинки'
            active={current === 'Начинки'}
            onClick={setCurrent}
            cards={mainIngredients}
          >
            Начинки
          </Tab>
        </div>
        <div style={{ height: '350px', overflow: 'hidden', padding: '10px 0' }}>
          <div
            className='custom-scroll'
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              height: '100%',
              overflow: 'auto',
            }}
          >
            {this.props.ingredients.map((item) => (
              <BurgerIngredientsItem
                key={item._id}
                item={item}
                text={item.name}
                price={item.price}
                thumbnail={item.image}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }
}
