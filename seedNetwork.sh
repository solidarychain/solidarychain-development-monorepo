#!/bin/bash

# load .env
set -a
. seed.env
set +a

# used manually
# scp seedNetwork.sh 192.168.1.61:/tmp
# scp seed.env 192.168.1.61:/tmp
# enter node 1 and launch cd /tmp && ./seedNetwork.sh

echo -n "> Do you wish to run minimal or full seed? (Minimal/Full/Cancel) " >&2
while [ -z "${result}" ] ; do
  read -s -n 1 choice
  case "${choice}" in
    m|M ) result='M' ;;
    f|F ) result='F' ;;
    c|C ) echo ""; exit 0 ;;
  esac
done

# TODO: FIX queries, mutations and subscriptions
# [] fix person_addAttribute, content is empty
# TODO: ./deployChaincodeToNetwork.sh ask if want to seed ledger, WARN always create participant and an admin user, and johndoe
# admin user with ROLE ADMIN
# TODO: WIP -u chaincodeAdmin, how to send invokes with diferent users
SLEEP="sleep 3"
BASE_CMD="docker exec cli peer chaincode invoke -C ${CHANNEL_ALL} -n ${CHAINCODE_NAME} --tls --cafile ${CA_FILE}"
# TODO: WIP chaincodeAdmin
# BASE_CMD="docker exec -e \"CORE_PEER_MSPCONFIGPATH=${CLIENT_AUTH_ADMIN}\" cli peer chaincode invoke -C ${CHANNEL_ALL} -n ${CHAINCODE_NAME} --tls --cafile ${CA_FILE}"

# overide .env vars, this way we keep old non network untoutched
AMBASSADORS='[\"'${JOHN_ID}'\", \"'${JANE_ID}'\"]'
ROLES='[\"'${ROLE_USER}'\",\"'${ROLE_GOV}'\",\"'${ROLE_ADMIN}'\"]'
TAGS='[\"red\", \"blue\"]'
METADATA='{\"key\":\"value\"}'
METADATA_INTERNAL='{\"key\":\"internal value\"}'

# participant gov
echo "create participant ${GOV_NAME}..."
${BASE_CMD} -c "{ \"Args\" : [\"participant_createWithParameters\", \"${GOV_ID}\", \"${GOV_CODE}\", \"${GOV_NAME}\" ] }"
# ${BASE_CMD} -c "{ \"Args\" : [\"participant_get\", \"${GOV_ID}\" ] }"
# ${BASE_CMD} -c "{ \"Args\" : [\"participant_getByCode\", \"${GOV_CODE}\" ] }"
${SLEEP}

# person admin
ID=${ADMIN_ID}
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

# person johndoe
ID="${JOHN_ID}"
FISCAL_NUMBER="PT182692124"
PHONE_NUMBER="+351936200001"
FIRST_NAME="John"
LAST_NAME="Doe"
USER_NAME="johndoe"
EMAIL="${USER_NAME}@example.com"
BENEFICIARY_NUMBER="285191659"
DOCUMENT_NUMBER="09879462 0 ZZ3"
IDENTITY_NUMBER="098794620"
SOCIAL_SECURITY_NUMBER="11103478242"
PAN="0000036014662658"
PAYLOAD='{\"id\":\"'${ID}'\",\"firstname\":\"'${FIRST_NAME}'\",\"lastname\":\"'${LAST_NAME}'\",\"beneficiaryNumber\":\"'${BENEFICIARY_NUMBER}'\",\"birthDate\":\"'${DATE}'\",\"cardVersion\":\"006.007.23\",\"country\":\"PRT\",\"documentNumber\":\"'${DOCUMENT_NUMBER}'\",\"documentType\":\"Cartão De Cidadão\",\"emissionDate\":\"'${DATE}'\",\"emittingEntity\":\"República Portuguesa\",\"expirationDate\":\"'${DATE}'\",\"fatherFirstname\":\"Alberto\",\"fatherLastname\":\"De Andrade Monteiro\",\"fiscalNumber\":\"'${FISCAL_NUMBER}'\",\"mobilePhone\":\"'${PHONE_NUMBER}'\",\"gender\":\"M\",\"height\":\"1.81\",\"identityNumber\":\"'${IDENTITY_NUMBER}'\",\"motherFirstname\":\"Maria Da Graça De Oliveira Mendes\",\"motherLastname\":\"Monteiro\",\"nationality\":\"PRT\",\"otherInformation\":\"\",\"pan\":\"'${PAN}'\",\"requestLocation\":\"CRCiv. Figueira da Foz\",\"socialSecurityNumber\":\"'${SOCIAL_SECURITY_NUMBER}'\",\"username\":\"'${USER_NAME}'\",\"password\":\"'${DEFAULT_PASSWORD}'\",\"email\":\"'${EMAIL}'\"}'
echo "create person ${USER_NAME}..."
${BASE_CMD} -c "{ \"Args\" : [\"person_create\", \"${PAYLOAD}\" ] }"
# ${BASE_CMD} -c "{ \"Args\" : [\"person_get\", \"${ID}\" ] }"
# ${BASE_CMD} -c "{ \"Args\" : [\"person_getByUsername\", \"${USER_NAME}\" ] }"
# ${BASE_CMD} -c "{ \"Args\" : [\"person_getByFiscalnumber\", \"${FISCAL_NUMBER}\" ] }"
${SLEEP}

# exit full seed
if [ "${result}" = "M" ]; then
  exit 0
fi

# participant mit
PAYLOAD='{\"id\":\"'${MIT_ID}'\",\"code\":\"'${MIT_CODE}'\",\"name\":\"'${MIT_NAME}'\",\"email\":\"'${MIT_EMAIL}'\",\"fiscalNumber\":\"'${MIT_NIF}'\"}'
echo "create participant ${MIT_NAME}..."
${BASE_CMD} -c "{ \"Args\" : [\"participant_create\", \"${PAYLOAD}\" ] }"
# ${BASE_CMD} -c "{ \"Args\" : [\"participant_get\", \"${MIT_ID}\" ] }"
# ${BASE_CMD} -c "{ \"Args\" : [\"participant_getByCode\", \"${MIT_CODE}\" ] }"
${SLEEP}

# participant naba
PAYLOAD='{\"id\":\"'${NABA_ID}'\",\"code\":\"'${NABA_CODE}'\",\"name\":\"'${NABA_NAME}'\",\"email\":\"'${NABA_EMAIL}'\",\"fiscalNumber\":\"'${NABA_NIF}'\"}'
echo "create participant ${NABA_NAME}..."
${BASE_CMD} -c "{ \"Args\" : [\"participant_create\", \"${PAYLOAD}\" ] }"
# ${BASE_CMD} -c "{ \"Args\" : [\"participant_get\", \"${NABA_ID}\" ] }"
# ${BASE_CMD} -c "{ \"Args\" : [\"participant_getByCode\", \"${NABA_CODE}\" ] }"
${SLEEP}

# participant badb
PAYLOAD='{\"id\":\"'${BADB_ID}'\",\"code\":\"'${BADB_CODE}'\",\"name\":\"'${BADB_NAME}'\",\"email\":\"'${BADB_EMAIL}'\",\"fiscalNumber\":\"'${BADB_NIF}'\"}'
echo "create participant ${BADB_NAME}..."
${BASE_CMD} -c "{ \"Args\" : [\"participant_create\", \"${PAYLOAD}\" ] }"
# ${BASE_CMD} -c "{ \"Args\" : [\"participant_get\", \"${BADB_ID}\" ] }"
# ${BASE_CMD} -c "{ \"Args\" : [\"participant_getByCode\", \"${BADB_CODE}\" ] }"
${SLEEP}

