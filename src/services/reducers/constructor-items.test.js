import {
  DELETE_CONSTRUCTOR_ITEM,
  ADD_CONSTRUCTOR_ITEM,
  SORT_CONSTRUCTOR_ITEMS,
  CLEAR_CONSTRUCTOR_ITEM,
} from '../constants';

import { constructorItemsReducer } from './constructor-items';

describe('constructor', () => {
  const initialState = {
    constructorBun: [],
    constructorItems: [],
  };

  it('test initial state', () => {
    expect(constructorItemsReducer(undefined, {})).toEqual({
      ...initialState,
    });
  });

  it('sort constructor items', () => {
    const currentInitialState = {
      constructorBun: { type: 'bun', price: 20 },
      constructorItems: [
        { type: 'main', id: '12345', price: 100 },
        { type: 'sauce', id: '12678', price: 50 },
        { type: 'sauce', id: '32342', price: 70 },
      ],
    };
    const action = {
      type: SORT_CONSTRUCTOR_ITEMS,
      payload: { from: 1, to: 2 },
    };
    const result = constructorItemsReducer(currentInitialState, action);
    expect(result.constructorItems).toEqual([
      { type: 'main', id: '12345', price: 100 },
      { type: 'sauce', id: '32342', price: 70 },
      { type: 'sauce', id: '12678', price: 50 },
    ]);
  });

  it('delete constructor items', () => {
    const currentInitialState = {
      constructorBun: { type: 'bun' },
      constructorItems: [
        { type: 'main', id: '1', price: 100 },
        { type: 'sauce', id: '2', price: 50 },
      ],
    };
    const action = {
      type: DELETE_CONSTRUCTOR_ITEM,
      payload: 0,
    };

    const result = constructorItemsReducer(currentInitialState, action);

    expect(result.constructorItems.length).toBe(1);
    expect(result.constructorItems).toEqual([
      { type: 'sauce', id: '2', price: 50 },
    ]);
  });

  it('add item bun - constructor empty', () => {
    const action = {
      type: ADD_CONSTRUCTOR_ITEM,
      payload: { type: 'bun', name: 'bun_1' },
    };

    const result = constructorItemsReducer(initialState, action);

    expect(result.constructorBun).toEqual([{ type: 'bun', name: 'bun_1' }]);

    expect(result.constructorBun.length).toBe(1);
  });

  it('add item ingredient - constructor empty', () => {
    const currentInitialState = {
      constructorBun: [
        { type: 'bun', name: 'bun_1', id: '1222345', price: 20 },
      ],
      constructorItems: [
        { type: 'main', id: '12345', price: 100 },
        { type: 'sauce', id: '32342', price: 70 },
      ],
    };
    const action = {
      type: ADD_CONSTRUCTOR_ITEM,
      payload: { type: 'sauce', id: '12678', price: 50 },
    };

    const result = constructorItemsReducer(currentInitialState, action);

    expect(result.constructorItems).toEqual([
      { type: 'main', id: '12345', price: 100 },
      { type: 'sauce', id: '32342', price: 70 },
      { type: 'sauce', id: '12678', price: 50 },
    ]);
  });

  it('clear constructor item', () => {
    const currentInitialState = {
      constructorBun: { type: 'bun', price: 20 },
      constructorItems: [
        { type: 'main', id: '12345', price: 100 },
        { type: 'sauce', id: '12678', price: 50 },
        { type: 'sauce', id: '32342', price: 70 },
      ],
    };
    const action = {
      type: CLEAR_CONSTRUCTOR_ITEM,
    };
    const result = constructorItemsReducer(currentInitialState, action);
    expect(result.constructorBun).toEqual([]);
    expect(result.constructorItems).toEqual([]);
  });
});
