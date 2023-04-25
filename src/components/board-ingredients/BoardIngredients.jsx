import React from 'react';
import PropTypes from 'prop-types';

import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import {
  UPDATE_CONSTRUCTOR_ITEMS,
  addItemConstructor,
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
      dispatch(
        addItemConstructor(
          ingredients.filter((item) => item._id === itemId.id)[0],
        ),
      );

      dispatch({
        type: UPDATE_CONSTRUCTOR_ITEMS,
        ...itemId,
        board,
      });
    },
  });

  const border = isHover ? '2px solid lightgreen' : '2px solid transparent';

  return (
    <div ref={drop} board={board} style={{ border }}>
      {items.length === 0 ? (
        <div className={classIngredients}>Выберите ингредиенты</div>
      ) : (
        items.map((elem, index) => (
          <DragIngredient
            key={elem.id}
            index={index}
            item={elem}
            id={elem._id}
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
