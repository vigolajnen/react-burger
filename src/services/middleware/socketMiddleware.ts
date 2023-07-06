import { Middleware } from 'redux';
import { IWebSocket } from '../actions/wsActions';
import { getCookie } from '../utils';

export const socketMiddleware = (wsActions: IWebSocket): Middleware => {
  return (store) => {
    let socket: WebSocket | null = null;
    let url = undefined;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsStart, onOpen, onError, onClose, onMessage, wsSend } =
        wsActions;
      const isAuth = getCookie('token') === undefined;
      const accessToken = getCookie('token');

      if (type === wsStart) {
        if (isAuth) {
          if (!!accessToken) {
            url = payload;
            socket = new WebSocket(`${url}?token=${accessToken}`);
          }
          url = payload;
          socket = new WebSocket(url);
        } else {
          url = payload;
          socket = new WebSocket(url);
        }
      }

      if (socket) {
        // функция - вызывается при открытии сокета
        socket.onopen = (event) => {
          dispatch({ type: onOpen, payload: event });
        };
        // функция - вызывается при ошибке соединения
        socket.onerror = (event) => {
          dispatch({ type: onError, payload: event });
        };
        // функция - вызывается при получении события от сервера
        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          dispatch({ type: onMessage, payload: parsedData });
        };
        // функция - вызывается при закрытии соединения
        socket.onclose = (event) => {
          dispatch({ type: onClose, payload: event });
        };

        if (type === wsSend) {
          const message = payload;
          socket.send(JSON.stringify(message));
        }
      }

      next(action);
    };
  };
};
