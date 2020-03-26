CHAINCODE_NAME=solidary-network-chaincode

# commands
# npx hurl invoke ${CHAINCODE_NAME} participant_getAll
# npx hurl invoke ${CHAINCODE_NAME} person_getAll
# npx hurl invoke ${CHAINCODE_NAME} person_get 4ea88521-031b-4279-9165-9c10e1839001
# npx hurl invoke ${CHAINCODE_NAME} person_getByUsername johndoe
# npx hurl invoke ${CHAINCODE_NAME} cause_getAll
# npx hurl invoke ${CHAINCODE_NAME} asset_getAll
# npx hurl invoke ${CHAINCODE_NAME} transaction_getAll

# invoke with user `admin` uses `gov`
# invoke without specify user and org default to: user1 in org org1...

#         : gov
# -o org1 : mit
# -o org2 : nab

# all participants have gov participant assiged

# gov
echo "Creating participant: Big Government"
GOV_ID=c8ca045c-9d1b-407f-b9ae-31711758f2d0
npx hurl invoke ${CHAINCODE_NAME} participant_create ${GOV_ID} "gov" "Big Government" -u admin
# npx hurl invoke ${CHAINCODE_NAME} participant_get ${GOV_ID} -u admin

# org1
echo "Creating participant: MIT"
MIT_ID=61868772-4afd-4f94-af6a-8c87cf450f8e
npx hurl invoke ${CHAINCODE_NAME} participant_create ${MIT_ID} "mit" "MIT" -u user1 -o org1
# there is no need for -u user1, it is the default
# npx hurl invoke ${CHAINCODE_NAME} participant_get ${MIT_ID}

# org2
echo "Creating participant: National Bank"
NABA_ID=b130558c-b910-4e82-b92b-caa199a047c1
npx hurl invoke ${CHAINCODE_NAME} participant_create ${NABA_ID} "nab" "National Bank" -u user1 -o org2
# there is no need for -u user1, it is the default
# npx hurl invoke ${CHAINCODE_NAME} participant_get ${NABA_ID}

# org3
echo "Creating participant: Bad Bank"
BADB_ID=f8596b03-492d-4d46-b54e-c4a70a037aa5
npx hurl invoke ${CHAINCODE_NAME} participant_create ${BADB_ID} "bad" "Bad Bank" -u user1 -o org2
# there is no need for -u user1, it is the default
# npx hurl invoke ${CHAINCODE_NAME} participant_get ${BADB_ID} -u admin

# org4
echo "Creating participant: God Bank"
GODB_ID=0fcc878a-6900-49d9-9a29-dffd9b8dae3b
npx hurl invoke ${CHAINCODE_NAME} participant_create ${GODB_ID} "god" "God Bank" -u user1 -o org2
# there is no need for -u user1, it is the default
# npx hurl invoke ${CHAINCODE_NAME} participant_get ${GODB_ID} -u user1 -o org2

# # gov
# echo "Creating participant: Big Government"
# GOV_ID=c8ca045c-9d1b-407f-b9ae-31711758f2d0
# GOV_CODE=gov
# ID=${GOV_ID}
# CODE=${GOV_CODE}
# NAME="Big Government"
# PAYLOAD="{\"id\":\"${ID}\",\"code\":\"${CODE}\",\"name\":\"${NAME}\"}"
# # echo $PAYLOAD  | jq
# # with default user
# npx hurl invoke ${CHAINCODE_NAME} participant_create "${PAYLOAD}"
# # npx hurl invoke ${CHAINCODE_NAME} participant_get ${GOV_ID} -u admin
# # npx hurl invoke ${CHAINCODE_NAME} participant_getByCode ${GOV_CODE} -u admin

# # org1
# echo "Creating participant: MIT"
# MIT_ID=61868772-4afd-4f94-af6a-8c87cf450f8e
# MIT_CODE=mit
# ID=${MIT_ID}
# CODE=${MIT_CODE}
# NAME="MIT"
# PAYLOAD="{\"id\":\"${ID}\",\"code\":\"${CODE}\",\"name\":\"${NAME}\"}"
# # echo $PAYLOAD  | jq
# npx hurl invoke ${CHAINCODE_NAME} participant_create "${PAYLOAD}" -u user1 -o org1
# # there is no need for -u user1, it is the default
# # npx hurl invoke ${CHAINCODE_NAME} participant_get ${MIT_ID}
# # npx hurl invoke ${CHAINCODE_NAME} participant_getByCode ${MIT_CODE}

