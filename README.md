This repository is a monorepo, containing 2 applications.
The first one is a solidity application, that contains the contracts.
The second one is a react application that is used to interact with the contract using an UI.

## Solidity Application

### Folder Structure  

| Path | Description |
| ------ | ------ |
|contracts|The Solidity code that has the contract's rules| 
|test|JavaScript code that will test the contract| 
|compile.js|JavaScript responsible for compiling the Solidity code. The compilation spits out the ByteCode (runs in the blockchain) and the ABI (an interface that will be necessary to iterate with the Etherum Network)|
|deploy.js|JavaScript responsible for deploying the contract|


### Dependencies

| Dependency | Description |
| ------ | ------ |
|solc|Responsible for compiling the solidity code| 
|mocha|JavaScript test framework| 
|ganache-cli|Etherum local test network. Besides creating the network, it also creates testing accounts|
|infura| Ethereum API used to interact with the nodes inside Etherum Network|
|web3|Responsible for interacting with any Etherum network. Must receive a provider (Infura or Ganache)|


### Testing Architecture
![Text Flow](https://user-images.githubusercontent.com/60303480/126044218-1912da8c-5b0d-4462-8b8c-de24178951e2.png)

### Deploy Architecture
![Text Flow](https://user-images.githubusercontent.com/63314125/126158326-807f94f1-0083-4117-ac3c-98eb3ccf04fd.png)

### Running the Deploy Script:

Before running the command below you need to have an Etherum account and also an API to communicate with the Etherum Network. You can use Infura to provide the API for you.

```sh
$ mnemonic='' etherum_api='' node deploy.js
```

After that, you will see the address where this contract was deployed. You can use https://rinkeby.etherscan.io/ to monitor every transaction made on that contract.

## React Application

### Folder Structure  

| Path | Description |
| ------ | ------ |
||| 
||| 
|||
|||


### Dependencies

| Dependency | Description |
| ------ | ------ |
||| 
||| 
|||
|||
|||