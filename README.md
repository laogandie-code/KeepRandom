# keep.random

### A powerful tool to provide true randomness powered by Keep Network

![Keep logo](https://forum.keepforum.top/uploads/default/original/1X/a10b95246ad57ccab7657876aec58288563c354a.png)

## Description

keep.random is a powerful tool to provide true randomness in a trustless way. We built this tool by use the random beacon of Keep network.The random beacon is designed as an engine that can power many apps addressing many different use cases. For example, in tBTC, it selects the signers for deposits of TBTC— that users can trust the system without having to trust middlemen, because there are no middlemen.

Based on the feature of Keep Random Beacon, we built Keep.Random for you.  You can use it to get true randomness in a trustless way and apply it to your dapp. Please think Imaginatively and have a try!

## How does it work?

![How does it work (1)](http://keeprandom.top/img/flow.png)

keep.random consists of two parts: function `sendTx()`, and `random contract`.

For all dApps that need to invoke random values, you first need to import the package `keep.random`. When dApp needs to call a random value, all it has to do is call function `sendTx()`  in keep.random to send a transaction to the random beacon. At this time, the random beacon will return a random value to our random contract. When the random contract gets the random value, keep.random will automatically fetch the random value from the random contract, and then return to dApp. The reason for our design is that the user cannot call the random value directly via the random beacon, and the random value of the random beacon can only be returned to another smart contract, rather than directly to the user. So we packaged the process of calling random values from the random Beacon, and simplify it into this powerful tool where the user only needs to send a transaction to get the result without going through the complicated process.

## Specialty

Based on Ethereum blockchain and Keep Network, our tool have the following advantages:

- Transparent
- Decentralized
- Trustless

## How to use?

We made all of those into an NPM package. So the only thing you have to do is importing the package. Make sure your web3 environment configs correctly.

1. Install the client

```
npm install keep-random

```

2. Use your favourite wallet to send tx.

```
// import the module
import keepRandom from 'keep.random';

// send random transaction
const randomResult = await keepRandom.sendTx(web3);

```

3. Get random result from keep.random.

```
// get the result
if (randomResult) {
    console.log(randomResult);
} else {
    console.log('failed');
}

```


## Demo

```javascript

import Web3 from 'web3';
import keepRandom from 'keep.random';

async function getRandomService () {
    // make sure your web3 environment configs correctly.
    let web3Provider;

    if (window.ethereum) {
        web3Provider = window.ethereum;
        try {
          // Request account access
          await window.ethereum.enable();
        } catch (error) {
          // User denied account access...
          console.error("User denied account access");
        }
    } else if (window.web3) {
        web3Provider = window.web3.currentProvider;
    } else {
        // If no injected web3 instance is detected, display err
        console.log("Please install MetaMask!");
        return;
    }
    const web3 = new Web3(web3Provider);

    const randomResult = await keepRandom.sendTx(web3);

    // do something
}

```