# # org2
# echo "Creating participant: National Bank"
# NABA_ID=b130558c-b910-4e82-b92b-caa199a047c1
# NABA_CODE=nab
# ID=${NABA_ID}
# CODE=${NABA_CODE}
# NAME="National Bank"
# PAYLOAD="{\"id\":\"${ID}\",\"code\":\"${CODE}\",\"name\":\"${NAME}\"}"
# # echo $PAYLOAD  | jq
# npx hurl invoke ${CHAINCODE_NAME} participant_create "${PAYLOAD}"  -u user1 -o org2
# # there is no need for -u user1, it is the default
# # npx hurl invoke ${CHAINCODE_NAME} participant_get ${NABA_ID}
# # npx hurl invoke ${CHAINCODE_NAME} participant_getByCode ${NABA_CODE}

# # org3
# echo "Creating participant: Bad Bank"
# BADB_ID=f8596b03-492d-4d46-b54e-c4a70a037aa5
# BADB_CODE=bad
# ID=${BADB_ID}
# CODE=${BADB_CODE}
# NAME="Bad Bank"
# PAYLOAD="{\"id\":\"${ID}\",\"code\":\"${CODE}\",\"name\":\"${NAME}\"}"
# # echo $PAYLOAD  | jq
# npx hurl invoke ${CHAINCODE_NAME} participant_create "${PAYLOAD}" -u user1 -o org2
# # there is no need for -u user1, it is the default
# # npx hurl invoke ${CHAINCODE_NAME} participant_get ${BADB_ID} -u admin
# # npx hurl invoke ${CHAINCODE_NAME} participant_getByCode ${BADB_CODE}

# # org4
# echo "Creating participant: God Bank"
# GODB_ID=0fcc878a-6900-49d9-9a29-dffd9b8dae3b
# GODB_CODE=gba
# ID=${GODB_ID}
# CODE=${GODB_CODE}
# NAME="God Bank"
# PAYLOAD="{\"id\":\"${ID}\",\"code\":\"${CODE}\",\"name\":\"${NAME}\"}"
# # echo $PAYLOAD  | jq
# npx hurl invoke ${CHAINCODE_NAME} participant_create "${PAYLOAD}" -u user1 -o org2
# # there is no need for -u user1, it is the default
# # npx hurl invoke ${CHAINCODE_NAME} participant_get ${GODB_ID} -u user1 -o org2
# # npx hurl invoke ${CHAINCODE_NAME} participant_getByCode ${GODB_CODE}

# create person with all data
ID=4ea88521-031b-4279-9165-9c10e1839001
FIRST_NAME=John
LAST_NAME=Doe
USER_NAME=johndoe
FISCAL_NUMBER=182692124
DATE=61985472
PAYLOAD="{\"id\":\"${ID}\",\"firstname\":\"${FIRST_NAME}\",\"lastname\":\"${LAST_NAME}\",\"beneficiaryNumber\":\"285191659\",\"birthDate\":\"${DATE}\",\"cardVersion\":\"006.007.23\",\"country\":\"PRT\",\"documentNumber\":\"09879462 0 ZZ3\",\"documentType\":\"Cartão De Cidadão\",\"emissionDate\":\"${DATE}\",\"emittingEntity\":\"República Portuguesa\",\"expirationDate\":\"${DATE}\",\"fatherFirstname\":\"Alberto\",\"fatherLastname\":\"De Andrade Monteiro\",\"fiscalNumber\":\"${FISCAL_NUMBER}\",\"gender\":\"M\",\"height\":\"1.81\",\"identityNumber\":\"098794620\",\"motherFirstname\":\"Maria Da Graça De Oliveira Mendes\",\"motherLastname\":\"Monteiro\",\"nationality\":\"PRT\",\"otherInformation\":\"\",\"pan\":\"0000036014662658\",\"requestLocation\":\"CRCiv. Figueira da Foz\",\"socialSecurityNumber\":\"11103478242\",\"username\":\"${USER_NAME}\",\"password\":\"12345678\",\"email\":\"johndoe@mail.com\"}"
# echo $PAYLOAD  | jq
npx hurl invoke ${CHAINCODE_NAME} person_create "${PAYLOAD}" -u admin
# npx hurl invoke ${CHAINCODE_NAME} person_get ${ID} -u admin
# npx hurl invoke ${CHAINCODE_NAME} person_getByUsername ${USER_NAME} -u admin

