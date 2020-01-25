echo "Creating participant: Big Government"
npx hurl invoke person participant_register gov "Big Government" -u admin

# org1
echo "Creating participant: MIT"
npx hurl invoke person participant_register mit "MIT" -u user1 -o org1

# org2
echo "Creating participant: National Bank"
npx hurl invoke person participant_register naba "National Bank" -u user1 -o org2

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
npx hurl invoke person person_create "${PAYLOAD}" -u admin
npx hurl invoke person person_get ${ID}

# create person with all data
ID=4ea88521-031b-4279-9165-9c10e1838010
FIRST_NAME=Jane
LAST_NAME=Doe
USER_NAME=janedoe
FISCAL_NUMBER=582692178
DATE=61985472
PAYLOAD="{\"id\":\"${ID}\",\"firstname\":\"${FIRST_NAME}\",\"lastname\":\"${LAST_NAME}\",\"beneficiaryNumber\":\"285191659\",\"birthDate\":\"${DATE}\",\"cardVersion\":\"006.007.23\",\"country\":\"PRT\",\"documentNumber\":\"09879462 0 ZZ3\",\"documentType\":\"Cartão De Cidadão\",\"emissionDate\":\"${DATE}\",\"emittingEntity\":\"República Portuguesa\",\"expirationDate\":\"${DATE}\",\"fatherFirstname\":\"Alberto\",\"fatherLastname\":\"De Andrade Monteiro\",\"fiscalNumber\":\"${FISCAL_NUMBER}\",\"gender\":\"M\",\"height\":\"1.81\",\"identityNumber\":\"098794620\",\"motherFirstname\":\"Maria Da Graça De Oliveira Mendes\",\"motherLastname\":\"Monteiro\",\"nationality\":\"PRT\",\"otherInformation\":\"\",\"pan\":\"0000036014662658\",\"requestLocation\":\"CRCiv. Figueira da Foz\",\"socialSecurityNumber\":\"11103478242\",\"username\":\"${USER_NAME}\",\"password\":\"12345678\",\"email\":\"mario.monteiro@mail.com\",\"mobilePhone\":\"351936202288\",\"postal\":\"3080-032\",\"city\":\"Figueira da Foz\",\"region\":\"Coimbra\",\"geoLocation\":\"40.1508,-8.8618\",\"timezone\":\"Europe/Lisbon\",\"personalInfo\":\"Just an ordinary man\",\"internalInfo\":\"Aspiring Good Hearth\",\"profile\":{\"data\":{\"key\":\"value\"}}}"
# echo $PAYLOAD  | jq
npx hurl invoke person person_create "${PAYLOAD}" -u admin
npx hurl invoke person person_get ${ID}

# create person with minimal required data
ID=4ea88521-031b-4279-9165-9c10e1839053
FISCAL_NUMBER=182692152
USER_NAME=${FISCAL_NUMBER}
PASS_WORD=12345678
PAYLOAD="{\"id\":\"${ID}\",\"fiscalNumber\":\"${FISCAL_NUMBER}\",\"username\":\"${USER_NAME}\", \"password\":\"${PASS_WORD}\"}"
# echo $PAYLOAD  | jq
npx hurl invoke person person_create "${PAYLOAD}" -u admin
npx hurl invoke person person_get ${ID}

# create cause with all data
ID=acef70e5-cd25-4533-8392-9fa57e43cf72
NAME=Cause004
INPUT_TYPE=PARTICIPANT
INPUT_ID=mit
START_DATE=1546300800
END_DATE=1609372800
LOCATION=40.1890144,-8.5171909
PAYLOAD="{\"id\":\"${ID}\",\"name\":\"${NAME}\",\"startDate\":\"${START_DATE}\",\"endDate\":\"${END_DATE}\",\"location\":\"${LOCATION}\",\"metaData\":{\"key\":\"value\"},\"input\":{\"id\":\"${INPUT_ID}\",\"type\":\"${INPUT_TYPE}\"}}"
# echo $PAYLOAD  | jq
npx hurl invoke person cause_create "${PAYLOAD}" -u admin
npx hurl invoke person cause_get ${ID}

# create cause with minimal required data
ID=acef70e5-cd25-4533-8392-9fa57e43cf69
NAME=Cause002
INPUT_TYPE=PARTICIPANT
INPUT_ID=gov
PAYLOAD="{\"id\":\"${ID}\",\"name\":\"${NAME}\",\"input\":{\"id\":\"${INPUT_ID}\",\"type\":\"${INPUT_TYPE}\"}}"
# echo $PAYLOAD  | jq
npx hurl invoke person cause_create "${PAYLOAD}" -u admin
npx hurl invoke person cause_get ${ID}

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
INPUT_TYPE=PARTICIPANT
INPUT_ID=gov
OUTPUT_TYPE=PERSON
OUTPUT_ID=4ea88521-031b-4279-9165-9c10e1839053
QUANTITY=1.11
CURRENCY=EUR
LOCATION=40.1890144,-8.5171909
PAYLOAD="{\"id\":\"${ID}\",\"transactionType\":\"${TRANSACTION_TYPE}\",\"resourceType\":\"${RESOURCE_TYPE}\",\"input\":{\"id\":\"${INPUT_ID}\",\"type\":\"${INPUT_TYPE}\"},\"output\":{\"id\":\"${OUTPUT_ID}\",\"type\":\"${OUTPUT_TYPE}\"},\"quantity\":\"${QUANTITY}\",\"currency\":\"${CURRENCY}\",\"location\":\"${LOCATION}\",\"metaData\":{\"key\":\"value\"},\"metaDataInternal\":{\"key\":\"internal value\"}}"
# echo $PAYLOAD  | jq
npx hurl invoke person transaction_create "${PAYLOAD}" -u admin
npx hurl invoke person transaction_get ${ID}

# transaction with cause
ID=acef70e5-cd25-4533-8392-9fa57e43cf34
INPUT_TYPE=CAUSE
INPUT_ID=acef70e5-cd25-4533-8392-9fa57e43cf69
PAYLOAD="{\"id\":\"${ID}\",\"transactionType\":\"${TRANSACTION_TYPE}\",\"resourceType\":\"${RESOURCE_TYPE}\",\"input\":{\"id\":\"${INPUT_ID}\",\"type\":\"${INPUT_TYPE}\"},\"output\":{\"id\":\"${OUTPUT_ID}\",\"type\":\"${OUTPUT_TYPE}\"},\"quantity\":\"${QUANTITY}\",\"currency\":\"${CURRENCY}\",\"location\":\"${LOCATION}\",\"metaData\":{\"key\":\"value\"},\"metaDataInternal\":{\"key\":\"internal value\"}}"
# echo $PAYLOAD  | jq
npx hurl invoke person transaction_create "${PAYLOAD}" -u admin
npx hurl invoke person transaction_get ${ID}

# 2b2227fa-24ca-4586-bbde-6cff6bf407c1
# dc9f897a-cf46-448a-a679-45096b70ab02
# ee89a51e-3bd6-41be-9cae-d6b1c849325e
# d04f961a-3df5-45fb-9ae0-f852b982c80e
# 6e53770d-c347-4ae2-b9a4-4416f90d6ed4
# bdd78c8d-3810-4ea4-a462-a881b00d685c
# ecd650fb-4806-443d-9ae9-7bdc495ca52a
# bff2170a-0b8d-4ee2-8003-ee19bfb77c7b
# f7b31818-0243-49d0-96c9-888b30da498f

# npm run cc:package -- person org1

# $ npx hurl invoke person person_get ${ID}
# [hurley] - 4ea88521-031b-4279-9165-9c10e1839051
# [hurley] - Sending transaction as user1 in org org1...
# [hurley] - No peer ran tx successfully!
# undefined
# { Error: transaction returned with failure: {"name":"Error","status":500}

# Error: Bad response: 500 - error installing chaincode code person:1.0(chaincode /var/hyperledger/production/chaincodes/person.1.0 exists)
# Installed Chaincode person version 1.0 at org2

# chaincode-org1
# chaincode-person