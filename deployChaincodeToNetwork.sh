#!/bin/bash

# before deploy if we need to build the chaincode we must have a running hurley network
# and must have start build in chaincode v1.0, only after this we can upgrade to next versions
# ralways `un npm run cc:start -- ${CHAINCODE_CONVECTOR}` before run `deployChaincodeToNetwork.sh` if we are in a new hurley network

# TODO: clean up this file

DEPLOYMENT_PATH="/srv/docker/hyperledger-fabric-extra_hosts-5orgs/fabric-samples/5node2channel/deployment"
CHAINCODE_DEPLOYMENT_PATH="/src/github.com/hyperledger/fabric/peer"
ABSOLUTE_PATH="/opt/gopath/src/github.com/chaincode/chaincode-solidary-chain-chaincode"
# CHAINCODE=chaincode-solidary-chain-chaincode
# ORDERER_IP=192.168.1.61
PEER0_ORG1_IP="192.168.1.61"
PEER0_ORG2_IP="192.168.1.62"
PEER0_ORG3_IP="192.168.1.63"
PEER0_ORG4_IP="192.168.1.64"
PEER0_ORG5_IP="192.168.1.65"
PEER0_ORG1_ID="1"
PEER0_ORG2_ID="2"
PEER0_ORG3_ID="3"
PEER0_ORG4_ID="4"
PEER0_ORG5_ID="5"
PEER_CHAINCODE_PATH="/srv/docker/hyperledger-fabric-extra_hosts-5orgs/fabric-samples/chaincode"
# deploy install/upgrade chaincode
CHANNEL_ALL="channelall"
CHAINCODE_NAME="sccc"
CHAINCODE_CONVECTOR="solidary-chain-chaincode"
CHAINCODE_LANG="node"
POLICY_CHANNEL_ALL="'Org1MSP.member', 'Org2MSP.member','Org3MSP.member','Org4MSP.member','Org5MSP.member'"
# POLICY_CHANNEL_ALL="'Org1MSP.peer', 'Org2MSP.peer','Org3MSP.peer','Org4MSP.peer','Org5MSP.peer'"
LANG="node"
CA_FILE="/var/hyperledger/configs/ordererOrganizations/example.com/orderers/orderer1.example.com/msp/tlscacerts/tlsca.example.com-cert.pem"
# tar tgz to push
TGZ_FILENAME="chaincode-${CHAINCODE_CONVECTOR}.tgz"
TGZ_PATH="chaincode-${CHAINCODE_CONVECTOR}"
# check version
# ssh -t ${PEER0_ORG1_IP} docker exec cli peer chaincode list --installed
# invokes
GOV_ID="c8ca045c-9d1b-407f-b9ae-31711758f2d0"
GOV_CODE="gov"
GOV_NAME="Big Government"
# seed script
SCRIPT_SEED="seedNetwork.sh"

# press any key function
press_any_key() {
  # read -n 1 -s -r -p "Press any key to continue";printf "\\n"
  # :;
  SEC=2
  echo "sleeping for ${SEC}sec..."
  sleep ${SEC}
}

if [ $(node -v) != "v8.16.0" ]; then
  echo "error! to prevent problems, use node v8.16.0"
  exit 0
fi

# STARTER version 1.0 (occurs on cc:start)
# following UPDATE versions (occure on cc:upgrade)
# ibm auction network
# VERSION="1.10"
# production network
# get current production network instantiated chaincode `ssh -t 192.168.1.61 "docker exec cli peer chaincode list -C channelall --instantiated" | grep solidary-chain-chaincode`
# get chaincode peer id `docker ps --filter "name=net-peer0.org1.example.com-solidary-chain-chaincode-1.7" -q`
# enter container `docker exec -it $(docker ps --filter "name=net-peer0.org1.example.com-solidary-chain-chaincode-1.8" -q) bash`
# log container `docker container logs -f net-peer0.org1.example.com-solidary-chain-chaincode-1.8`
VERSION="1.6"
# 1 build with hurley, 0 only when we want to skip restart hurley network to build the chaincode, with 0 we dont reBuild chaincode, good for just deploy to networks
BUILD_WITH_HURLEY="1"

