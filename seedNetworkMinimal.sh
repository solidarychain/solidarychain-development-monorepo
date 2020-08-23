#!/bin/bash

# load .env
set -a
. seed.env
set +a

SLEEP="sleep 3"
BASE_CMD="docker exec cli peer chaincode invoke -C ${CHANNEL_ALL} -n ${CHAINCODE_NAME} --tls --cafile ${CA_FILE}"

# participant gov
echo "create participant ${GOV_NAME}..."
${BASE_CMD} -c "{ \"Args\" : [\"participant_createWithParameters\", \"${GOV_ID}\", \"${GOV_CODE}\", \"${GOV_NAME}\" ] }"
${SLEEP}
echo "get participant ${GOV_NAME}..."
${BASE_CMD} -c "{ \"Args\" : [\"participant_get\", \"${GOV_ID}\" ] }"
${SLEEP}

# person johndoe
ID=${JOHN_ID}
FIRST_NAME="John"
LAST_NAME="Doe"
USER_NAME="johndoe"
EMAIL="${USER_NAME}@mail.com"
FISCAL_NUMBER="182692124"
BENEFICIARY_NUMBER="285191659"
DOCUMENT_NUMBER="09879462 0 ZZ3"
IDENTITY_NUMBER="098794620"
SOCIAL_SECURITY_NUMBER="11103478242"
PAN="0000036014662658"
PAYLOAD='{\"id\":\"'${ID}'\",\"firstname\":\"'${FIRST_NAME}'\",\"lastname\":\"'${LAST_NAME}'\",\"beneficiaryNumber\":\"'${BENEFICIARY_NUMBER}'\",\"birthDate\":\"'${DATE}'\",\"cardVersion\":\"006.007.23\",\"country\":\"PRT\",\"documentNumber\":\"'${DOCUMENT_NUMBER}'\",\"documentType\":\"Cartão De Cidadão\",\"emissionDate\":\"'${DATE}'\",\"emittingEntity\":\"República Portuguesa\",\"expirationDate\":\"'${DATE}'\",\"fatherFirstname\":\"Alberto\",\"fatherLastname\":\"De Andrade Monteiro\",\"fiscalNumber\":\"'${FISCAL_NUMBER}'\",\"gender\":\"M\",\"height\":\"1.81\",\"identityNumber\":\"'${IDENTITY_NUMBER}'\",\"motherFirstname\":\"Maria Da Graça De Oliveira Mendes\",\"motherLastname\":\"Monteiro\",\"nationality\":\"PRT\",\"otherInformation\":\"\",\"pan\":\"'${PAN}'\",\"requestLocation\":\"CRCiv. Figueira da Foz\",\"socialSecurityNumber\":\"'${SOCIAL_SECURITY_NUMBER}'\",\"username\":\"'${USER_NAME}'\",\"password\":\"'${DEFAULT_PASSWORD}'\",\"email\":\"'${EMAIL}'\"}'
echo "create person ${USER_NAME}..."
${BASE_CMD} -c "{ \"Args\" : [\"person_create\", \"${PAYLOAD}\" ] }"
${SLEEP}
echo "get person ${USER_NAME}..."
${BASE_CMD} -c "{ \"Args\" : [\"person_get\", \"${ID}\" ] }"
${SLEEP}
