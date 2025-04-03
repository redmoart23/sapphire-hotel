import { ArgsType, Field, registerEnumType } from '@nestjs/graphql';
import { RoomCapacity, RoomType } from '@prisma/client';
import { IsNotEmpty, IsOptional } from 'class-validator';

registerEnumType(RoomType, { name: 'RoomType' });
registerEnumType(RoomCapacity, { name: 'RoomCapacity' });

@ArgsType()
export class SearchRoomArgs {
  @Field(() => Date)
  @IsNotEmpty()
  startDate: Date;

  @Field(() => Date)
  @IsNotEmpty()
  endDate: Date;

  @Field(() => RoomCapacity)
  @IsNotEmpty()
  capacity: RoomCapacity;

  @Field(() => RoomType, { nullable: true })
  @IsOptional()
  roomType: RoomType;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  outsideView: boolean;
}
