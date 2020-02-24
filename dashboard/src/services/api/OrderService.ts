import HttpService from './HttpService';

export class OrderService extends HttpService {
  getOrders() {
    return this.fetch('/orders');
  }

  getOrder(orderId: number) {
    return this.fetch(`/orders/${orderId}`);
  }

  createOrder() {
    return this.create(`/orders`, { itemIds: [1] });
  }
}

export default OrderService;