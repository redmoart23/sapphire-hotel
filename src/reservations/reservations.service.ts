import {
  BadRequestException,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { UpdateReservationInput } from './dto/update-reservation.input';
import { PrismaClient } from '@prisma/client';
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

    const isAvailable = await this.isRoomAvailable(
      createReservationInput.roomId,
      createReservationInput.startDate,
      createReservationInput.endDate,
    );

    if (!isAvailable) {
      throw new BadRequestException(
        'Room is not available for the specified dates',
      );
    }

    if (createReservationInput.guests > room.roomCapacity) {
      throw new BadRequestException(
        'Room capacity is not enough for the number of guests',
      );
    }

    const { totalNights, totalDays, totalWeekendPairs } =
      getTotalNightsAndWeekendDays(
        createReservationInput.startDate,
        createReservationInput.endDate,
      );

    const {
      basePrice,
      discount,
      extraServicesFee,
      weekendSurcharge,
      totalPrice,
    } = reservationPriceCalculator(
      createReservationInput,
      room,
      totalNights,
      totalWeekendPairs,
    );

    const reservation = await this.reservation.create({
      data: {
        ...createReservationInput,
        roomId: createReservationInput.roomId,
        userId: createReservationInput.userId,
        totalNights,
        totalDays,
        totalWeekendPairs,
        basePrice,
        discount,
        extraServicesFee,
        weekendSurcharge,
        totalPrice,
        hasDiscount: discount > 0,
      },
      include: {
        room: true,
        user: true,
      },
    });

    return reservation;
  }

  async findAll(): Promise<Reservation[]> {
    const reservations = await this.reservation.findMany({
      include: {
        room: true,
        user: true,
      },
    });

    return reservations;
  }

  async findOne(id: string): Promise<Reservation> {
    const reservation = await this.reservation.findUnique({
      where: {
        id,
      },
      include: {
        room: true,
        user: true,
      },
    });

    if (!reservation) {
      throw new NotFoundException('Reservation not found');
    }

    return reservation;
  }

  update(id: number, updateReservationInput: UpdateReservationInput) {
    return {
      ...updateReservationInput,
    };
  }

  async cancel(id: string): Promise<string> {
    await this.reservation.delete({
      where: {
        id,
      },
      include: {
        room: true,
        user: true,
      },
    });

    return 'Reservation canceled successfully';
  }

  async calculateReservationPrice(
    createReservationInput: CreateReservationInput,
  ): Promise<{
    basePrice: number;
    discount: number;
    extraServicesFee: number;
    weekendSurcharge: number;
    totalPrice: number;
  }> {
    const room = await this.room.findUnique({
      where: {
        id: createReservationInput.roomId,
      },
    });

    if (!room) {
      throw new NotFoundException('Room not found');
    }

    if (createReservationInput.guests > room.roomCapacity) {
      throw new BadRequestException(
        'Room capacity is not enough for the number of guests',
      );
    }

    const { totalNights, totalWeekendPairs } = getTotalNightsAndWeekendDays(
      createReservationInput.startDate,
      createReservationInput.endDate,
    );

    const {
      basePrice,
      discount,
      extraServicesFee,
      weekendSurcharge,
      totalPrice,
    } = reservationPriceCalculator(
      createReservationInput,
      room,
      totalNights,
      totalWeekendPairs,
    );

    return {
      basePrice,
      discount,
      extraServicesFee,
      weekendSurcharge,
      totalPrice,
    };
  }

  async isRoomAvailable(
    roomId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<boolean> {
    const overlappingReservations = await this.reservation.findMany({
      where: {
        roomId,
        AND: [
          {
            startDate: { lte: endDate },
          },
          {
            endDate: { gte: startDate },
          },
        ],
      },
    });

    return overlappingReservations.length === 0;
  }
}
