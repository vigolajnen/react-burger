import {
  registerRequest,
  loginRequest,
  refreshTokenRequest,
  logoutRequest,
  getUserRequest,
  signOutRequest,
} from '../api-auth';

import { TUserRequest, TUser, TUserData } from '../../utils/types';
import {
  GET_REGISTR_REQUEST,
  GET_REGISTR_SUCCESS,
  GET_REGISTR_FAILED,
  GET_LOGOUT_REQUEST,
  GET_LOGOUT_SUCCESS,
  GET_LOGOUT_FAILED,
  GET_LOGIN_REQUEST,
  GET_LOGIN_SUCCESS,
  GET_LOGIN_FAILED,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  REFRESH_TOKEN_REQUEST,
  REFRESH_TOKEN_SUCCESS,
  REFRESH_TOKEN_FAILED,
} from '../constants';
import { AppDispatch } from '../types';
import { deleteCookie, getCookie, setCookie } from '../utils';

// Типизация экшенов
export interface IGetRegistrRequestAction {
  readonly type: typeof GET_REGISTR_REQUEST;
}
export interface IGetRegistrSuccessAction {
  readonly type: typeof GET_REGISTR_SUCCESS;
  readonly user: TUser;
  readonly token: string;
  readonly refreshToken: string;
}
export interface IGetRegistrFailedAction {
  readonly type: typeof GET_REGISTR_FAILED;
}
export interface IGetLogoutRequestAction {
  readonly type: typeof GET_LOGOUT_REQUEST;
}
export interface IGetLogoutSuccessAction {
  readonly type: typeof GET_LOGOUT_SUCCESS;
  readonly payload: string;
}
export interface IGetLogoutFailedAction {
  readonly type: typeof GET_LOGOUT_FAILED;
}
export interface IGetLoginRequestAction {
  readonly type: typeof GET_LOGIN_REQUEST;
}
export interface IGetLoginSuccessAction {
  readonly type: typeof GET_LOGIN_SUCCESS;
  payload: any;
}
export interface IGetLoginFailedAction {
  readonly type: typeof GET_LOGIN_FAILED;
}
export interface IGetUserRequestAction {
  readonly type: typeof GET_USER_REQUEST;
}
export interface IGetUserSuccessAction {
  readonly type: typeof GET_USER_SUCCESS;
  user: TUserRequest;
}
export interface IGetUserFailedAction {
  readonly type: typeof GET_USER_FAILED;
}
export interface IRefreshTokenRequestAction {
  readonly type: typeof REFRESH_TOKEN_REQUEST;
}
export interface IRefreshTokenSuccessAction {
  readonly type: typeof REFRESH_TOKEN_SUCCESS;
  payload: TUserData;
}
export interface IRefreshTokenFailedAction {
  readonly type: typeof REFRESH_TOKEN_FAILED;
}

// Объединяем в Union
export type TUserActions =
  | IGetRegistrRequestAction
  | IGetRegistrSuccessAction
  | IGetRegistrFailedAction
  | IGetLogoutRequestAction
  | IGetLogoutSuccessAction
  | IGetLogoutFailedAction
  | IGetLoginRequestAction
  | IGetLoginSuccessAction
  | IGetLoginFailedAction
  | IGetUserRequestAction
  | IGetUserSuccessAction
  | IGetUserFailedAction
  | IRefreshTokenRequestAction
  | IRefreshTokenSuccessAction
  | IRefreshTokenFailedAction;

export const userLoginRequest = (): IGetLoginRequestAction => ({
  type: GET_LOGIN_REQUEST,
});
export const userLoginSuccess = (
  payload: TUserData,
): IGetLoginSuccessAction => ({
  type: GET_LOGIN_SUCCESS,
  payload,
});

export const userLoginFailed = (): IGetLoginFailedAction => ({
  type: GET_LOGIN_FAILED,
});

export const userLogoutRequest = (): IGetLogoutRequestAction => ({
  type: GET_LOGOUT_REQUEST,
});
export const userLogoutSuccess = (token: string): IGetLogoutSuccessAction => ({
  type: GET_LOGOUT_SUCCESS,
  payload: token,
});

export const userLogoutFailed = (): IGetLogoutFailedAction => ({
  type: GET_LOGOUT_FAILED,
});

export const getUserDataRequest = (): IGetUserRequestAction => ({
  type: GET_USER_REQUEST,
});
export const getUserDataSuccess = (
  user: TUserRequest,
): IGetUserSuccessAction => ({
  type: GET_USER_SUCCESS,
  user,
});

export const getUserDataFailed = (): IGetUserFailedAction => ({
  type: GET_USER_FAILED,
});

export const refreshAccessTokenRequest = (): IRefreshTokenRequestAction => ({
  type: REFRESH_TOKEN_REQUEST,
});
export const refreshAccessTokenSuccess = (
  payload: TUserData,
): IRefreshTokenSuccessAction => ({
  type: REFRESH_TOKEN_SUCCESS,
  payload,
});
export const refreshAccessTokenFailed = (): IRefreshTokenFailedAction => ({
  type: REFRESH_TOKEN_FAILED,
});

export const userLogin = (state: TUser) => (dispatch: AppDispatch) => {
  dispatch(userLoginRequest());
  return loginRequest(state)
    .then((res) => {
      setCookie('refreshToken', res.refreshToken);
      setCookie('token', res.accessToken.split('Bearer ')[1]);

      dispatch(userLoginSuccess(res));
    })
    .catch((err) => {
      console.log(err);
      dispatch(userLoginFailed());
    });
};

export const userRegister = (state: TUser) => (dispatch: AppDispatch) => {
  dispatch({
    type: GET_REGISTR_REQUEST,
  });
  return registerRequest(state)
    .then((res) => {
      dispatch({
        type: GET_REGISTR_SUCCESS,
        user: res.user,
        token: res.accessToken,
        refreshToken: res.refreshToken,
      });

      setCookie('refreshToken', res.refreshToken);
      setCookie('token', res.accessToken.split('Bearer ')[1]);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: GET_REGISTR_FAILED,
      });
    });
};

export const userLogout =
  (token: string | undefined) => (dispatch: AppDispatch) => {
    dispatch(userLogoutRequest);
    // signOutRequest(token);
    // return logoutRequest()
    //   .then(() => {
    //     dispatch(userLogoutSuccess());
    //     deleteCookie('token');
    //     deleteCookie('refreshToken');
//   })
    signOutRequest(token)
    return logoutRequest()
      .then((res) => {
        if (res) {
          dispatch(userLogoutSuccess(res));
          deleteCookie("token");
          deleteCookie("refreshToken");
          
        }
      })
      .catch((err) => {
        alert(err);
        // console.log(err);
        dispatch(userLogoutFailed);
      });
  };

export const getUser = () => (dispatch: AppDispatch) => {
  dispatch(getUserDataRequest());

  return getUserRequest()
    .then((res) => {
      dispatch(getUserDataSuccess(res));
    })
    .catch((err) => {
      alert(err);
      // console.log(err);
      dispatch(getUserDataFailed());

      dispatch(refreshToken());
    });
};

export const refreshToken = () => (dispatch: AppDispatch) => {
  dispatch(refreshAccessTokenRequest());
  return refreshTokenRequest()
    .then((res) => {
      dispatch(refreshAccessTokenSuccess(res));
      setCookie('refreshToken', res.refreshToken);
      setCookie('token', res.accessToken.split('Bearer ')[1]);
      dispatch(getUser());
    })
    .catch((err) => {
      dispatch(refreshAccessTokenFailed());
      alert(err);
      // console.error(err);
    });
};
