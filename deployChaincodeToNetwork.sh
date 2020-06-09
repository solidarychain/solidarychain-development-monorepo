#!/bin/bash
DEPLOYMENT_PATH=/srv/docker/kt-tam-extra_hosts-3node-2channel/fabric-samples/3node2channel/deployment
CHAINCODE_DEPLOYMENT_PATH=/src/github.com/hyperledger/fabric/peer
CHAINCODE=chaincode-solidary-network-chaincode
FILE=${CHAINCODE}.tgz
ORDERER_IP=192.168.1.61
PEER0_ORG1_IP=192.168.1.64
PEER0_ORG2_IP=192.168.1.65
PEER0_ORG3_IP=192.168.1.66
PEER0_ORG4_IP=192.168.1.62
PEER0_ORG5_IP=192.168.1.63
PEER0_ORG1_ID=1
PEER0_ORG2_ID=2
PEER0_ORG3_ID=3
PEER0_ORG4_ID=4
PEER0_ORG5_ID=5
PEER_CHAINCODE_PATH=/srv/docker/kt-tam-extra_hosts-3node-2channel/fabric-samples/chaincode
# install chaincode
CHANNEL=channelall
CHAINCODE_NAME=sncc
LANG=node
ABSOLUTE_PATH=/opt/gopath/src/github.com/chaincode/chaincode-solidary-network-chaincode
# check version
# ssh -t ${PEER0_ORG1_IP} docker exec cli peer chaincode list --installed
# STARTER version
# VERSION=v0
# following UPDATE versions
VERSION=v1
# invokes
GOV_ID=c8ca045c-9d1b-407f-b9ae-31711758f2d0
GOV_CODE=gov
GOV_NAME="Big Government"

# press any key function
press_any_key() {
  read -n 1 -s -r -p "Press any key to continue";printf "\\n"
  :;
  # sleep 5
}

# rebuild cc
npm run cc:package

# pack and push
tar cf ${FILE} ${CHAINCODE}

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
    scp ${FILE} ${IP}:/tmp
    # extract to chaincode fabric-samples/chaincode path
    # package chaincode to PEER_CHAINCODE_PATH
    echo "package ${CHAINCODE_NAME}.pak"
    ssh -t ${IP} docker exec cli peer chaincode package -l node -n ${CHAINCODE_NAME} -p ${ABSOLUTE_PATH} -v v0 ${CHAINCODE_NAME}.pak
    # copy to package local file system
    echo "copy ${CHAINCODE_NAME}.pak to local file system"
    scp ${IP}:${CHAINCODE_DEPLOYMENT_PATH}/${CHAINCODE_NAME}.pak .
    # copy to package to orderer deployment path
    echo "copy ${CHAINCODE_NAME}.pak to orderer deployment path"
    scp ${CHAINCODE_NAME}.pak ${ORDERER_IP}:${DEPLOYMENT_PATH}
    press_any_key
  else
    # copy to package to peer deployment path
    echo "copy ${CHAINCODE_NAME}.pak to peer0Org${peer} deployment path"
    scp ${CHAINCODE_NAME}.pak ${IP}:${CHAINCODE_DEPLOYMENT_PATH}
    press_any_key
  fi
  # echo "install chaincode peer ${IP}"
  # ssh -t ${IP} docker exec cli peer chaincode install -n ${CHAINCODE_NAME} -l ${LANG} -p ${ABSOLUTE_PATH} -v ${VERSION}
  # echo "list installed chaincode peer ${IP}"
  # ssh ${IP} docker exec cli peer chaincode list --installed

  # always install on all peers
  echo "install ${CHAINCODE_NAME} in peer0Org${peer}"
  ssh ${IP} docker cp ${CHAINCODE_DEPLOYMENT_PATH}/${CHAINCODE_NAME}.pak cli:/opt/gopath/src/github.com/hyperledger/fabric/peer/${CHAINCODE_NAME}.pak
  # install on peer0Org?
  ssh ${IP} docker exec cli peer chaincode install ${CHAINCODE_NAME}.pak
  # install on peer1Org?
  ssh ${IP} docker exec -e CORE_PEER_ADDRESS=peer1.org${peer}.example.com:7051 cli peer chaincode install ${CHAINCODE_NAME}.pak
  press_any_key
done

# from NOTES-P2-EXT-TUT.md > Install/Instantiate TypeScript/Javascript Convector ChainCode / SolidaryNetwork

