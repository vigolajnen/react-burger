import React from 'react';

import { useSelector, useDispatch } from '../../hooks';
import { useDrop } from 'react-dnd';
import { AddConstructorItemAction } from '../../services/actions/constructor-items';
import DragIngredient from '../drag-ingredient/DragIngredient';
import { TIngredient } from '../../utils/types';

type Props = {
  board: string;
  classIngredients: string;
  items: Array<TIngredient> | any;
}

const BoardIngredients = ({ board, classIngredients, items }: Props) => {
  const dispatch = useDispatch();
  const { ingredients } = useSelector((state) => state.ingredients);

  const [{ isHover }, drop] = useDrop({
    accept: 'ingredients',
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop: (itemId: TIngredient) => {
      dispatch(
        AddConstructorItemAction(
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
        items.map((elem: TIngredient, index: number) => (
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
