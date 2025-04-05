import { ObjectType, Field, registerEnumType, Int, ID } from '@nestjs/graphql';
import { ReservationStatus } from '@prisma/client';
import { Room } from 'src/rooms/entities/room.entity';
import { User } from 'src/users/entities/user.entity';

registerEnumType(ReservationStatus, { name: 'ReservationStatus' });

@ObjectType()
export class Reservation {
  @Field()
  id: string;

  @Field(() => ID)
  roomId: string;

  @Field(() => ID)
  userId: string;

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

  @Field(() => Int)
  guests: number;

  @Field(() => Int)
  totalNights: number;

  @Field(() => Int)
  totalDays: number;

  @Field(() => Int)
  totalWeekendPairs: number;

  @Field(() => Int)
  basePrice: number;

  @Field(() => Int)
  totalPrice: number;

  @Field(() => Int)
  discount: number;

  @Field(() => Int)
  weekendSurcharge: number;

  @Field(() => Int)
  extraServicesFee: number;

  @Field(() => Boolean)
  hasDiscount: boolean;

  @Field(() => Boolean)
  hasExtraServices: boolean;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
