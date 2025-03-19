/** @type import('hardhat/config').HardhatUserConfig */
require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");
require("hardhat-deploy");
require("@openzeppelin/hardhat-upgrades");
require("@fireblocks/hardhat-fireblocks");
// import * as tenderly from "@tenderly/hardhat-tenderly";
// const tenderly = require("@tenderly/hardhat-tenderly");
// const tenderly = require("@tenderly/hardhat-tenderly");

// console.log(t);
const { ApiBaseUrl } = require("@fireblocks/fireblocks-web3-provider");
// tenderly.setup({ automaticVerifications: true });

module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
      viaIR: true,
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  namedAccounts: {
    deployer: `privatekey://${process.env.PRIVATE_KEY}`,
  },

  etherscan: {
    apiKey: {
      "sepolia": "X378AFIZTHRVUWEV49AIG79GW37Q2TAN7N",
      'sagaevm': 'empty'
    },
    customChains: [
      {
        network: "sagaevm",
        chainId: 5464,
        urls: {
          apiURL: "https://api-sagaevm-5464-1.sagaexplorer.io/api",
          browserURL: "https://sagaevm.sagaexplorer.io:443"
        }
      }
    ]
  },


  networks: {
    base: {
      url: "https://mainnet.base.org",
      accounts: [process.env.PRIVATE_KEY],
    },
    base_fire: {
      url: "https://mainnet.base.org",
      accounts: [process.env.PRIVATE_KEY],
      fireblocks: {
        privateKey: process.env.FIREBLOCKS_API_PRIVATE_KEY_PATH,
        apiKey: process.env.FIREBLOCKS_API_KEY,
        vaultAccountIds: process.env.FIREBLOCKS_VAULT_ACCOUNT_IDS,
      },
    },
    base_sepolia: {
      url: "https://sepolia.base.org",
      accounts: [process.env.PRIVATE_KEY],
      verify: {
        etherscan: {
          apiUrl: "https://api-sepolia.basescan.org",
          apiKey: process.env.ETHERSCAN_API_KEY,
        },
      },
    },
    base_sepolia_fire: {
      url: "https://sepolia.base.org",
      accounts: [process.env.PRIVATE_KEY],
      verify: {
        etherscan: {
          apiUrl: "https://api-sepolia.basescan.org",
          apiKey: process.env.ETHERSCAN_API_KEY,
        },
      },
      fireblocks: {
        apiBaseUrl: ApiBaseUrl.Sandbox,
        privateKey: process.env.FIREBLOCKS_API_PRIVATE_KEY_PATH,
        apiKey: process.env.FIREBLOCKS_API_KEY,
        vaultAccountIds: process.env.FIREBLOCKS_VAULT_ACCOUNT_IDS,
      },
    },
    local: {
      url: "http://127.0.0.1:8545",
    },
    polygon: {
      url: "https://rpc-mainnet.maticvigil.com/",
      accounts: [process.env.PRIVATE_KEY],
    },
    mumbai: {
      url: "https://rpc.ankr.com/polygon_mumbai",
      accounts: [process.env.PRIVATE_KEY],
    },
    goerli: {
      url: "https://rpc.ankr.com/eth_goerli",
      accounts: [process.env.PRIVATE_KEY],
    },

    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/YTZ4co0ktED8_pxzfX77Lqg9Z2z4SCX_",
      accounts: [process.env.PRIVATE_KEY],
    },

    saga: {
      url: "https://sagaevm.jsonrpc.sagarpc.io",
      accounts: [process.env.PRIVATE_KEY],
    },

    tenderly: {
      url: "https://virtual.mainnet.rpc.tenderly.co/6d1560ec-298e-42e7-835c-69e6a7120317",
      accounts: [process.env.PRIVATE_KEY],
    },
  },

  // tenderly: {
  //   // https://docs.tenderly.co/account/projects/account-project-slug
  //   project: "noya",
  //   username: "hakotama",
  //   privateVerification: false
  // },
};
