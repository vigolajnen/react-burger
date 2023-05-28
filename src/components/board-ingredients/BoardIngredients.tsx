import React, { useCallback } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import { addItemConstructor } from '../../services/actions/constructor-items';
import DragIngredient from '../drag-ingredient/DragIngredient';
import { TIngredient } from '../../utils/types';

type Props = {
  board: string;
  classIngredients: string;
  items: Array<TIngredient>;
}

const BoardIngredients = ({ board, classIngredients, items }: Props) => {
  const dispatch = useDispatch();
  const { ingredients } = useSelector((state: any) => state.ingredients);

  const [{ isHover }, drop] = useDrop({
    accept: 'ingredients',
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop: (itemId: TIngredient) => {
      dispatch(
        addItemConstructor(
          ingredients.filter((item: TIngredient) => item._id === itemId.id)[0],
        ),
      );
    },
  });

  const border = isHover ? '2px solid lightgreen' : '2px solid transparent';

  return (
    <div ref={drop} data-board={board} style={{ border }}>
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

export default BoardIngredients;
