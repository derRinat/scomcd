export const getDate = (month = 0): string => {
  const now = new Date();
  return new Date(
    now.getFullYear(),
    now.getMonth() + (month + 1),
    0
  ).toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};
