export const convertSecondsToMinutesSecondDisplay = (
  elapsedSeconds: number
) => {
  const minutesDisplay = Math.floor(elapsedSeconds / 60);
  const secondsDisplay = elapsedSeconds % 60;

  // Format the result as MM:SS
  return `${String(minutesDisplay).padStart(2, '0')}:${String(
    secondsDisplay
  ).padStart(2, '0')}`;
};
