#!/bin/sh

read -p "Enter chaincode version [1.0]: " VERSION
VERSION=${VERSION:-1.0}

if [ $VERSION -eq "" ]
  then
    echo "required VERSION number"
fi

echo "building packages..."
npx lerna run build --scope @solidary-network/common --stream
npx lerna run build --scope @solidary-network/person-cc --stream
npx lerna run build --scope @solidary-network/participant-cc --stream
npx lerna run build --scope @solidary-network/transaction-cc --stream

echo "upgrading chaincode..."
npm run cc:upgrade -- person ${VERSION}

echo "done..."
