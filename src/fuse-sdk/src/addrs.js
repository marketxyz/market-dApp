module.exports = {
  137: {
    FUSE_POOL_DIRECTORY_CONTRACT_ADDRESS:
      "0xA2a1cb88D86A939A37770FE5E9530E8700DEe56b",
    FUSE_SAFE_LIQUIDATOR_CONTRACT_ADDRESS:
      "0x29535B9035500827FfF73206e17a3d16635A1B48",
    FUSE_FEE_DISTRIBUTOR_CONTRACT_ADDRESS:
      "0xB1205172AAdaAd4c67318EA77A34C1F1CaA784EE",
    FUSE_POOL_LENS_CONTRACT_ADDRESS:
      "0xe4D84b252308645098846312286E6c6D2846DbB0",
    BLOCKS_PER_MIN: 60 / 2, // 2 blocks per second
    BYTECODE_HASHES: {
      oracle: {
        "PreferredPriceOracleV2 Quickswap USDC":
          "0xe6a7eb0795fc9c5e05048d191246ac01efaff82eac6c8c981ed0b475e89e77a9",
        "MasterPriceOracleV2 Beefy":
          "0x567982b74679a69cfb2ae6b114951562cc80d6790d0c2fdb9a4c1fb46733138d",
        "MasterPriceOracleV2 Klima":
          "0x17a4e51aa4284da1b2ced8254eac606175ceaf9b810a48c0a336fc0195c95a4a",
      },
      irm: {
        JumpRateModel: [
          "0x9bfc6cf245214461b587a493c5d558cb6a4580fc597a6af1d0543a89dc4e2b4c",
        ],
        JumpRateModelV2:
          "0xaa796b4e95fc4a251be212a81f0d67e43755807201603524833361f538f204b5",
      },
    },
    PUBLIC_INTEREST_RATE_MODEL_CONTRACT_ADDRESSES: {
      JumpRateModel_Cream_Stables_Majors:
        "0xa80F8CC22b4Ff9442B7F188D96E9B75d6cFd80F6",
      JumpRateModel_Cream_Major: "0x8dbf1250c805fc2ed29fc0d3aed31ec69a928ffe",
      JumpRateModel_Cream_Gov: "0x46c54c7D214117c79f2f6F368549776F00c0a6c4",
    },
  },
};
