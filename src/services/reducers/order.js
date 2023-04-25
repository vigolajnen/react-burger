import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  GET_ORDER_PRICE,
  UPDATE_ORDERS,
} from '../actions/order';

const initialState = {
  orders: [],
  orderPrice: 0,
  orderRequest: false,
  orderFailed: false,
};

export const orderReducer = (state = initialState, action) => {
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