# participant godb
PAYLOAD='{\"id\":\"'${GODB_ID}'\",\"code\":\"'${GODB_CODE}'\",\"name\":\"'${GODB_NAME}'\",,\"email\":\"'${GODB_EMAIL}'\"\"fiscalNumber\":\"'${GODB_NIF}'\"}'
echo "create participant ${GODB_NAME}..."
${BASE_CMD} -c "{ \"Args\" : [\"participant_create\", \"${PAYLOAD}\" ] }"
# ${BASE_CMD} -c "{ \"Args\" : [\"participant_get\", \"${GODB_ID}\" ] }"
# ${BASE_CMD} -c "{ \"Args\" : [\"participant_getByCode\", \"${GODB_CODE}\" ] }"
${SLEEP}

# person  janedoe
ID="${JANE_ID}"
FISCAL_NUMBER="PT582692178"
PHONE_NUMBER="+351936200002"
FIRST_NAME="Jane"
LAST_NAME="Doe"
USER_NAME="janedoe"
EMAIL="${USER_NAME}@example.com"
BENEFICIARY_NUMBER="385191659"
DOCUMENT_NUMBER="09134656 0 ZZ3"
IDENTITY_NUMBER="098124560"
SOCIAL_SECURITY_NUMBER="22203478765"
PAN="2000087384667639"
DATE="61985473"
PAYLOAD='{\"id\":\"'${ID}'\",\"firstname\":\"'${FIRST_NAME}'\",\"lastname\":\"'${LAST_NAME}'\",\"beneficiaryNumber\":\"'${BENEFICIARY_NUMBER}'\",\"birthDate\":\"'${DATE}'\",\"cardVersion\":\"006.007.23\",\"country\":\"PRT\",\"documentNumber\":\"'${DOCUMENT_NUMBER}'\",\"documentType\":\"Cartão De Cidadão\",\"emissionDate\":\"'${DATE}'\",\"emittingEntity\":\"República Portuguesa\",\"expirationDate\":\"'${DATE}'\",\"fatherFirstname\":\"Alberto\",\"fatherLastname\":\"De Andrade Monteiro\",\"fiscalNumber\":\"'${FISCAL_NUMBER}'\",\"mobilePhone\":\"'${PHONE_NUMBER}'\",\"gender\":\"M\",\"height\":\"1.81\",\"identityNumber\":\"'${IDENTITY_NUMBER}'\",\"motherFirstname\":\"Maria Da Graça De Oliveira Mendes\",\"motherLastname\":\"Monteiro\",\"nationality\":\"PRT\",\"otherInformation\":\"\",\"pan\":\"'${PAN}'\",\"requestLocation\":\"CRCiv. Figueira da Foz\",\"socialSecurityNumber\":\"'${SOCIAL_SECURITY_NUMBER}'\",\"username\":\"'${USER_NAME}'\",\"password\":\"'${DEFAULT_PASSWORD}'\",\"email\":\"'${EMAIL}'\"}'
echo "create person ${USER_NAME}..."
${BASE_CMD} -c "{ \"Args\" : [\"person_create\", \"${PAYLOAD}\" ] }"
# ${BASE_CMD} -c "{ \"Args\" : [\"person_get\", \"${ID}\" ] }"
# ${BASE_CMD} -c "{ \"Args\" : [\"person_getByUsername\", \"${USER_NAME}\" ] }"
# ${BASE_CMD} -c "{ \"Args\" : [\"person_getByFiscalnumber\", \"${FISCAL_NUMBER}\" ] }"
${SLEEP}

# create person with minimal required data
ID="${MINI_ID}"
FISCAL_NUMBER="PT182692152"
PHONE_NUMBER="+351936200003"
USER_NAME="${FISCAL_NUMBER}"
PAYLOAD='{\"id\":\"'${ID}'\",\"fiscalNumber\":\"'${FISCAL_NUMBER}'\",\"mobilePhone\":\"'${PHONE_NUMBER}'\",\"username\":\"'${USER_NAME}'\", \"password\":\"'${DEFAULT_PASSWORD}'\"}'
echo "create person ${USER_NAME}..."
${BASE_CMD} -c "{ \"Args\" : [\"person_create\", \"${PAYLOAD}\" ] }"
# ${BASE_CMD} -c "{ \"Args\" : [\"person_get\", \"${ID}\" ] }"
# ${BASE_CMD} -c "{ \"Args\" : [\"person_getByUsername\", \"${USER_NAME}\" ] }"
# ${BASE_CMD} -c "{ \"Args\" : [\"person_getByFiscalnumber\", \"${FISCAL_NUMBER}\" ] }"
${SLEEP}

# add atributes has org1 / admin
echo "adding attribute 'birth-year' to johndoe as the Big Government identity"
PAYLOAD='{\"id\": \"birth-year\", \"certifierID\": \"'${GOV_ID}'\", \"content\": { \"data\": \"1951\", \"work\": \"true\" }, \"issuedDate\": \"1554239270\" }'
${BASE_CMD} -c "{ \"Args\" : [\"person_addAttribute\", \"${JOHN_ID}\", \"${PAYLOAD}\" ] }"
# ${BASE_CMD} -c "{ \"Args\" : [\"person_get\", \"${JOHN_ID}\" ] }"
${SLEEP}

# add atrributes has org1 / admin
echo "adding attribute 'birth-year' to janedoe as the Big Government identity"
PAYLOAD='{\"id\": \"birth-year\", \"certifierID\": \"'${GOV_ID}'\", \"content\": { \"data\": \"1971\", \"work\": \"true\" }, \"issuedDate\": \"1554239280\" }'
${BASE_CMD} -c "{ \"Args\" : [\"person_addAttribute\", \"${JANE_ID}\", \"${PAYLOAD}\" ] }"
# ${BASE_CMD} -c "{ \"Args\" : [\"person_get\", \"${JANE_ID}\" ] }"
${SLEEP}

# participant godb
PAYLOAD='{\"id\":\"'${POPB_ID}'\",\"code\":\"'${POPB_CODE}'\",\"name\":\"'${POPB_NAME}'\",\"email\":\"'${POPB_EMAIL}'\",\"fiscalNumber\":\"'${POPB_NIF}'\",\"ambassadors\":'${AMBASSADORS}'}'
echo "create participant ${POPB_NAME}..."
${BASE_CMD} -c "{ \"Args\" : [\"participant_create\", \"${PAYLOAD}\" ] }"
# ${BASE_CMD} -c "{ \"Args\" : [\"participant_get\", \"${GODB_ID}\" ] }"
# ${BASE_CMD} -c "{ \"Args\" : [\"participant_getByCode\", \"${GODB_CODE}\" ] }"
${SLEEP}

# create cause with all data (filter with date=1582414657)
ID="${CAUSE_001}"
CAUSE_NAME="Cause001"
INPUT_TYPE="${CONVECTOR_MODEL_PATH_PARTICIPANT}"
INPUT_ID="${MIT_ID}"
# Date and time (GMT): Wednesday, 1 January 2020 00:00:00
START_DATE="1577836800"
# Date and time (GMT): Friday, 31 December 2021 23:59:59
END_DATE="1640995199"
CAUSE_EMAIL="cause001@example.com"
PAYLOAD='{\"id\":\"'${ID}'\",\"name\":\"'${CAUSE_NAME}'\",\"email\":\"'${CAUSE_EMAIL}'\",\"startDate\":\"'${START_DATE}'\",\"endDate\":\"'${END_DATE}'\",\"location\":\"'${LOCATION}'\",\"tags\":'${TAGS}',\"ambassadors\":'${AMBASSADORS}',\"metaData\":'${METADATA}',\"input\":{\"id\":\"'${INPUT_ID}'\",\"type\":\"'${INPUT_TYPE}'\"}}'
echo "create cause ${CAUSE_NAME}..."
${BASE_CMD} -c "{ \"Args\" : [\"cause_create\", \"${PAYLOAD}\" ] }"
# ${BASE_CMD} -c "{ \"Args\" : [\"cause_get\", \"${ID}\" ] }"
${SLEEP}

