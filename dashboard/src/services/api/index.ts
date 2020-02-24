import { OrderService } from './OrderService';

const orderService = new OrderService('http://localhost:3000');

export {
  orderService
}