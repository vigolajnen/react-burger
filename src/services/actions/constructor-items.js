import { v4 as uuid } from 'uuid';

export const UPDATE_CONSTRUCTOR_ITEMS = 'UPDATE_CONSTRUCTOR_ITEMS';
export const DELETE_CONSTRUCTOR_ITEM = 'DELETE_CONSTRUCTOR_ITEM';
export const ADD_CONSTRUCTOR_ITEM = 'ADD_CONSTRUCTOR_ITEM';

export const addItemConstructor = item => {
  return {
    type: ADD_CONSTRUCTOR_ITEM,
    payload: {
      ...item,
      id: uuid(),
    },
  };
};
