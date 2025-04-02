import { Field, ID, InputType } from '@nestjs/graphql';
import { IsDate, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateReservationInput {
  @Field(() => ID)
  @IsNotEmpty()
  roomId: string;

  @Field(() => ID)
  @IsNotEmpty()
  userId: string;

  @Field()
  @IsDate()
  startDate: Date;

  @Field()
  @IsDate()
  endDate: Date;
}
