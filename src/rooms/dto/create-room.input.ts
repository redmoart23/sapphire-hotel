import { InputType, Field, Int } from '@nestjs/graphql';
import { RoomType, RoomStatus } from '@prisma/client';
import {
  IsBoolean,
  IsEnum,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

@InputType()
export class CreateRoomInput {
  @Field(() => String)
  @IsString()
  roomName: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  roomDesc?: string | undefined;

  @Field(() => RoomType)
  @IsEnum(RoomType)
  roomType: RoomType;

  @Field(() => Int)
  roomCapacity: number;

  @Field(() => Boolean)
  @IsBoolean()
  outsideView: boolean;

  @Field(() => Int)
  @IsPositive()
  roomPrice: number;

  @Field(() => RoomStatus, { defaultValue: RoomStatus.AVAILABLE })
  @IsEnum(RoomStatus)
  status: RoomStatus;
}
