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

export type TUser = {
  name?: string;
  email?: string;
  password?: string;
};

export type TUserRequest = {
  name: string;
  email: string;
  token: string;
};

export type TResetPassword = {
  password: string;
  token: string;
}

export type TOrder = {
  readonly _id: string;
  readonly ingredients: Array<string>;
  readonly status: string;
  readonly name: string;
  readonly createdAt: string | number | Date;
  readonly updatedAt: string;
  readonly number: number;
}
