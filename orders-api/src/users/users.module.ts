import { Module, HttpModule } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { usersProviders } from './users.providers';

@Module({
  imports: [HttpModule],
  controllers: [UsersController],
  providers: [UsersService, ...usersProviders],
  exports: [UsersService]
})
export class UsersModule {}
