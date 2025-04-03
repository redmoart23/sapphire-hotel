import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { RoomsService } from './rooms.service';
import { CreateRoomInput } from './dto/create-room.input';
import { UpdateRoomInput } from './dto/update-room.input';
import { Room } from './entities/room.entity';
import { ParseUUIDPipe } from '@nestjs/common';
import { SearchRoomArgs } from './dto/args/search-room.args';

@Resolver(() => Room)
export class RoomsResolver {
  constructor(private readonly roomsService: RoomsService) {}

  @Mutation(() => Room)
  async createRoom(
    @Args('createRoomInput') createRoomInput: CreateRoomInput,
  ): Promise<Room> {
    return await this.roomsService.create(createRoomInput);
  }

  @Query(() => [Room], { name: 'rooms' })
  async findAll(@Args() searchRoomArgs: SearchRoomArgs): Promise<Room[]> {
    return this.roomsService.findAll(searchRoomArgs);
  }

  @Query(() => Room, { name: 'room' })
  findOne(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<Room> {
    return this.roomsService.findOne(id);
  }

  @Mutation(() => Room)
  updateRoom(@Args('updateRoomInput') updateRoomInput: UpdateRoomInput) {
    return this.roomsService.update(updateRoomInput.id, updateRoomInput);
  }

  @Mutation(() => Room)
  removeRoom(@Args('id', { type: () => ID }, ParseUUIDPipe) id: string) {
    return this.roomsService.remove(id);
  }
}
