import React from 'react';
import PropTypes from 'prop-types';
import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { DELETE_CONSTRUCTOR_ITEM } from '../../services/actions/constructor-items';
import { useDispatch } from 'react-redux';
import { useDrag } from 'react-dnd';

const DragIngredient = ({ item, id, index, count }) => {
  const dispatch = useDispatch();
  const [{ isDrag }, dragRef] = useDrag({
    type: 'ingredients',
    item: () => {
      return { id };
    },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  return (
    !isDrag && (
      <div ref={dragRef} style={{ cursor: 'move' }} id={id}>
        <DragIcon type='primary' />
        <ConstructorElement
          index={index}
          text={item.name}
          price={item.price}
          thumbnail={item.image}
          count={count}
          handleClose={() =>
            dispatch({
              type: DELETE_CONSTRUCTOR_ITEM,
              payload: index,
            })
          }
        />
      </div>
    )
  );
};

DragIngredient.propTypes = {
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  item: PropTypes.object.isRequired,
};

export default DragIngredient;
