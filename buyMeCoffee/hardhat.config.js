require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-waffle");

require("dotenv").config()

const GOERLI_URL = YOUR GEORLI URL HERE;
const PRIVATE_KEY = YOU PRIVATE KEY HERE;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: [GOERLI_URL],
      accounts: [PRIVATE_KEY]
    }
  }
};