echo "confirm deploy '${CHAINCODE_CONVECTOR} ${VERSION}'"
read -n 1 -s -r -p "Press any key to continue";printf "\\n"

if [ ${BUILD_WITH_HURLEY} -eq "1" ]; then
  # always clean up chaincode path
  # rm ${TGZ_PATH} -r || true
  # cleanup, remove pack after push to peers
  # rm ${TGZ_FILENAME} -r || true
  rm ${CHAINCODE_NAME}.pak || true
  rm ${TGZ_PATH} -r || true
fi

# start
# npm run cc:start -- ${CHAINCODE_CONVECTOR}
# upgrade cc
# npm run cc:upgrade -- ${CHAINCODE_CONVECTOR} ${VERSION}

# start chaincode, or upgrade based on version, required to build, and install/instantiate/upgrade chaincode
# if [ "${VERSION}" == "v0" ]; then
if [ "${VERSION}" == "1.0" ]; then
  BUILD_CC_ACTION="start"
  DEPLOY_CC_ACTION="instantiate"
  # require restart env to prevent "Error: could not assemble transaction, err proposal response was not successful, error code 500, msg chaincode with name 'solidary-chain-chaincode' already exists"
  if [ ${BUILD_WITH_HURLEY} -eq 1 ]; then
    npm run env:restart
    npx lerna run build --scope @solidary-chain/common-cc --stream
    npm run cc:${BUILD_CC_ACTION} -- ${CHAINCODE_CONVECTOR}
  fi
else
  BUILD_CC_ACTION="upgrade"
  DEPLOY_CC_ACTION="upgrade"
  if [ ${BUILD_WITH_HURLEY} -eq 1 ]; then
    npm run env:restart
    npx lerna run build --scope @solidary-chain/common-cc --stream
    npm run cc:${BUILD_CC_ACTION} -- ${CHAINCODE_CONVECTOR} ${VERSION}
  fi
fi

# pack and push
# tar cvf ${TGZ_FILENAME} ${TGZ_PATH}

# arrays
export PEERS=( ${PEER0_ORG1_IP} ${PEER0_ORG2_IP} ${PEER0_ORG3_IP} ${PEER0_ORG4_IP} ${PEER0_ORG5_IP} )
export PEERS_ID=( ${PEER0_ORG1_ID} ${PEER0_ORG2_ID} ${PEER0_ORG3_ID} ${PEER0_ORG4_ID} ${PEER0_ORG5_ID} )

for peer in "${PEERS_ID[@]}"
do
  # decrease 1 to IDS, we require a zero based index
  IDX=$peer-1
  IP=${PEERS[${IDX}]}
    # if is node 1
  if [ $peer -eq 1 ]; then
    if [ ${BUILD_WITH_HURLEY} -eq 1 ]; then
      echo "bring peer0.org1.hurley.lab packaged ${CHAINCODE_CONVECTOR}.${VERSION} to local file system ${CHAINCODE_NAME}.pak"
      # copy /var/hyperledger/production/chaincodes/solidary-chain-chaincode.1.0 to ./sccc.pak
      docker cp peer0.org1.hurley.lab:/var/hyperledger/production/chaincodes/${CHAINCODE_CONVECTOR}.${VERSION} ${CHAINCODE_NAME}.pak
      press_any_key
    fi

    # removed when we removed orderer has source of network files
    # copy package to orderer deployment path /used only was backup
    # echo "copy ${CHAINCODE_NAME}.pak to orderer deployment path"
    # press_any_key
    # scp ${CHAINCODE_NAME}.pak ${ORDERER_IP}:${DEPLOYMENT_PATH}
  fi

  echo "copy ${CHAINCODE_NAME}.pak to peer0Org${peer} deployment path"
  press_any_key
  scp ${CHAINCODE_NAME}.pak ${IP}:${DEPLOYMENT_PATH}
  press_any_key

  # copy to container
  ssh ${IP} docker cp ${DEPLOYMENT_PATH}/${CHAINCODE_NAME}.pak cli:/opt/gopath/${CHAINCODE_DEPLOYMENT_PATH}/${CHAINCODE_NAME}.pak
  # always install on all peers
  # install on peer0Org?
  echo "install ${CHAINCODE_NAME} ${VERSION} in peer0Org${peer}"
  ssh ${IP} docker exec -e CORE_PEER_ADDRESS=peer0.org${peer}.example.com:7051 cli peer chaincode install ${CHAINCODE_NAME}.pak -v ${VERSION}
  press_any_key
  # install on peer1Org?
  echo "install ${CHAINCODE_NAME} ${VERSION} in peer1Org${peer}"
  ssh ${IP} docker exec -e CORE_PEER_ADDRESS=peer1.org${peer}.example.com:7051 cli peer chaincode install ${CHAINCODE_NAME}.pak -v ${VERSION}
  press_any_key
