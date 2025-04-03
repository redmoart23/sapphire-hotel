import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';
import { CreateUserInput } from './dto/create-user.input';
import { hashPassword } from './utils/hashPassword';

@Injectable()
export class UsersService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async create(createUserInput: CreateUserInput): Promise<User> {
    const { password, ...user } = createUserInput;

    const hashedPassword = await hashPassword(password);

    return await this.user.create({
      data: { ...user, password: hashedPassword },
    });
  }

  async findOne(id: string): Promise<User> {
    const user = await this.user.findUnique({ where: { id } });
    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }
}
