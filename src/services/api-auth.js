// import { getCookie, deleteCookie, setCookie } from './utils';
import { generalRequest } from './api';

export const loginRequest = async ({ email, password }) => {
  return await generalRequest(`auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({ email: email, password }),
  });
};

export const logoutRequest = () => {
  return generalRequest(`auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken')
    }),
  });
};

export const registerRequest = async ({ email, password, name }) => {
  return await generalRequest(`auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({ email, password, name })
  });
};

export const getUserRequest = (token) => {
  return generalRequest(`auth/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: 'Bearer ' + token
    }
  });
};

export const updateUserRequest = (email, name, token) => {
  return generalRequest(`auth/user`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: 'Bearer ' + token
    },
    body: JSON.stringify({ email, name })
  });
};

export const refreshTokenRequest = () => {
  return generalRequest(`auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken')
    }),
  });
};

export const forgotPasswordRequest = (email) => {
  return generalRequest(`password-reset`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {'Content-Type': 'application/json;charset=utf-8'},
    body: JSON.stringify({ 'email': email }),
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  })
};

export const resetPasswordRequest = ({ password, token }) => {
  return generalRequest(`password-reset/reset`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {'Content-Type': 'application/json;charset=utf-8'},
    body: JSON.stringify({ 'password': password, 'token': token }),
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  });
};
