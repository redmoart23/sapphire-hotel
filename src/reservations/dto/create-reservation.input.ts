import { Field, ID, InputType, Int } from '@nestjs/graphql';
import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsUUID,
} from 'class-validator';

@InputType()
export class CreateReservationInput {
  @Field(() => ID)
  @IsUUID()
  @IsNotEmpty()
  roomId: string;

  @Field(() => ID)
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @Field(() => Int)
  @IsNotEmpty()
  @IsPositive()
  guests: number;

  @Field(() => Boolean)
  @IsOptional()
  hasExtraServices: boolean;

  @Field()
  @IsDate()
  startDate: Date;

  @Field()
  @IsDate()
  endDate: Date;
}
