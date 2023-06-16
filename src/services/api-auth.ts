// import { getCookie, deleteCookie, setCookie } from './utils';
import { generalRequest } from './api';
import { TUser, TResetPassword } from '../utils/types';
import { getUser } from './actions/user';
import { AppDispatch } from './types';
import { getCookie } from './utils';

export const loginRequest = async ({ email, password }: TUser) => {
  return await generalRequest(`auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({ email: email, password }),
  });
};
// localStorage.getItem('refreshToken')
export const logoutRequest = () => {
  return generalRequest(`auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      token: getCookie('refreshToken'),
    }),
  });
};

export const registerRequest = async ({ email, password, name }: TUser) => {
  return await generalRequest(`auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({ email, password, name }),
  });
};

export const getUserRequest = () => {
  return generalRequest(`auth/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: 'Bearer ' + getCookie('token'),
    },
  });
};

export const updateUserData = (data: { email: string; name: string }) => {
  return generalRequest(`auth/user`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: 'Bearer ' + getCookie('token'),
    },
    body: JSON.stringify(data),
  });
};

export const updateUserRequest = (token: string) => {
  return (dispatch: AppDispatch) => {
    generalRequest(`auth/user`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(dispatch(getUser())),
    });
  };
};
// localStorage.getItem('refreshToken')
export const refreshTokenRequest = () => {
  return generalRequest(`auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      token: getCookie('token'),
    }),
  });
};

export const forgotPasswordRequest = (email: string) => {
  return generalRequest(`password-reset`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify({ email: email }),
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  });
};

export const resetPasswordRequest = ({ password, token }: TResetPassword) => {
  return generalRequest(`password-reset/reset`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify({ password: password, token: token }),
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  });
};
