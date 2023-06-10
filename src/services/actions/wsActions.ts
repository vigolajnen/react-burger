import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE,
} from '../constants';
import { FeedOrder, FeedOrders } from '../types/live-orders';

export interface IWebSocket {
  wsStart: string;
  onOpen: string;
  onError: string;
  onClose: string;
  onMessage: string;
  wsSend: string;
}

export interface IWsMessage {
  orders: Array<FeedOrder>;
  success: boolean;
  total: number;
  totalToday: number;
}

export interface IWsConnectionStart {
  readonly type: typeof WS_CONNECTION_START;
  readonly payload: string;
}

export interface IWsConnectionSuccess {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}

export interface IWsConnectionError {
  readonly type: typeof WS_CONNECTION_ERROR;
  readonly payload: string;
}

export interface IWsConnectionClosed {
  readonly type: typeof WS_CONNECTION_CLOSED;
}

export interface IWsSendMessage {
  readonly type: typeof WS_SEND_MESSAGE;
}

export interface IWsGetMessage {
  readonly type: typeof WS_GET_MESSAGE;
  readonly payload: IWsMessage;
}

export type TWSActions =
  | IWsGetMessage
  | IWsSendMessage
  | IWsConnectionStart
  | IWsConnectionSuccess
  | IWsConnectionClosed
  | IWsConnectionError;

export const wsConnectionStart = (url: string): IWsConnectionStart => ({
  type: WS_CONNECTION_START,
  payload: url,
});

export const wsConnectionSuccess = (): IWsConnectionSuccess => ({
  type: WS_CONNECTION_SUCCESS,
});

export const wsConnectionError = (error: string): IWsConnectionError => ({
  type: WS_CONNECTION_ERROR,
  payload: error,
});

export const wsConnectionClosed = (): IWsConnectionClosed => ({
  type: WS_CONNECTION_CLOSED,
});

export const wsGetMessage = (message: IWsMessage): IWsGetMessage => ({
  type: WS_GET_MESSAGE,
  payload: message,
});
