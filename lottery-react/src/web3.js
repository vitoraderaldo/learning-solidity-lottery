import Web3 from 'web3'

// Request metamask to use their provider
window.ethereum.request({ method: "eth_requestAccounts" });

// Creates an instance of web3 using metamask's provider
const web3 = new Web3(window.ethereum)

export default web3
