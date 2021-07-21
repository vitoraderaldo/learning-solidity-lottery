pragma solidity ^0.4.17;

contract Lottery {
    
    address public manager;
    address[] public players;
    
    function Lottery() public {
        manager = msg.sender;
    }
    
    function enter() public payable {
        // Validate if it the player is sending enough amount of ETHER
        require(msg.value >= 0.01 ether);
        // Adds the player on the list
        players.push(msg.sender);
    }
    
    function random() private view returns (uint) {
        // Creates random number based on the block, time and players
        return uint(keccak256(block.difficulty, now, players));
    }
    
    function pickWinner() public onlyManager {
        // Validate if it's the manager who is calling this function
        require(msg.sender == manager);
        // Get a random player from the list
        uint index = random() % players.length;
        // Send to this player all the ETHER this contract has received
        players[index].transfer(this.balance);
        // Reset the player list
        players = new address[](0);
    }
    
    function getPlayers() public view returns (address[]) {
        return players;
    }
    
    modifier onlyManager() {
        require(msg.sender == manager);
        _;
    }    
}