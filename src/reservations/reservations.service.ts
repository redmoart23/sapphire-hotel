import { Injectable, OnModuleInit } from '@nestjs/common';
import { UpdateReservationInput } from './dto/update-reservation.input';
import { PrismaClient } from '@prisma/client';
import { CreateReservationInput } from './dto/create-reservation.input';
@Injectable()
export class ReservationsService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async create(createReservationInput: CreateReservationInput) {
    return await this.reservation.create({ data: createReservationInput });
  }

  findAll() {
    return `This action returns all reservations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reservation`;
  }

  update(id: number, updateReservationInput: UpdateReservationInput) {
    return {
      ...updateReservationInput,
    };
  }

  remove(id: number) {
    return `This action removes a #${id} reservation`;
  }
}
