import { NotFoundException } from '@nestjs/common';
import { Room } from 'src/rooms/entities/room.entity';

export function roomsExceptionsHandler(rooms: Room[]) {
  if (rooms.length === 0) {
    throw new NotFoundException('Rooms not found');
  }
}
