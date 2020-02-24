
import { Injectable, Inject, HttpException, HttpStatus, HttpService } from '@nestjs/common';
import { Item } from '../items/item.entity';
import { Order } from './order.entity';
import { User } from '../users/user.entity';
import { OrderItem } from './order-item.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @Inject('ORDERS_REPOSITORY') private readonly ordersRepository: typeof Order, private readonly httpService: HttpService) { }

  async findAll(): Promise<Order[]> {
    return this.ordersRepository.findAll<Order>({
      include: [User, { model: OrderItem, include: [Item] }]
    });
  }

  async findOne(id: number): Promise<Order> {
    let order = await this.ordersRepository.findOne<Order>({
      where: {
        id: id
      },
      include: [User, Item]
    });

    if (order) {
      return order;
    }
    throw new HttpException({ message: 'Order not found', statusCode: HttpStatus.NOT_FOUND }, HttpStatus.NOT_FOUND);
  }

  async create(dto: CreateOrderDto): Promise<Order> {
    const { items, total, customer_id } = dto;

    const order = {
      order_items: items,
      customer_id,
      total,
      status: 'created'
    };

    return await this.ordersRepository.create(order, { include: [OrderItem] });
  }

  async processPayment(order: Order) {
    const paymentResponse = await this.httpService.post('http://localhost:3001/payments/process', {
      "customerId": order.customer_id,
      "authToken": "3434343",
      "amount": order.total
    }).toPromise().then(response => response).catch(err => err.response);

    if (paymentResponse.status === HttpStatus.ACCEPTED) {
      return paymentResponse;
    }

    throw new HttpException(paymentResponse.data, paymentResponse.status);
  }

  async update(id: number, updatedOrderData: UpdateOrderDto) {
    let order = await this.ordersRepository.findByPk(id);
    if (order) {
      order = Object.assign(order, updatedOrderData);
      return order.save();
    }

    throw new HttpException({ message: 'Order not found', statusCode: HttpStatus.NOT_FOUND }, HttpStatus.NOT_FOUND);
  }

  async getOrderStatus(id: number) {
    let order = await this.ordersRepository.findByPk(id);
    if (order) {
      return {
        status: order.status
      };
    }
    throw new HttpException({ message: 'Order not found', statusCode: HttpStatus.NOT_FOUND }, HttpStatus.NOT_FOUND);
  }
}