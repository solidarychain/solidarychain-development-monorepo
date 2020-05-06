# vars
CHAINCODE_NAME=solidary-network-chaincode
# model type
CONVECTOR_MODEL_PATH_PREFIX=network.solidary.convector
CONVECTOR_MODEL_PATH_PARTICIPANT=${CONVECTOR_MODEL_PATH_PREFIX}.participant
CONVECTOR_MODEL_PATH_PERSON=${CONVECTOR_MODEL_PATH_PREFIX}.person
CONVECTOR_MODEL_PATH_CAUSE=${CONVECTOR_MODEL_PATH_PREFIX}.cause
CONVECTOR_MODEL_PATH_ASSET=${CONVECTOR_MODEL_PATH_PREFIX}.asset
CONVECTOR_MODEL_PATH_TRANSACTION=${CONVECTOR_MODEL_PATH_PREFIX}.transaction
CONVECTOR_MODEL_PATH_GOODS=${CONVECTOR_MODEL_PATH_PREFIX}.goods
# Persons
JOHN_ID=4ea88521-031b-4279-9165-9c10e1839001
JANE_ID=4ea88521-031b-4279-9165-9c10e1838010
# Participants
GOV_ID=c8ca045c-9d1b-407f-b9ae-31711758f2d0
GOV_CODE=gov
MIT_ID=61868772-4afd-4f94-af6a-8c87cf450f8e
MIT_CODE=mit
NABA_ID=b130558c-b910-4e82-b92b-caa199a047c1
NABA_CODE=nab
BADB_ID=f8596b03-492d-4d46-b54e-c4a70a037aa5
BADB_CODE=bad
GODB_ID=0fcc878a-6900-49d9-9a29-dffd9b8dae3b
GODB_CODE=gba
# Causes
CAUSE_001=acef70e5-cd25-4533-8392-9fa57e43cf11
CAUSE_002=acef70e5-cd25-4533-8392-9fa57e43cf12
CAUSE_003=acef70e5-cd25-4533-8392-9fa57e43cf69
# Misc
TAGS="[\"red\", \"blue\"]"
LOCATION=40.1890144,-8.5171909

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

# gov: this is the first participant, must be created without user -u admin
echo "Creating participant: Big Government"
ID=${GOV_ID}
CODE=${GOV_CODE}
NAME="Big Government"
PAYLOAD="{\"id\":\"${ID}\",\"code\":\"${CODE}\",\"name\":\"${NAME}\"}"
# echo $PAYLOAD  | jq
# with default user
npx hurl invoke ${CHAINCODE_NAME} participant_create "${PAYLOAD}"
# npx hurl invoke ${CHAINCODE_NAME} participant_get ${GOV_ID} -u admin
# npx hurl invoke ${CHAINCODE_NAME} participant_getByCode ${GOV_CODE} -u admin

# org1
echo "Creating participant: MIT"
ID=${MIT_ID}
CODE=${MIT_CODE}
NAME="MIT"
PAYLOAD="{\"id\":\"${ID}\",\"code\":\"${CODE}\",\"name\":\"${NAME}\"}"
# echo $PAYLOAD  | jq
npx hurl invoke ${CHAINCODE_NAME} participant_create "${PAYLOAD}" -u admin
# there is no need for -u user1, it is the default
# npx hurl invoke ${CHAINCODE_NAME} participant_get ${MIT_ID}
# npx hurl invoke ${CHAINCODE_NAME} participant_getByCode ${MIT_CODE}

# org2 : thiw will use org wait a little more until dev-peer0.org2.hurley.... is up

echo "Creating participant: National Bank"
ID=${NABA_ID}
CODE=${NABA_CODE}
NAME="National Bank"
PAYLOAD="{\"id\":\"${ID}\",\"code\":\"${CODE}\",\"name\":\"${NAME}\"}"
# echo $PAYLOAD  | jq
npx hurl invoke ${CHAINCODE_NAME} participant_create "${PAYLOAD}"  -u user1 -o org1
# there is no need for -u user1, it is the default
# npx hurl invoke ${CHAINCODE_NAME} participant_get ${NABA_ID}
# npx hurl invoke ${CHAINCODE_NAME} participant_getByCode ${NABA_CODE}

# org3
echo "Creating participant: Bad Bank"
ID=${BADB_ID}
CODE=${BADB_CODE}
NAME="Bad Bank"
PAYLOAD="{\"id\":\"${ID}\",\"code\":\"${CODE}\",\"name\":\"${NAME}\"}"
# echo $PAYLOAD  | jq
npx hurl invoke ${CHAINCODE_NAME} participant_create "${PAYLOAD}" -u user1 -o org2
# there is no need for -u user1, it is the default
# npx hurl invoke ${CHAINCODE_NAME} participant_get ${BADB_ID} -u admin
# npx hurl invoke ${CHAINCODE_NAME} participant_getByCode ${BADB_CODE}

# org4
echo "Creating participant: God Bank"
ID=${GODB_ID}
CODE=${GODB_CODE}
NAME="God Bank"
PAYLOAD="{\"id\":\"${ID}\",\"code\":\"${CODE}\",\"name\":\"${NAME}\"}"
# echo $PAYLOAD  | jq
npx hurl invoke ${CHAINCODE_NAME} participant_create "${PAYLOAD}" -u user1 -o org2
# there is no need for -u user1, it is the default
# npx hurl invoke ${CHAINCODE_NAME} participant_get ${GODB_ID} -u user1 -o org2
# npx hurl invoke ${CHAINCODE_NAME} participant_getByCode ${GODB_CODE}

