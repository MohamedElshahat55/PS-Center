export function convertToHoursAndMinutes(estimatedTimeInHours: number): {
  hours: number;
  minutes: number;
} {
  // Extract whole hours
  const hours = Math.floor(estimatedTimeInHours);

  // Extract minutes (fractional part * 60)
  const minutes = Math.round((estimatedTimeInHours - hours) * 60);

  return { hours, minutes };
}

// Example usage
const estimatedTimeInHours = 0.02;
const { hours, minutes } = convertToHoursAndMinutes(estimatedTimeInHours);

console.log(`Hours: ${hours}, Minutes: ${minutes}`); // Output: Hours: 0, Minutes: 1
