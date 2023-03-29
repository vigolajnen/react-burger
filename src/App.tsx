import React from 'react';
import './App.css';

import AppHeader from './components/app-header/AppHeader';
import BurgerConstructor from './components/burger-constructor/BurgerConstructor';
import BurgerIngredients from './components/burger-ingredients/BurgerIngredients';

import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

import appStyles from './App.module.css';

function App() {
  return (
    <div className='App'>
      <AppHeader className={appStyles.header} />
      <main className={appStyles.main}>
        <div className={appStyles.container}>
          <h1 className='text text_type_main-large'>Соберите бургер</h1>
          <div className={appStyles.grid}>
            <BurgerIngredients />
            <BurgerConstructor />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