# create cause with all data (filter with date=1582414657)
ID="${CAUSE_002}"
CAUSE_NAME="Cause002"
CAUSE_EMAIL="cause002@example.com"
PAYLOAD='{\"id\":\"'${ID}'\",\"name\":\"'${CAUSE_NAME}'\",\"email\":\"'${CAUSE_EMAIL}'\",\"startDate\":\"'${START_DATE}'\",\"endDate\":\"'${END_DATE}'\",\"location\":\"'${LOCATION}'\",\"tags\":'${TAGS}',\"ambassadors\":'${AMBASSADORS}',\"metaData\":'${METADATA}',\"input\":{\"id\":\"'${INPUT_ID}'\",\"type\":\"'${INPUT_TYPE}'\"}}'
echo "create cause ${CAUSE_NAME}..."
${BASE_CMD} -c "{ \"Args\" : [\"cause_create\", \"${PAYLOAD}\" ] }"
# ${BASE_CMD} -c "{ \"Args\" : [\"cause_get\", \"${ID}\" ] }"
${SLEEP}

# create cause with minimal required data
ID="${CAUSE_003}"
CAUSE_NAME="Cause003"
INPUT_TYPE="${CONVECTOR_MODEL_PATH_PARTICIPANT}"
INPUT_ID="${MIT_ID}"
PAYLOAD='{\"id\":\"'${ID}'\",\"name\":\"'${CAUSE_NAME}'\",\"input\":{\"id\":\"'${INPUT_ID}'\",\"type\":\"'${INPUT_TYPE}'\"}}'
echo "create cause ${CAUSE_NAME}..."
${BASE_CMD} -c "{ \"Args\" : [\"cause_create\", \"${PAYLOAD}\" ] }"
# ${BASE_CMD} -c "{ \"Args\" : [\"cause_get\", \"${ID}\" ] }"
${SLEEP}

# create funds transaction : gov to john 1.11: john is ambassador of PopBank it works
ID="${TRANSACTION_001_ID}"
TRANSACTION_TYPE="TRANSFER_FUNDS"
RESOURCE_TYPE="FUNDS"
INPUT_TYPE="${CONVECTOR_MODEL_PATH_PARTICIPANT}"
INPUT_ID="${POPB_ID}"
OUTPUT_TYPE="${CONVECTOR_MODEL_PATH_PERSON}"
OUTPUT_ID="${MINI_ID}"
QUANTITY="1.11"
CURRENCY="EUR"
LOGGED_PERSON_ID="${JOHN_ID}"
PAYLOAD='{\"id\":\"'${ID}'\",\"transactionType\":\"'${TRANSACTION_TYPE}'\",\"resourceType\":\"'${RESOURCE_TYPE}'\",\"input\":{\"id\":\"'${INPUT_ID}'\",\"type\":\"'${INPUT_TYPE}'\"},\"output\":{\"id\":\"'${OUTPUT_ID}'\",\"type\":\"'${OUTPUT_TYPE}'\"},\"quantity\":\"'${QUANTITY}'\",\"currency\":\"'${CURRENCY}'\",\"location\":\"'${LOCATION}'\",\"tags\":'${TAGS}',\"loggedPersonId\":\"'${LOGGED_PERSON_ID}'\",\"metaData\":'${METADATA}',\"metaDataInternal\":'${METADATA_INTERNAL}'}'
echo "create transaction ${ID}..."
${BASE_CMD} -c "{ \"Args\" : [\"transaction_create\", \"${PAYLOAD}\" ] }"
# ${BASE_CMD} -c "{ \"Args\" : [\"transaction_get\", \"${ID}\" ] }"
${SLEEP}

# create funds transaction : Cause001 to jane 1.11: john is ambassador of Cause001 it works
ID="acef70e5-cd25-4533-8392-9fa57e43cf33"
INPUT_TYPE="${CONVECTOR_MODEL_PATH_CAUSE}"
INPUT_ID="${CAUSE_001}"
LOGGED_PERSON_ID="${JOHN_ID}"
PAYLOAD='{\"id\":\"'${ID}'\",\"transactionType\":\"'${TRANSACTION_TYPE}'\",\"resourceType\":\"'${RESOURCE_TYPE}'\",\"input\":{\"id\":\"'${INPUT_ID}'\",\"type\":\"'${INPUT_TYPE}'\"},\"output\":{\"id\":\"'${OUTPUT_ID}'\",\"type\":\"'${OUTPUT_TYPE}'\"},\"quantity\":\"'${QUANTITY}'\",\"currency\":\"'${CURRENCY}'\",\"location\":\"'${LOCATION}'\",\"loggedPersonId\":\"'${LOGGED_PERSON_ID}'\",\"metaData\":'${METADATA}',\"metaDataInternal\":'${METADATA_INTERNAL}'}'
echo "create transaction ${ID}..."
${BASE_CMD} -c "{ \"Args\" : [\"transaction_create\", \"${PAYLOAD}\" ] }"
# ${BASE_CMD} -c "{ \"Args\" : [\"transaction_get\", \"${ID}\" ] }"
${SLEEP}

# create volunteeringHours transaction : john 10hours to Cause001
ID="acef70e5-cd25-4533-8392-9fa57e43cf34"
TRANSACTION_TYPE="TRANSFER_VOLUNTEERING_HOURS"
RESOURCE_TYPE="VOLUNTEERING_HOURS"
INPUT_TYPE="${CONVECTOR_MODEL_PATH_PERSON}"
INPUT_ID="${JOHN_ID}"
OUTPUT_TYPE="${CONVECTOR_MODEL_PATH_CAUSE}"
OUTPUT_ID="${CAUSE_001}"
QUANTITY="10"
LOGGED_PERSON_ID="${JOHN_ID}"
PAYLOAD='{\"id\":\"'${ID}'\",\"transactionType\":\"'${TRANSACTION_TYPE}'\",\"resourceType\":\"'${RESOURCE_TYPE}'\",\"input\":{\"id\":\"'${INPUT_ID}'\",\"type\":\"'${INPUT_TYPE}'\"},\"output\":{\"id\":\"'${OUTPUT_ID}'\",\"type\":\"'${OUTPUT_TYPE}'\"},\"quantity\":\"'${QUANTITY}'\",\"location\":\"'${LOCATION}'\",\"tags\":'${TAGS}',\"loggedPersonId\":\"'${LOGGED_PERSON_ID}'\",\"metaData\":'${METADATA}',\"metaDataInternal\":'${METADATA_INTERNAL}'}'
echo "create transaction ${ID}..."
${BASE_CMD} -c "{ \"Args\" : [\"transaction_create\", \"${PAYLOAD}\" ] }"
# ${BASE_CMD} -c "{ \"Args\" : [\"transaction_get\", \"${ID}\" ] }"
${SLEEP}

# create volunteeringHours transaction : jane 20hours to Cause002
ID="acef70e5-cd25-4533-8392-9fa57e43cf35"
INPUT_TYPE="${CONVECTOR_MODEL_PATH_PERSON}"
INPUT_ID="${JANE_ID}"
OUTPUT_TYPE="${CONVECTOR_MODEL_PATH_CAUSE}"
OUTPUT_ID="${CAUSE_002}"
QUANTITY="20"
PAYLOAD='{\"id\":\"'${ID}'\",\"transactionType\":\"'${TRANSACTION_TYPE}'\",\"resourceType\":\"'${RESOURCE_TYPE}'\",\"input\":{\"id\":\"'${INPUT_ID}'\",\"type\":\"'${INPUT_TYPE}'\"},\"output\":{\"id\":\"'${OUTPUT_ID}'\",\"type\":\"'${OUTPUT_TYPE}'\"},\"quantity\":\"'${QUANTITY}'\",\"location\":\"'${LOCATION}'\",\"tags\":'${TAGS}',\"loggedPersonId\":\"'${LOGGED_PERSON_ID}'\",\"metaData\":'${METADATA}',\"metaDataInternal\":'${METADATA_INTERNAL}'}'
echo "create transaction ${ID}..."
${BASE_CMD} -c "{ \"Args\" : [\"transaction_create\", \"${PAYLOAD}\" ] }"
# ${BASE_CMD} -c "{ \"Args\" : [\"transaction_get\", \"${ID}\" ] }"
${SLEEP}

