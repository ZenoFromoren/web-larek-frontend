export interface IProduct {
  id: string;
  title: string;
  image: string;
  price: number | null;
  category: string;
  description: string;
}

export interface IBasket {
  items: string[];
  total: number;
}

export interface IOrder {
  payment: 'card' | 'cash';
  email: string;
  phone: string;
  address: string;
  total: number | null;
  items: string[];
}

export type OrderForm = Omit<IOrder, 'total' | 'items'>;

export interface IOrderResult {
  id: string;
  total: number;
}

export interface IContacts {
  email: string;
  phone: string;
}