# create person with all data
FIRST_NAME=John
LAST_NAME=Doe
USER_NAME=johndoe
EMAIL=${USER_NAME}@mail.com
FISCAL_NUMBER=182692124
DATE=61985472
PAYLOAD="{\"id\":\"${JOHN_ID}\",\"firstname\":\"${FIRST_NAME}\",\"lastname\":\"${LAST_NAME}\",\"beneficiaryNumber\":\"285191659\",\"birthDate\":\"${DATE}\",\"cardVersion\":\"006.007.23\",\"country\":\"PRT\",\"documentNumber\":\"09879462 0 ZZ3\",\"documentType\":\"Cartão De Cidadão\",\"emissionDate\":\"${DATE}\",\"emittingEntity\":\"República Portuguesa\",\"expirationDate\":\"${DATE}\",\"fatherFirstname\":\"Alberto\",\"fatherLastname\":\"De Andrade Monteiro\",\"fiscalNumber\":\"${FISCAL_NUMBER}\",\"gender\":\"M\",\"height\":\"1.81\",\"identityNumber\":\"098794620\",\"motherFirstname\":\"Maria Da Graça De Oliveira Mendes\",\"motherLastname\":\"Monteiro\",\"nationality\":\"PRT\",\"otherInformation\":\"\",\"pan\":\"0000036014662658\",\"requestLocation\":\"CRCiv. Figueira da Foz\",\"socialSecurityNumber\":\"11103478242\",\"username\":\"${USER_NAME}\",\"password\":\"12345678\",\"email\":\"${EMAIL}\"}"
# echo $PAYLOAD  | jq
npx hurl invoke ${CHAINCODE_NAME} person_create "${PAYLOAD}" # -u admin / if use "Cant find a participant with that fingerprint"
# npx hurl invoke ${CHAINCODE_NAME} person_get ${JOHN_ID} -u admin
# npx hurl invoke ${CHAINCODE_NAME} person_getByUsername ${USER_NAME} -u admin

# create person with all data
FIRST_NAME=Jane
LAST_NAME=Doe
USER_NAME=janedoe
EMAIL=${USER_NAME}@mail.com
FISCAL_NUMBER=582692178
DATE=61985472
PAYLOAD="{\"id\":\"${JANE_ID}\",\"firstname\":\"${FIRST_NAME}\",\"lastname\":\"${LAST_NAME}\",\"beneficiaryNumber\":\"385191659\",\"birthDate\":\"${DATE}\",\"cardVersion\":\"006.007.23\",\"country\":\"PRT\",\"documentNumber\":\"19879462 0 ZZ3\",\"documentType\":\"Cartão De Cidadão\",\"emissionDate\":\"${DATE}\",\"emittingEntity\":\"República Portuguesa\",\"expirationDate\":\"${DATE}\",\"fatherFirstname\":\"Alberto\",\"fatherLastname\":\"De Andrade Monteiro\",\"fiscalNumber\":\"${FISCAL_NUMBER}\",\"gender\":\"M\",\"height\":\"1.81\",\"identityNumber\":\"198794620\",\"motherFirstname\":\"Maria Da Graça De Oliveira Mendes\",\"motherLastname\":\"Monteiro\",\"nationality\":\"PRT\",\"otherInformation\":\"\",\"pan\":\"0000036014662658\",\"requestLocation\":\"CRCiv. Figueira da Foz\",\"socialSecurityNumber\":\"21103478242\",\"username\":\"${USER_NAME}\",\"password\":\"12345678\",\"email\":\"${EMAIL}\",\"mobilePhone\":\"351936202288\",\"postal\":\"3080-032\",\"city\":\"Figueira da Foz\",\"region\":\"Coimbra\",\"geoLocation\":\"40.1508,-8.8618\",\"timezone\":\"Europe/Lisbon\",\"personalInfo\":\"Just an ordinary man\",\"internalInfo\":\"Aspiring Good Hearth\",\"profile\":{\"data\":{\"key\":\"value\"}}}"
# echo $PAYLOAD  | jq
npx hurl invoke ${CHAINCODE_NAME} person_create "${PAYLOAD}" # -u admin / if use "Cant find a participant with that fingerprint"
# npx hurl invoke ${CHAINCODE_NAME} person_get ${JANE_ID} -u admin

# create person with minimal required data
ID=4ea88521-031b-4279-9165-9c10e1839053
FISCAL_NUMBER=182692152
# same as fiscalNumber
USER_NAME=${FISCAL_NUMBER}
PASS_WORD=12345678
PAYLOAD="{\"id\":\"${ID}\",\"fiscalNumber\":\"${FISCAL_NUMBER}\",\"username\":\"${USER_NAME}\", \"password\":\"${PASS_WORD}\"}"
# echo $PAYLOAD  | jq
npx hurl invoke ${CHAINCODE_NAME} person_create "${PAYLOAD}" # -u admin / if use "Cant find a participant with that fingerprint"
# Must be executed by user admin else it belongs to other participant.id/MIT_ID and NOT GOV_ID? - `-u admin`
# npx hurl invoke ${CHAINCODE_NAME} person_get ${ID} -u admin
# npx hurl invoke ${CHAINCODE_NAME} person_getByUsername ${USER_NAME} -u admin
# npx hurl invoke ${CHAINCODE_NAME} person_getByFiscalnumber ${FISCAL_NUMBER} -u admin

