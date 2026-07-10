export const formatDuration = (duration) => {
  if (!duration) return "0h 0m";

  const parts = duration.split(" ");

  let hours = parseInt(parts[0]?.replace("h", "")) || 0;
  let minutes = parseInt(parts[1]?.replace("m", "")) || 0;
  let seconds = parseInt(parts[2]?.replace("s", "")) || 0;

  minutes = seconds >= 30 ? minutes + 1 : minutes;

  if (minutes >= 60) {
    hours += 1;
    minutes -= 60;
  }

  return `${hours}h ${minutes}m`;
};
