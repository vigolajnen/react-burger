const URL_DATA = 'https://norma.nomoreparties.space/api/ingredients';
const URL_ORDERS_DATA = 'https://norma.nomoreparties.space/api/orders';

export const getIngredientsRequest = async () => {
  return await new Promise(resolve =>
    setTimeout(() => {
      resolve({
        success: true,
        data: fetch(URL_DATA),
      });
    }, 1500),
  );
};

export const getOrdersRequest = async () => {
  return await new Promise(resolve =>
    setTimeout(() => {
      resolve({
        success: true,
        data: fetch(URL_ORDERS_DATA),
      });
    }, 1500),
  );
};
