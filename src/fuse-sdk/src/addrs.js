module.exports = {
  137: {
    FUSE_POOL_DIRECTORY_CONTRACT_ADDRESS:
      "0xA2a1cb88D86A939A37770FE5E9530E8700DEe56b",
    FUSE_POOL_LENS_CONTRACT_ADDRESS:
      "0xe4D84b252308645098846312286E6c6D2846DbB0",
    BLOCKS_PER_MIN: 60 / 2, // 1 block per 2s
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
    OWNED_ACCOUNTS: [
      "0xd6f81D154D0532906140ef37268BC8eD2A17e008",
      "0x1359a50627EDB02a092352671566206dF12Aa095",
      "0x34abBf25fA4b792716f7C2A8880d65270d895B44",
    ],
  },

  250: {
    FUSE_POOL_DIRECTORY_CONTRACT_ADDRESS:
      "0x0E7d754A8d1a82220432148C10715497a0569BD7",
    FUSE_POOL_LENS_CONTRACT_ADDRESS:
      "0x5aB6215AB8344C28B899efdE93BEe47B124200Fb",
    BLOCKS_PER_MIN: 60 / 1.2, //  1 block per 1.2s
    BYTECODE_HASHES: {
      oracle: {},
      irm: {
        JumpRateModel: [
          "0xa2856fd51d1b1e990ea5aab4e72700a8d97b980359b90ffa122019473d19ea8d",
        ],
        JumpRateModelV2:
          "0x5e625b4a3fbc487d3217172baf779ebb5c36ff49d393fca7e1c3d5191b8d6e44",
      },
    },
    OWNED_ACCOUNTS: [
      "0x4237012403135F3f255d9F92065E7560739A7348",
      "0x9C259827aeb34c90a8C95EC2DAd6FfCDbd88b388",
    ],
  },

  43114: {
    FUSE_POOL_DIRECTORY_CONTRACT_ADDRESS:
      "0x1c4D63bDA492d69f2D6b02Fb622fb6c49cc401d2",
    FUSE_POOL_LENS_CONTRACT_ADDRESS:
      "0x56563aB1740539983Ff4D487Ea3a3e47e23A19F9",
    BLOCKS_PER_MIN: 60 / 2, // 1 block per 2s
    BYTECODE_HASHES: {
      oracle: {},
      irm: {
        JumpRateModel: [
          "0x296583d7f402fe9a7785e52a6a0f2f3c5541ef35ff3d80bfe5837a30ab4e95d5",
        ],
        JumpRateModelV2:
          "0x0c41dc2ccea8ea41d7db067e158f6f5c19b102e0b368bf769de6992af5d783d4",
      },
    },
    OWNED_ACCOUNTS: ["0x4237012403135F3f255d9F92065E7560739A7348"],
  },
  
  1285: {
    FUSE_POOL_DIRECTORY_CONTRACT_ADDRESS:
      "0x308cF87A7535205B929069B829341440e2655C16",
    FUSE_POOL_LENS_CONTRACT_ADDRESS:
      "0xFbF5396ADAd408e4Dff888ABBc4cF4d7a9a97E34",
    BLOCKS_PER_MIN: Math.ceil(60 / 18), // 1 block per 18s
    BYTECODE_HASHES: {
      oracle: {},
      irm: {
        JumpRateModel: [
          "0x40e9fecaec17b0c3956db2a44ef0d7af90780774be5c9bd03d28b4afae062487",
        ],
        JumpRateModelV2:
          "0x677c2aad3c69841f879a43b504df1de716842a55f7062a72bca4d3e6584184ff",
      },
    },
    OWNED_ACCOUNTS: ["0x79157e9fE9A9546FDe1C643dA226dE64aB6322CB"],
  },
};
