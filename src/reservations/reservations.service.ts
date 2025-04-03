import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { UpdateReservationInput } from './dto/update-reservation.input';
import { PrismaClient, RoomStatus } from '@prisma/client';
import { CreateReservationInput } from './dto/create-reservation.input';
import { getTotalNightsAndWeekendDays } from './utils/get-total-nights-and-weekend-days';
import { reservationPriceCalculator } from './utils/reservation-price-calculator';
import { Reservation } from './entities/reservation.entity';

@Injectable()
export class ReservationsService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async create(
    createReservationInput: CreateReservationInput,
  ): Promise<Reservation> {
    const room = await this.room.findUnique({
      where: {
        id: createReservationInput.roomId,
      },
    });

    if (!room) {
      throw new NotFoundException('Room not found');
    }

    //TODO: Manage room exceptions

    //TODO: Check if room is available by dates
    if (room.status !== 'AVAILABLE') {
      throw new Error('Room is not available');
    }

    const { totalNights, totalWeekendPairs } = getTotalNightsAndWeekendDays(
      createReservationInput.startDate,
      createReservationInput.endDate,
    );

    const { basePrice, discount, totalPrice } = reservationPriceCalculator(
      createReservationInput,
      room,
      totalNights,
      totalWeekendPairs,
    );

    const reservation = await this.reservation.create({
      data: {
        ...createReservationInput,
        roomId: createReservationInput.roomId,
        totalNights: totalNights,
        totalWeekendPairs: totalWeekendPairs,
        basePrice: basePrice,
        hasDiscount: discount > 0,
        discount: discount,
        totalPrice: totalPrice,
        userId: createReservationInput.userId,
      },
    });

    const userUpdated = await this.user.update({
      where: {
        id: createReservationInput.userId,
      },
      data: {
        reservations: {
          connect: {
            id: reservation.id,
          },
        },
      },
    });

    const roomUpdated = await this.room.update({
      where: {
        id: createReservationInput.roomId,
      },
      data: {
        status: RoomStatus.AVAILABLE,
      },
    });

    return {
      ...reservation,
      user: userUpdated,
      room: roomUpdated,
    } as Reservation;
  }

  async findAll(): Promise<Reservation[]> {
    const reservations = await this.reservation.findMany();

    return reservations.map((reservation) => ({
      ...reservation,
      room: this.room.findUnique({
        where: {
          id: reservation.roomId,
        },
      }),
      user: this.user.findUnique({
        where: {
          id: reservation.userId,
        },
      }),
    })) as unknown as Reservation[];
  }

  async findOne(id: string): Promise<Reservation> {
    const reservation = await this.reservation.findUnique({
      where: {
        id,
      },
    });

    if (!reservation) {
      throw new NotFoundException('Reservation not found');
    }

    const room = await this.room.findUnique({
      where: {
        id: reservation.roomId,
      },
    });

    const user = await this.user.findUnique({
      where: {
        id: reservation.userId,
      },
    });

    return {
      ...reservation,
      room: room,
      user: user,
    } as unknown as Reservation;
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
