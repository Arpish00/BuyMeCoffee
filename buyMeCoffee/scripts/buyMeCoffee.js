// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function getBalance(address){
  const balanceBigInt = await hre.ethers.provider.getBalance(address);
  return hre.ethers.utils.formatEther(balanceBigInt);
  //returns balance of address
}

async function printBalance(addresses){
  let idx = 0;
  for (const address of addresses) {
    console.log(`balance of ${idx}:`, await getBalance(address));
    idx++;
    //console logging each balance
  }
}
  async function printMemo(memos){
    for(const memo of memos) {
      const timestamp = memo.timestamp;
      const name = memo.name;
      const addressOf = memo.from;
      const message = memo.message;
      console.log(`At ${timestamp}, ${name} sent from ${addressOf} with this message: ${message}`);
    }
  }

  async function main(){
    const [owner, user1, user2, user3] = await hre.ethers.getSigners();

    const BuyMeCoffee = await hre.ethers.getContractFactory("BuyMeCoffee");
    const buyMeCoffee = await BuyMeCoffee.deploy();

    await buyMeCoffee.deployed();
    console.log("BuyMeCoffee is depoyes to:", buyMeCoffee.address);

    const addresses = [owner.address, user1.address, buyMeCoffee.address];
    console.log("==start==");
    await printBalance(addresses);

    const tips = {value: hre.ethers.utils.parseEther("1")};
    await buyMeCoffee.connect(user1).BuyCoffee("Carolina", "You're the best!", tips);
    await buyMeCoffee.connect(user2).BuyCoffee("Vitto", "Amazing teacher", tips);
    await buyMeCoffee.connect(user3).BuyCoffee("Kay", "I love my Proof of Knowledge", tips);

    console.log("==bought coffee==");
    await printBalance(addresses);

    await buyMeCoffee.connect(owner).withrawTips();
    
     console.log("winthraw tips");
     await printBalance(addresses);


     console.log("==memos==");
     const memos = await buyMeCoffee.showMemo();
     printMemo(memos);
  }

  main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