# create person with all data
ID=4ea88521-031b-4279-9165-9c10e1838010
FIRST_NAME=Jane
LAST_NAME=Doe
USER_NAME=janedoe
FISCAL_NUMBER=582692178
DATE=61985472
PAYLOAD="{\"id\":\"${ID}\",\"firstname\":\"${FIRST_NAME}\",\"lastname\":\"${LAST_NAME}\",\"beneficiaryNumber\":\"385191659\",\"birthDate\":\"${DATE}\",\"cardVersion\":\"006.007.23\",\"country\":\"PRT\",\"documentNumber\":\"19879462 0 ZZ3\",\"documentType\":\"Cartão De Cidadão\",\"emissionDate\":\"${DATE}\",\"emittingEntity\":\"República Portuguesa\",\"expirationDate\":\"${DATE}\",\"fatherFirstname\":\"Alberto\",\"fatherLastname\":\"De Andrade Monteiro\",\"fiscalNumber\":\"${FISCAL_NUMBER}\",\"gender\":\"M\",\"height\":\"1.81\",\"identityNumber\":\"198794620\",\"motherFirstname\":\"Maria Da Graça De Oliveira Mendes\",\"motherLastname\":\"Monteiro\",\"nationality\":\"PRT\",\"otherInformation\":\"\",\"pan\":\"0000036014662658\",\"requestLocation\":\"CRCiv. Figueira da Foz\",\"socialSecurityNumber\":\"21103478242\",\"username\":\"${USER_NAME}\",\"password\":\"12345678\",\"email\":\"janedoe@mail.com\",\"mobilePhone\":\"351936202288\",\"postal\":\"3080-032\",\"city\":\"Figueira da Foz\",\"region\":\"Coimbra\",\"geoLocation\":\"40.1508,-8.8618\",\"timezone\":\"Europe/Lisbon\",\"personalInfo\":\"Just an ordinary man\",\"internalInfo\":\"Aspiring Good Hearth\",\"profile\":{\"data\":{\"key\":\"value\"}}}"
# echo $PAYLOAD  | jq
npx hurl invoke ${CHAINCODE_NAME} person_create "${PAYLOAD}" -u admin
# npx hurl invoke ${CHAINCODE_NAME} person_get ${ID} -u admin

# create person with minimal required data
ID=4ea88521-031b-4279-9165-9c10e1839053
FISCAL_NUMBER=182692152
# same as fiscalNumber
USER_NAME=${FISCAL_NUMBER}
PASS_WORD=12345678
PAYLOAD="{\"id\":\"${ID}\",\"fiscalNumber\":\"${FISCAL_NUMBER}\",\"username\":\"${USER_NAME}\", \"password\":\"${PASS_WORD}\"}"
# echo $PAYLOAD  | jq
npx hurl invoke ${CHAINCODE_NAME} person_create "${PAYLOAD}" -u admin
# Must be executed by user admin else it belongs to other participant.id/MIT_ID and NOT GOV_ID? - `-u admin`
# npx hurl invoke ${CHAINCODE_NAME} person_get ${ID} -u admin
# npx hurl invoke ${CHAINCODE_NAME} person_getByUsername ${USER_NAME} -u admin
# npx hurl invoke ${CHAINCODE_NAME} person_getByFiscalnumber ${FISCAL_NUMBER} -u admin

# create cause with all data (filter with date=1582414657)
ID=acef70e5-cd25-4533-8392-9fa57e43cf11
NAME=Cause001
INPUT_TYPE=network.solidary.convector.participant
INPUT_ID=${MIT_ID}
# Date and time (GMT): Wednesday, 1 January 2020 00:00:00
START_DATE=1577836800
# Date and time (GMT): Friday, 31 December 2021 23:59:59
END_DATE=1640995199
LOCATION=40.1890144,-8.5171909
TAGS="[\"red\", \"blue\"]"
AMBASSADOR_USERNAME=johndoe
PAYLOAD="{\"id\":\"${ID}\",\"name\":\"${NAME}\",\"startDate\":\"${START_DATE}\",\"endDate\":\"${END_DATE}\",\"location\":\"${LOCATION}\",\"tags\":${TAGS},\"ambassadorUsername\":\"${AMBASSADOR_USERNAME}\",\"metaData\":{\"key\":\"value\"},\"input\":{\"id\":\"${INPUT_ID}\",\"type\":\"${INPUT_TYPE}\"}}"
# echo $PAYLOAD  | jq
# create and get with admin
npx hurl invoke ${CHAINCODE_NAME} cause_create "${PAYLOAD}" -u admin
# npx hurl invoke ${CHAINCODE_NAME} cause_get ${ID} -u admin

