import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  HasMany
} from 'sequelize-typescript';
import { OrderItem } from '../orders/order-item.entity';

@Table({ tableName: 'items' })
export class Item extends Model<Item> {
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
  name: string;

  @Column({
    allowNull: false
  })
  price: number;

  @CreatedAt public created_at: Date;

  @UpdatedAt public updated_at: Date;

  @HasMany(() => OrderItem)
  order_items: OrderItem[]
}