# instantiate chaincode on peer0Org1 in channelall with policy....only after all nodes are registered, and with chaincode installed
echo "instantiate ${CHAINCODE_NAME} in peer0Org1"
POLICY_CHANNELALL="'Org1MSP.member', 'Org2MSP.member','Org3MSP.member','Org4MSP.member','Org5MSP.member'"
ssh -t ${PEER0_ORG1_IP} docker exec cli peer chaincode instantiate -o orderer.example.com:7050 -C ${CHANNEL} -n ${CHAINCODE_NAME} ${ABSOLUTE_PATH} -v ${VERSION} -c "'{ \"Args\":[]}' -P \"OR(${POLICY_CHANNELALL})\""
press_any_key

# TODO: participant_createWithParameters participant_create don't work via ssh
exit

for peer in "${PEERS_ID[@]}"
do
  # decrease 1 to IDS, we require a zero based index
  IDX=$peer-1
  IP=${PEERS[${IDX}]}
  # list instantiated chaincodes on channelall
  echo "list instantiate chaincodes in peer0Org${peer}"
  ssh ${IP} "docker exec cli peer chaincode list -C channelall --instantiated"
  ssh ${IP} "docker exec -e CORE_PEER_ADDRESS=peer1.org${peer}.example.com:7051 cli peer chaincode list -C channelall --instantiated"
  press_any_key

  # invoke participant_createWithParameters
  if [ $peer -eq 1 ]; then
    # ssh -t ${IP} "docker exec cli peer chaincode invoke -C ${CHANNEL} -n ${CHAINCODE_NAME} -c '{ \"Args\" : [\"participant_createWithParameters\", \"${GOV_ID}\", \"${GOV_CODE}\", \"${GOV_NAME}\" ] }'"
    ssh -t ${IP} docker exec cli peer chaincode invoke -C ${CHANNEL} -n ${CHAINCODE_NAME} -c '"{ \"Args\" : [\"participant_create\", \"{ \"id\": \"${GOV_ID}\", \"code\": \"${GOV_CODE}\", \"name\" :\"${GOV_NAME}\" }\" ] }"'
    press_any_key
  fi
  # invoke chaincode participant_get
  ssh ${IP} "docker exec cli peer chaincode invoke -C ${CHANNEL} -n ${CHAINCODE_NAME} -c '{ \"Args\" : [\"participant_get\", \"${GOV_ID}\" ] }'"
  ssh ${IP} "docker exec -e CORE_PEER_ADDRESS=peer1.org${peer}.example.com:7051 cli peer chaincode invoke -C ${CHANNEL} -n ${CHAINCODE_NAME} -c '{ \"Args\" : [\"participant_get\", \"${GOV_ID}\" ] }'"
  # invoke chaincode participant_getByCode
  ssh ${IP} "docker exec cli peer chaincode invoke -C ${CHANNEL} -n ${CHAINCODE_NAME} -c '{ \"Args\" : [\"participant_getByCode\", \"${GOV_CODE}\" ] }'"
  ssh ${IP} "docker exec -e CORE_PEER_ADDRESS=peer1.org${peer}.example.com:7051 cli peer chaincode invoke -C ${CHANNEL} -n ${CHAINCODE_NAME} -c '{ \"Args\" : [\"participant_getByCode\", \"${GOV_CODE}\" ] }'"
  press_any_key
done

exit

