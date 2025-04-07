export interface GetReservationPriceResponse {
  basePrice: number;
  discount: number;
  extraServicesFee: number;
  weekendSurcharge: number;
  totalPrice: number;
}
