#!/bin/sh

FILE_VERSION=upgrade-chaincode.txt
[ -f $FILE_VERSION ] && VERSION=$(cat ${FILE_VERSION})
read -p "Enter chaincode version. current VERSION is [${VERSION:-1.0}]: " VERSION
VERSION=${VERSION:-1.0}
echo ${VERSION} > ${FILE_VERSION}

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
