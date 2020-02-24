import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  BelongsTo,
  ForeignKey
} from 'sequelize-typescript';
import { Item } from '../items/item.entity';
import { Order } from './order.entity';

@Table({ tableName: 'order_items' })
export class OrderItem extends Model<OrderItem> {
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
  @ForeignKey(() => Order)
  order_id: number;

  @Column({
    allowNull: false,
    references: {
      model: Item
    }
  })
  @ForeignKey(() => Item)
  item_id: number;

  @BelongsTo(() => Item, 'item_id')
  item: Item;

  @BelongsTo(() => Order, 'order_id')
  order: Order;

  @CreatedAt public created_at: Date;

  @UpdatedAt public updated_at: Date;
}