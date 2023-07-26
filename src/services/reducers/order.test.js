import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  GET_ORDER_PRICE,
  UPDATE_ORDERS,
} from '../constants';

import { orderReducer } from './order';

describe('order', () => {
  const initialState = {
    orders: [],
    order: null,
    orderPrice: 0,
    orderRequest: false,
    orderFailed: false,
  };

  it('order initial state', () => {
    expect(orderReducer(undefined, {})).toEqual({
      ...initialState,
    });
  });

  it('test request order', () => {
    const action = { type: GET_ORDER_REQUEST };
    expect(orderReducer(initialState, action)).toEqual({
      ...initialState,
      orderRequest: true,
    });
  });
  it('test success order', () => {
    const orders = [{ order: 1 }, { order: 2 }];
    const action = { type: GET_ORDER_SUCCESS, orders: orders };
    expect(orderReducer(initialState, action)).toEqual({
      ...initialState,
      orderFailed: false,
      orderRequest: false,
      orders: orders,
      order: orders.order,
    });
  });

  it('test failed order', () => {
    const action = { type: GET_ORDER_FAILED };
    expect(orderReducer(initialState, action)).toEqual({
      ...initialState,
      orderFailed: true,
      orderRequest: false,
    });
  });

  it('test order update', () => {
    const orders = [{ order: 1 }, { order: 2 }, { order: 3 }, { order: 4 }];
    const action = {
      type: UPDATE_ORDERS,
      payload: orders,
    };

    expect(orderReducer(initialState, action)).toEqual({
      ...initialState,
      orders: orders,
    });
  });

  it('test order price', () => {
    const orderPrice = 2100;
    const action = {
      type: GET_ORDER_PRICE,
      orderPrice: orderPrice,
    };

    expect(orderReducer(initialState, action)).toEqual({
      ...initialState,
      orderPrice: orderPrice,
    });
  });
});
