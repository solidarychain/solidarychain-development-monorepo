#!/bin/bash

# bring 
# call it from root project root ./bringProductionNetworkFiles.sh

# deploy machine
DEPLOY_IP="192.168.1.61"
TARGET_PATH="./network"
NETWORK_PROFILE_FILE="org1.network-profile-raft.yaml"
PROJECT_DIR=5node2channel
# PROJECT_DIR=5node2channel-solo
# solo notes
# give this error try to use certs, but is don't have tls /var/hyperledger/configs/ordererOrganizations/example.com/orderers/orderer1.example.com/msp/tlscacerts/tlsca.example.com-cert.pem: no such file or directory
# leave this way, we don't want to change the location path for solo mone

# crypto materials
rm -rf ${TARGET_PATH}/crypto-config
rm -rf ${TARGET_PATH}/generated
# old scp method when ue use orderer1 192.168.1.61, and we need to bring files form it, now we have it in local filesyste in /home/mario/Development/@SolidaryChain/solidarychain-production-network/fabric-samples/5node2channel
# scp -r ${DEPLOY_IP}:/srv/docker/hyperledger-fabric-extra_hosts-5orgs/fabric-samples/${PROJECT_DIR}/crypto-config ${TARGET_PATH}
# scp -r ${DEPLOY_IP}:/srv/docker/hyperledger-fabric-extra_hosts-5orgs/fabric-samples/${PROJECT_DIR}/wallet/fabcar/javascript/generated ${TARGET_PATH}
# form local filesystem
cp -r ../solidarychain-production-network/fabric-samples/${PROJECT_DIR}/crypto-config ${TARGET_PATH}
cp -r ../solidarychain-production-network/fabric-samples/${PROJECT_DIR}/wallet/fabcar/javascript/generated ${TARGET_PATH}
cp -r ../solidarychain-production-network/fabric-samples/${PROJECT_DIR}/server-graphql/docker-compose-server-graphql.yml ${TARGET_PATH}

# network-profile: raft
if [ ${PROJECT_DIR} = "5node2channel" ]; then
  # old scp method when ue use orderer1 192.168.1.61, and we need to bring files form it, now we have it in local filesyste in /home/mario/Development/@SolidaryChain/solidarychain-production-network/fabric-samples/5node2channel
  # scp -r ${DEPLOY_IP}:/srv/docker/hyperledger-fabric-extra_hosts-5orgs/fabric-samples/${PROJECT_DIR}/server-graphql/${NETWORK_PROFILE_FILE} ${TARGET_PATH}
  cp ../solidarychain-production-network/fabric-samples/${PROJECT_DIR}/server-graphql/${NETWORK_PROFILE_FILE} ${TARGET_PATH}
fi

# replace paths
SEARCH='/usr/src/app/packages/server-graphql/.hfc-org1'
REPLACE="$(pwd)/network/generated/wallets/.hfc-org1"
# require above sed format to prevent path problem "sed: -e expression #1, char 8: unknown option to `s'"
sed -i -e "s=${SEARCH}=${REPLACE}=" ${TARGET_PATH}/${NETWORK_PROFILE_FILE}

SEARCH='/usr/src/app/packages/server-graphql/crypto-config'
REPLACE="$(pwd)/network/crypto-config"
# require above sed format to prevent path problem "sed: -e expression #1, char 8: unknown option to `s'"
sed -i -e "s=${SEARCH}=${REPLACE}=" ${TARGET_PATH}/${NETWORK_PROFILE_FILE}
