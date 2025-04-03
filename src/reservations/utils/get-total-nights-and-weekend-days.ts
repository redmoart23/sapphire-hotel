export function getTotalNightsAndWeekendDays(
  startDate: Date,
  endDate: Date,
): { totalNights: number; totalWeekendPairs: number } {
  if (!(startDate instanceof Date) || !(endDate instanceof Date)) {
    throw new Error('Invalid date format');
  }

  // Calculate total nights
  const totalNights = Math.max(
    0,
    Math.floor(
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
    ),
  );

  // Calculate total weekend pairs
  let weekendPairs = 0;
  const currentDate = new Date(startDate);

  while (currentDate < endDate) {
    const day = currentDate.getDay(); // 5 = Friday, 6 = Saturday

    // Check for Friday-Saturday or Saturday-Sunday transition
    if (day === 5 && currentDate.getTime() + 86400000 < endDate.getTime()) {
      // Friday → Saturday
      weekendPairs++;
    } else if (
      day === 6 &&
      currentDate.getTime() + 86400000 < endDate.getTime()
    ) {
      // Saturday → Sunday
      weekendPairs++;
    }

    // Move to the next day
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return { totalNights, totalWeekendPairs: weekendPairs };
}
