import { Room } from '@prisma/client';
import { CreateReservationInput } from '../dto/create-reservation.input';

export function reservationPriceCalculator(
  createReservationInput: CreateReservationInput,
  room: Room,
  totalNights: number,
  totalWeekendPairs: number,
) {
  let basePrice = room.roomPrice;
  let discount = 0;

  // Apply discounts based on stay duration
  if (totalNights >= 4 && totalNights <= 6) {
    discount = 10000 * totalNights;
    basePrice = room.roomPrice * totalNights - discount;
  } else if (totalNights >= 7 && totalNights <= 9) {
    discount = 20000 * totalNights;
    basePrice = room.roomPrice * totalNights - discount;
  } else if (totalNights >= 10) {
    discount = 30000 * totalNights;
    basePrice = room.roomPrice * totalNights - discount;
  }

  // Calculate initial total price
  let totalPrice = basePrice;

  // Apply extra services fee if requested
  if (createReservationInput.hasExtraServices) {
    totalPrice += 25000 * createReservationInput.guests * totalNights;
  }

  // Apply weekend pricing adjustment
  if (totalWeekendPairs > 0) {
    // 20% premium for weekend stays
    const weekendSurcharge = room.roomPrice * 0.2 * totalWeekendPairs;

    totalPrice += weekendSurcharge;
  }

  return { basePrice, discount, totalPrice };
}