# org5 : with ambassadors : required to be after persons
echo "Creating participant: Pop Bank"
POPB_ID=0fcc878a-6900-49d9-9a29-dffd9b8dae3c
POPB_CODE=pop
ID=${POPB_ID}
CODE=${POPB_CODE}
NAME="Pop Bank"
AMBASSADORS="[\"${JOHN_ID}\", \"${JANE_ID}\"]"
PAYLOAD="{\"id\":\"${ID}\",\"code\":\"${CODE}\",\"name\":\"${NAME}\", \"ambassadors\":${AMBASSADORS}}"
# echo $PAYLOAD  | jq
npx hurl invoke ${CHAINCODE_NAME} participant_create "${PAYLOAD}" -u user1 -o org2
# there is no need for -u user1, it is the default
# npx hurl invoke ${CHAINCODE_NAME} participant_get ${POPB_ID} -u user1 -o org2
# npx hurl invoke ${CHAINCODE_NAME} participant_getByCode ${POPB_CODE}

# create cause with all data (filter with date=1582414657)
ID=${CAUSE_001}
NAME=Cause001
INPUT_TYPE=${CONVECTOR_MODEL_PATH_PARTICIPANT}
INPUT_ID=${MIT_ID}
# Date and time (GMT): Wednesday, 1 January 2020 00:00:00
START_DATE=1577836800
# Date and time (GMT): Friday, 31 December 2021 23:59:59
END_DATE=1640995199
AMBASSADORS="[\"${JOHN_ID}\", \"${JANE_ID}\"]"
PAYLOAD="{\"id\":\"${ID}\",\"name\":\"${NAME}\",\"startDate\":\"${START_DATE}\",\"endDate\":\"${END_DATE}\",\"location\":\"${LOCATION}\",\"tags\":${TAGS},\"ambassadors\":${AMBASSADORS},\"metaData\":{\"key\":\"value\"},\"input\":{\"id\":\"${INPUT_ID}\",\"type\":\"${INPUT_TYPE}\"}}"
# echo $PAYLOAD  | jq
# create and get with admin
npx hurl invoke ${CHAINCODE_NAME} cause_create "${PAYLOAD}" # -u admin / if use "Cant find a participant with that fingerprint"
# npx hurl invoke ${CHAINCODE_NAME} cause_get ${ID} -u admin

# create cause with all data (filter with date=1582414657)
ID=${CAUSE_002}
NAME=Cause002
TAGS="[\"black\", \"white\"]"
PAYLOAD="{\"id\":\"${ID}\",\"name\":\"${NAME}\",\"startDate\":\"${START_DATE}\",\"endDate\":\"${END_DATE}\",\"location\":\"${LOCATION}\",\"tags\":${TAGS},\"metaData\":{\"key\":\"value\"},\"input\":{\"id\":\"${INPUT_ID}\",\"type\":\"${INPUT_TYPE}\"}}"
# echo $PAYLOAD  | jq
npx hurl invoke ${CHAINCODE_NAME} cause_create "${PAYLOAD}" # -u admin / if use "Cant find a participant with that fingerprint"
# npx hurl invoke ${CHAINCODE_NAME} cause_get ${ID} -u admin

# create cause with minimal required data
ID=${CAUSE_003}
NAME=Cause003
INPUT_TYPE=${CONVECTOR_MODEL_PATH_PARTICIPANT}
INPUT_ID=${MIT_ID}
PAYLOAD="{\"id\":\"${ID}\",\"name\":\"${NAME}\",\"input\":{\"id\":\"${INPUT_ID}\",\"type\":\"${INPUT_TYPE}\"}}"
# echo $PAYLOAD  | jq
# with default user
npx hurl invoke ${CHAINCODE_NAME} cause_create "${PAYLOAD}"
# npx hurl invoke ${CHAINCODE_NAME} cause_get ${ID}

# create funds transaction : gov to john 1.11
ID=acef70e5-cd25-4533-8392-9fa57e43cf32
TRANSACTION_TYPE=TRANSFER_FUNDS
RESOURCE_TYPE=FUNDS
INPUT_TYPE=${CONVECTOR_MODEL_PATH_PARTICIPANT}
INPUT_ID=${GOV_ID}
OUTPUT_TYPE=${CONVECTOR_MODEL_PATH_PERSON}
OUTPUT_ID=4ea88521-031b-4279-9165-9c10e1839053
QUANTITY=1.11
CURRENCY=EUR
LOGGED_PERSON_ID=${JOHN_ID}
PAYLOAD="{\"id\":\"${ID}\",\"transactionType\":\"${TRANSACTION_TYPE}\",\"resourceType\":\"${RESOURCE_TYPE}\",\"input\":{\"id\":\"${INPUT_ID}\",\"type\":\"${INPUT_TYPE}\"},\"output\":{\"id\":\"${OUTPUT_ID}\",\"type\":\"${OUTPUT_TYPE}\"},\"quantity\":\"${QUANTITY}\",\"currency\":\"${CURRENCY}\",\"location\":\"${LOCATION}\",\"tags\":${TAGS},\"loggedPersonId\":\"${LOGGED_PERSON_ID}\",\"metaData\":{\"key\":\"value\"},\"metaDataInternal\":{\"key\":\"internal value\"}}"
# echo $PAYLOAD  | jq
npx hurl invoke ${CHAINCODE_NAME} transaction_create "${PAYLOAD}" -u user1
# npx hurl invoke ${CHAINCODE_NAME} transaction_get ${ID} -u user1

