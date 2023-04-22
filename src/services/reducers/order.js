import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  GET_ORDER_PRICE,
} from '../actions/order';

const initialState = {
  order: null,
  orderPrice: 0,
  orderRequest: false,
  orderFailed: false,
  orderIngredients: [],
  orderBun: [],
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
        order: action.ingredients,
        orderRequest: false,
      };
    }
    case GET_ORDER_FAILED: {
      return { ...state, orderFailed: true, orderRequest: false };
    }
    case GET_ORDER_PRICE: {
      return {
        ...state,
        orderPrice: action.orderPrice
      };
    }
    default: {
      return state;
    }
  }
};
