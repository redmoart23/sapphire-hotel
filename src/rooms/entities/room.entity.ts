import {
  ObjectType,
  Field,
  ID,
  Float,
  registerEnumType,
  Int,
} from '@nestjs/graphql';
import { RoomType, RoomStatus } from '@prisma/client';
import { Reservation } from 'src/reservations/entities/reservation.entity';

registerEnumType(RoomType, { name: 'RoomType' });
registerEnumType(RoomStatus, { name: 'RoomStatus' });

@ObjectType()
export class Room {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  roomName: string;

  @Field(() => String, { nullable: true })
  roomDesc: string | null;

  @Field(() => RoomType)
  roomType: RoomType;

  @Field(() => Int)
  roomCapacity: number;

  @Field(() => Float)
  roomPrice: number;

  @Field(() => Boolean)
  outsideView: boolean;

  @Field(() => RoomStatus)
  status: RoomStatus;

  @Field(() => [Reservation], { nullable: true })
  reservations?: Reservation[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
