import { v4 as uuid } from 'uuid';
import { TIngredient } from '../../utils/types';

import {
  SORT_CONSTRUCTOR_ITEMS,
  DELETE_CONSTRUCTOR_ITEM,
  ADD_CONSTRUCTOR_ITEM,
  CLEAR_CONSTRUCTOR_ITEM,
} from '../constants';

// Типизация экшенов
export interface ISortConstructorItemsAction {
  readonly type: typeof SORT_CONSTRUCTOR_ITEMS;
  readonly payload: any;
}

export interface IDeleteConstructorItemAction {
  readonly type: typeof DELETE_CONSTRUCTOR_ITEM;
  readonly payload: number;
}

export interface IAddConstructorItemAction {
  readonly type: typeof ADD_CONSTRUCTOR_ITEM;
  readonly payload: any;
}
export interface IClearConstructorItemAction {
  readonly type: typeof CLEAR_CONSTRUCTOR_ITEM;
}

// Объединяем в Union
export type TConstructorItemsActions =
  | ISortConstructorItemsAction
  | IDeleteConstructorItemAction
  | IAddConstructorItemAction
  | IClearConstructorItemAction;

export const AddConstructorItemAction = (
  item: TIngredient,
): IAddConstructorItemAction => ({
  type: ADD_CONSTRUCTOR_ITEM,
  payload: {
    ...item,
    id: uuid(),
  },
});

export const ClearConstructorItemAction = (): IClearConstructorItemAction => ({
  type: CLEAR_CONSTRUCTOR_ITEM,
});
