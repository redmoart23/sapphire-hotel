import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient, Room, User } from '@prisma/client';
import { envs } from 'src/config/envs';
import { seedUsers } from './data/seed-users';
import { seedRooms } from './data/seed-rooms';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class SeedService extends PrismaClient implements OnModuleInit {
  private isProd: boolean;

  async onModuleInit() {
    await this.$connect();
  }

  constructor(private readonly userService: UsersService) {
    super();
    this.isProd = envs.nodeEnv === 'prod';
  }

  async executeSeed(): Promise<boolean> {
    if (this.isProd) {
      throw new BadRequestException('Cannot seed in production');
    }

    // Delete database records
    await this.deleteDatabaseRecords();

    // Users seed
    await this.usersSeed();

    // Rooms seed
    await this.roomsSeed();

    return true;
  }

  async deleteDatabaseRecords() {
    await this.$transaction([
      this.user.deleteMany({}),
      this.room.deleteMany({}),
      this.reservation.deleteMany({}),
    ]);
  }

  async usersSeed(): Promise<User> {
    const user = await this.userService.create(seedUsers[0]);

    return user;
  }

  async roomsSeed(): Promise<Room[]> {
    await this.room.createMany({ data: seedRooms });

    return await this.room.findMany();
  }
}
