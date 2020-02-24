import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@Inject('USERS_REPOSITORY') private readonly usersRepository: typeof User ){}

  async findOne(id: number): Promise<User> {
    let user = await this.usersRepository.findByPk<User>(id);

    if (user) {
      return user;
    }
    throw new HttpException({ message: 'Order not found', statusCode: HttpStatus.NOT_FOUND }, HttpStatus.NOT_FOUND);
  }
}
