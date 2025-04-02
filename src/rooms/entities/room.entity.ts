import {
  ObjectType,
  Field,
  ID,
  Float,
  registerEnumType,
} from '@nestjs/graphql';
import { RoomType, RoomStatus, RoomCapacity } from '@prisma/client';
import { Reservation } from 'src/reservations/entities/reservation.entity';

registerEnumType(RoomType, { name: 'RoomType' });
registerEnumType(RoomCapacity, { name: 'RoomCapacity' });
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

  @Field(() => RoomCapacity)
  capacity: RoomCapacity;

  @Field(() => Float)
  roomPrice: number;

  @Field(() => RoomStatus)
  status: RoomStatus;

  @Field(() => [Reservation], { nullable: true })
  reservations?: Reservation[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