# create volunteeringHours transaction : jane 20hours to Cause002
ID="acef70e5-cd25-4533-8392-9fa57e43cf36"
INPUT_TYPE="${CONVECTOR_MODEL_PATH_PERSON}"
INPUT_ID="${JANE_ID}"
QUANTITY="20"
PAYLOAD='{\"id\":\"'${ID}'\",\"transactionType\":\"'${TRANSACTION_TYPE}'\",\"resourceType\":\"'${RESOURCE_TYPE}'\",\"input\":{\"id\":\"'${INPUT_ID}'\",\"type\":\"'${INPUT_TYPE}'\"},\"output\":{\"id\":\"'${OUTPUT_ID}'\",\"type\":\"'${OUTPUT_TYPE}'\"},\"quantity\":\"'${QUANTITY}'\",\"location\":\"'${LOCATION}'\",\"tags\":'${TAGS}',\"loggedPersonId\":\"'${LOGGED_PERSON_ID}'\",\"metaData\":'${METADATA}',\"metaDataInternal\":'${METADATA_INTERNAL}'}'
echo "create transaction ${ID}..."
${BASE_CMD} -c "{ \"Args\" : [\"transaction_create\", \"${PAYLOAD}\" ] }"
# ${BASE_CMD} -c "{ \"Args\" : [\"transaction_get\", \"${ID}\" ] }"
${SLEEP}

# create asset with all data (filter with date=1582414657)
ID="${ASSET_001_ID}"
ASSET_NAME="Asset001"
DESCRIPTION="someDescription"
ASSET_TYPE="PHYSICAL_ASSET"
OWNER_TYPE="${CONVECTOR_MODEL_PATH_PERSON}"
OWNER_ID="${JOHN_ID}"
PAYLOAD='{\"id\":\"'${ID}'\",\"name\":\"'${ASSET_NAME}'\",\"description\":\"'${DESCRIPTION}'\",\"assetType\":\"'${ASSET_TYPE}'\",\"location\":\"'${LOCATION}'\",\"tags\":'${TAGS}',\"ambassadors\":'${AMBASSADORS}',\"metaData\":'${METADATA}',\"owner\":{\"id\":\"'${OWNER_ID}'\",\"type\":\"'${OWNER_TYPE}'\"}}'
echo "create asset ${ID}..."
${BASE_CMD} -c "{ \"Args\" : [\"asset_create\", \"${PAYLOAD}\" ] }"
# ${BASE_CMD} -c "{ \"Args\" : [\"asset_get\", \"${ASSET_001_ID}\" ] }"
${SLEEP}

# create asset with minimal data (filter with date=1582414657) and with ambassadors
ID="${ASSET_002_ID}"
ASSET_NAME="Asset002"
ASSET_TYPE="DIGITAL_ASSET"
OWNER_ID="${JOHN_ID}"
OWNER_TYPE="${CONVECTOR_MODEL_PATH_PERSON}"
PAYLOAD='{\"id\":\"'${ID}'\",\"name\":\"'${ASSET_NAME}'\",\"assetType\":\"'${ASSET_TYPE}'\",\"location\":\"'${LOCATION}'\",\"tags\":'${TAGS}',\"metaData\":'${METADATA}',\"owner\":{\"id\":\"'${OWNER_ID}'\",\"type\":\"'${OWNER_TYPE}'\"},\"ambassadors\":'${AMBASSADORS}'}'
echo "create asset ${ID}..."
${BASE_CMD} -c "{ \"Args\" : [\"asset_create\", \"${PAYLOAD}\" ] }"
# ${BASE_CMD} -c "{ \"Args\" : [\"asset_get\", \"${ID}\" ] }"
${SLEEP}

# transaction asset from owner johndoe, with logged user janedoe, acting has an ambassador of johndoe, transfer to cause001 | require to send input id and type even if acting has an ambassador
# here we lost asset ambassadors, when we transfer it
ID="acef70e5-cd25-4533-8392-9fa57e43cf56"
TRANSACTION_TYPE="TRANSFER_ASSET"
RESOURCE_TYPE="PHYSICAL_ASSET"
ASSET_ID="${ASSET_001_ID}"
INPUT_TYPE="${CONVECTOR_MODEL_PATH_PERSON}"
INPUT_ID="${JOHN_ID}"
OUTPUT_TYPE="${CONVECTOR_MODEL_PATH_CAUSE}"
OUTPUT_ID="${CAUSE_001}"
LOGGED_PERSON_ID="${JANE_ID}"
PAYLOAD='{\"id\":\"'${ID}'\",\"transactionType\":\"'${TRANSACTION_TYPE}'\",\"resourceType\":\"'${RESOURCE_TYPE}'\",\"input\":{\"id\":\"'${INPUT_ID}'\",\"type\":\"'${INPUT_TYPE}'\"},\"output\":{\"id\":\"'${OUTPUT_ID}'\",\"type\":\"'${OUTPUT_TYPE}'\"},\"location\":\"'${LOCATION}'\",\"metaData\":'${METADATA}',\"metaDataInternal\":'${METADATA_INTERNAL}',\"assetId\":\"'${ASSET_ID}'\",\"loggedPersonId\":\"'${LOGGED_PERSON_ID}'\"}'
echo "create transaction ${ID}..."
${BASE_CMD} -c "{ \"Args\" : [\"transaction_create\", \"${PAYLOAD}\" ] }"
# ${BASE_CMD} -c "{ \"Args\" : [\"transaction_get\", \"${ID}\" ] }"
${SLEEP}

# asset update: update asset and add janedoe to ambassadors, before below transfer, else it fails because asset don't have ambassador, is lost in lastest transfer
AMBASSADORS_UPDATE='[\"'${JANE_ID}'\"]'
PAYLOAD='{\"id\":\"'${ASSET_001_ID}'\",\"ambassadors\":'${AMBASSADORS_UPDATE}'}'
echo "update asset ${ASSET_001_ID}..."
${BASE_CMD} -c "{ \"Args\" : [\"asset_update\", \"${PAYLOAD}\" ] }"
# ${BASE_CMD} -c "{ \"Args\" : [\"asset_get\", \"${ASSET_001_ID}\" ] }"
${SLEEP}

# transaction asset from cause001, with logged user janedoe, acting has an ambassador of cause001, transfer to PopBank | require to send input id and type even if acting has an ambassador
ID="acef70e5-cd25-4533-8392-9fa57e43cf57"
INPUT_TYPE="${CONVECTOR_MODEL_PATH_CAUSE}"
INPUT_ID="${CAUSE_001}"
OUTPUT_TYPE="${CONVECTOR_MODEL_PATH_PARTICIPANT}"
OUTPUT_ID="${POPB_ID}"
LOGGED_PERSON_ID="${JANE_ID}"
PAYLOAD='{\"id\":\"'${ID}'\",\"transactionType\":\"'${TRANSACTION_TYPE}'\",\"resourceType\":\"'${RESOURCE_TYPE}'\",\"input\":{\"id\":\"'${INPUT_ID}'\",\"type\":\"'${INPUT_TYPE}'\"},\"output\":{\"id\":\"'${OUTPUT_ID}'\",\"type\":\"'${OUTPUT_TYPE}'\"},\"location\":\"'${LOCATION}'\",\"metaData\":'${METADATA}',\"metaDataInternal\":'${METADATA_INTERNAL}',\"assetId\":\"'${ASSET_ID}'\",\"loggedPersonId\":\"'${LOGGED_PERSON_ID}'\"}'
echo "create transaction ${ID}..."
${BASE_CMD} -c "{ \"Args\" : [\"transaction_create\", \"${PAYLOAD}\" ] }"
# ${BASE_CMD} -c "{ \"Args\" : [\"transaction_get\", \"${ID}\" ] }"
${SLEEP}