# create funds transaction : Cause003 to john 1.11
ID=acef70e5-cd25-4533-8392-9fa57e43cf33
INPUT_TYPE=${CONVECTOR_MODEL_PATH_CAUSE}
INPUT_ID=${CAUSE_003}
LOGGED_PERSON_ID=${JOHN_ID}
PAYLOAD="{\"id\":\"${ID}\",\"transactionType\":\"${TRANSACTION_TYPE}\",\"resourceType\":\"${RESOURCE_TYPE}\",\"input\":{\"id\":\"${INPUT_ID}\",\"type\":\"${INPUT_TYPE}\"},\"output\":{\"id\":\"${OUTPUT_ID}\",\"type\":\"${OUTPUT_TYPE}\"},\"quantity\":\"${QUANTITY}\",\"currency\":\"${CURRENCY}\",\"location\":\"${LOCATION}\",\"loggedPersonId\":\"${LOGGED_PERSON_ID}\",\"metaData\":{\"key\":\"value\"},\"metaDataInternal\":{\"key\":\"internal value\"}}"
# echo $PAYLOAD  | jq
npx hurl invoke ${CHAINCODE_NAME} transaction_create "${PAYLOAD}" # -u admin / if use "Cant find a participant with that fingerprint"
# npx hurl invoke ${CHAINCODE_NAME} transaction_get ${ID} -u admin

# create volunteeringHours transaction : john 10hours to Cause001
ID=acef70e5-cd25-4533-8392-9fa57e43cf34
TRANSACTION_TYPE=TRANSFER_VOLUNTEERING_HOURS
RESOURCE_TYPE=VOLUNTEERING_HOURS
INPUT_TYPE=${CONVECTOR_MODEL_PATH_PERSON}
INPUT_ID=${JOHN_ID}
OUTPUT_TYPE=${CONVECTOR_MODEL_PATH_CAUSE}
OUTPUT_ID=${CAUSE_001}
QUANTITY=10
LOGGED_PERSON_ID=${JOHN_ID}
PAYLOAD="{\"id\":\"${ID}\",\"transactionType\":\"${TRANSACTION_TYPE}\",\"resourceType\":\"${RESOURCE_TYPE}\",\"input\":{\"id\":\"${INPUT_ID}\",\"type\":\"${INPUT_TYPE}\"},\"output\":{\"id\":\"${OUTPUT_ID}\",\"type\":\"${OUTPUT_TYPE}\"},\"quantity\":\"${QUANTITY}\",\"location\":\"${LOCATION}\",\"tags\":${TAGS},\"loggedPersonId\":\"${LOGGED_PERSON_ID}\",\"metaData\":{\"key\":\"value\"},\"metaDataInternal\":{\"key\":\"internal value\"}}"
# echo $PAYLOAD  | jq
npx hurl invoke ${CHAINCODE_NAME} transaction_create "${PAYLOAD}" -u user1
# npx hurl invoke ${CHAINCODE_NAME} transaction_get ${ID} -u user1

# create volunteeringHours transaction : jane 20hours to Cause002
ID=acef70e5-cd25-4533-8392-9fa57e43cf35
INPUT_TYPE=${CONVECTOR_MODEL_PATH_PERSON}
INPUT_ID=${JANE_ID}
OUTPUT_TYPE=${CONVECTOR_MODEL_PATH_CAUSE}
OUTPUT_ID=${CAUSE_002}
QUANTITY=20
PAYLOAD="{\"id\":\"${ID}\",\"transactionType\":\"${TRANSACTION_TYPE}\",\"resourceType\":\"${RESOURCE_TYPE}\",\"input\":{\"id\":\"${INPUT_ID}\",\"type\":\"${INPUT_TYPE}\"},\"output\":{\"id\":\"${OUTPUT_ID}\",\"type\":\"${OUTPUT_TYPE}\"},\"quantity\":\"${QUANTITY}\",\"location\":\"${LOCATION}\",\"tags\":${TAGS},\"loggedPersonId\":\"${LOGGED_PERSON_ID}\",\"metaData\":{\"key\":\"value\"},\"metaDataInternal\":{\"key\":\"internal value\"}}"
# echo $PAYLOAD  | jq
npx hurl invoke ${CHAINCODE_NAME} transaction_create "${PAYLOAD}" -u user1
# npx hurl invoke ${CHAINCODE_NAME} transaction_get ${ID} -u user1

