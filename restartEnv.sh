#!/bin/bash

# helper script to restart hyperledger network

clear

# lift hyperledger
npm run env:restart

# deploy smart contract/chaincode
npm run cc:start -- solidary-network-chaincode

# sleep 20 seconds
sleep 20

# seed ledger
npm run seed

# create views
./views/install.sh

# prevent lost props, rebuild chaincode packages
npx lerna run build --scope person-cc
npx lerna run build --scope participant-cc
npx lerna run build --scope cause-cc
npx lerna run build --scope transaction-cc

# invoke some stuff
# npx hurl invoke solidary-network-chaincode person_get 1-100-100
npx hurl invoke solidary-network-chaincode person_get 4ea88521-031b-4279-9165-9c10e1839001

# start server/frontend
# echo "start server-rest with: 'npx lerna run start:dev --scope @solidary-network/server-rest --stream'"
echo "start server-graphql with: 'npx lerna run start:dev --scope @solidary-network/server-graphql --stream'"
echo "start frontend-react with: 'npx lerna run start --scope @solidary-network/frontend-react --stream'"

# reset upgrade-chaincode version
FILE_VERSION=upgrade-chaincode.txt
echo 1.0 > FILE_VERSION
