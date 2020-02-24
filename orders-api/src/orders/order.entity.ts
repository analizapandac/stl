import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  BelongsTo,
  CreatedAt,
  UpdatedAt,
  BelongsToMany
} from 'sequelize-typescript';
import { OrderItem } from './order-item.entity';
import { User } from '../users/user.entity';
import { Item } from '../items/item.entity';

@Table({ tableName: 'orders' })
export class Order extends Model<Order> {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  })
  public id: number;

  @Column({
    allowNull: false
  })
  customer_id: number;

  @Column({
    allowNull: false
  })
  total: number;

  @Column({
    allowNull: false,
    type: DataType.ENUM('created', 'confirmed', 'cancelled', 'delivered')
  })
  status: string;

  @BelongsToMany(() => Item, () => OrderItem, 'item_id', 'order_id')
  items: Item[];

  @BelongsTo(() => User, 'customer_id')
  customer: User;

  @HasMany(() => OrderItem)
  order_items: OrderItem[];

  @CreatedAt public created_at: Date;

  @UpdatedAt public updated_at: Date;
}