# create cause with all data (filter with date=1582414657)
ID=acef70e5-cd25-4533-8392-9fa57e43cf12
NAME=Cause002
TAGS="[\"black\", \"white\"]"
PAYLOAD="{\"id\":\"${ID}\",\"name\":\"${NAME}\",\"startDate\":\"${START_DATE}\",\"endDate\":\"${END_DATE}\",\"location\":\"${LOCATION}\",\"tags\":${TAGS},\"metaData\":{\"key\":\"value\"},\"input\":{\"id\":\"${INPUT_ID}\",\"type\":\"${INPUT_TYPE}\"}}"
# echo $PAYLOAD  | jq
npx hurl invoke ${CHAINCODE_NAME} cause_create "${PAYLOAD}" -u admin
# npx hurl invoke ${CHAINCODE_NAME} cause_get ${ID} -u admin

# create cause with minimal required data
ID=acef70e5-cd25-4533-8392-9fa57e43cf69
NAME=Cause003
INPUT_TYPE=network.solidary.convector.participant
INPUT_ID=${MIT_ID}
PAYLOAD="{\"id\":\"${ID}\",\"name\":\"${NAME}\",\"input\":{\"id\":\"${INPUT_ID}\",\"type\":\"${INPUT_TYPE}\"}}"
# echo $PAYLOAD  | jq
# with default user
npx hurl invoke ${CHAINCODE_NAME} cause_create "${PAYLOAD}"
# npx hurl invoke ${CHAINCODE_NAME} cause_get ${ID}

# create transaction
ID=acef70e5-cd25-4533-8392-9fa57e43cf32
TRANSACTION_TYPE=CREATE
RESOURCE_TYPE=FUNDS
INPUT_TYPE=network.solidary.convector.participant
INPUT_ID=${GOV_ID}
OUTPUT_TYPE=network.solidary.convector.person
OUTPUT_ID=4ea88521-031b-4279-9165-9c10e1839053
QUANTITY=1.11
CURRENCY=EUR
LOCATION=40.1890144,-8.5171909
TAGS="[\"red\", \"blue\"]"
PAYLOAD="{\"id\":\"${ID}\",\"transactionType\":\"${TRANSACTION_TYPE}\",\"resourceType\":\"${RESOURCE_TYPE}\",\"input\":{\"id\":\"${INPUT_ID}\",\"type\":\"${INPUT_TYPE}\"},\"output\":{\"id\":\"${OUTPUT_ID}\",\"type\":\"${OUTPUT_TYPE}\"},\"quantity\":\"${QUANTITY}\",\"currency\":\"${CURRENCY}\",\"location\":\"${LOCATION}\",\"tags\":${TAGS},\"metaData\":{\"key\":\"value\"},\"metaDataInternal\":{\"key\":\"internal value\"}}"
# echo $PAYLOAD  | jq
npx hurl invoke ${CHAINCODE_NAME} transaction_create "${PAYLOAD}" -u user1
# npx hurl invoke ${CHAINCODE_NAME} transaction_get ${ID} -u user1

# transaction with cause
ID=acef70e5-cd25-4533-8392-9fa57e43cf33
INPUT_TYPE=network.solidary.convector.cause
INPUT_ID=acef70e5-cd25-4533-8392-9fa57e43cf69
PAYLOAD="{\"id\":\"${ID}\",\"transactionType\":\"${TRANSACTION_TYPE}\",\"resourceType\":\"${RESOURCE_TYPE}\",\"input\":{\"id\":\"${INPUT_ID}\",\"type\":\"${INPUT_TYPE}\"},\"output\":{\"id\":\"${OUTPUT_ID}\",\"type\":\"${OUTPUT_TYPE}\"},\"quantity\":\"${QUANTITY}\",\"currency\":\"${CURRENCY}\",\"location\":\"${LOCATION}\",\"metaData\":{\"key\":\"value\"},\"metaDataInternal\":{\"key\":\"internal value\"}}"
# echo $PAYLOAD  | jq
npx hurl invoke ${CHAINCODE_NAME} transaction_create "${PAYLOAD}" -u admin
# npx hurl invoke ${CHAINCODE_NAME} transaction_get ${ID} -u admin

