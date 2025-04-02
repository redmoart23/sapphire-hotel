import { IsUUID } from 'class-validator';
import { CreateRoomInput } from './create-room.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateRoomInput extends PartialType(CreateRoomInput) {
  @Field(() => ID)
  @IsUUID()
  id: string;
}
