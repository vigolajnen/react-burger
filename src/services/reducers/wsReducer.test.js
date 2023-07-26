import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
} from '../constants';

import { wsReducer } from './wsReducer';

describe('ws', () => {
  const initialState = {
    wsConnected: false,
    orders: [],
    total: 0,
    totalToday: 0,
    error: false,
    errMessage: null,
  };

  it('test initial state', () => {
    expect(wsReducer(undefined, {})).toEqual({
      ...initialState,
    });
  });

  it('should handle WS_CONNECTION_SUCCESS', () => {
    const currentState = {
      ...initialState,
      error: false,
      wsConnected: true,
    };
    expect(wsReducer(undefined, { type: WS_CONNECTION_SUCCESS })).toEqual(
      currentState,
    );
  });

  it('should handle WS_CONNECTION_ERROR', () => {
    const currentState = {
      ...initialState,
      error: true,
      errMessage: undefined,
      wsConnected: false,
    };
    expect(wsReducer(undefined, { type: WS_CONNECTION_ERROR })).toEqual(
      currentState,
    );
  });
  it('should handle WS_CONNECTION_CLOSED', () => {
    const currentState = {
      ...initialState,
      error: false,
      wsConnected: false,
    };
    expect(wsReducer(undefined, { type: WS_CONNECTION_CLOSED })).toEqual(
      currentState,
    );
  });

  it('should handle WS_GET_MESSAGE', () => {
    const payload = {
      orders: [],
      total: 0,
      totalToday: 0,
    };
    const currentState = {
      ...initialState,
      orders: [],
      total: 0,
      totalToday: 0,
    };
    expect(
      wsReducer(undefined, {
        type: WS_GET_MESSAGE,
        payload
      }),
    ).toEqual(currentState);
  });
});
