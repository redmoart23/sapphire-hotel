import { Room } from '@prisma/client';
import { CreateReservationInput } from '../dto/create-reservation.input';

export function reservationPriceCalculator(
  createReservationInput: CreateReservationInput,
  room: Room,
  totalNights: number,
  totalWeekendPairs: number,
) {
  const { hasExtraServices, guests } = createReservationInput;
  const nightlyRate = room.roomPrice;

  const basePrice = nightlyRate * totalNights;

  // Calculate discount based on the number of nights
  let discountPerNight = 0;
  if (totalNights >= 10) {
    discountPerNight = 30000;
  } else if (totalNights >= 7) {
    discountPerNight = 20000;
  } else if (totalNights >= 4) {
    discountPerNight = 10000;
  }

  // Calculate total discount
  const discount = discountPerNight * totalNights;
  const basePriceWithDiscount = basePrice - discount;

  // Calculate extra services fee if applicable
  const extraServicesFee = hasExtraServices ? 25000 * guests * totalNights : 0;

  // Calculate weekend surcharge
  const weekendSurcharge = nightlyRate * 0.2 * totalWeekendPairs;

  // Calculate total price
  const totalPrice =
    basePriceWithDiscount + extraServicesFee + weekendSurcharge;

  return {
    basePrice,
    discount,
    extraServicesFee,
    weekendSurcharge,
    totalPrice,
  };
}