# asset update: update asset and add johndoe to ambassadors, before below transfer, else it fails because asset don't have ambassador, is lost in lastest transfer
AMBASSADORS_UPDATE='[\"'${JOHN_ID}'\"]'
PAYLOAD='{\"id\":\"'${ASSET_001_ID}'\",\"ambassadors\":'${AMBASSADORS_UPDATE}'}'
echo "update asset ${ASSET_001_ID}..."
${BASE_CMD} -c "{ \"Args\" : [\"asset_update\", \"${PAYLOAD}\" ] }"
# ${BASE_CMD} -c "{ \"Args\" : [\"asset_get\", \"${ASSET_001_ID}\" ] }"
${SLEEP}

# transaction asset from PopBank, with logged user johndoe, acting has an ambassador of PopBank, transfer to cause002 | require to send input id and type even if acting has an ambassador
ID="acef70e5-cd25-4533-8392-9fa57e43cf61"
INPUT_TYPE="${CONVECTOR_MODEL_PATH_PARTICIPANT}"
INPUT_ID="${POPB_ID}"
OUTPUT_TYPE="${CONVECTOR_MODEL_PATH_CAUSE}"
OUTPUT_ID="${CAUSE_002}"
LOGGED_PERSON_ID="${JOHN_ID}"
PAYLOAD='{\"id\":\"'${ID}'\",\"transactionType\":\"'${TRANSACTION_TYPE}'\",\"resourceType\":\"'${RESOURCE_TYPE}'\",\"input\":{\"id\":\"'${INPUT_ID}'\",\"type\":\"'${INPUT_TYPE}'\"},\"output\":{\"id\":\"'${OUTPUT_ID}'\",\"type\":\"'${OUTPUT_TYPE}'\"},\"location\":\"'${LOCATION}'\",\"metaData\":'${METADATA}',\"metaDataInternal\":'${METADATA_INTERNAL}',\"assetId\":\"'${ASSET_ID}'\",\"loggedPersonId\":\"'${LOGGED_PERSON_ID}'\"}'
echo "create transaction ${ID}..."
${BASE_CMD} -c "{ \"Args\" : [\"transaction_create\", \"${PAYLOAD}\" ] }"
# ${BASE_CMD} -c "{ \"Args\" : [\"transaction_get\", \"${ID}\" ] }"
${SLEEP}

# transaction of goods: person johnDoe to cause001
ID="acef70e5-cd25-4533-8392-9fa57e43cf94"
TRANSACTION_TYPE="TRANSFER_GOODS"
RESOURCE_TYPE="GENERIC_GOODS"
INPUT_TYPE="${CONVECTOR_MODEL_PATH_PERSON}"
INPUT_ID="${JOHN_ID}"
OUTPUT_TYPE="${CONVECTOR_MODEL_PATH_CAUSE}"
OUTPUT_ID="${CAUSE_001}"
# this must fail in type of TRANSFER_GOODS
LOGGED_PERSON_ID="${JOHN_ID}"
GOODS_INPUT='[{\"id\":\"80450045-d20d-4cdd-b937-c9bb46a48581\", \"code\":\"008\", \"barCode\":\"ean008\", \"name\":\"name008\", \"description\":\"description008\" ,\"quantity\":\"200\"}, {\"id\":\"80450045-d20d-4cdd-b937-c9bb46a48582\", \"code\":\"009\", \"barCode\":\"ean009\", \"name\":\"name009\", \"description\":\"description009\", \"quantity\":\"900\"}]'
PAYLOAD='{\"id\":\"'${ID}'\",\"transactionType\":\"'${TRANSACTION_TYPE}'\",\"resourceType\":\"'${RESOURCE_TYPE}'\",\"input\":{\"id\":\"'${INPUT_ID}'\",\"type\":\"'${INPUT_TYPE}'\"},\"output\":{\"id\":\"'${OUTPUT_ID}'\",\"type\":\"'${OUTPUT_TYPE}'\"},\"location\":\"'${LOCATION}'\",\"tags\":'${TAGS}',\"goodsInput\":'${GOODS_INPUT}',\"metaData\":'${METADATA}',\"metaDataInternal\":'${METADATA_INTERNAL}',\"loggedPersonId\":\"'${LOGGED_PERSON_ID}'\"}'
echo "create transaction ${ID}..."
${BASE_CMD} -c "{ \"Args\" : [\"transaction_create\", \"${PAYLOAD}\" ] }"
# ${BASE_CMD} -c "{ \"Args\" : [\"transaction_get\", \"${ID}\" ] }"
${SLEEP}

# transaction of goods: person janeDoe to cause001
ID="acef70e5-cd25-4533-8392-9fa57e43cf95"
INPUT_ID="${JANE_ID}"
LOGGED_PERSON_ID="${JANE_ID}"
GOODS_INPUT='[{\"id\":\"80450045-d20d-4cdd-b937-c9bb46a48581\",\"code\": \"010\",\"barCode\": \"ean010\",\"name\": \"name010\",\"description\": \"description010\",\"quantity\": 10},{\"id\":\"80450045-d20d-4cdd-b937-c9bb46a48582\",\"code\": \"011\",\"barCode\": \"ean011\",\"name\": \"name011\",\"description\": \"description011\",\"quantity\": 11}]'
PAYLOAD='{\"id\":\"'${ID}'\",\"transactionType\":\"'${TRANSACTION_TYPE}'\",\"resourceType\":\"'${RESOURCE_TYPE}'\",\"input\":{\"id\":\"'${INPUT_ID}'\",\"type\":\"'${INPUT_TYPE}'\"},\"output\":{\"id\":\"'${OUTPUT_ID}'\",\"type\":\"'${OUTPUT_TYPE}'\"},\"location\":\"'${LOCATION}'\",\"tags\":'${TAGS}',\"goodsInput\":'${GOODS_INPUT}',\"metaData\":'${METADATA}',\"metaDataInternal\":'${METADATA_INTERNAL}',\"loggedPersonId\":\"'${LOGGED_PERSON_ID}'\"}'
echo "create transaction ${ID}..."
${BASE_CMD} -c "{ \"Args\" : [\"transaction_create\", \"${PAYLOAD}\" ] }"
# ${BASE_CMD} -c "{ \"Args\" : [\"transaction_get\", \"${ID}\" ] }"
${SLEEP}

# transaction of goods: cause001 to cause002 (must have goods in stock)
ID="acef70e5-cd25-4533-8392-9fa57e43cf16"
INPUT_ID="${CAUSE_001}"
INPUT_TYPE="${CONVECTOR_MODEL_PATH_CAUSE}"
OUTPUT_ID="${CAUSE_002}"
GOODS_INPUT='[{\"id\":\"80450045-d20d-4cdd-b937-c9bb46a48581\",\"code\": \"008\",\"barCode\": \"ean008\",\"name\": \"name008\",\"description\": \"description008\",\"quantity\": 8},{\"id\":\"80450045-d20d-4cdd-b937-c9bb46a48582\",\"code\": \"009\",\"barCode\": \"ean009\",\"name\": \"name009\",\"description\": \"description009\",\"quantity\": 9},{\"id\":\"80450045-d20d-4cdd-b937-c9bb46a48581\",\"code\": \"010\",\"barCode\": \"ean010\",\"name\": \"name010\",\"description\": \"description010\",\"quantity\": 10},{\"id\":\"80450045-d20d-4cdd-b937-c9bb46a48582\",\"code\": \"011\",\"barCode\": \"ean011\",\"name\": \"name011\",\"description\": \"description011\",\"quantity\": 11}]'
PAYLOAD='{\"id\":\"'${ID}'\",\"transactionType\":\"'${TRANSACTION_TYPE}'\",\"resourceType\":\"'${RESOURCE_TYPE}'\",\"input\":{\"id\":\"'${INPUT_ID}'\",\"type\":\"'${INPUT_TYPE}'\"},\"output\":{\"id\":\"'${OUTPUT_ID}'\",\"type\":\"'${OUTPUT_TYPE}'\"},\"location\":\"'${LOCATION}'\",\"tags\":'${TAGS}',\"goodsInput\":'${GOODS_INPUT}',\"metaData\":'${METADATA}',\"metaDataInternal\":'${METADATA_INTERNAL}',\"loggedPersonId\":\"'${LOGGED_PERSON_ID}'\"}'
echo "create transaction ${ID}..."
${BASE_CMD} -c "{ \"Args\" : [\"transaction_create\", \"${PAYLOAD}\" ] }"
# ${BASE_CMD} -c "{ \"Args\" : [\"transaction_get\", \"${ID}\" ] }"
${SLEEP}

