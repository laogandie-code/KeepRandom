/*
 * Random services by keep.
**/
const Web3 = require('web3');
const config = require('../config/config.json');
const randomABI = require('../config/random.abi.json');
const keepRandomABI = require('../config/keep.random.abi.json');

var keepRandom = {
    web3: null,
    randomObj: null,
    customKeepRandomObj: null,
    networkName: 'main',

    async init() {
        let web3Provider;

        if (window.ethereum) {
            web3Provider = window.ethereum;
        } else if (window.web3) {
            web3Provider = window.web3.currentProvider;
        } else {
            console.log("Please install MetaMask!");
            return;
        }

        const web3 = new Web3(web3Provider);
        const network = await web3.eth.net.getId();
        const accounts = await web3.eth.getAccounts();
        const networkName = network == 1 ? 'main' : 'ropsten';
        const randomObj = new web3.eth.Contract(randomABI, config[networkName].Random);
        const customKeepRandomObj = new web3.eth.Contract(keepRandomABI, config[networkName].KeepRandom);

        this.walletAddress = accounts[0];
        this.randomObj = randomObj;
        this.customKeepRandomObj = customKeepRandomObj;
        this.networkName = networkName;
    },

    sendTx: async function(web3Obj) {
        await this.init();

        if (!web3Obj) {
            web3Obj = this.web3;
        }

        if (this.randomObj) {
            const customKeepRandomContract = config[this.networkName].KeepRandom;
            const keepRandomContract = config[this.networkName].Random;
            const result = this.randomObj.methods.requestRelayEntry(customKeepRandomContract, 2000000).encodeABI();
            const walletAddress = this.walletAddress;

            // send tx
            const txResult = await web3Obj.eth.sendTransaction({
                from: walletAddress,
                to: keepRandomContract,
                value: '1000000000000000000',
                data: result,
                gas: 2000000
            });

            // get random result
            const randomNumber = this.customKeepRandomObj.methods.lastEntry().call();

            return randomNumber;
        } else {
            console.error('No contract load.');
        }
    }
};

module.exports = keepRandom;
