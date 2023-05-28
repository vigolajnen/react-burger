import React, { useRef } from 'react';

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
import { Identifier } from 'dnd-core';
import { TIngredient } from '../../utils/types';

type Props = {
  item: TIngredient;
  index: number;
  id: string;
  count?: number;
};

const DragIngredient = ({ item, id, index, count }: Props) => {
  const dispatch = useDispatch();
  const ref = useRef<HTMLInputElement>(null);

  const [{ handlerId }, drop] = useDrop<
    Props,
    unknown,
    { handlerId: Identifier | null }
  >({
    accept: 'sortItems',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: { index: number }, monitor) {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      if (clientOffset != null) {
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;
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
    <div ref={ref} style={{ cursor: 'move' }} id={id} data-id={handlerId}>
      <DragIcon type='primary' />

      <ConstructorElement
        // index={index}
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        data-count={count}
        handleClose={() =>
          dispatch({
            type: DELETE_CONSTRUCTOR_ITEM,
            payload: index,
          })
        }
      />
    </div>
  );
};

export default DragIngredient;
