import React from 'react';
import PropTypes from 'prop-types';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import { ADD_CONSTRUCTOR_ITEM } from '../../services/actions/constructor-items';

const BoardBun = ({ board, title, type, classBun, items }) => {
  const dispatch = useDispatch();

  const { ingredients } = useSelector((state) => state.ingredients);

  const [{ isHover, canDrop }, drop] = useDrop({
    accept: 'ingredients',
    collect: (monitor) => ({
      isHover: monitor.isOver(),
      canDrop: monitor.canDrop()
    }),
    drop: (itemId) => {
      // console.log(itemId)
      dispatch({
        type: ADD_CONSTRUCTOR_ITEM,
        payload: ingredients.filter((item) => item._id === itemId.id),
      });

      // dispatch({
      //   type: UPDATE_CONSTRUCTOR_ITEMS,
      //   ...itemId,
      //   board,
      // });
    },
  });

  const getBackgroundColor = () => {
    if (isHover) {
      if (canDrop) {
        return '2px solid lightgreen';
      } else if (!canDrop) {
        return '2px solid transparent';
      }
    } else {
      return '';
    }
  };

  return (
    <div ref={drop} board={board} style={{ border: getBackgroundColor() }}>
      {items.length === 0 ? (
        <div className={classBun}>Выберите булку</div>
      ) : (
        items.map((elem) => (
          <ConstructorElement
            key={crypto.randomUUID()}
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
  classBun: PropTypes.string,
};

export default BoardBun;
