export const convertMantissaToAPY = (mantissa: any, dayRange: number) => {
  return (Math.pow((mantissa / 1e18) * (30 * 60 * 24) + 1, dayRange) - 1) * 100;
};

export const convertMantissaToAPR = (mantissa: any) => {
  return (mantissa * 15768000) / 1e16;
};
