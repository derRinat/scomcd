export const formatNumber = (value: number, dig = 2): number => {
  return Number(value.toFixed(dig));
};
