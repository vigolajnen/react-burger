import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import {
  DELETE_CONSTRUCTOR_ITEM,
  SORT_CONSTRUCTOR_ITEMS,
} from '../../services/actions/constructor-items';
import { useDispatch } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';

const DragIngredient = ({ item, id, index, count }) => {
  const dispatch = useDispatch();
  const ref = useRef(null);

  const [{ handlerId }, drop] = useDrop({
    accept: 'sortItems',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      dispatch({
        type: SORT_CONSTRUCTOR_ITEMS,
        payload: {
          from: dragIndex,
          to: hoverIndex,
        },
      });
      item.index = hoverIndex;
    },
  });

  // const [{ isDrag }, dragRef] = useDrag({
  //   type: 'ingredients',
  //   item: () => {
  //     return { id };
  //   },
  //   collect: (monitor) => ({
  //     isDrag: monitor.isDragging(),
  //   }),
  // });

  const [{ isDrag }, dragRef] = useDrag({
    type: 'sortItems',
    item: () => {
      return { item, index };
    },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });
  dragRef(drop(ref));

  return (
    !isDrag && (
      <div ref={ref} style={{ cursor: 'move' }} id={id} data-id={ handlerId }>
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