# create asset with all data (filter with date=1582414657)
ID=acef70e5-cd25-4533-8392-1fa57e430001
NAME=Asset001
ASSET_TYPE=PHYSICAL_ASSET
OWNER_TYPE=network.solidary.convector.person
OWNER_ID=4ea88521-031b-4279-9165-9c10e1839001
LOCATION=40.1890144,-8.5171909
TAGS="[\"red\", \"blue\"]"
PAYLOAD="{\"id\":\"${ID}\",\"name\":\"${NAME}\",\"assetType\":\"${ASSET_TYPE}\",\"location\":\"${LOCATION}\",\"tags\":${TAGS},\"metaData\":{\"key\":\"value\"},\"owner\":{\"id\":\"${OWNER_ID}\",\"type\":\"${OWNER_TYPE}\"}}"
# echo $PAYLOAD  | jq
npx hurl invoke ${CHAINCODE_NAME} asset_create "${PAYLOAD}"
# npx hurl invoke ${CHAINCODE_NAME} asset_get ${ID}

# create asset with minimal data (filter with date=1582414657)
ID=acef70e5-cd25-4533-8392-1fa57e430002
NAME=Asset002
ASSET_TYPE=DIGITAL_ASSET
OWNER_TYPE=network.solidary.convector.person
OWNER_ID=4ea88521-031b-4279-9165-9c10e1839001
PAYLOAD="{\"id\":\"${ID}\",\"name\":\"${NAME}\",\"assetType\":\"${ASSET_TYPE}\",\"location\":\"${LOCATION}\",\"tags\":${TAGS},\"metaData\":{\"key\":\"value\"},\"owner\":{\"id\":\"${OWNER_ID}\",\"type\":\"${OWNER_TYPE}\"}}"
# echo $PAYLOAD  | jq
npx hurl invoke ${CHAINCODE_NAME} asset_create "${PAYLOAD}" -u admin
# npx hurl invoke ${CHAINCODE_NAME} asset_get ${ID} -u admin


# TODO


# INPUT MUST BE THE OWNER, CHECK IF USERNAME MODEL IS EQUALT TO INPUT TO TO DOUBLE VALIDATE
# PARTICIPANTS AND CAUSES DONT HAVE username how we can transfer from causes and participants without a username?


# change username with ownerUsername

# must send else it assumes defaults?
# TO FIX
#  "quantity": 1.11,
#  "resourceType": "FUNDS",
#  "transactionType": "CREATE",

# ResourceType, ALWAYS GET from Asset ex can be PHYSICAL_ASSET,DIGITAL_ASSET
# QUANTITY & CURRENCY can be undefined if it is a asset donation

# transaction asset from johndoe to janedoe
ID=acef70e5-cd25-4533-8392-9fa57e43cf56
TRANSACTION_TYPE=TRANSFER
RESOURCE_TYPE=DIGITAL_ASSET
LOCATION=40.1890144,-8.5171909
JOHN_ID=4ea88521-031b-4279-9165-9c10e1839001
JANE_ID=4ea88521-031b-4279-9165-9c10e1838010
INPUT_TYPE=network.solidary.convector.person
INPUT_ID=${JOHN_ID}
OUTPUT_TYPE=network.solidary.convector.person
OUTPUT_ID=${JANE_ID}
ASSET_ID=acef70e5-cd25-4533-8392-1fa57e430002
OWNER_USERNAME=johndoe
# transferer by amount
QUANTITY=1000
CURRENCY=EUR
PAYLOAD="{\"id\":\"${ID}\",\"transactionType\":\"${TRANSACTION_TYPE}\",\"resourceType\":\"${RESOURCE_TYPE}\",\"input\":{\"id\":\"${INPUT_ID}\",\"type\":\"${INPUT_TYPE}\"},\"output\":{\"id\":\"${OUTPUT_ID}\",\"type\":\"${OUTPUT_TYPE}\"},\"quantity\":\"${QUANTITY}\",\"currency\":\"${CURRENCY}\",\"location\":\"${LOCATION}\",\"metaData\":{\"key\":\"value\"},\"metaDataInternal\":{\"key\":\"internal value\"},\"assetId\":\"${ASSET_ID}\",\"ownerUsername\":\"${OWNER_USERNAME}\"}"
# echo $PAYLOAD  | jq
npx hurl invoke ${CHAINCODE_NAME} transaction_create "${PAYLOAD}" -u admin
# npx hurl invoke ${CHAINCODE_NAME} transaction_get ${ID} -u admin

