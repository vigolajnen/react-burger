import React from 'react';
import PropTypes from 'prop-types';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import {
  UPDATE_CONSTRUCTOR_ITEMS,
  ADD_CONSTRUCTOR_ITEM,
} from '../../services/actions/constructor-items';

const BoardBun = ({ board, title, type, classBun, items }) => {
  const dispatch = useDispatch();

  const { ingredients } = useSelector((state) => state.ingredients);

  const [{ isHover }, drop] = useDrop({
    accept: 'bun',
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop(itemId) {
      dispatch({
        type: ADD_CONSTRUCTOR_ITEM,
        payload: ingredients.filter((item) => item.id === itemId.id),
      });
      console.log(itemId);

      // dispatch({
      //   type: UPDATE_CONSTRUCTOR_ITEMS,
      //   ...itemId,
      //   board,
      // });
    },
  });

  const borderColor = isHover ? 'lightgreen' : 'transparent';

  return (
    <div ref={drop} style={{ borderColor }}>
      {items.length === 0 ? (
        <div className={classBun}>Выберите булку</div>
      ) : (
        items
          // Получим массив, соответствующих целевому элементу
          .filter((elem) => elem.board === board)
          // Отрисуем массив
          .map((elem) => (
            <ConstructorElement
              key={elem.id}
              data={elem}
              type={type}
              isLocked={true}
              text={elem.name + title}
              price={elem.price}
              thumbnail={elem.image}
            />
          ))
      )}
    </div>
  );
};

BoardBun.propTypes = {
  items: PropTypes.array.isRequired,
  board: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default BoardBun;
