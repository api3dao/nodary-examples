require('@nomicfoundation/hardhat-toolbox');
require('hardhat-deploy');
const { hardhatConfig } = require('@api3/contracts');
require('dotenv').config();

module.exports = {
  networks: hardhatConfig.networks(),
  solidity: {
    version: '0.8.17',
  },
};
