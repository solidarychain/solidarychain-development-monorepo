# DEBUG/Develop Environment Notes

## Important Notes

1. to change chaincode while debug, use `dist/**/*.js` file versions
2. if change are made in `chaincode-solidary-network-chaincode/**/*.ts` source code while debugging, don't forget to apply the same changes on `packages/**/*.ts`

## Start in debug chaincode

to start debug and develop chaincode always follow this steps to prevent some hard times put debugger working......

### 1. restart network manually, without `restartEnv.sh` script, and without deploying chaincode, on network, we use debug mode environment, that does not lift any container

```shell
# restart hyperledger network
$ npm run env:restart
[hurley] - You can find the network topology (ports, names) here: /home/mario/hyperledger-fabric-network/docker-compose.yaml
```

### 2. launch chaincode in debug mode

```shell
# start define CHAINCODE_NAME
$ CHAINCODE_NAME=solidary-network-chaincode
# launch chaincode debug, NOTE this command must be run inside Vscode
$ npm run cc:start:debug -- ${CHAINCODE_NAME}
```

> NOTE: `dev-peer0.org2.hurley.lab-solidary-network-chaincode-1.x` container, won't appear with below command, like it does when we deploy chaincode without `cc:start:debug`

```shell
$ watch "docker container ls --format "{{.Names}}" | grep \"${CHAINCODE_NAME}\""
```

### 3. now wait that the chaincode in running

```shell
# debugger attached
Debugger attached.
...
Instantiating Chaincode at org1 for channel ch1
It may take a few minutes depending on the chaincode dependencies
2020-02-02 17:39:35.708 WET [chaincodeCmd] checkChaincodeCmdParams -> INFO 001 Using default escc
2020-02-02 17:39:35.708 WET [chaincodeCmd] checkChaincodeCmdParams -> INFO 002 Using default vscc
Error: could not assemble transaction, err proposal response was not successful, error code 500, msg chaincode with name 'solidary-network-chaincode' already exists
```

> ignore error `Error: could not assemble transaction, err proposal response was not successful, error code 500, msg chaincode with name 'solidary-network-chaincode' already exists`

### 3. Add some seed to ledger

```shell
./seed.sh
```

> advice to launch line by line in case of problems....

### 4. Debug breakpoints

add some breakpoints on `chaincode-solidary-network-chaincode/packages/@solidary-network/transaction-cc/src` or `chaincode-solidary-network-chaincode/packages/@solidary-network/transaction-cc/dist/src` and have fun

### 5. Edit and deploy chaincode again

after edit code changes, stop current debug with ctrl+c and re-launch chaincode in debug mode again and that's all, it is VERY FAST and we asure we edit the source *.ts

```shell
# start define CHAINCODE_NAME
$ CHAINCODE_NAME=solidary-network-chaincode
$ npm run cc:start:debug -- ${CHAINCODE_NAME}
# require to restart graphql server
$ npx lerna run start:debug
```

or edit files in `chaincode-solidary-network-chaincode/packages/@solidary-network/${PACKAGE}-cc/src/*.ts`
