require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-waffle");

require("dotenv").config()

const GOERLI_URL = "https://eth-goerli.g.alchemy.com/v2/dk-8cgZFbri5wm1a91PrqPxJUlyY5Wqw";
const PRIVATE_KEY = "248b8e5815bc34228fbd0f4fb2639a146c799255e4d5af2fa53c660c94791edd";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: "https://eth-goerli.g.alchemy.com/v2/dk-8cgZFbri5wm1a91PrqPxJUlyY5Wqw",
      accounts: [PRIVATE_KEY]
    }
  }
};
