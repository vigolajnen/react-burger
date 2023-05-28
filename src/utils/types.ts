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
  email: string;
  password: string;
};

export type TUserRequest = {
  name: string;
  email: string;
  token: string;
};
