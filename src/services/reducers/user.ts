import {
  GET_REGISTR_REQUEST,
  GET_REGISTR_SUCCESS,
  GET_REGISTR_FAILED,
  GET_LOGIN_REQUEST,
  GET_LOGIN_SUCCESS,
  GET_LOGIN_FAILED,
  GET_LOGOUT_REQUEST,
  GET_LOGOUT_SUCCESS,
  GET_LOGOUT_FAILED,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  REFRESH_TOKEN_REQUEST,
  REFRESH_TOKEN_SUCCESS,
  REFRESH_TOKEN_FAILED,
} from '../constants';

import { TUserActions } from '../actions/user';

export type TUserItemsState = {
  user: any,
  token: any,
  refreshToken: any,
  isAuth: Boolean,
  userRequest: Boolean,
  userFailed: Boolean,
  refreshTokenRequest: Boolean,
};

const initialState: TUserItemsState = {
  user: null,
  token: null,
  refreshToken: null,
  isAuth: false,
  userRequest: false,
  userFailed: false,
  refreshTokenRequest: false,
};

export const userReducer = (state = initialState, action: TUserActions) => {
  switch (action.type) {
    case GET_REGISTR_REQUEST: {
      return {
        ...state,
        userRequest: true,
      };
    }
    case GET_REGISTR_SUCCESS: {
      return {
        ...state,
        userFailed: false,
        user: action.user,
        token: action.token,
        refreshToken: action.refreshToken,
        isAuth: !state.isAuth,
        userRequest: false,
      };
    }
    case GET_REGISTR_FAILED: {
      return { ...state, userFailed: true, userRequest: false };
    }
    case GET_LOGIN_REQUEST: {
      return {
        ...state,
        userRequest: true,
      };
    }
    case GET_LOGIN_SUCCESS: {
      return {
        ...state,
        userFailed: false,
        user: action.user,
        token: action.token,
        refreshToken: action.refreshToken,
        isAuth: !state.isAuth,
        userRequest: false,
      };
    }
    case GET_LOGIN_FAILED: {
      return { ...state, userFailed: true, userRequest: false };
    }
    case GET_LOGOUT_REQUEST: {
      return {
        ...state,
        userRequest: true,
      };
    }
    case GET_LOGOUT_SUCCESS: {
      return {
        ...state,
        userFailed: false,
        userRequest: false,
        user: null,
        token: null,
        refreshToken: null,
        isAuth: false,
      };
    }
    case GET_LOGOUT_FAILED: {
      return { ...state, userFailed: true, userRequest: false };
    }
    case GET_USER_REQUEST: {
      return {
        ...state,
        userRequest: true,
      };
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        user: action.user,
        isAuth: true,
        userFailed: false,
        userRequest: false,
      };
    }
    case GET_USER_FAILED: {
      return { ...state, isAuth: false, userFailed: true, userRequest: false };
    }
    case REFRESH_TOKEN_REQUEST: {
      return {
        ...state,
        refreshTokenRequest: true,
      };
    }
    case REFRESH_TOKEN_SUCCESS: {
      return {
        ...state,
        isAuth: true,
        refreshTokenRequest: false,
      };
    }
    case REFRESH_TOKEN_FAILED: {
      return {
        ...state,
        isAuth: false,
        refreshTokenRequest: false,
      };
    }
    default: {
      return state;
    }
  }
};
