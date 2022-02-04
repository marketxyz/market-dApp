import Fuse from "../fuse-sdk/src/index";

const BlocksPerDay = Fuse.BLOCKS_PER_MIN * 60 * 24;

export const convertMantissaToAPY = (mantissa: any, dayRange: number) => {
  return (Math.pow((mantissa / 1e18) * BlocksPerDay + 1, dayRange) - 1) * 100;
};

export const convertMantissaToAPR = (mantissa: any) => {
  return (mantissa * BlocksPerDay * 365) / 1e16;
};
