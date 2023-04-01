import React from 'react';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientDetails from '../ingredient-details/IngredientDetails';

import stylesIngredients from './BurgerIngredients.module.css';

export default class BurgerIngredients extends React.Component {
  state = {
    current: 'Булки',
  };

  activeTab = (tab) => {
    this.setState({ current: tab });

    document.querySelector('[data-title="' + tab + '"]').scrollIntoView({
      behavior: 'smooth',
      inline: 'start',
    });
  };

  render() {
    const tabLabels = ['Булки', 'Соусы', 'Начинки'];

    const bunIngredients = this.props.ingredients.filter(
      (item) => item.type === 'bun',
    );
    const sauceIngredients = this.props.ingredients.filter(
      (item) => item.type === 'sauce',
    );
    const mainIngredients = this.props.ingredients.filter(
      (item) => item.type === 'main',
    );

    return (
      <section>
        <div className={stylesIngredients.header}>
          {tabLabels.map((item) => (
            <Tab
              value={item}
              active={this.state.current === item}
              onClick={this.activeTab}
            >
              {item}
            </Tab>
          ))}
        </div>
        <div className={stylesIngredients.body}>
          <div className='custom-scroll'>
            <div className={stylesIngredients.grid}>
              <h3 className={stylesIngredients.title} data-title='Булки'>
                Булки
              </h3>
              {bunIngredients.map((item) => (
                <IngredientDetails
                  key={item._id}
                  item={item}
                  text={item.name}
                  price={item.price}
                  thumbnail={item.image}
                  type={item.type}
                />
              ))}
            </div>
            <div className={stylesIngredients.grid}>
              <h3 className={stylesIngredients.title} data-title='Соусы'>
                Соусы
              </h3>
              {sauceIngredients.map((item) => (
                <IngredientDetails
                  key={item._id}
                  item={item}
                  text={item.name}
                  price={item.price}
                  thumbnail={item.image}
                  type={item.type}
                />
              ))}
            </div>
            <div className={stylesIngredients.grid}>
              <h3 className={stylesIngredients.title} data-title='Начинки'>
                Начинки
              </h3>
              {mainIngredients.map((item) => (
                <IngredientDetails
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