# create volunteeringHours transaction : jane 20hours to Cause002
ID=acef70e5-cd25-4533-8392-9fa57e43cf36
INPUT_TYPE=${CONVECTOR_MODEL_PATH_PERSON}
INPUT_ID=${JANE_ID}
QUANTITY=20
PAYLOAD="{\"id\":\"${ID}\",\"transactionType\":\"${TRANSACTION_TYPE}\",\"resourceType\":\"${RESOURCE_TYPE}\",\"input\":{\"id\":\"${INPUT_ID}\",\"type\":\"${INPUT_TYPE}\"},\"output\":{\"id\":\"${OUTPUT_ID}\",\"type\":\"${OUTPUT_TYPE}\"},\"quantity\":\"${QUANTITY}\",\"location\":\"${LOCATION}\",\"tags\":${TAGS},\"loggedPersonId\":\"${LOGGED_PERSON_ID}\",\"metaData\":{\"key\":\"value\"},\"metaDataInternal\":{\"key\":\"internal value\"}}"
# echo $PAYLOAD  | jq
npx hurl invoke ${CHAINCODE_NAME} transaction_create "${PAYLOAD}" -u user1
# npx hurl invoke ${CHAINCODE_NAME} transaction_get ${ID} -u user1

# create asset with all data (filter with date=1582414657)
ID=acef70e5-cd25-4533-8392-1fa57e430001
NAME=Asset001
DESCRIPTION=someDescription
ASSET_TYPE=PHYSICAL_ASSET
OWNER_TYPE=${CONVECTOR_MODEL_PATH_PERSON}
OWNER_ID=4ea88521-031b-4279-9165-9c10e1839001
AMBASSADORS="[\"${JOHN_ID}\", \"${JANE_ID}\"]"
PAYLOAD="{\"id\":\"${ID}\",\"name\":\"${NAME}\",\"description\":\"${DESCRIPTION}\",\"assetType\":\"${ASSET_TYPE}\",\"location\":\"${LOCATION}\",\"tags\":${TAGS},\"ambassadors\":${AMBASSADORS},\"metaData\":{\"key\":\"value\"},\"owner\":{\"id\":\"${OWNER_ID}\",\"type\":\"${OWNER_TYPE}\"}}"
# echo $PAYLOAD  | jq
npx hurl invoke ${CHAINCODE_NAME} asset_create "${PAYLOAD}"
# npx hurl invoke ${CHAINCODE_NAME} asset_get ${ID}

# create asset with minimal data (filter with date=1582414657)
ID=acef70e5-cd25-4533-8392-1fa57e430002
NAME=Asset002
ASSET_TYPE=DIGITAL_ASSET
OWNER_ID=4ea88521-031b-4279-9165-9c10e1839001
OWNER_TYPE=${CONVECTOR_MODEL_PATH_PERSON}
PAYLOAD="{\"id\":\"${ID}\",\"name\":\"${NAME}\",\"assetType\":\"${ASSET_TYPE}\",\"location\":\"${LOCATION}\",\"tags\":${TAGS},\"metaData\":{\"key\":\"value\"},\"owner\":{\"id\":\"${OWNER_ID}\",\"type\":\"${OWNER_TYPE}\"}}"
# echo $PAYLOAD  | jq
npx hurl invoke ${CHAINCODE_NAME} asset_create "${PAYLOAD}" # -u admin / if use "Cant find a participant with that fingerprint"
# npx hurl invoke ${CHAINCODE_NAME} asset_get ${ID} -u admin

# transaction asset from johndoe to janedoe
ID=acef70e5-cd25-4533-8392-9fa57e43cf56
TRANSACTION_TYPE=TRANSFER_ASSET
RESOURCE_TYPE=DIGITAL_ASSET
INPUT_TYPE=${CONVECTOR_MODEL_PATH_PERSON}
INPUT_ID=${JOHN_ID}
OUTPUT_TYPE=${CONVECTOR_MODEL_PATH_PERSON}
OUTPUT_ID=${JANE_ID}
ASSET_ID=acef70e5-cd25-4533-8392-1fa57e430002
LOGGED_PERSON_ID=${JOHN_ID}
# transferer by amount
QUANTITY=1000
CURRENCY=EUR
PAYLOAD="{\"id\":\"${ID}\",\"transactionType\":\"${TRANSACTION_TYPE}\",\"resourceType\":\"${RESOURCE_TYPE}\",\"input\":{\"id\":\"${INPUT_ID}\",\"type\":\"${INPUT_TYPE}\"},\"output\":{\"id\":\"${OUTPUT_ID}\",\"type\":\"${OUTPUT_TYPE}\"},\"quantity\":\"${QUANTITY}\",\"currency\":\"${CURRENCY}\",\"location\":\"${LOCATION}\",\"metaData\":{\"key\":\"value\"},\"metaDataInternal\":{\"key\":\"internal value\"},\"assetId\":\"${ASSET_ID}\",\"loggedPersonId\":\"${LOGGED_PERSON_ID}\"}"
# echo $PAYLOAD  | jq
npx hurl invoke ${CHAINCODE_NAME} transaction_create "${PAYLOAD}"
# npx hurl invoke ${CHAINCODE_NAME} transaction_get ${ID} -u admin

