require('@nomicfoundation/hardhat-toolbox');
require('hardhat-deploy');
const {
  api3Contracts: { hardhatConfig },
} = require('@nodary/utilities');
require('dotenv').config();

module.exports = {
  networks: hardhatConfig.networks(),
  solidity: {
    version: '0.8.17',
  },
};
