import React from 'react';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import { addItemConstructor } from '../../services/actions/constructor-items';
import { TIngredient } from '../../utils/types';

type Props = {
  board: string;
  title: string;
  type: string;
  classBun: string;
  items: Array<TIngredient>;
}

const BoardBun = ({ board, title, type, classBun, items }: Props) => {
  const dispatch = useDispatch();

  const { ingredients } = useSelector((state: any) => state.ingredients);

  const [{ isHover, canDrop }, drop] = useDrop({
    accept: 'ingredients',
    collect: (monitor) => ({
      isHover: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
    drop: (itemId: TIngredient) => {
      dispatch(
        addItemConstructor(
          ingredients.filter((item: TIngredient) => item._id === itemId.id)[0],
        ),
      );
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
    <div ref={drop} data-board={board} style={{ border: getBackgroundColor() }}>
      {items.length === 0 ? (
        <div className={classBun}>Выберите булку</div>
      ) : (
        items.map((elem: TIngredient) => (
          <ConstructorElement
            key={elem.id}
            data-elem={elem}
            data-type={type}
            isLocked={true}
            text={elem.name + title}
            price={elem.price}
            thumbnail={elem.image}
            data-id={elem._id}
          />
        ))
      )}
    </div>
  );
};


export default BoardBun;