# transaction asset janedoe back to johndoe
ID=acef70e5-cd25-4533-8392-9fa57e43cf57
INPUT_ID=${JANE_ID}
OUTPUT_ID=${JOHN_ID}
QUANTITY=1
LOGGED_PERSON_ID=${JANE_ID}
PAYLOAD="{\"id\":\"${ID}\",\"transactionType\":\"${TRANSACTION_TYPE}\",\"resourceType\":\"${RESOURCE_TYPE}\",\"input\":{\"id\":\"${INPUT_ID}\",\"type\":\"${INPUT_TYPE}\"},\"output\":{\"id\":\"${OUTPUT_ID}\",\"type\":\"${OUTPUT_TYPE}\"},\"quantity\":\"${QUANTITY}\",\"currency\":\"${CURRENCY}\",\"location\":\"${LOCATION}\",\"metaData\":{\"key\":\"value\"},\"metaDataInternal\":{\"key\":\"internal value\"},\"assetId\":\"${ASSET_ID}\",\"loggedPersonId\":\"${LOGGED_PERSON_ID}\"}"
# echo $PAYLOAD  | jq
npx hurl invoke ${CHAINCODE_NAME} transaction_create "${PAYLOAD}"
# npx hurl invoke ${CHAINCODE_NAME} transaction_get ${ID} -u admin

# transaction asset johndoe to user with minimal required data
ID=acef70e5-cd25-4533-8392-9fa57e43cf61
MINI_ID=4ea88521-031b-4279-9165-9c10e1839053
INPUT_ID=${JOHN_ID}
OUTPUT_ID=${MINI_ID}
QUANTITY=1
LOGGED_PERSON_ID=${JOHN_ID}
PAYLOAD="{\"id\":\"${ID}\",\"transactionType\":\"${TRANSACTION_TYPE}\",\"resourceType\":\"${RESOURCE_TYPE}\",\"input\":{\"id\":\"${INPUT_ID}\",\"type\":\"${INPUT_TYPE}\"},\"output\":{\"id\":\"${OUTPUT_ID}\",\"type\":\"${OUTPUT_TYPE}\"},\"quantity\":\"${QUANTITY}\",\"currency\":\"${CURRENCY}\",\"location\":\"${LOCATION}\",\"metaData\":{\"key\":\"value\"},\"metaDataInternal\":{\"key\":\"internal value\"},\"assetId\":\"${ASSET_ID}\",\"loggedPersonId\":\"${LOGGED_PERSON_ID}\"}"
# echo $PAYLOAD  | jq
npx hurl invoke ${CHAINCODE_NAME} transaction_create "${PAYLOAD}"
# npx hurl invoke ${CHAINCODE_NAME} transaction_get ${ID} -u admin

# transaction asset user with minimal required data back to johndoe without minimal transaction data
ID=acef70e5-cd25-4533-8392-9fa57e43cf62
MINI_ID=4ea88521-031b-4279-9165-9c10e1839053
INPUT_ID=${MINI_ID}
OUTPUT_ID=${JOHN_ID}
QUANTITY=1
LOGGED_PERSON_ID=${MINI_ID}
PAYLOAD="{\"id\":\"${ID}\",\"transactionType\":\"${TRANSACTION_TYPE}\",\"resourceType\":\"${RESOURCE_TYPE}\",\"input\":{\"id\":\"${INPUT_ID}\",\"type\":\"${INPUT_TYPE}\"},\"output\":{\"id\":\"${OUTPUT_ID}\",\"type\":\"${OUTPUT_TYPE}\"},\"quantity\":\"${QUANTITY}\",\"assetId\":\"${ASSET_ID}\",\"loggedPersonId\":\"${LOGGED_PERSON_ID}\"}"
# echo $PAYLOAD  | jq
npx hurl invoke ${CHAINCODE_NAME} transaction_create "${PAYLOAD}"
# npx hurl invoke ${CHAINCODE_NAME} transaction_get ${ID} -u admin







# removed protection Detected transaction quantity while working with transactionType: [TRANSFER_GOODS]"}
# to work with payed goods transaction

# TODO: MUST SUM or CREDIT OUTPUT_ID with AMOUNT of goods transfer


# transaction of goods: person johnDoe to cause001
ID=acef70e5-cd25-4533-8392-9fa57e43cf94
TRANSACTION_TYPE=TRANSFER_GOODS
RESOURCE_TYPE=GENERIC_GOODS
INPUT_TYPE=${CONVECTOR_MODEL_PATH_PERSON}
INPUT_ID=${JOHN_ID}
OUTPUT_TYPE=${CONVECTOR_MODEL_PATH_CAUSE}
OUTPUT_ID=${CAUSE_001}
# this must fail in type of TRANSFER_GOODS
LOGGED_PERSON_ID=${JOHN_ID}
GOODS_INPUT='[{"id":"80450045-d20d-4cdd-b937-c9bb46a48581","code": "008","barCode": "ean008","name": "name008","description": "description008","quantity": 200},{"id":"80450045-d20d-4cdd-b937-c9bb46a48582","code": "009","barCode": "ean009","name": "name009","description": "description009","quantity": 900}]'
PAYLOAD="{\"id\":\"${ID}\",\"transactionType\":\"${TRANSACTION_TYPE}\",\"resourceType\":\"${RESOURCE_TYPE}\",\"input\":{\"id\":\"${INPUT_ID}\",\"type\":\"${INPUT_TYPE}\"},\"output\":{\"id\":\"${OUTPUT_ID}\",\"type\":\"${OUTPUT_TYPE}\"},\"location\":\"${LOCATION}\",\"tags\":${TAGS},\"goodsInput\":${GOODS_INPUT},\"metaData\":{\"key\":\"value\"},\"metaDataInternal\":{\"key\":\"internal value\"},\"loggedPersonId\":\"${LOGGED_PERSON_ID}\"}"
# echo $PAYLOAD  | jq
npx hurl invoke ${CHAINCODE_NAME} transaction_create "${PAYLOAD}"
# npx hurl invoke ${CHAINCODE_NAME} transaction_get ${ID} -u admin

