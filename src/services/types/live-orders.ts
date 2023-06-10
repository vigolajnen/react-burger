export enum WebsocketStatus {
  CONNECTING = 'CONNECTIOG...',
  ONLINE = 'ONLINE',
  OFFLINE = 'OFLINE',
}

export interface FeedOrder {
  _id: string;
  ingredients: Array<string>;
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
}

export interface FeedOrders {
  orders: Array<FeedOrder>;
  total: number;
  totalToday: number;
}
