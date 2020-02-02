# DEBUG/Develop Environment Notes

## Important Notes

1. to change chaincode while debug, use `dist/**/*.js` file versions
2. if change are made in `chaincode-solidary-network-chaincode/**/*.ts` source code, don't forget to apply the sames on `packages/**/*.ts` to
3. 

## Start in debug chaincode

to start debug and develop chaincode always follow this steps to prevent some hard times put debugger working......

### 1. restart network manually, without `restartEnv.sh` script, and without deploying chaincode, on network, we use debug mode environment, that does not lift any container

```shell
# restart hyperledger network
$ npm run env:restart
```

### 2. launch chaincode in debug mode

```shell
# start define CHAINCODE_NAME
$ CHAINCODE_NAME=solidary-network-chaincode
$ npm run cc:start:debug -- ${CHAINCODE_NAME}
```

> NOTE: `dev-peer0.org2.hurley.lab-solidary-network-chaincode-1.x` container, won't appear with below command

```shell
$ watch "docker container ls --format "{{.Names}}" | grep \"${CHAINCODE_NAME}\""
```

### 3. now wait that the chaincode in running

```shell
# debugger attached
Debugger attached.
2020-02-02T17:39:26.823Z info [shim:lib/chaincode.js]                             Registering with peer localhost:7152 as chaincode "solidary-network-chaincode:1.0"  
2020-02-02T17:39:26.865Z info [shim:lib/handler.js]                               Successfully registered with peer node. State transferred to "established"  
2020-02-02T17:39:26.873Z info [shim:lib/handler.js]                               Successfully established communication with peer node. State transferred to "ready"  
Debugger attached.
2020-02-02T17:39:27.288Z info [shim:lib/chaincode.js]                             Registering with peer localhost:7052 as chaincode "solidary-network-chaincode:1.0"  
2020-02-02T17:39:27.313Z info [shim:lib/handler.js]                               Successfully registered with peer node. State transferred to "established"  
2020-02-02T17:39:27.315Z info [shim:lib/handler.js]                               Successfully established communication with peer node. State transferred to "ready"  
Instantiating Chaincode at org1 for channel ch1
It may take a few minutes depending on the chaincode dependencies
2020-02-02 17:39:35.708 WET [chaincodeCmd] checkChaincodeCmdParams -> INFO 001 Using default escc
2020-02-02 17:39:35.708 WET [chaincodeCmd] checkChaincodeCmdParams -> INFO 002 Using default vscc
Error: could not assemble transaction, err proposal response was not successful, error code 500, msg chaincode with name 'solidary-network-chaincode' already exists
```

> ignore error `Error: could not assemble transaction, err proposal response was not successful, error code 500, msg chaincode with name 'solidary-network-chaincode' already exists`

### 4. Debug breakpoints

add some breakpoints on `chaincode-solidary-network-chaincode/packages/@solidary-network/transaction-cc/src` or `chaincode-solidary-network-chaincode/packages/@solidary-network/transaction-cc/dist/src` and have fun

### 5. Edit and deploy chaincode again

after edit code changes, stop current debug with ctrl+c and re-launch chaincode in debug mode again and that's all

```shell
# start define CHAINCODE_NAME
$ CHAINCODE_NAME=solidary-network-chaincode
$ npm run cc:start:debug -- ${CHAINCODE_NAME}
```

## Start GraphQL Server

done