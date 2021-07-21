const assert = require('assert')
const ganache = require('ganache-cli')
const Web3 = require('web3')

const web3 = new Web3(ganache.provider())
const {interface, bytecode} = require('../compile')

describe('Lottery', () => {
    
    let accounts    
    let deployedContract

    beforeEach(async () => {        
        accounts = await web3.eth.getAccounts()        
        let contract = new web3.eth.Contract(JSON.parse(interface))        
        let transaction = await contract.deploy({data: bytecode})        
        deployedContract = await transaction.send({
            from: accounts[0], 
            gas: '1000000'
        })
    })

    it('Contract must have been deployed', () => {
        assert.ok(deployedContract.options.address)
    })

    it('Must set the manager with the account used on the deployment', async () => {
        let manager = await deployedContract.methods.manager().call()
        assert.strictEqual(manager, accounts[0])
    })

    it('Allow one user to join the loterry with 0.01 ether', async () => {    
        const userAccount = accounts[1]
        await deployedContract.methods.enter().send({
            from: userAccount,
            value: web3.utils.toWei('0.01')
        })
        let players = await deployedContract.methods.getPlayers().call({
            from: userAccount          
        })
        assert.strictEqual(players[0], userAccount)
        assert.strictEqual(players.length, 1)
    })

    it('Allow multiple users to join the loterry with 0.01 ether', async () => {
        let numberOfPlayers = 5;
        let allPlayers = accounts.slice(0, numberOfPlayers)
        for (let i = 0; i < allPlayers.length; i++) {            
            await deployedContract.methods.enter().send({
                from:allPlayers[i],
                value: web3.utils.toWei('0.01')
            })
        }
        let players = await deployedContract.methods.getPlayers().call({
            from: accounts[0]
        })
        assert.deepStrictEqual(players, allPlayers)      
    })

    it('Must not accept user to join the loterry with less than 0.01 ether', async () => {        
        try {
            await deployedContract.methods.enter().send({
                from: accounts[1],
                value: web3.utils.toWei('0.009')
            })    
            assert(false)
        } catch (err) {             
            assert.strictEqual(err.results[err.hashes].error, 'revert')          
        }        
    })

    it('Non managers must not be able to pick the winner', async () => {
        try {
            // Add a single player to the lottery
            const userAccount = accounts[1]
            await deployedContract.methods.enter().send({
                from: userAccount,
                value: web3.utils.toWei('0.01')
            })
            // Pick the winner
            await deployedContract.methods.pickWinner().send({
                from: accounts[1],
            })
            assert(false)
        } catch (err) {             
            assert.strictEqual(err.results[err.hashes].error, 'revert')          
        }
    })

    it('Money must be sent to the winner and player list must be reseted', async () => {
        // Add a single player to the lottery                
        const lotteryValue = web3.utils.toWei('1')
        await deployedContract.methods.enter().send({
            from: accounts[1],
            value: lotteryValue
        })

        // Check amount of ether on the accounts
        let initialPlayerBalance = await web3.eth.getBalance(accounts[1])
        let initialContractBalance = await web3.eth.getBalance(deployedContract.options.address)
        
        // Pick a winner
        await deployedContract.methods.pickWinner().send({
            from: accounts[0]
        })

        // Check amount of ether on the accounts
        let finalPlayerBalance = await web3.eth.getBalance(accounts[1])
        let diffBalance = (finalPlayerBalance - initialPlayerBalance).toString()
        let finalContractBalance = await web3.eth.getBalance(deployedContract.options.address)
        
        // Get the player list
        let players = await deployedContract.methods.getPlayers().call()
        
        assert.strictEqual(players.length, 0)
        assert.strictEqual(lotteryValue, diffBalance)
        assert.strictEqual(initialContractBalance, lotteryValue)
        assert.strictEqual(finalContractBalance, '0')
    })

})