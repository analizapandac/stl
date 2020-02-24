import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { itemsProviders } from './items.providers';

@Module({
  providers: [ItemsService, ...itemsProviders],
  exports: [ItemsService]
})
export class ItemsModule {}
