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
  SET_FORGOT_PASSWORD,
} from '../constants';

import { userReducer, initialState } from './user';

describe('user', () => {
  it('test should return initial state', () => {
    expect(userReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('test should handle GET_REGISTR_REQUEST', () => {
    const currentInitialState = {
      ...initialState,
      userRequest: true,
    };
    const action = { type: GET_REGISTR_REQUEST };
    expect(userReducer(initialState, action)).toEqual(currentInitialState);
  });

  it('test should handle GET_REGISTR_SUCCESS', () => {
    const data = { email: 'test@tt.ru', name: 'test' };
    const currentInitialState = {
      ...initialState,
      user: data,
      // token: initialState.token,
      // refreshToken: initialState.refreshToken,
      isAuth: true,
      userRequest: false,
      userFailed: false,
    };

    const action = {
      type: GET_REGISTR_SUCCESS,
      user: data,
    };

    expect(userReducer(initialState, action)).toEqual(currentInitialState);
  });

  it('test should handle GET_REGISTR_FAILED', () => {
    const currentInitialState = {
      ...initialState,
      userFailed: true,
      userRequest: false,
    };
    const action = { type: GET_REGISTR_FAILED };
    expect(userReducer(initialState, action)).toEqual(currentInitialState);
  });

  it('test should handle GET_LOGIN_FAILED', () => {
    const currentInitialState = {
      ...initialState,
      userFailed: true,
      userRequest: false,
    };
    const action = { type: GET_LOGIN_FAILED };
    expect(userReducer(initialState, action)).toEqual(currentInitialState);
  });

  it('test should handle GET_LOGIN_REQUEST', () => {
    const currentInitialState = {
      ...initialState,
      userRequest: true,
    };
    const action = { type: GET_LOGIN_REQUEST };
    expect(userReducer(initialState, action)).toEqual(currentInitialState);
  });

  it('test should handle GET_LOGIN_SUCCESS', () => {
    const data = { email: 'test@tt.ru', name: 'test' };
    const payload = {
      user: data,
    };
    const currentInitialState = {
      ...initialState,
      user: data,
      isAuth: true,
      userRequest: false,
      userFailed: false,
      isLoggedIn: true,
    };
    const action = { type: GET_LOGIN_SUCCESS, payload };
    expect(userReducer(initialState, action)).toEqual(currentInitialState);
  });
  it('test should handle GET_LOGOUT_REQUEST', () => {
    const currentInitialState = {
      ...initialState,
      userRequest: true,
    };
    const action = { type: GET_LOGOUT_REQUEST };
    expect(userReducer(initialState, action)).toEqual(currentInitialState);
  });

  it('test should handle GET_LOGOUT_FAILED', () => {
    const currentInitialState = {
      ...initialState,
      userFailed: true,
      userRequest: false,
    };
    const action = { type: GET_LOGOUT_FAILED };
    expect(userReducer(initialState, action)).toEqual(currentInitialState);
  });

  it('test should handle GET_LOGOUT_SUCCESS', () => {
    const currentInitialState = {
      ...initialState,
      userFailed: false,
      userRequest: false,
      user: null,
      token: null,
      refreshToken: null,
      isAuth: false,
      isLoggedIn: false,
    };
    const action = { type: GET_LOGOUT_SUCCESS };
    expect(userReducer(initialState, action)).toEqual(currentInitialState);
  });

  it('test should handle GET_USER_REQUEST', () => {
    const currentInitialState = {
      ...initialState,
      userRequest: true,
      isLoggedIn: true,
    };
    const action = { type: GET_USER_REQUEST };
    expect(userReducer(initialState, action)).toEqual(currentInitialState);
  });

  it('test should handle GET_USER_FAILED', () => {
    const currentInitialState = {
      ...initialState,
      isAuth: false,
      userFailed: true,
      userRequest: false,
      isLoggedIn: false,
    };
    const action = { type: GET_USER_FAILED };
    expect(userReducer(initialState, action)).toEqual(currentInitialState);
  });

  it('test should handle GET_USER_SUCCESS', () => {
    const data = { email: 'test@tt.ru', name: 'test' };
    const currentInitialState = {
      ...initialState,
      user: data,
      isAuth: true,
      userFailed: false,
      userRequest: false,
      isLoggedIn: true,
    };
    const action = { type: GET_USER_SUCCESS, user: data };
    expect(userReducer(initialState, action)).toEqual(currentInitialState);
  });

  it('test should handle REFRESH_TOKEN_REQUEST', () => {
    const currentInitialState = {
      ...initialState,
      refreshTokenRequest: true,
    };
    const action = { type: REFRESH_TOKEN_REQUEST };
    expect(userReducer(initialState, action)).toEqual(currentInitialState);
  });

  it('test should handle REFRESH_TOKEN_FAILED', () => {
    const currentInitialState = {
      ...initialState,
      isAuth: false,
      refreshTokenRequest: false,
    };
    const action = { type: REFRESH_TOKEN_FAILED };
    expect(userReducer(initialState, action)).toEqual(currentInitialState);
  });

  it('test should handle REFRESH_TOKEN_SUCCESS', () => {
    const currentInitialState = {
      ...initialState,
      isAuth: true,
      isLoggedIn: true,
      refreshTokenRequest: false,
    };
    const action = { type: REFRESH_TOKEN_SUCCESS };
    expect(userReducer(initialState, action)).toEqual(currentInitialState);
  });

  it('test should handle SET_FORGOT_PASSWORD', () => {
    const currentInitialState = {
      ...initialState,
      isPageForgotPass: true
    };
    const action = { type: SET_FORGOT_PASSWORD, payload: true };
    expect(userReducer(initialState, action)).toEqual(currentInitialState);
  });
});