# transaction of goods: cause001 to cause002 (must have goods in stock)
ID="acef70e5-cd25-4533-8392-9fa57e43cf18"
GOODS_INPUT='[{\"id\":\"80450045-d20d-4cdd-b937-c9bb46a48581\",\"code\": \"008\",\"barCode\": \"ean008\",\"name\": \"name008CHANGE-FAIL\",\"description\": \"description008CHANGE-FAIL\",\"quantity\": 92},{\"id\":\"80450045-d20d-4cdd-b937-c9bb46a48582\",\"code\": \"009\",\"barCode\": \"ean009\",\"name\": \"name009CHANGE-FAIL\",\"description\": \"description009CHANGE-FAIL\",\"quantity\": 91}]'
PAYLOAD='{\"id\":\"'${ID}'\",\"transactionType\":\"'${TRANSACTION_TYPE}'\",\"resourceType\":\"'${RESOURCE_TYPE}'\",\"input\":{\"id\":\"'${INPUT_ID}'\",\"type\":\"'${INPUT_TYPE}'\"},\"output\":{\"id\":\"'${OUTPUT_ID}'\",\"type\":\"'${OUTPUT_TYPE}'\"},\"location\":\"'${LOCATION}'\",\"tags\":'${TAGS}',\"goodsInput\":'${GOODS_INPUT}',\"metaData\":'${METADATA}',\"metaDataInternal\":'${METADATA_INTERNAL}',\"loggedPersonId\":\"'${LOGGED_PERSON_ID}'\"}'
echo "create transaction ${ID}..."
${BASE_CMD} -c "{ \"Args\" : [\"transaction_create\", \"${PAYLOAD}\" ] }"
# ${BASE_CMD} -c "{ \"Args\" : [\"transaction_get\", \"${ID}\" ] }"
${SLEEP}

# transaction of goods: cause001 to participant gov (must have goods in stock), clean stocks, all 4 items will  be zeroed
ID="acef70e5-cd25-4533-8392-9fa57e43cf19"
OUTPUT_TYPE="${CONVECTOR_MODEL_PATH_PARTICIPANT}"
OUTPUT_ID="${GOV_ID}"
GOODS_INPUT='[{\"id\":\"80450045-d20d-4cdd-b937-c9bb46a48581\",\"code\": \"008\",\"barCode\":\"ean008\",\"name\":\"name008CHANGE-FAIL\",\"description\":\"description008CHANGE-FAIL\",\"quantity\": 100},{\"id\":\"80450045-d20d-4cdd-b937-c9bb46a48582\",\"code\": \"009\",\"barCode\": \"ean009\",\"name\":\"name009\",\"description\":\"description009\",\"quantity\":800}]'
PAYLOAD='{\"id\":\"'${ID}'\",\"transactionType\":\"'${TRANSACTION_TYPE}'\",\"resourceType\":\"'${RESOURCE_TYPE}'\",\"input\":{\"id\":\"'${INPUT_ID}'\",\"type\":\"'${INPUT_TYPE}'\"},\"output\":{\"id\":\"'${OUTPUT_ID}'\",\"type\":\"'${OUTPUT_TYPE}'\"},\"location\":\"'${LOCATION}'\",\"tags\":'${TAGS}',\"goodsInput\":'${GOODS_INPUT}',\"metaData\":'${METADATA}',\"metaDataInternal\":'${METADATA_INTERNAL}',\"loggedPersonId\":\"'${LOGGED_PERSON_ID}'\"}'
echo "create transaction ${ID}..."
${BASE_CMD} -c "{ \"Args\" : [\"transaction_create\", \"${PAYLOAD}\" ] }"
# ${BASE_CMD} -c "{ \"Args\" : [\"transaction_get\", \"${ID}\" ] }"
${SLEEP}

# transaction of goods: cause002 to john (must have goods in stock), clean stocks, 010 and 011, leave 008 and 009 with 100units, with a ambassador
ID="acef70e5-cd25-4533-8392-9fa57e43cf20"
INPUT_TYPE="${CONVECTOR_MODEL_PATH_CAUSE}"
INPUT_ID="${CAUSE_002}"
OUTPUT_TYPE="${CONVECTOR_MODEL_PATH_PERSON}"
OUTPUT_ID="${JOHN_ID}"
GOODS_INPUT='[{\"id\":\"80450045-d20d-4cdd-b937-c9bb46a48581\",\"code\": \"010\",\"barCode\": \"ean010\",\"name\": \"name010\",\"description\": \"description010\",\"quantity\": 10},{\"id\":\"80450045-d20d-4cdd-b937-c9bb46a48582\",\"code\": \"011\",\"barCode\": \"ean011\",\"name\": \"name011\",\"description\": \"description011\",\"quantity\": 11}]'
PAYLOAD='{\"id\":\"'${ID}'\",\"transactionType\":\"'${TRANSACTION_TYPE}'\",\"resourceType\":\"'${RESOURCE_TYPE}'\",\"input\":{\"id\":\"'${INPUT_ID}'\",\"type\":\"'${INPUT_TYPE}'\"},\"output\":{\"id\":\"'${OUTPUT_ID}'\",\"type\":\"'${OUTPUT_TYPE}'\"},\"location\":\"'${LOCATION}'\",\"tags\":'${TAGS}',\"goodsInput\":'${GOODS_INPUT}',\"metaData\":'${METADATA}',\"metaDataInternal\":'${METADATA_INTERNAL}',\"loggedPersonId\":\"'${LOGGED_PERSON_ID}'\"}'
echo "create transaction ${ID}..."
${BASE_CMD} -c "{ \"Args\" : [\"transaction_create\", \"${PAYLOAD}\" ] }"
# ${BASE_CMD} -c "{ \"Args\" : [\"transaction_get\", \"${ID}\" ] }"
${SLEEP}

# transaction of goods: jane to john : fraction numbers
ID="acef70e5-cd25-4533-8392-9fa57e43cf21"
INPUT_TYPE="${CONVECTOR_MODEL_PATH_PERSON}"
INPUT_ID="${JANE_ID}"
GOODS_INPUT='[{\"id\":\"80450045-d20d-4cdd-b937-c9bb46a48581\",\"code\": \"010\",\"barCode\": \"ean010\",\"name\": \"name010\",\"description\": \"description010\",\"quantity\": 9.5},{\"id\":\"80450045-d20d-4cdd-b937-c9bb46a48582\",\"code\": \"011\",\"barCode\": \"ean011\",\"name\": \"name011\",\"description\": \"description011\",\"quantity\": 10.11}]'
PAYLOAD='{\"id\":\"'${ID}'\",\"transactionType\":\"'${TRANSACTION_TYPE}'\",\"resourceType\":\"'${RESOURCE_TYPE}'\",\"input\":{\"id\":\"'${INPUT_ID}'\",\"type\":\"'${INPUT_TYPE}'\"},\"output\":{\"id\":\"'${OUTPUT_ID}'\",\"type\":\"'${OUTPUT_TYPE}'\"},\"location\":\"'${LOCATION}'\",\"tags\":'${TAGS}',\"goodsInput\":'${GOODS_INPUT}',\"metaData\":'${METADATA}',\"metaDataInternal\":'${METADATA_INTERNAL}',\"loggedPersonId\":\"'${LOGGED_PERSON_ID}'\"}'
echo "create transaction ${ID}..."
${BASE_CMD} -c "{ \"Args\" : [\"transaction_create\", \"${PAYLOAD}\" ] }"
# ${BASE_CMD} -c "{ \"Args\" : [\"transaction_get\", \"${ID}\" ] }"
${SLEEP}

