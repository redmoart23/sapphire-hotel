import { BadRequestException } from '@nestjs/common';

export function getTotalNightsAndWeekendDays(
  startDate: Date,
  endDate: Date,
): {
  totalNights: number;
  totalDays: number;
  totalWeekendPairs: number;
} {
  if (
    !(startDate instanceof Date) ||
    isNaN(startDate.getTime()) ||
    !(endDate instanceof Date) ||
    isNaN(endDate.getTime())
  ) {
    throw new Error('Invalid date format');
  }

  startDate.setHours(startDate.getHours() + 6); // Set start time to 6 AM

  endDate.setHours(endDate.getHours() + 18); // Set end time to 6 PM

  if (endDate <= startDate) {
    throw new BadRequestException('End date must be greater than start date');
  }

  const MS_PER_DAY = 1000 * 60 * 60 * 24;

  const diffMs = endDate.getTime() - startDate.getTime();

  const totalDays = diffMs / MS_PER_DAY;
  const totalNights = Math.floor(totalDays);

  let weekendPairs = 0;
  const current = new Date(startDate);

  // Get weekend pairs
  while (current < endDate) {
    const day = current.getDay();

    // Check Friday→Saturday or Saturday→Sunday
    const nextDay = new Date(current.getTime() + MS_PER_DAY);
    if (nextDay > endDate) break;

    if ((day === 5 || day === 6) && nextDay.getDay() === (day + 1) % 7) {
      weekendPairs++;
    }

    current.setDate(current.getDate() + 1);
  }

  return {
    totalNights,
    totalDays: Math.ceil(totalDays),
    totalWeekendPairs: weekendPairs,
  };
}
