#!/bin/bash

# [[ $EUID -ne 0 ]] && echo "This script must be run as root." && exit 1

# declare common vars
# DOCKER_REGISTRY_URL=hub.docker.com
DOMAIN_PROJECT_NAME=solidarychain

if [ -z "$1" ] || [ -z "$2" ]; then
	echo "missing require paramameters 'docker-image-name' and 'docker-image-version'"
  echo "ex '${0} ${DOMAIN_PROJECT_NAME}-server-graphql 1.0.0'"
	exit 0
else
  # store in var, to be consistence with other clkis scripts var names
  DOCKER_IMAGE_NAME=$1
  DOCKER_IMAGE_VERSION=$2

  # echo Enter $DOCKER_REGISTRY_URL Credentials
  # docker login $DOCKER_REGISTRY_URL
  #read -n 1 -s -r -p "Press any key to continue";printf "\n"

  docker tag $DOCKER_IMAGE_NAME:latest $DOMAIN_PROJECT_NAME/$DOCKER_IMAGE_NAME:latest
  echo push : [$DOMAIN_PROJECT_NAME/$DOCKER_IMAGE_NAME:latest]
  docker push $DOMAIN_PROJECT_NAME/$DOCKER_IMAGE_NAME:latest
  #read -n 1 -s -r -p "Press any key to continue";printf "\n"
fi
