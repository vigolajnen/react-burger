import React from 'react';
import PropTypes from 'prop-types';

import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import {
  ADD_CONSTRUCTOR_ITEM,
  UPDATE_CONSTRUCTOR_ITEMS,
} from '../../services/actions/constructor-items';
import DragIngredient from '../drag-ingredient/DragIngredient';

const BoardIngredients = ({ board, classIngredients, items }) => {
  const dispatch = useDispatch();
  const { ingredients } = useSelector((state) => state.ingredients);

  const [{ isHover }, drop] = useDrop({
    accept: 'ingredients',
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop: (itemId) => {
      dispatch({
        type: ADD_CONSTRUCTOR_ITEM,
        payload: ingredients.filter((item) => item._id === itemId.id),
      });

      dispatch({
        type: UPDATE_CONSTRUCTOR_ITEMS,
        ...itemId,
        board,
      });
    },
  });

  const border = isHover ? '2px solid lightgreen' : '2px solid transparent';

  return (
    <div ref={drop} board={board} style={{border}}>
      {items.length === 0 ? (
        <div className={classIngredients}>Выберите ингредиенты</div>
      ) : (
        items.map((elem, index) => (
          <DragIngredient
            key={crypto.randomUUID()}
            index={index}
            item={elem}
            id={crypto.randomUUID()}
            _id={elem._id}
          />
        ))
      )}
    </div>
  );
};

BoardIngredients.propTypes = {
  classIngredients: PropTypes.string,
  board: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
};

export default BoardIngredients;