# transaction of goods: person janeDoe to cause001
ID=acef70e5-cd25-4533-8392-9fa57e43cf95
INPUT_ID=${JANE_ID}
LOGGED_PERSON_ID=${JANE_ID}
GOODS_INPUT='[{"id":"80450045-d20d-4cdd-b937-c9bb46a48581","code": "010","barCode": "ean010","name": "name010","description": "description010","quantity": 10},{"id":"80450045-d20d-4cdd-b937-c9bb46a48582","code": "011","barCode": "ean011","name": "name011","description": "description011","quantity": 11}]'
PAYLOAD="{\"id\":\"${ID}\",\"transactionType\":\"${TRANSACTION_TYPE}\",\"resourceType\":\"${RESOURCE_TYPE}\",\"input\":{\"id\":\"${INPUT_ID}\",\"type\":\"${INPUT_TYPE}\"},\"output\":{\"id\":\"${OUTPUT_ID}\",\"type\":\"${OUTPUT_TYPE}\"},\"location\":\"${LOCATION}\",\"tags\":${TAGS},\"goodsInput\":${GOODS_INPUT},\"metaData\":{\"key\":\"value\"},\"metaDataInternal\":{\"key\":\"internal value\"},\"loggedPersonId\":\"${LOGGED_PERSON_ID}\"}"
# echo $PAYLOAD  | jq
npx hurl invoke ${CHAINCODE_NAME} transaction_create "${PAYLOAD}"
# npx hurl invoke ${CHAINCODE_NAME} transaction_get ${ID} -u admin

# transaction of goods: cause001 to cause002 (must have goods in stock)
ID=acef70e5-cd25-4533-8392-9fa57e43cf16
INPUT_ID=${CAUSE_001}
INPUT_TYPE=${CONVECTOR_MODEL_PATH_CAUSE}
OUTPUT_ID=${CAUSE_002}
# GOODS_INPUT='[{"id":"80450045-d20d-4cdd-b937-c9bb46a48581","code": "008","barCode": "ean008","name": "name008","description": "description008","quantity": 10},{"id":"80450045-d20d-4cdd-b937-c9bb46a48582","code": "009","barCode": "ean009","name": "name009","description": "description009","quantity": 10},{"id":"80450045-d20d-4cdd-b937-c9bb46a48581","code": "010","barCode": "ean010","name": "name010","description": "description010","quantity": 10},{"id":"80450045-d20d-4cdd-b937-c9bb46a48582","code": "011","barCode": "ean011","name": "name011","description": "description011","quantity": 10}]'
GOODS_INPUT='[{"id":"80450045-d20d-4cdd-b937-c9bb46a48581","code": "008","barCode": "ean008","name": "name008","description": "description008","quantity": 10},{"id":"80450045-d20d-4cdd-b937-c9bb46a48582","code": "009","barCode": "ean009","name": "name009","description": "description009","quantity": 10}]'
PAYLOAD="{\"id\":\"${ID}\",\"transactionType\":\"${TRANSACTION_TYPE}\",\"resourceType\":\"${RESOURCE_TYPE}\",\"input\":{\"id\":\"${INPUT_ID}\",\"type\":\"${INPUT_TYPE}\"},\"output\":{\"id\":\"${OUTPUT_ID}\",\"type\":\"${OUTPUT_TYPE}\"},\"location\":\"${LOCATION}\",\"tags\":${TAGS},\"goodsInput\":${GOODS_INPUT},\"metaData\":{\"key\":\"value\"},\"metaDataInternal\":{\"key\":\"internal value\"},\"loggedPersonId\":\"${LOGGED_PERSON_ID}\"}"
# echo $PAYLOAD  | jq
npx hurl invoke ${CHAINCODE_NAME} transaction_create "${PAYLOAD}"
# npx hurl invoke ${CHAINCODE_NAME} transaction_get ${ID} -u admin


# create a shared VAR for TAGS and metaData, metaDataInternal to use everywhere
# TODO: add tags and metaData, metaDataInternal to goodStocks

# transaction of goods: cause001 to participant gov (must have goods in stock) : MINIMAL goodsInput with only id,code,quantiry properties (works when goods already exists)
ID=acef70e5-cd25-4533-8392-9fa57e43cf26
OUTPUT_ID=${GODB_ID}
OUTPUT_TYPE=${CONVECTOR_MODEL_PATH_PARTICIPANT}
GOODS_INPUT='[{"id":"80450045-d20d-4cdd-b937-c9bb46a48581","code": "008","barCode": "ean008","name": "name008","description": "description008","quantity": 10},{"id":"80450045-d20d-4cdd-b937-c9bb46a48582","code": "009","barCode": "ean009","name": "name009","description": "description009","quantity": 10}]'
PAYLOAD="{\"id\":\"${ID}\",\"transactionType\":\"${TRANSACTION_TYPE}\",\"resourceType\":\"${RESOURCE_TYPE}\",\"input\":{\"id\":\"${INPUT_ID}\",\"type\":\"${INPUT_TYPE}\"},\"output\":{\"id\":\"${OUTPUT_ID}\",\"type\":\"${OUTPUT_TYPE}\"},\"location\":\"${LOCATION}\",\"tags\":${TAGS},\"goodsInput\":${GOODS_INPUT},\"metaData\":{\"key\":\"value\"},\"metaDataInternal\":{\"key\":\"internal value\"},\"loggedPersonId\":\"${LOGGED_PERSON_ID}\"}"
# echo $PAYLOAD  | jq
npx hurl invoke ${CHAINCODE_NAME} transaction_create "${PAYLOAD}"
# npx hurl invoke ${CHAINCODE_NAME} transaction_get ${ID} -u admin