done

# from NOTES-P2-EXT-TUT.md > Install/Instantiate TypeScript/Javascript Convector ChainCode / SolidaryChain

# instantiate|upgrade chaincode on peer0Org1 in channelall with policy....only after all nodes are registered, and with chaincode installed
echo "${DEPLOY_CC_ACTION} ${CHAINCODE_NAME} ${VERSION} in peer0Org1"
press_any_key
ssh -t ${PEER0_ORG1_IP} docker exec cli peer chaincode ${DEPLOY_CC_ACTION} -o orderer1.example.com:7050 --tls --cafile ${CA_FILE} -l ${CHAINCODE_LANG} -C ${CHANNEL_ALL} -n ${CHAINCODE_CONVECTOR} ${ABSOLUTE_PATH} -v ${VERSION} -c "'{ \"Args\":[]}' -P \"OR(${POLICY_CHANNEL_ALL})\""

for peer in "${PEERS_ID[@]}"
do
  # decrease 1 to IDS, we require a zero based index
  IDX=$peer-1
  IP=${PEERS[${IDX}]}
  # list instantiated chaincodes on channelall
  echo "list instantiate chaincodes in peer0Org${peer}"
  ssh ${IP} "docker exec -e CORE_PEER_ADDRESS=peer0.org${peer}.example.com:7051 cli peer chaincode list -C channelall --instantiated"
  press_any_key
  echo "list instantiate chaincodes in peer1Org${peer}"
  ssh ${IP} "docker exec -e CORE_PEER_ADDRESS=peer1.org${peer}.example.com:7051 cli peer chaincode list -C channelall --instantiated"
  press_any_key
done

# install indexs and views if is intantiated chaincode
if [ "${VERSION}" == "1.0" ]; then
  # TODO: replace with stuff inside chaincode
  echo "install couchdb views and indexes..."
  ./couchdb/installNetwork.sh

  # not used after we move network files to repo
  # echo "bring Production Network Files"
  # ./bringProductionNetworkFiles.sh

  echo "seed ledger data using ${SCRIPT_SEED} script..."
  scp seed.env ${PEER0_ORG1_IP}:/tmp
  scp ${SCRIPT_SEED} ${PEER0_ORG1_IP}:/tmp
  ssh -t ${PEER0_ORG1_IP} sudo chmod a+x /tmp/${SCRIPT_SEED}
  ssh -t ${PEER0_ORG1_IP} "cd /tmp; ./${SCRIPT_SEED}"
fi

# TODO: participant_createWithParameters participant_create don't work via ssh
echo "now don't forget to:"
echo "- invoke gov and johndoe, to be tested on sanity-check.sh";
echo "- run sanity-check.sh, and be patient, until whole network is quick and responsive";