# update participant gov: all updateable fields, require to be user 'chaincodeAdmin' with 'admin' attribute
AMBASSADORS_UPDATE='[\"'${MINI_ID}'\"]'
EMAIL_UPDATE="gov-updated@example.com"
METADATA_UPDATE='{\"key\":\"value updated\"}'
METADATA_INTERNAL_UPDATE='{\"key\":\"internal value updated\"}'
PAYLOAD='{\"id\":\"'${GOV_ID}'\",\"email\":\"'${EMAIL_UPDATE}'\",\"ambassadors\":'${AMBASSADORS_UPDATE}',\"metaData\":'${METADATA_UPDATE}',\"metaDataInternal\":'${METADATA_INTERNAL_UPDATE}'}'
echo "update participant ${GOV_ID}..."
${BASE_CMD} -c "{ \"Args\" : [\"participant_update\", \"${PAYLOAD}\" ] }"
# ${BASE_CMD} -c "{ \"Args\" : [\"transaction_get\", \"${ID}\" ] }"
# MUST BE ADMIN
# echo $PAYLOAD  | jq
# npx hurl invoke ${CHAINCODE_NAME} participant_update "${PAYLOAD}" -u chaincodeAdmin
${SLEEP}

# asset update asset001: all updateable fields
TAGS='[\"green\",\"cyan\",\"violet\"]'
PAYLOAD='{\"id\":\"'${ASSET_001_ID}'\",\"ambassadors\":'${AMBASSADORS_UPDATE}',\"tags\":'${TAGS}',\"metaData\":'${METADATA_UPDATE}',\"metaDataInternal\":'${METADATA_INTERNAL_UPDATE}'}'
echo "update asset ${ASSET_001_ID}..."
${BASE_CMD} -c "{ \"Args\" : [\"asset_update\", \"${PAYLOAD}\" ] }"
# ${BASE_CMD} -c "{ \"Args\" : [\"asset_get\", \"${ASSET_001_ID}\" ] }"
${SLEEP}

# cause update cause001: all updateable fields
EMAIL_UPDATE="cause001-updated@example.com"
PAYLOAD='{\"id\":\"'${CAUSE_001}'\",\"email\":\"'${EMAIL_UPDATE}'\",\"ambassadors\":'${AMBASSADORS_UPDATE}',\"tags\":'${TAGS}',\"metaData\":'${METADATA_UPDATE}',\"metaDataInternal\":'${METADATA_INTERNAL_UPDATE}'}'
echo "update cause ${CAUSE_001}..."
${BASE_CMD} -c "{ \"Args\" : [\"cause_update\", \"${PAYLOAD}\" ] }"
# ${BASE_CMD} -c "{ \"Args\" : [\"cause_get\", \"${CAUSE_001}\" ] }"
${SLEEP}

# transaction update: all updateable fields
PAYLOAD='{\"id\":\"'${TRANSACTION_001_ID}'\",\"metaDataInternal\":'${METADATA_INTERNAL_UPDATE}'}'
# echo $PAYLOAD  | jq
echo "update transaction ${TRANSACTION_001_ID}..."
${BASE_CMD} -c "{ \"Args\" : [\"transaction_update\", \"${PAYLOAD}\" ] }"
# ${BASE_CMD} -c "{ \"Args\" : [\"transaction_get\", \"${TRANSACTION_001_ID}\" ] }"
${SLEEP}

# person update mini: required admin user (acting has Gov)
PAYLOAD='{\"id\":\"'${MINI_ID}'\",\"roles\":'${ROLES}',\"metaDataInternal\":'${METADATA_INTERNAL_UPDATE}'}'
echo "update person ${MINI_ID}..."
${BASE_CMD} -c "{ \"Args\" : [\"person_update\", \"${PAYLOAD}\" ] }"
# ${BASE_CMD} -c "{ \"Args\" : [\"person_get\", \"${MINI_ID}\" ] }"
${SLEEP}

# person upsertCitizenCard: update existing user mini (minimal data): required admin user (acting has Gov)
DOCUMENT_NUMBER="09879461 1 ZZ3"
IDENTITY_NUMBER="098124620"
FISCAL_NUMBER="PT182692152"
SOCIAL_SECURITY_NUMBER="11103178211"
BENEFICIARY_NUMBER="281111659"
PAN="0010036014662658"
FIRSTNAME="Mário"
LASTNAME="Monteiro"
GENDER="Male"
HEIGHT="1.80"
FATHER_FIRSTNAME="Alberto"
FATHER_LASTNAME="Monteiro"
MOTHER_FIRSTNAME="Maria"
MOTHER_LASTNAME="Monteiro"
BIRTH_DATE="${DATE}"
NATIONALITY="Portuguese"
COUNTRY="Portugal"
DOCUMENT_TYPE="Cartão De Cidadão"
CARD_VERSION="006.007.23"
EMISSION_DATE="${DATE}"
EXPIRATION_DATE="${DATE}"
EMITTING_ENTITY="República Portuguesa"
REQUEST_LOCATION="CRCiv. Figueira da Foz"
OTHER_INFORMATION="Other info...."
PAYLOAD='{\"id\":\"'${MINI_ID}'\",\"documentNumber\": \"'${DOCUMENT_NUMBER}'\",\"identityNumber\": \"'${IDENTITY_NUMBER}'\",\"fiscalNumber\": \"'${FISCAL_NUMBER}'\",\"mobilePhone\":\"'${PHONE_NUMBER}'\",\"socialSecurityNumber\": \"'${SOCIAL_SECURITY_NUMBER}'\",\"beneficiaryNumber\": \"'${BENEFICIARY_NUMBER}'\",\"pan\": \"'${PAN}'\",\"firstname\": \"'${FIRSTNAME}'\",\"lastname\": \"'${LASTNAME}'\",\"gender\": \"'${GENDER}'\",\"height\": \"'${HEIGHT}'\",\"fatherFirstname\": \"'${FATHER_FIRSTNAME}'\",\"fatherLastname\": \"'${FATHER_LASTNAME}'\",\"motherFirstname\": \"'${MOTHER_FIRSTNAME}'\",\"motherLastname\": \"'${MOTHER_LASTNAME}'\",\"birthDate\": \"'${BIRTH_DATE}'\",\"nationality\": \"'${NATIONALITY}'\",\"country\": \"'${COUNTRY}'\",\"documentType\": \"'${DOCUMENT_TYPE}'\",\"cardVersion\": \"'${CARD_VERSION}'\",\"emissionDate\": \"'${EMISSION_DATE}'\",\"expirationDate\": \"'${EXPIRATION_DATE}'\",\"emittingEntity\": \"'${EMITTING_ENTITY}'\",\"requestLocation\": \"'${REQUEST_LOCATION}'\",\"otherInformation\": \"'${OTHER_INFORMATION}'\"}'
echo "upsertCitizenCard person ${MINI_ID}..."
${BASE_CMD} -c "{ \"Args\" : [\"person_upsertCitizenCard\", \"${PAYLOAD}\" ] }"
# ${BASE_CMD} -c "{ \"Args\" : [\"person_get\", \"${MINI_ID}\" ] }"
${SLEEP}

