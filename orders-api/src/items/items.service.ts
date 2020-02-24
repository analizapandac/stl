import { Injectable, Inject } from '@nestjs/common';
import { Item } from './item.entity';

@Injectable()
export class ItemsService {
  constructor(@Inject('ITEMS_REPOSITORY') private readonly itemsService: typeof Item){}

  async getItemsByIds(itemIds: number[]): Promise<Item[]> {
    return this.itemsService.findAll<Item>({
      where: {
        id: itemIds
      },
      attributes: [['id', 'item_id'], 'price']
    });
  }
}