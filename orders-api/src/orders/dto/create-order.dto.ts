import { Item } from '../../items/item.entity';

export class CreateOrderDto {
  customer_id: number;
  items: Item[];
  total: number;
}