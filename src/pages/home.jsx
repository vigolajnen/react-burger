import React from 'react';
import BurgerConstructor from '../components/burger-constructor/BurgerConstructor';
import BurgerIngredients from '../components/burger-ingredients/BurgerIngredients';
// dnd
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

import appStyles from './home.module.css';

export function HomePage() {
  return (
    <main className={appStyles.main}>
      <h1 className={appStyles.title}>Соберите бургер</h1>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients />
        <BurgerConstructor />
      </DndProvider>
    </main>
  );
}
