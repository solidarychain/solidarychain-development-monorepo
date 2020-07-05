#!/bin/sh

FILE_VERSION=upgrade-chaincode.txt
CHAINCODE_NAME=solidary-chain-chaincode
[ -f $FILE_VERSION ] && VERSION=$(cat ${FILE_VERSION})
read -p "Enter chaincode version. current VERSION is [${VERSION:-1.0}]: " VERSION
VERSION=${VERSION:-1.0}

if [ $VERSION -eq "" ]
  then
    echo "required VERSION number"
fi

echo "building packages..."
npx lerna run build --scope @solidary-chain/common --stream
npx lerna run build --scope @solidary-chain/person-cc --stream
npx lerna run build --scope @solidary-chain/participant-cc --stream
npx lerna run build --scope @solidary-chain/cause-cc --stream
npx lerna run build --scope @solidary-chain/asset-cc --stream
npx lerna run build --scope @solidary-chain/transaction-cc --stream

echo "upgrading chaincode ${CHAINCODE_NAME} ${VERSION}"
npm run cc:upgrade -- ${CHAINCODE_NAME} ${VERSION}

# increase after done without errors
echo ${VERSION} > ${FILE_VERSION}

echo "done..."
