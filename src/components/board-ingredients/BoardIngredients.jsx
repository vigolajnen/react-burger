import React from 'react';
import PropTypes from 'prop-types';
import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import {
  UPDATE_CONSTRUCTOR_ITEMS,
  ADD_CONSTRUCTOR_ITEM,
} from '../../services/actions/constructor-items';

const BoardIngredients = ({ board, classIngredients, items }) => {
  const dispatch = useDispatch();

  const { ingredients } = useSelector((state) => state.ingredients);

  const [{ isHover }, drop] = useDrop({
    accept: 'ingredients',
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop(itemId) {
      dispatch({
        type: ADD_CONSTRUCTOR_ITEM,
        payload: ingredients.filter((item) => item.id === itemId),
      });

      dispatch({
        type: UPDATE_CONSTRUCTOR_ITEMS,
        ...itemId,
        board,
      });
    },
  });

  const borderColor = isHover ? 'lightgreen' : 'transparent';

  return (
    <div ref={drop} style={{ borderColor }}>
      {items.length === 0 ? (
        <div className={classIngredients}>Выберите ингредиенты</div>
      ) : (
        items
          .filter((elem) => elem.board === board)
          // Отрисуем массив
          .map((elem) => (
            <div>
              <DragIcon type='primary' />
              <ConstructorElement
                id={elem._id}
                text={elem.name}
                price={elem.price}
                thumbnail={elem.image}
              />
            </div>
          ))
      )}
    </div>
  );
};

BoardIngredients.propTypes = {
  board: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
};

export default BoardIngredients;
