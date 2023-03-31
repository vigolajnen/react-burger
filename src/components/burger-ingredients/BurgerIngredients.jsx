import React from 'react';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredientsItem from '../burger-ingredients-item/BurgerIngredientsItem';

import stylesIngredients from './BurgerIngredients.module.css';

export default class BurgerIngredients extends React.Component {
  state = {
    current: 'Булки',
  };

  activeTab = (tab) => {
    this.setState({ current: tab });

    let type = 'bun';
    if (tab === 'Соусы') {
      type = 'sauce';
    } else if (tab === 'Начинки') {
      type = 'main';
    }

    document.querySelector('[data-value="' + type + '"]').scrollIntoView({
      behavior: 'smooth',
      inline: 'start',
    });
  };

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

    const arrSort = bunIngredients
      .concat(sauceIngredients)
      .concat(mainIngredients);

    return (
      <section>
        <div className={stylesIngredients.header}>
          <Tab
            value='Булки'
            active={this.state.current === 'Булки'}
            onClick={this.activeTab}
          >
            Булки
          </Tab>
          <Tab
            value='Соусы'
            active={this.state.current === 'Соусы'}
            onClick={this.activeTab}
          >
            Соусы
          </Tab>
          <Tab
            value='Начинки'
            active={this.state.current === 'Начинки'}
            onClick={this.activeTab}
          >
            Начинки
          </Tab>
        </div>
        <div style={{ height: '450px', overflow: 'hidden', padding: '10px 0' }}>
          <div
            className='custom-scroll'
            style={{
              height: '100%',
              overflow: 'auto',
              padding: '0 10px',
            }}
          >
            <div className={stylesIngredients.grid}>
              {arrSort.map((item) => (
                <BurgerIngredientsItem
                  key={item._id}
                  item={item}
                  text={item.name}
                  price={item.price}
                  thumbnail={item.image}
                  type={item.type}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }
}
