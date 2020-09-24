Random Services by Keep

### Description

keep.random is a random service made by keep, which you can get random number easily. All transactions can be traced on Ethereum.

### How to use?

You only need to import the package, make sure your web3 environment configs correctly.

### Demo

```javascript

import Web3 from 'web3';
import keepRandom from 'keep-random';

async function getRandomService () {
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

}

// get random
getRandomService();

```
