# DEBUG Notes

to start debug and develop chaincode always follow this steps to prevent some hard times put debugger working......

1. restart network manually without deploying chaincode, leave it to deploy with debugger

```shell
$ npm run env:restart
```



IT IS POSSIBLE to debug all night the chaincode and the grapqqhl at same time :) just follow the above stps




{ message: 'Cannot read property \'id\' of undefined',
  stack: 'TypeError: Cannot read property \'id\' of undefined\n    at /media/mario/Storage/Development/@Solidary.Network/network/chaincode-solidary-network-chaincode/packages/@solidary-network/participant-cc/dist/src/utils.js:28:54\n    at step (/media/mario/Storage/Development/@Solidary.Network/network/chaincode-solidary-network-chaincode/node_modules/tslib/tslib.js:136:27)\n    at Object.next (/media/mario/Storage/Development/@Solidary.Network/network/chaincode-solidary-network-chaincode/node_modules/tslib/tslib.js:117:57)\n    at fulfilled (/media/mario/Storage/Development/@Solidary.Network/network/chaincode-solidary-network-chaincode/node_modules/tslib/tslib.js:107:62)\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:189:7)' }


# lift hyperledger


$ npm run cc:start:debug -- ${CHAINCODE_NAME}

It may take a few minutes depending on the chaincode dependencies
2020-02-01 20:27:39.449 WET [chaincodeCmd] checkChaincodeCmdParams -> INFO 001 Using default escc
2020-02-01 20:27:39.449 WET [chaincodeCmd] checkChaincodeCmdParams -> INFO 002 Using default vscc
info: [Chaincode] =========== Instantiated Chaincode chaincode ===========
info: [Chaincode] Transaction ID: 0155d08ec81158aed029822baf84e97baec9b0fe1275e3573ab81d96dc9ab4d6
info: [Chaincode] Args: init,
2020-02-01T20:27:39.465Z info [shim:lib/handler.js]                               [ch1-0155d08e] Calling chaincode Init() succeeded. Sending COMPLETED message back to peer  
Instantiated Chaincode at org1  


next changes use same chaincode...., to deploy changesctrl+c and 


$ npm run cc:start:debug -- ${CHAINCODE_NAME}

even if the message 
Error: could not assemble transaction, err proposal response was not successful, error code 500, msg chaincode with name 'solidary-network-chaincode' already exists
appears it stop in breakpoint