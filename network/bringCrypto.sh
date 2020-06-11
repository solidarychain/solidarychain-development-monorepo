#!/bin/bash

# call it from root project

ORDERER_IP=192.168.1.61
scp -r ${ORDERER_IP}:/srv/docker/kt-tam-extra_hosts-3node-2channel/fabric-samples/3node2channel/crypto-config packages/server-graphql/network
scp -r ${ORDERER_IP}:/srv/docker/kt-tam-extra_hosts-3node-2channel/fabric-samples/3node2channel/wallet/fabcar/javascript/generated packages/server-graphql/network