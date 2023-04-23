import React from 'react';
import PropTypes from 'prop-types';
import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { DELETE_CONSTRUCTOR_ITEM } from '../../services/actions/constructor-items';

const BurgerConstructorIngredient = ({ item }) => {
  const dispatch = useDispatch();

  const [{ isDrag }, dragRef] = useDrag({
    type: 'ingredients',
    item: item.id,
    collect: (monitor) => ({
      item: monitor.getItem(),
      isDrag: monitor.isDragging(),
    }),
  });

  const deleteItemHandel = () => {
    dispatch({
      type: DELETE_CONSTRUCTOR_ITEM,
    });
  };

  return (
    !isDrag && (
      <div ref={dragRef}>
        <DragIcon type='primary' />
        <ConstructorElement
          id={item._id}
          text={item.name}
          price={item.price}
          thumbnail={item.image}
          board='ingredients'
          onClick={deleteItemHandel}
        />
      </div>
    )
  );
};

BurgerConstructorIngredient.propTypes = {
  // item: PropTypes.object.isRequired,
};

export default BurgerConstructorIngredient;