# transaction of goods: cause001 to cause002 (must vahe goods in stock)
# ID=acef70e5-cd25-4533-8392-9fa57e43cf96
ID=acef70e5-cd25-4533-8392-9fa57e43cf08
INPUT_ID=${CAUSE_001}
INPUT_TYPE=${CONVECTOR_MODEL_PATH_CAUSE}
OUTPUT_ID=${CAUSE_003}
LOGGED_PERSON_ID=${JOHN_ID}
# increase code 010 and 011 and add a new 012
# GOODS_INPUT='[{"id":"80450045-d20d-4cdd-b937-c9bb46a48581","code": "010","barCode": "ean010","name": "name010","description": "description010","quantity": 100},{"id":"80450045-d20d-4cdd-b937-c9bb46a48582","code": "011","barCode": "ean011","name": "name011","description": "description011","quantity": 111},{"id":"80450045-d20d-4cdd-b937-c9bb46a48511","code": "012","barCode": "ean012","name": "name012","description": "description012","quantity": 12}]'
GOODS_INPUT='[{"id":"80450045-d20d-4cdd-b937-c9bb46a48581","code": "008","barCode": "ean008","name": "name008","description": "description008","quantity": 200},{"id":"80450045-d20d-4cdd-b937-c9bb46a48582","code": "009","barCode": "ean009","name": "name009","description": "description009","quantity": 900}]'
PAYLOAD="{\"id\":\"${ID}\",\"transactionType\":\"${TRANSACTION_TYPE}\",\"resourceType\":\"${RESOURCE_TYPE}\",\"input\":{\"id\":\"${INPUT_ID}\",\"type\":\"${INPUT_TYPE}\"},\"output\":{\"id\":\"${OUTPUT_ID}\",\"type\":\"${OUTPUT_TYPE}\"},\"location\":\"${LOCATION}\",\"tags\":${TAGS},\"goodsInput\":${GOODS_INPUT},\"metaData\":{\"key\":\"value\"},\"metaDataInternal\":{\"key\":\"internal value\"},\"loggedPersonId\":\"${LOGGED_PERSON_ID}\"}"
# echo $PAYLOAD  | jq
npx hurl invoke ${CHAINCODE_NAME} transaction_create "${PAYLOAD}"
# npx hurl invoke ${CHAINCODE_NAME} transaction_get ${ID} -u admin






# leave here { Error: transaction returned with failure: {"name":"Error","status":500,"message":"You must have a sufficient quantity of goods of item code:[010] to complete the transaction'"}


# transaction of goods: person to cause 2

# transaction of goods: person to cause 3

# transaction of goods: cause to person 1: empty stock

# todo add INDEXES to complex filters
# complex filters

# note for escaped $lte, work with sort:[{name:"asc"}] and sort:["name"]
# persisted "createdDate": "1582410746061", "name":"Big Government"
# npx hurl invoke ${CHAINCODE_NAME} participant_getComplexQuery "{\"filter\":{\"name\":\"Big Government\",\"createdDate\":{\"\$lte\":1582410746061,\"\$gte\":1582410746061}},\"sort\":[{\"name\":\"asc\"}]}"
npx hurl invoke ${CHAINCODE_NAME} participant_getComplexQuery "{\"filter\":{\"name\":\"Big Government\"},\"sort\":[{\"name\":\"asc\"}]}"
# persisted "createdDate": "1582410790588", "username": "janedoe"
npx hurl invoke ${CHAINCODE_NAME} person_getComplexQuery "{\"filter\":{\"username\":\"janedoe\",\"createdDate\":{\"\$lte\":1582410790588,\"\$gte\":1582410790588}},\"sort\":[{\"username\":\"asc\"}]}"
# persisted "startDate": "1582414657", "endDate": "1582414657", "name":"Cause002b"
npx hurl invoke ${CHAINCODE_NAME} cause_getComplexQuery "{\"filter\":{\"name\":\"Cause002b\",\"startDate\":{\"\$lte\":1582414657},\"endDate\":{\"\$gte\":1582414657}},\"sort\":[{\"name\":\"asc\"}]}"
# persisted "name":"Asset002" now use postfix code ex "Asset002 [acef70e5]"
npx hurl invoke ${CHAINCODE_NAME} asset_getComplexQuery "{\"filter\":{\"name\":\"Asset002\"},\"sort\":[{\"name\":\"asc\"}]}"
# persisted "createdDate": "1582410817579", "currency": "EUR"
npx hurl invoke ${CHAINCODE_NAME} transaction_getComplexQuery "{\"filter\":{\"currency\":\"EUR\",\"createdDate\":{\"\$lte\":1582410817579,\"\$gte\":1582410817579}},\"sort\":[{\"quantity\":\"asc\"}]}"
