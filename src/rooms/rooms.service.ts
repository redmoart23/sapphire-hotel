import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaClient, Room } from '@prisma/client';
import { CreateRoomInput } from './dto/create-room.input';
import { UpdateRoomInput } from './dto/update-room.input';
import { SearchRoomArgs } from './dto/args/search-room.args';

@Injectable()
export class RoomsService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async create(createRoomInput: CreateRoomInput): Promise<Room> {
    return await this.room.create({ data: createRoomInput });
  }

  async findAll(searchRoomArgs: SearchRoomArgs): Promise<Room[]> {
    const rooms = await this.room.findMany({
      where: {
        capacity: searchRoomArgs.capacity,
        roomType: searchRoomArgs.roomType,
        outsideView: searchRoomArgs.outsideView,
        NOT: {
          reservations: {
            some: {
              startDate: {
                gte: searchRoomArgs.startDate,
              },
              endDate: {
                lte: searchRoomArgs.endDate,
              },
            },
          },
        },
      },
    });

    if (rooms.length === 0) {
      throw new NotFoundException('No rooms available');
    }

    return rooms;
  }

  async findOne(id: string): Promise<Room> {
    const room = await this.room.findUnique({ where: { id } });
    if (!room) {
      throw new NotFoundException('Room not found');
    }

    return room;
  }

  async update(id: string, updateRoomInput: UpdateRoomInput): Promise<Room> {
    await this.findOne(id);
    return await this.room.update({ where: { id }, data: updateRoomInput });
  }

  async remove(id: string): Promise<string> {
    await this.findOne(id);

    await this.room.delete({ where: { id } });

    return `Room with deleted`;
  }
}
