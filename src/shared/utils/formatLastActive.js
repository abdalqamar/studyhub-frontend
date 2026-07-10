const formatLastActive = (date) => {
  const diff = Date.now() - new Date(date);
  const min = Math.floor(diff / 60000);

  if (min < 60) return `${min} min ago`;
  if (min < 1440) return `${Math.floor(min / 60)} hrs ago`;
  return `${Math.floor(min / 1440)} days ago`;
};
export default formatLastActive;
