#!/bin/bash

DT=$(date +%Y-%m-%d-%H-%M)
DIR=.bak
FILE="$DIR/$DT.tgz"
FILE_EXCLUDE=exclude.tag
mkdir $DIR -p

touch .bak/$FILE_EXCLUDE
touch .vscode/chrome/${FILE_EXCLUDE}
touch node_modules/${FILE_EXCLUDE}
touch chaincode-person/node_modules/${FILE_EXCLUDE}
touch packages/common/node_modules/${FILE_EXCLUDE}
touch packages/participant-cc/node_modules/${FILE_EXCLUDE}
touch packages/person-cc/node_modules/${FILE_EXCLUDE}
touch packages/server-graphql/node_modules/${FILE_EXCLUDE}
touch packages/server-rest/node_modules/${FILE_EXCLUDE}
touch packages/frontend-react/node_modules/${FILE_EXCLUDE}

tar -zcvf $FILE \
  --exclude-tag-all=$FILE_EXCLUDE \
  --exclude='FILE|DIR' \
  ../NodeNestPackages \
  ../NodeNestJsHyperLedgerConvectorRestStarter
