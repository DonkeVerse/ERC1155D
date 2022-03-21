/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require("@nomiclabs/hardhat-truffle5");

module.exports = {
  solidity: {
    version: "0.8.0",
    settings: {
      optimizer: {
        enabled: true,
        runs: 10001,
      },
    },
  },
  networks: {
    hardhat: {
      blockGasLimit: 10000000,
      allowUnlimitedContractSize: true,
    },
  },
  gasReporter: {
    currency: "USD",
    enabled: process.env.REPORT_GAS ? true : false,
    // coinmarketcap: OPTIONAL_API_KEY, //https://www.npmjs.com/package/hardhat-gas-reporter
  },
};

/// @dev Optionally, check coverage
// require('solidity-coverage');
// module.exports.networks.hardhat.initialBaseFeePerGas = 0;
