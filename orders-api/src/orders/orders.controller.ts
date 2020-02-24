import { Controller, Get, Post, Param, Body, Put } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ItemsService } from '../items/items.service';
import { UsersService } from '../users/users.service';
import { Order } from './order.entity';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService, private itemsService: ItemsService, private usersService: UsersService) { }

  @Get()
  getOrders(): Promise<Order[]> {
    return this.ordersService.findAll();
  }

  @Get(':id')
  getOrder(@Param('id') orderId: number) {
    return this.ordersService.findOne(orderId);
  }

  @Post()
  async create(@Body('itemIds') itemIds: number[]) {
    try {
      const user = await this.usersService.findOne(1);
      const items = await this.itemsService.getItemsByIds(itemIds);
      let total = items.reduce(
        (accumulator, item) => accumulator + Number(item.price)
        , 0
      );
      const order = await this.ordersService.create({ customer_id: user.id, items, total });

      return this.ordersService.processPayment(order);
      
    } catch (err) {
      console.log('error', err.message);
    }
  }

  @Put(':id')
  async update(@Param('id') orderId: number, @Body() orderData: UpdateOrderDto) {
    return await this.ordersService.update(orderId, orderData);
  }

  @Get(':id/status')
  async checkStatus(@Param('id') orderId: number) {
    return this.ordersService.getOrderStatus(orderId);
  }
}
