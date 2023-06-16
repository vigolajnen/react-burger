export type TIngredient = {
  _id: string;
  id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v?: number;
  productId: string;
};

export type TIngredientId = Omit<TIngredient, '_id'> & {
  _id: number;
};

export type TUser = {
  name?: string;
  email?: string;
  password?: string;
};

export type TUserData = {
  accessToken: string;
  refreshToken: string;
  user: TUser;
};

export type TUserRequest = {
  name: string;
  email: string;
  token: string;
};

export type TResetPassword = {
  password: string;
  token: string;
};

export type TOrder = {
  _id: string;
  ingredients: Array<string>;
  status: string;
  name: string;
  createdAt: string | number | Date;
  updatedAt: string;
  number: number;
};

export type TOrders = {
  order: {
    _id: string;
    ingredients: Array<string>;
    status: string;
    name: string;
    createdAt: string | number | Date;
    updatedAt: string;
    number: number;
  };
};
