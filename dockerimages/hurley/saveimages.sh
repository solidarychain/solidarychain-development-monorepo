#!/bin/bash

# CAUTION backup of hyperledger images, to prevent fail on future deprecated images

# docker image ls | grep hyperledger
# hyperledger/fabric-ccenv
# hyperledger/fabric-tools
# hyperledger/fabric-orderer
# hyperledger/fabric-peer
# hyperledger/fabric-ca
# hyperledger/fabric-couchdb
# hyperledger/fabric-baseimage

docker image save -o hyperledger/fabric-ccenv hyperledger/fabric-ccenv
docker image save -o hyperledger/fabric-tools hyperledger/fabric-tools
docker image save -o hyperledger/fabric-orderer hyperledger/fabric-orderer
docker image save -o hyperledger/fabric-peer hyperledger/fabric-peer
docker image save -o hyperledger/fabric-ca hyperledger/fabric-ca
docker image save -o hyperledger/fabric-couchdb hyperledger/fabric-couchdb
docker image save -o hyperledger/fabric-baseimage hyperledger/fabric-baseimage
