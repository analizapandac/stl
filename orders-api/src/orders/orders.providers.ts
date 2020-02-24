import { Order } from './order.entity';

export const ordersProviders = [
  {
    provide: 'ORDERS_REPOSITORY',
    useValue: Order,
  },
];