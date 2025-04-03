import { ArgsType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { RoomType } from '@prisma/client';
import { IsNotEmpty, IsOptional } from 'class-validator';

registerEnumType(RoomType, { name: 'RoomType' });

@ArgsType()
export class SearchRoomArgs {
  @Field(() => Date)
  @IsNotEmpty()
  startDate: Date;

  @Field(() => Date)
  @IsNotEmpty()
  endDate: Date;

  @Field(() => Int)
  @IsNotEmpty()
  roomCapacity: number;

  @Field(() => RoomType, { nullable: true })
  @IsOptional()
  roomType: RoomType;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  outsideView: boolean;
}
