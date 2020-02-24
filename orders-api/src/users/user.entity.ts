import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  CreatedAt,
  UpdatedAt
} from 'sequelize-typescript';
import { Order } from '../orders/order.entity';

@Table({ tableName: 'users' })
export class User extends Model<User> {
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
  firstname: string;

  @Column({
    allowNull: false
  })
  lastname: string;

  @Column({
    allowNull: false,
    validate: {
      isEmail: true,
    },
  })
  email: string;

  @HasMany(() => Order, 'customer_id')
  orders: Order[];

  @CreatedAt public created_at: Date;

  @UpdatedAt public updated_at: Date;
}