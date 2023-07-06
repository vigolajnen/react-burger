import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  GET_ORDER_PRICE,
  UPDATE_ORDERS,
} from '../constants';
import { TOrder } from '../../utils/types';
import { TGetOrderActions } from '../actions/order';

export type TGetOrderState = {
  orders: any;
  order: TOrder | null;
  orderPrice: number;
  orderRequest: Boolean;
  orderFailed: Boolean;
};

const initialState: TGetOrderState = {
  orders: [],
  order: null,
  orderPrice: 0,
  orderRequest: false,
  orderFailed: false,
};

export const orderReducer = (
  state = initialState,
  action: TGetOrderActions,
) => {
  switch (action.type) {
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
      };
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        orderFailed: false,
        orders: action.orders,
        order: action.orders.order,
        orderRequest: false,
      };
    }
    case GET_ORDER_FAILED: {
      return { ...state, orderFailed: true, orderRequest: false };
    }
    case GET_ORDER_PRICE: {
      return {
        ...state,
        orderPrice: action.orderPrice,
      };
    }
    case UPDATE_ORDERS: {
      return {
        ...state,
        orders: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
