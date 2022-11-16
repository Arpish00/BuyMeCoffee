// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract BuyMeCoffee {
    //declare new event

    struct Memo {
        address from;
        uint256 timeStamp;
        string name;
        string message;
    }

    event newRaise(
        address indexed from,
        uint256 timeStamp,
        string name,
        string message
    );


    //making this account payable
    //address payable owner;
    address payable owner = payable(msg.sender);

    //array
    Memo[] memos;

    // constructor(){
    //     owner = payable(msg.sender)
    //     //making the owner payable
    // }

    function showMemo() public view returns (Memo[] memory) {
        return memos;
        //function to just veiw memos
    }

    function BuyCoffee(string memory _name, string memory _message) public payable {
        require(msg.value > 0, "plese input valid amount!");

        //add memo to storage
        memos.push(
            Memo(
            msg.sender,
            block.timestamp,
            _name,
            _message
        ));

        emit newRaise(
            msg.sender,
            block.timestamp,
            _name,
            _message
        );
    }

    //funcion to withraw
    function withrawTips() public{
        require(owner.send(address(this).balance));
    }

}