# transaction asset janedoe to johnode
ID=acef70e5-cd25-4533-8392-9fa57e43cf57
INPUT_ID=${JANE_ID}
OUTPUT_ID=${JOHN_ID}
OWNER_USERNAME=janedoe
PAYLOAD="{\"id\":\"${ID}\",\"transactionType\":\"${TRANSACTION_TYPE}\",\"resourceType\":\"${RESOURCE_TYPE}\",\"input\":{\"id\":\"${INPUT_ID}\",\"type\":\"${INPUT_TYPE}\"},\"output\":{\"id\":\"${OUTPUT_ID}\",\"type\":\"${OUTPUT_TYPE}\"},\"quantity\":\"${QUANTITY}\",\"currency\":\"${CURRENCY}\",\"location\":\"${LOCATION}\",\"metaData\":{\"key\":\"value\"},\"metaDataInternal\":{\"key\":\"internal value\"},\"assetId\":\"${ASSET_ID}\",\"ownerUsername\":\"${OWNER_USERNAME}\"}"
# echo $PAYLOAD  | jq
npx hurl invoke ${CHAINCODE_NAME} transaction_create "${PAYLOAD}" -u admin
# npx hurl invoke ${CHAINCODE_NAME} transaction_get ${ID} -u admin

# transaction asset johndoe to user with minimal required data
ID=acef70e5-cd25-4533-8392-9fa57e43cf61
MINI_ID=4ea88521-031b-4279-9165-9c10e1839053
INPUT_ID=${MINI_ID}
OUTPUT_ID=${JANE_ID}
OWNER_USERNAME=182692152
PAYLOAD="{\"id\":\"${ID}\",\"transactionType\":\"${TRANSACTION_TYPE}\",\"resourceType\":\"${RESOURCE_TYPE}\",\"input\":{\"id\":\"${INPUT_ID}\",\"type\":\"${INPUT_TYPE}\"},\"output\":{\"id\":\"${OUTPUT_ID}\",\"type\":\"${OUTPUT_TYPE}\"},\"quantity\":\"${QUANTITY}\",\"currency\":\"${CURRENCY}\",\"location\":\"${LOCATION}\",\"metaData\":{\"key\":\"value\"},\"metaDataInternal\":{\"key\":\"internal value\"},\"assetId\":\"${ASSET_ID}\",\"ownerUsername\":\"${OWNER_USERNAME}\"}"
# echo $PAYLOAD  | jq
npx hurl invoke ${CHAINCODE_NAME} transaction_create "${PAYLOAD}" -u admin
# npx hurl invoke ${CHAINCODE_NAME} transaction_get ${ID} -u admin

# complex filters

# note for escaped $lte, work with sort:[{name:"asc"}] and sort:["name"]
# persisted "createdDate": "1582410746061", "name":"Big Government"
# npx hurl invoke ${CHAINCODE_NAME} participant_getComplexQuery "{\"filter\":{\"name\":\"Big Government\",\"createdDate\":{\"\$lte\":1582410746061,\"\$gte\":1582410746061}},\"sort\":[{\"name\":\"asc\"}]}"
# TODO: ok without created date filter
npx hurl invoke ${CHAINCODE_NAME} participant_getComplexQuery "{\"filter\":{\"name\":\"Big Government\"},\"sort\":[{\"name\":\"asc\"}]}"
# persisted "createdDate": "1582410790588", "username": "janedoe"
npx hurl invoke ${CHAINCODE_NAME} person_getComplexQuery "{\"filter\":{\"username\":\"janedoe\",\"createdDate\":{\"\$lte\":1582410790588,\"\$gte\":1582410790588}},\"sort\":[{\"username\":\"asc\"}]}"
# persisted "startDate": "1582414657", "endDate": "1582414657", "name":"Cause002b"
npx hurl invoke ${CHAINCODE_NAME} cause_getComplexQuery "{\"filter\":{\"name\":\"Cause002b\",\"startDate\":{\"\$lte\":1582414657},\"endDate\":{\"\$gte\":1582414657}},\"sort\":[{\"name\":\"asc\"}]}"
# persisted "name":"Asset003"
npx hurl invoke ${CHAINCODE_NAME} asset_getComplexQuery "{\"filter\":{\"name\":\"Asset003\"},\"sort\":[{\"name\":\"asc\"}]}"
# persisted "createdDate": "1582410817579", "currency": "EUR"
npx hurl invoke ${CHAINCODE_NAME} transaction_getComplexQuery "{\"filter\":{\"currency\":\"EUR\",\"createdDate\":{\"\$lte\":1582410817579,\"\$gte\":1582410817579}},\"sort\":[{\"quantity\":\"asc\"}]}"