# person_upsertCitizenCard: new person : non existing user: required admin user (acting has Gov)
# require to use id here to send to chainCode, Model com.chain.solidary.model.person is missing the 'id' property
ID=bedbbbff-7dfc-4009-94bc-05d214a67757
DOCUMENT_NUMBER="09119461 1 ZZ3"
IDENTITY_NUMBER="091124620"
FISCAL_NUMBER="PT181192152"
SOCIAL_SECURITY_NUMBER="11101178242"
BENEFICIARY_NUMBER="285111659"
PAN="0010036114662658"
FIRSTNAME="Alexandre"
LASTNAME="Monteiro"
GENDER="Male"
HEIGHT="1.80"
FATHER_FIRSTNAME="Alberto"
FATHER_LASTNAME="Monteiro"
MOTHER_FIRSTNAME="Maria"
MOTHER_LASTNAME="Monteiro"
BIRTH_DATE="${DATE}"
NATIONALITY="Portuguese"
COUNTRY="Portugal"
DOCUMENT_TYPE="Cartão De Cidadão"
CARD_VERSION="006.117.23"
EMISSION_DATE="${DATE}"
EXPIRATION_DATE="${DATE}"
EMITTING_ENTITY="República Portuguesa"
REQUEST_LOCATION="CRCiv. Figueira da Foz"
OTHER_INFORMATION="Other info...."
PAYLOAD='{\"id\":\"'${ID}'\",\"documentNumber\": \"'${DOCUMENT_NUMBER}'\",\"identityNumber\": \"'${IDENTITY_NUMBER}'\",\"fiscalNumber\": \"'${FISCAL_NUMBER}'\",\"mobilePhone\":\"'${PHONE_NUMBER}'\",\"socialSecurityNumber\": \"'${SOCIAL_SECURITY_NUMBER}'\",\"beneficiaryNumber\": \"'${BENEFICIARY_NUMBER}'\",\"pan\": \"'${PAN}'\",\"firstname\": \"'${FIRSTNAME}'\",\"lastname\": \"'${LASTNAME}'\",\"gender\": \"'${GENDER}'\",\"height\": \"'${HEIGHT}'\",\"fatherFirstname\": \"'${FATHER_FIRSTNAME}'\",\"fatherLastname\": \"'${FATHER_LASTNAME}'\",\"motherFirstname\": \"'${MOTHER_FIRSTNAME}'\",\"motherLastname\": \"'${MOTHER_LASTNAME}'\",\"birthDate\": \"'${BIRTH_DATE}'\",\"nationality\": \"'${NATIONALITY}'\",\"country\": \"'${COUNTRY}'\",\"documentType\": \"'${DOCUMENT_TYPE}'\",\"cardVersion\": \"'${CARD_VERSION}'\",\"emissionDate\": \"'${EMISSION_DATE}'\",\"expirationDate\": \"'${EXPIRATION_DATE}'\",\"emittingEntity\": \"'${EMITTING_ENTITY}'\",\"requestLocation\": \"'${REQUEST_LOCATION}'\",\"otherInformation\": \"'${OTHER_INFORMATION}'\"}'
echo "upsertCitizenCard new person..."
${BASE_CMD} -c "{ \"Args\" : [\"person_upsertCitizenCard\", \"${PAYLOAD}\" ] }"
# ${BASE_CMD} -c "{ \"Args\" : [\"person_getByFiscalnumber\", \"${FISCAL_NUMBER}\" ] }"
${SLEEP}

# person updateProfile
EMAIL_UPDATE="foobar@example.com"
MOBILE_PHONE_UPDATE="+351936200009"
POSTAL_UPDATE="1100-020"
CITY_UPDATE="Lisbon"
REGION_UPDATE="Lisbon"
GEO_LOCATION_UPDATE=${LOCATION}
TIMEZONE_UPDATE="Europe/Lisbon"
PERSONAL_INFO_UPDATE="Personal info...."
PROFILE_UPDATE="Profile info...."
METADATA_UPDATE='{\"key\":\"value updated\"}'
PAYLOAD='{\"id\":\"'${MINI_ID}'\",\"email\":\"'${EMAIL_UPDATE}'\",\"mobilePhone\":\"'${MOBILE_PHONE_UPDATE}'\",\"postal\":\"'${POSTAL_UPDATE}'\",\"city\":\"'${CITY_UPDATE}'\",\"region\":\"'${REGION_UPDATE}'\",\"geoLocation\":\"'${GEO_LOCATION_UPDATE}'\",\"timezone\":\"'${TIMEZONE_UPDATE}'\",\"personalInfo\":\"'${PERSONAL_INFO_UPDATE}'\",\"profile\":\"'${PROFILE_UPDATE}'\",\"metaData\":'${METADATA_UPDATE}'}'
echo "upsertCitizenCard person ${MINI_ID}..."
${BASE_CMD} -c "{ \"Args\" : [\"person_updateProfile\", \"${PAYLOAD}\" ] }"
# ${BASE_CMD} -c "{ \"Args\" : [\"person_get\", \"${MINI_ID}\" ] }"
${SLEEP}

# person updatePassword
PASSWORD_UPDATE="87654321"
PAYLOAD='{\"id\":\"'${MINI_ID}'\",\"password\":\"'${PASSWORD_UPDATE}'\"}'
echo "updatePassword person ${MINI_ID}..."
${BASE_CMD} -c "{ \"Args\" : [\"person_updatePassword\", \"${PAYLOAD}\" ] }"
# ${BASE_CMD} -c "{ \"Args\" : [\"person_get\", \"${MINI_ID}\" ] }"
${SLEEP}

exit 0

# complex filters

# persisted "createdDate": "1582410746061", "name":"Big Government"
PAYLOAD='{\"filter\":{\"name\":\"Big Government\"},\"sort\":[{\"name\":\"asc\"}]}'
${BASE_CMD} -c "{ \"Args\" : [\"participant_getComplexQuery\", \"${PAYLOAD}\" ] }"
${SLEEP}

# persisted "createdDate": "1582410790588", "username": "janedoe"
PAYLOAD='{\"filter\":{\"username\":\"janedoe\",\"createdDate\":{\"$lte\":1582410790588,\"$gte\":1582410790588}},\"sort\":[{\"username\":\"asc\"}]}'
${BASE_CMD} -c "{ \"Args\" : [\"person_getComplexQuery\", \"${PAYLOAD}\" ] }"
${SLEEP}

# persisted "startDate": "1582414657", "endDate": "1582414657", "name":"Cause002b"
PAYLOAD='{\"filter\":{\"name\":\"Cause002b\",\"startDate\":{\"$lte\":1582414657},\"endDate\":{\"$gte\":1582414657}},\"sort\":[{\"name\":\"asc\"}]}'
${BASE_CMD} -c "{ \"Args\" : [\"cause_getComplexQuery\", \"${PAYLOAD}\" ] }"
${SLEEP}

# persisted "name":"Asset002" now use postfix code ex "Asset002 [acef70e5]"
PAYLOAD='{\"filter\":{\"name\":\"Asset002\"},\"sort\":[{\"name\":\"asc\"}]}'
${BASE_CMD} -c "{ \"Args\" : [\"asset_getComplexQuery\", \"${PAYLOAD}\" ] }"
${SLEEP}

# persisted "createdDate": "1582410817579", "currency": "EUR"
PAYLOAD='{\"filter\":{\"currency\":\"EUR\",\"createdDate\":{\"$lte\":1582410817579,\"$gte\":1582410817579}},\"sort\":[{\"quantity\":\"asc\"}]}'
${BASE_CMD} -c "{ \"Args\" : [\"transaction_getComplexQuery\", \"${PAYLOAD}\" ] }"
${SLEEP}
