# DEBUG Notes

to start debug and develop chaincode always follow this steps to prevent some hard times put debugger working......

1. restart network manually without deploying chaincode, leave it to deploy with debugger

```shell
# restart hyperledger network
$ npm run env:restart
```

3. lauch chaincode in debug mode

```shell
# start define CHAINCODE_NAME
$ CHAINCODE_NAME=solidary-network-chaincode
$ npm run cc:start:debug -- ${CHAINCODE_NAME}
```

> ignore error `Error: could not assemble transaction, err proposal response was not successful, error code 500, msg chaincode with name 'solidary-network-chaincode' already exists`

> note it won't appear with in container with below command

```shell
$ watch "docker container ls --format "{{.Names}}" | grep \"${CHAINCODE_NAME}\""
```


IT IS POSSIBLE to debug all night the chaincode and the grapqqhl at same time :) just follow the above stps
Every 2.0s: docker container ls --format {{.Names}} | grep "solidary-network-chaincode"   KoakhLaptop: Sat Feb  1 23:13:36 2020







add notes to debug graphql at same time to