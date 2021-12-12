import { infuraURL } from "../src/utils/web3Providers";
import { VercelRequest, VercelResponse } from "@vercel/node";
import Web3 from "web3";
/// @dev this is taken from:
// https://github.com/KlimaDAO/klimadao/blob/0f3841ac674c7f0de2d032c7a6ba2fcf0ea946bb/lib/utils/getStakingAPY/index.ts#L7

const sklimaABI = [
  {
    inputs: [],
    name: "circulatingSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
];

const distributorV4ABI = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_rate",
        type: "uint256",
      },
    ],
    name: "nextRewardAt",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "info",
    outputs: [
      {
        internalType: "uint256",
        name: "rate",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export default async (_req: VercelRequest, res: VercelResponse) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "max-age=600, s-maxage=600");

  const web3 = new Web3(infuraURL);
  const sKLIMA = new web3.eth.Contract(
    sklimaABI as any,
    "0xb0C22d8D350C67420f06F48936654f567C73E8C8"
  );
  const distributorv4 = new web3.eth.Contract(
    distributorV4ABI as any,
    "0x4cC7584C3f8FAABf734374ef129dF17c3517e9cB"
  );

  const ESTIMATED_DAILY_REBASES = 3.28;
  const circSupply = await sKLIMA.methods.circulatingSupply().call();
  const { rate } = await distributorv4.methods.info(0).call();
  const stakingReward = await distributorv4.methods.nextRewardAt(rate).call();

  const stakingRebase = Number(stakingReward) / Number(circSupply);
  const stakingAPY =
    Math.floor(
      Math.pow(1 + stakingRebase, 365 * ESTIMATED_DAILY_REBASES) * 100
    ) / 100;

  return res.json({
    stakingAPY,
  });
};
