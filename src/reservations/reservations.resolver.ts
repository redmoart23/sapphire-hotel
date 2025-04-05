import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { ReservationsService } from './reservations.service';
import { CreateReservationInput } from './dto/create-reservation.input';
import { UpdateReservationInput } from './dto/update-reservation.input';
import { Reservation } from './entities/reservation.entity';
import { ParseUUIDPipe } from '@nestjs/common';

@Resolver(() => Reservation)
export class ReservationsResolver {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Mutation(() => Reservation)
  async createReservation(
    @Args('createReservationInput')
    createReservationInput: CreateReservationInput,
  ): Promise<Reservation> {
    return await this.reservationsService.create(createReservationInput);
  }

  @Query(() => [Reservation], { name: 'reservations' })
  async findAll(): Promise<Reservation[]> {
    return this.reservationsService.findAll();
  }

  @Query(() => Reservation, { name: 'reservation' })
  findOne(@Args('id', { type: () => ID }, ParseUUIDPipe) id: string) {
    return this.reservationsService.findOne(id);
  }

  @Mutation(() => Reservation)
  updateReservation(
    @Args('updateReservationInput')
    updateReservationInput: UpdateReservationInput,
  ) {
    return this.reservationsService.update(
      updateReservationInput.id,
      updateReservationInput,
    );
  }

  @Mutation(() => Reservation)
  cancelReservation(
    @Args('id', { type: () => String }, ParseUUIDPipe) id: string,
  ): Promise<string> {
    return this.reservationsService.cancel(id);
  }
}
