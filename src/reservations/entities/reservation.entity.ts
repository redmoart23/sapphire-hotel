import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';
import { Room } from 'src/rooms/entities/room.entity';
import { User } from 'src/users/entities/user.entity';

enum ReservationStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
}

registerEnumType(ReservationStatus, { name: 'ReservationStatus' });

@ObjectType()
export class Reservation {
  @Field()
  id: string;

  @Field(() => Room)
  room: Room;

  @Field(() => User)
  user: User;

  @Field()
  startDate: Date;

  @Field()
  endDate: Date;

  @Field(() => ReservationStatus)
  status: ReservationStatus;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
