import { FeedOrder } from '../services/types/live-orders';
import { TIngredient } from './types';

function getNumberOfDays(orderDay: string) { 
  const dateOrder = new Date(orderDay); 
  const date = new Date(); 
  
  // One day in milliseconds 
  const oneDay = 1000 * 60 * 60 * 24; 
  
  // Calculating the time difference between two dates 
  const diffInTime = date.getTime() - dateOrder.getTime(); 
  
  // Calculating the no. of days between two dates 
  const diffInDays = Math.round(diffInTime / oneDay); 
  
  return diffInDays; 
  } 

export const dayFormat = (orderDay: string) => {
  const time = orderDay.slice(11, 16);
  const resCountDay = getNumberOfDays(orderDay);

  if (resCountDay === 0) {
    return `Сегодня, ${time}`;
  } else if (resCountDay === 1) {
    return `${resCountDay} день назад,  ${time}`;
  } else if (resCountDay === 2 || resCountDay === 3 || resCountDay === 4) {
    return `${resCountDay} дня назад,  ${time}`;
  }
  return `${resCountDay} дней назад, ${time}`;
};

export const countProduct = (arr: Array<TIngredient>, max: number) => {
  let count = 0;
  if (arr.length > max) {
    count = arr.length - max;
  }
  return count;
};

export const resPrice = (arr: Array<TIngredient>) => {
  const sum: number = arr.reduce(
    (a: number, b: TIngredient) => a + (Number(b?.price) || 0),
    0,
  );
  return sum;
};

export const orderIngredients = (
  order: FeedOrder,
  ingredients: TIngredient[],
) => {
  const items: Array<TIngredient> = [];
  order?.ingredients.forEach((itemId: any) => {
    ingredients.find((item: TIngredient) => {
      if (item._id === itemId) {
        items.push(item);
      }
    });
  });

  return items;
};

export const allOrderIngredients = (items: TIngredient[]) => {
  const orderBun: TIngredient = items.find((el) => el.type === 'bun')!;
  const orderIngs = items.filter((el) => el.type !== 'bun');
  return [orderBun, orderBun, ...orderIngs];
};

export const orderStatus = (status: string) => {
  if (status === 'done') {
    return 'Выполнено';
  } else if ((status = 'created')) {
    return 'Создан';
  }
  return 'Готовится';
};
