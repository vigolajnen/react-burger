import React from 'react';
import BurgerConstructor from '../../components/burger-constructor/BurgerConstructor';
import BurgerIngredients from '../../components/burger-ingredients/BurgerIngredients';
// dnd
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { motion } from 'framer-motion';
import appStyles from './home.module.css';

export function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <main className={appStyles.main}>
        <h1 className={appStyles.title}>Соберите бургер</h1>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </main>
    </motion.div>
  );
}
