const hre = require("hardhat");
const abi = require("../artifacts/contracts/BuyMeCoffee.sol/BuyMeCoffee.json");
const { ethers, waffle} = require("hardhat");
const { gasReporter } = require("../hardhat.config");

async function getBalance(provider, address) {
    const balanceBigInt = await provider.getBalance(address);
    return hre.ethers.utils.formatEther(balanceBigInt);
}

async function main() {
    
    const contractAddress = "0x5b41940ee7b8fafe1d6a2907735f9ab2aae08578";
    const contractABI =  abi.abi;

    const provider = new hre.ethers.providers.AlchemyProvider("goerli", process.env.GOERLI_API_KEY);
    //provider are basically provider who prodvides nodes we,re using alchemy nodes 

    const signer = new hre.ethers.Wallet(process.env.PRIVATE_KEY, provider);
    //signer is your walletaccount which you used to deploy orginally


    const BuyMeCoffee = new hre.ethers.Contract(contractAddress, contractABI, signer);
    //put them together

    console.log("current balance of owner is:", await getBalance(provider, signer.address), "ETH");
    const contractBalance = await getBalance(provider, BuyMeCoffee.address);
    console.log("current balance of smart contract is:", await getBalance(provider, BuyMeCoffee.address), "ETH");
    
    //withdraw fund if there are any fund
    if(contractBalance !== "0.0") {
        console.log("withdrwung funds...");
        const withdrawTxn = await BuyMeCoffee.withrawTips();
        await withdrawTxn.wait();
    } else {
        console.log("no funds to withdraw!!!");
    }

    console.log("current balance of owner is:", await getBalance(provider, signer.address), "ETH");

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });