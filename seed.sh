CHAINCODE_NAME=solidary-network-chaincode

# commands
# npx hurl invoke ${CHAINCODE_NAME} participant_getAll
# npx hurl invoke ${CHAINCODE_NAME} person_getAll
# npx hurl invoke ${CHAINCODE_NAME} person_get 4ea88521-031b-4279-9165-9c10e1839001
# npx hurl invoke ${CHAINCODE_NAME} person_getByUsername johndoe
# npx hurl invoke ${CHAINCODE_NAME} cause_getAll
# npx hurl invoke ${CHAINCODE_NAME} asset_getAll
# npx hurl invoke ${CHAINCODE_NAME} transaction_getAll

echo "Creating participant: Big Government"

# gov
npx hurl invoke ${CHAINCODE_NAME} participant_register gov "Big Government" -u admin
# npx hurl invoke ${CHAINCODE_NAME} participant_get gov

# org1
echo "Creating participant: MIT"
npx hurl invoke ${CHAINCODE_NAME} participant_register mit "MIT" -u user1 -o org1
# npx hurl invoke ${CHAINCODE_NAME} participant_get mit

# org2
echo "Creating participant: National Bank"
npx hurl invoke ${CHAINCODE_NAME} participant_register naba "National Bank" -u user1 -o org2
# npx hurl invoke ${CHAINCODE_NAME} participant_get naba

# {
#   "id": "${ID}",
#   "firstname": "${FIRST_NAME}",
#   "lastname": "Mendes Monteiro",
#   "beneficiaryNumber": "285191659",
#   "birthDate": "${DATE}",
#   "cardVersion": "006.007.23",
#   "country": "PRT",
#   "documentNumber": "09879462 0 ZZ3",
#   "documentType": "Cartão De Cidadão",
#   "emissionDate": "${DATE}",
#   "emittingEntity": "República Portuguesa",
#   "expirationDate": "${DATE}",
#   "fatherFirstname": "Alberto",
#   "fatherLastname": "De Andrade Monteiro",
#   "fiscalNumber": "${FISCAL_NUMBER}",
#   "gender": "M",
#   "height": "1.81",
#   "identityNumber": "098794620",
#   "motherFirstname": "Maria Da Graça De Oliveira Mendes",
#   "motherLastname": "Monteiro",
#   "nationality": "PRT",
#   "otherInformation": "",
#   "pan": "0000036014662658",
#   "requestLocation": "CRCiv. Figueira da Foz",
#   "socialSecurityNumber": "11103478242",
#   "username": "${USER_NAME}",
#   "password": "12345678",
#   "email": "mario.monteiro@mail.com",
#   "mobilePhone": "351936202288",
#   "postal": "3080-032",
#   "city": "Figueira da Foz",
#   "region": "Coimbra",
#   "geoLocation": "40.1508,-8.8618",
#   "timezone": "Europe/Lisbon",
#   "personalInfo": "Just an ordinary man",
#   "internalInfo": "Aspiring Good Hearth",
#   "profile": {
#     "data": {
#       "key": "value"
#     }
#   }
# }

# create person with all data
ID=4ea88521-031b-4279-9165-9c10e1839001
FIRST_NAME=John
LAST_NAME=Doe
USER_NAME=johndoe
FISCAL_NUMBER=182692124
DATE=61985472
PAYLOAD="{\"id\":\"${ID}\",\"firstname\":\"${FIRST_NAME}\",\"lastname\":\"${LAST_NAME}\",\"beneficiaryNumber\":\"285191659\",\"birthDate\":\"${DATE}\",\"cardVersion\":\"006.007.23\",\"country\":\"PRT\",\"documentNumber\":\"09879462 0 ZZ3\",\"documentType\":\"Cartão De Cidadão\",\"emissionDate\":\"${DATE}\",\"emittingEntity\":\"República Portuguesa\",\"expirationDate\":\"${DATE}\",\"fatherFirstname\":\"Alberto\",\"fatherLastname\":\"De Andrade Monteiro\",\"fiscalNumber\":\"${FISCAL_NUMBER}\",\"gender\":\"M\",\"height\":\"1.81\",\"identityNumber\":\"098794620\",\"motherFirstname\":\"Maria Da Graça De Oliveira Mendes\",\"motherLastname\":\"Monteiro\",\"nationality\":\"PRT\",\"otherInformation\":\"\",\"pan\":\"0000036014662658\",\"requestLocation\":\"CRCiv. Figueira da Foz\",\"socialSecurityNumber\":\"11103478242\",\"username\":\"${USER_NAME}\",\"password\":\"12345678\",\"email\":\"mario.monteiro@mail.com\"}"
# echo $PAYLOAD  | jq
npx hurl invoke ${CHAINCODE_NAME} person_create "${PAYLOAD}" -u admin
# npx hurl invoke ${CHAINCODE_NAME} person_get ${ID}

# create person with all data
ID=4ea88521-031b-4279-9165-9c10e1838010
FIRST_NAME=Jane
LAST_NAME=Doe
USER_NAME=janedoe
FISCAL_NUMBER=582692178
DATE=61985472
PAYLOAD="{\"id\":\"${ID}\",\"firstname\":\"${FIRST_NAME}\",\"lastname\":\"${LAST_NAME}\",\"beneficiaryNumber\":\"285191659\",\"birthDate\":\"${DATE}\",\"cardVersion\":\"006.007.23\",\"country\":\"PRT\",\"documentNumber\":\"09879462 0 ZZ3\",\"documentType\":\"Cartão De Cidadão\",\"emissionDate\":\"${DATE}\",\"emittingEntity\":\"República Portuguesa\",\"expirationDate\":\"${DATE}\",\"fatherFirstname\":\"Alberto\",\"fatherLastname\":\"De Andrade Monteiro\",\"fiscalNumber\":\"${FISCAL_NUMBER}\",\"gender\":\"M\",\"height\":\"1.81\",\"identityNumber\":\"098794620\",\"motherFirstname\":\"Maria Da Graça De Oliveira Mendes\",\"motherLastname\":\"Monteiro\",\"nationality\":\"PRT\",\"otherInformation\":\"\",\"pan\":\"0000036014662658\",\"requestLocation\":\"CRCiv. Figueira da Foz\",\"socialSecurityNumber\":\"11103478242\",\"username\":\"${USER_NAME}\",\"password\":\"12345678\",\"email\":\"mario.monteiro@mail.com\",\"mobilePhone\":\"351936202288\",\"postal\":\"3080-032\",\"city\":\"Figueira da Foz\",\"region\":\"Coimbra\",\"geoLocation\":\"40.1508,-8.8618\",\"timezone\":\"Europe/Lisbon\",\"personalInfo\":\"Just an ordinary man\",\"internalInfo\":\"Aspiring Good Hearth\",\"profile\":{\"data\":{\"key\":\"value\"}}}"
# echo $PAYLOAD  | jq
npx hurl invoke ${CHAINCODE_NAME} person_create "${PAYLOAD}" -u admin
npx hurl invoke ${CHAINCODE_NAME} person_get ${ID}

# create person with minimal required data
ID=4ea88521-031b-4279-9165-9c10e1839053
FISCAL_NUMBER=182692152
# same as fiscalNumber
USER_NAME=${FISCAL_NUMBER}
PASS_WORD=12345678
PAYLOAD="{\"id\":\"${ID}\",\"fiscalNumber\":\"${FISCAL_NUMBER}\",\"username\":\"${USER_NAME}\", \"password\":\"${PASS_WORD}\"}"
# echo $PAYLOAD  | jq
npx hurl invoke ${CHAINCODE_NAME} person_create "${PAYLOAD}" -u admin
# npx hurl invoke ${CHAINCODE_NAME} person_getByUsername ${USER_NAME}
# npx hurl invoke ${CHAINCODE_NAME} person_getByFiscalnumber ${FISCAL_NUMBER}

# create cause with all data (filter with date=1582414657)
ID=acef70e5-cd25-4533-8392-9fa57e43cf11
NAME=Cause001
INPUT_TYPE=network.solidary.convector.participant
INPUT_ID=mit
# Date and time (GMT): Wednesday, 1 January 2020 00:00:00
START_DATE=1577836800
# Date and time (GMT): Friday, 31 December 2021 23:59:59
END_DATE=1640995199
LOCATION=40.1890144,-8.5171909
TAGS="[\"red\", \"blue\"]"
PAYLOAD="{\"id\":\"${ID}\",\"name\":\"${NAME}\",\"startDate\":\"${START_DATE}\",\"endDate\":\"${END_DATE}\",\"location\":\"${LOCATION}\",\"tags\":${TAGS},\"metaData\":{\"key\":\"value\"},\"input\":{\"id\":\"${INPUT_ID}\",\"type\":\"${INPUT_TYPE}\"}}"
# echo $PAYLOAD  | jq
npx hurl invoke ${CHAINCODE_NAME} cause_create "${PAYLOAD}" -u admin
npx hurl invoke ${CHAINCODE_NAME} cause_get ${ID}

# create cause with all data (filter with date=1582414657)
ID=acef70e5-cd25-4533-8392-9fa57e43cf12
NAME=Cause002
TAGS="[\"black\", \"white\"]"
PAYLOAD="{\"id\":\"${ID}\",\"name\":\"${NAME}\",\"startDate\":\"${START_DATE}\",\"endDate\":\"${END_DATE}\",\"location\":\"${LOCATION}\",\"tags\":${TAGS},\"metaData\":{\"key\":\"value\"},\"input\":{\"id\":\"${INPUT_ID}\",\"type\":\"${INPUT_TYPE}\"}}"
# echo $PAYLOAD  | jq
npx hurl invoke ${CHAINCODE_NAME} cause_create "${PAYLOAD}" -u admin
npx hurl invoke ${CHAINCODE_NAME} cause_get ${ID}

# create cause with minimal required data
ID=acef70e5-cd25-4533-8392-9fa57e43cf69
NAME=Cause003
INPUT_TYPE=network.solidary.convector.participant
INPUT_ID=gov
PAYLOAD="{\"id\":\"${ID}\",\"name\":\"${NAME}\",\"input\":{\"id\":\"${INPUT_ID}\",\"type\":\"${INPUT_TYPE}\"}}"
# echo $PAYLOAD  | jq
npx hurl invoke ${CHAINCODE_NAME} cause_create "${PAYLOAD}" -u admin
npx hurl invoke ${CHAINCODE_NAME} cause_get ${ID}

# create transaction
# {
#   "id": "${ID}",
#   "transactionType": "${TRANSACTION_TYPE}",
#   "resourceType":"${RESOURCE_TYPE}",
#   "input": {
#     "type": "${INPUT_TYPE}",
#     "id": "${INPUT_ID}"
#   },
#   "output": {
#     "type": "${OUTPUT_TYPE}",
#     "id": "${OUTPUT_ID}"
#   },
#   "quantity": "${QUANTITY}",
#   "currency": "${CURRENCY}",
#   "location": "${LOCATION}",
#   "tags":  [
#     "red",
#     "blue"
#   ],
#   "metaData": {
#     "key": "value"
#   },
#   "metaDataInternal": {
#     "key": "internal value"
#   }
# }
ID=acef70e5-cd25-4533-8392-9fa57e43cf32
TRANSACTION_TYPE=CREATE
RESOURCE_TYPE=FUNDS
INPUT_TYPE=network.solidary.convector.participant
INPUT_ID=gov
OUTPUT_TYPE=network.solidary.convector.person
OUTPUT_ID=4ea88521-031b-4279-9165-9c10e1839053
QUANTITY=1.11
CURRENCY=EUR
LOCATION=40.1890144,-8.5171909
TAGS="[\"red\", \"blue\"]"
PAYLOAD="{\"id\":\"${ID}\",\"transactionType\":\"${TRANSACTION_TYPE}\",\"resourceType\":\"${RESOURCE_TYPE}\",\"input\":{\"id\":\"${INPUT_ID}\",\"type\":\"${INPUT_TYPE}\"},\"output\":{\"id\":\"${OUTPUT_ID}\",\"type\":\"${OUTPUT_TYPE}\"},\"quantity\":\"${QUANTITY}\",\"currency\":\"${CURRENCY}\",\"location\":\"${LOCATION}\",\"tags\":${TAGS},\"metaData\":{\"key\":\"value\"},\"metaDataInternal\":{\"key\":\"internal value\"}}"
# echo $PAYLOAD  | jq
npx hurl invoke ${CHAINCODE_NAME} transaction_create "${PAYLOAD}" -u admin
# npx hurl invoke ${CHAINCODE_NAME} transaction_get ${ID}

# transaction with cause
ID=acef70e5-cd25-4533-8392-9fa57e43cf33
INPUT_TYPE=network.solidary.convector.cause
INPUT_ID=acef70e5-cd25-4533-8392-9fa57e43cf69
PAYLOAD="{\"id\":\"${ID}\",\"transactionType\":\"${TRANSACTION_TYPE}\",\"resourceType\":\"${RESOURCE_TYPE}\",\"input\":{\"id\":\"${INPUT_ID}\",\"type\":\"${INPUT_TYPE}\"},\"output\":{\"id\":\"${OUTPUT_ID}\",\"type\":\"${OUTPUT_TYPE}\"},\"quantity\":\"${QUANTITY}\",\"currency\":\"${CURRENCY}\",\"location\":\"${LOCATION}\",\"metaData\":{\"key\":\"value\"},\"metaDataInternal\":{\"key\":\"internal value\"}}"
# echo $PAYLOAD  | jq
npx hurl invoke ${CHAINCODE_NAME} transaction_create "${PAYLOAD}" -u admin
# npx hurl invoke ${CHAINCODE_NAME} transaction_get ${ID}

# create asset with all data (filter with date=1582414657)
ID=acef70e5-cd25-4533-8392-9fa57e430003
NAME=Asset003
OWNER_TYPE=network.solidary.convector.person
OWNER_ID=4ea88521-031b-4279-9165-9c10e1839001
LOCATION=40.1890144,-8.5171909
TAGS="[\"red\", \"blue\"]"
PAYLOAD="{\"id\":\"${ID}\",\"name\":\"${NAME}\",\"location\":\"${LOCATION}\",\"tags\":${TAGS},\"metaData\":{\"key\":\"value\"},\"owner\":{\"id\":\"${OWNER_ID}\",\"type\":\"${OWNER_TYPE}\"}}"
# echo $PAYLOAD  | jq
npx hurl invoke ${CHAINCODE_NAME} asset_create "${PAYLOAD}" -u admin
npx hurl invoke ${CHAINCODE_NAME} asset_get ${ID}

# complex filters

# note for escaped $lte, work with sort:[{name:"asc"}] and sort:["name"]
# persisted "createdDate": "1582410746061", "name":"Big Government"
npx hurl invoke ${CHAINCODE_NAME} participant_getComplexQuery "{\"filter\":{\"name\":\"Big Government\",\"createdDate\":{\"\$lte\":1582410746061,\"\$gte\":1582410746061}},\"sort\":[{\"name\":\"asc\"}]}"
# persisted "createdDate": "1582410790588", "username": "janedoe"
npx hurl invoke ${CHAINCODE_NAME} person_getComplexQuery "{\"filter\":{\"username\":\"janedoe\",\"createdDate\":{\"\$lte\":1582410790588,\"\$gte\":1582410790588}},\"sort\":[{\"username\":\"asc\"}]}"
# persisted "startDate": "1582414657", "endDate": "1582414657", "name":"Cause002b"
npx hurl invoke ${CHAINCODE_NAME} cause_getComplexQuery "{\"filter\":{\"name\":\"Cause002b\",\"startDate\":{\"\$lte\":1582414657},\"endDate\":{\"\$gte\":1582414657}},\"sort\":[{\"name\":\"asc\"}]}"
# persisted "name":"Asset003"
npx hurl invoke ${CHAINCODE_NAME} asset_getComplexQuery "{\"filter\":{\"name\":\"Asset003\"},\"sort\":[{\"name\":\"asc\"}]}"
# persisted "createdDate": "1582410817579", "currency": "EUR"
npx hurl invoke ${CHAINCODE_NAME} transaction_getComplexQuery "{\"filter\":{\"currency\":\"EUR\",\"createdDate\":{\"\$lte\":1582410817579,\"\$gte\":1582410817579}},\"sort\":[{\"quantity\":\"asc\"}]}"
