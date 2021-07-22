import web3 from './web3'

const contractAddress = '0x41371a4a286cebf6163166692bbc7026122c8eab'
const contractABI = [
    {
        constant: true,
        inputs: [],
        name: "manager",
        outputs: [
            {
                name: "",
                type: "address"
            }
        ],
        payable: false,
        stateMutability: "view",
        type: "function"
    },
    {
        constant: false,
        inputs: [],
        name: "pickWinner",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        constant: true,
        inputs: [],
        name: "getPlayers",
        outputs: [
            {
                name: "",
                type: "address[]"
            }
        ],
        payable: false,
        stateMutability: "view",
        type: "function"
    },
    {
        constant: false,
        inputs: [],
        name: "enter",
        outputs: [],
        payable: true,
        stateMutability: "payable",
        type: "function"
    },
    {
        constant: true,
        inputs: [
            {
                name: "",
                type: "uint256"
            }
        ],
        name: "players",
        outputs: [
            {
                name: "",
                type: "address"
            }
        ],
        payable: false,
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "constructor"
    }
]

// Configure web3 to communicate with our contract
export default new web3.eth.Contract(contractABI, contractAddress)
