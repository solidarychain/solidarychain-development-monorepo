#!/bin/bash

# helper script to restart hyperledger network

clear

# lift hyperledger
npm run env:restart
# deploy smart contract
npm run cc:start -- person
# seed ledger
npm run seed
# create views
./views/install.sh

# prevent lost props, rebuild chaincode packages
npx lerna run build --scope person-cc
npx lerna run build --scope participant-cc

# invoke some stuff
# invoke some stuff
npx hurl invoke person person_get 1-100-100

# start server
echo "start server with: npx lerna run start:debug --scope server --stream"
