import { Module, HttpModule } from '@nestjs/common';
import { ItemsModule } from '../items/items.module';
import { UsersModule } from '../users/users.module';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { ordersProviders } from './orders.providers';

@Module({
  imports: [HttpModule, ItemsModule, UsersModule],
  controllers: [OrdersController],
  providers: [OrdersService, ...ordersProviders]
})
export class OrdersModule {}