# invoke chaincode participant_create
# TODO this create must be 
# WORKS ON PEER not here: docker exec cli peer chaincode invoke -C ${CHANNEL} -n ${CHAINCODE_NAME} -c '{"Args":["participant_create", "{\"id\":\"c8ca045c-9d1b-407f-b9ae-31711758f2d0\",\"code\":\"gov\",\"name\":\"Big Government\"}"]}'
# ssh -t ${PEER0_ORG1_IP} docker exec cli peer chaincode invoke -C ${CHANNEL} -n ${CHAINCODE_NAME} -c "'{ \"Args\": [\"participant_create\", { \"id\": \"c8ca045c-9d1b-407f-b9ae-31711758f2d0\", \"code\": \"gov\", \"name\": \"Big Government\" } ] }'"
# ssh -t ${PEER0_ORG1_IP} "docker exec cli peer chaincode invoke -C ${CHANNEL} -n ${CHAINCODE_NAME} -c '{ \"Args\": [\"participant_create\", { \"id\": \"c8ca045c-9d1b-407f-b9ae-31711758f2d0\", \"code\": \"gov\", \"name\": \"Big Government\" } ] }'"
# invoke chaincode participant_get
# OK USED ABOVE
# ssh -t ${PEER0_ORG1_IP} "docker exec cli peer chaincode invoke -C ${CHANNEL} -n ${CHAINCODE_NAME} -c '{ \"Args\" : [\"participant_get\", \"c8ca045c-9d1b-407f-b9ae-31711758f2d0\" ] }'"
# invoke chaincode participant_getByCode
# OK USED ABOVE
# ssh -t ${PEER0_ORG1_IP} "docker exec cli peer chaincode invoke -C ${CHANNEL} -n ${CHAINCODE_NAME} -c '{\"Args\":[\"participant_getByCode\", \"gov\"]}'"
# invoke chaincode person_create
# WORKS ON PEER not here: docker exec cli peer chaincode invoke -C ${CHANNEL} -n ${CHAINCODE_NAME} -c '{"Args":["person_create", "{\"id\":\"4ea88521-031b-4279-9165-9c10e1839001\",\"firstname\":\"John\",\"lastname\":\"Doe\",\"beneficiaryNumber\":\"285191659\",\"birthDate\":\"61985472\",\"cardVersion\":\"006.007.23\",\"country\":\"PRT\",\"documentNumber\":\"09879462 0 ZZ3\",\"documentType\":\"Cartão De Cidadão\",\"emissionDate\":\"61985472\",\"emittingEntity\":\"República Portuguesa\",\"expirationDate\":\"61985472\",\"fatherFirstname\":\"Alberto\",\"fatherLastname\":\"De Andrade Monteiro\",\"fiscalNumber\":\"182692124\",\"gender\":\"M\",\"height\":\"1.81\",\"identityNumber\":\"098794620\",\"motherFirstname\":\"Maria Da Graça De Oliveira Mendes\",\"motherLastname\":\"Monteiro\",\"nationality\":\"PRT\",\"otherInformation\":\"\",\"pan\":\"0000036014662658\",\"requestLocation\":\"CRCiv. Figueira da Foz\",\"socialSecurityNumber\":\"11103478242\",\"username\":\"johndoe\",\"password\":\"12345678\",\"email\":\"johndoe@mail.com\"}"]}'
# ssh -t ${PEER0_ORG1_IP} "docker exec cli peer chaincode invoke -C ${CHANNEL} -n ${CHAINCODE_NAME} -c '{\"Args\":[\"person_create\", \"{\"id\":\"4ea88521-031b-4279-9165-9c10e1839001\",\"firstname\":\"John\",\"lastname\":\"Doe\",\"beneficiaryNumber\":\"285191659\",\"birthDate\":\"61985472\",\"cardVersion\":\"006.007.23\",\"country\":\"PRT\",\"documentNumber\":\"09879462 0 ZZ3\",\"documentType\":\"Cartão De Cidadão\",\"emissionDate\":\"61985472\",\"emittingEntity\":\"República Portuguesa\",\"expirationDate\":\"61985472\",\"fatherFirstname\":\"Alberto\",\"fatherLastname\":\"De Andrade Monteiro\",\"fiscalNumber\":\"182692124\",\"gender\":\"M\",\"height\":\"1.81\",\"identityNumber\":\"098794620\",\"motherFirstname\":\"Maria Da Graça De Oliveira Mendes\",\"motherLastname\":\"Monteiro\",\"nationality\":\"PRT\",\"otherInformation\":\"\",\"pan\":\"0000036014662658\",\"requestLocation\":\"CRCiv. Figueira da Foz\",\"socialSecurityNumber\":\"11103478242\",\"username\":\"johndoe\",\"password\":\"12345678\",\"email\":\"johndoe@mail.com\"}\"]}'"
# invoke chaincode person_create
ssh -t ${PEER0_ORG1_IP} "docker exec cli peer chaincode invoke -C ${CHANNEL} -n ${CHAINCODE_NAME} -c '{\"Args\":[\"person_get\", \"4ea88521-031b-4279-9165-9c10e1839001\"]}'"
# invoke chaincode person_getByUsername
ssh -t ${PEER0_ORG1_IP} "docker exec cli peer chaincode invoke -C ${CHANNEL} -n ${CHAINCODE_NAME} -c '{\"Args\":[\"person_getByUsername\", \"johndoe\"]}'"

# cleanup, remove pack after push to peers
rm ${FILE}
