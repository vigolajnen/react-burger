import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE
} from '../constants/index';
import { TWSActions } from '../actions/wsActions';
import { FeedOrder } from '../types/live-orders';

export type TSocketState = {
  wsConnected: boolean;
  orders: Array<FeedOrder>;
  total: number;
  totalToday: number;
  error: boolean;
  errMessage: string | null;
};

const initialState: TSocketState = {
  wsConnected: false,
  orders: [],
  total: 0,
  totalToday: 0,
  error: false,
  errMessage: null
};

export const wsReducer = (state = initialState, action: TWSActions): TSocketState => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS: 
      return {
        ...state,
        error: false,
        wsConnected: true
      };
    case WS_CONNECTION_ERROR:
      return {
        ...state,
        error: true,
        errMessage: action.payload,
        wsConnected: false
      };
    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        error: false,
        wsConnected: false
      };
    case WS_GET_MESSAGE:
      return {
        ...state,
        error: false,
        orders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday
      };
    default:
      return state;
  }
};
