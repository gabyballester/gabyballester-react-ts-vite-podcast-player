export const formatDuration = (durationInMilliseconds: number): string => {
  if (durationInMilliseconds === 0) return "No data to show";
  const totalSeconds = Math.floor(durationInMilliseconds / 1000);

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};
