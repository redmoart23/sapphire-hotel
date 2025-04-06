import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Reservation } from '../../reservations/entities/reservation.entity';

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  username: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;

  @Field(() => [Reservation], { nullable: true })
  reservations?: Reservation[];
}
