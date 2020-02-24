import { Sequelize } from 'sequelize-typescript';
import { Order } from '../orders/order.entity';
import { OrderItem } from '../orders/order-item.entity';
import { User } from '../users/user.entity';
import { Item } from '../items/item.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize('postgres://ccdqxhps:jtrKHwA7p5gmLVaG3KumCn8cqqX3WRwm@rosie.db.elephantsql.com:5432/ccdqxhps');
      sequelize.addModels([Item, Order, OrderItem, User]);
      await sequelize.sync();
      return sequelize;
    },
  },
];