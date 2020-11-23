#!/bin/bash

# this extends seedNetwork.sh, advice to run after seedNetwork.sh
# used manually
# scp seedNetworkMinimal.sh 192.168.1.61:/tmp
# scp seed.env  192.168.1.61:/tmp
# enter node 1 and launch cd /tmp && ./seedNetworkMinimal.sh

# load .env
set -a
. seed.env
set +a

SLEEP="sleep 3"
BASE_CMD="docker exec cli peer chaincode invoke -C ${CHANNEL_ALL} -n ${CHAINCODE_NAME} --tls --cafile ${CA_FILE}"

# participant gov
echo "create participant ${GOV_NAME}..."
${BASE_CMD} -c "{ \"Args\" : [\"participant_createWithParameters\", \"${GOV_ID}\", \"${GOV_CODE}\", \"${GOV_NAME}\", \"${GOV_EMAIL}\", \"${GOV_NIF}\" ] }"
${SLEEP}
echo "get participant ${GOV_NAME}..."
${BASE_CMD} -c "{ \"Args\" : [\"participant_get\", \"${GOV_ID}\" ] }"
${SLEEP}

# person admin
ID=${ADMN_ID}
FISCAL_NUMBER="PT000000000"
PHONE_NUMBER="+351936200001"
FIRST_NAME="Super"
LAST_NAME="User"
USER_NAME="admin"
EMAIL="${USER_NAME}@example.com"
PAYLOAD='{\"id\":\"'${ID}'\",\"firstname\":\"'${FIRST_NAME}'\",\"lastname\":\"'${LAST_NAME}'\",\"fiscalNumber\":\"'${FISCAL_NUMBER}'\",\"mobilePhone\":\"'${PHONE_NUMBER}'\",\"otherInformation\":\"\",\"username\":\"'${USER_NAME}'\",\"password\":\"'${ADMIN_PASSWORD}'\",\"email\":\"'${EMAIL}'\"}'
echo "create person ${USER_NAME}..."
${BASE_CMD} -c "{ \"Args\" : [\"person_create\", \"${PAYLOAD}\" ] }"
${SLEEP}
echo "get person ${USER_NAME}..."
${BASE_CMD} -c "{ \"Args\" : [\"person_get\", \"${ID}\" ] }"
${SLEEP}
