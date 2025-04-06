import { ParseUUIDPipe } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { Reservation } from './entities/reservation.entity';
import { ReservationsService } from './reservations.service';
import { CreateReservationInput } from './dto/create-reservation.input';
import { UpdateReservationInput } from './dto/update-reservation.input';

@Resolver(() => Reservation)
export class ReservationsResolver {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Mutation(() => Reservation, {
    name: 'createReservation',
    description:
      'Create a new reservation for a room based on the roomId,userId, gests, and dates',
  })
  async createReservation(
    @Args('createReservationInput')
    createReservationInput: CreateReservationInput,
  ): Promise<Reservation> {
    return await this.reservationsService.create(createReservationInput);
  }

  @Query(() => [Reservation], {
    name: 'reservations',
    description: 'Get all reservations',
  })
  async findAll(): Promise<Reservation[]> {
    return this.reservationsService.findAll();
  }

  @Query(() => Reservation, {
    name: 'reservation',
    description: 'Get a reservation by id',
  })
  findOne(@Args('id', { type: () => ID }, ParseUUIDPipe) id: string) {
    return this.reservationsService.findOne(id);
  }

  @Mutation(() => Reservation, {
    name: 'updateReservation',
    description: 'Update a reservation by id',
  })
  updateReservation(
    @Args('updateReservationInput')
    updateReservationInput: UpdateReservationInput,
  ) {
    return this.reservationsService.update(
      updateReservationInput.id,
      updateReservationInput,
    );
  }

  @Mutation(() => Reservation, {
    name: 'cancelReservation',
    description: 'Cancel a reservation by id',
  })
  cancelReservation(
    @Args('id', { type: () => String }, ParseUUIDPipe) id: string,
  ): Promise<string> {
    return this.reservationsService.cancel(id);
  }
}
