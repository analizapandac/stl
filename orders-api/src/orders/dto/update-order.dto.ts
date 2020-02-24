import { Item } from '../../items/item.entity';
import { STATUSES } from '../types/order.types';

export class UpdateOrderDto {
  customer_id?: number;
  items?: Item[];
  total?: number;
  status?: STATUSES
}