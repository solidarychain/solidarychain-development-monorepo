echo "Creating participant: Big Government"
npx hurl invoke person participant_register gov "Big Government" -u admin

# org1
echo "Creating participant: MIT"
npx hurl invoke person participant_register mit "MIT" -u user1 -o org1

# org2
echo "Creating participant: National Bank"
npx hurl invoke person participant_register naba "National Bank" -u user1 -o org2

# echo "Adding attribute 'birth-year' as the Big Government identity"
# find #STRING-OR-OBJECT
# string version
# npx hurl invoke person person_addAttribute "1-100-100" "{\"id\": \"birth-year\", \"certifierID\": \"gov\", \"content\": \"1993\", \"issuedDate\": 1554239270 }" -u admin
# object version
# npx hurl invoke person person_addAttribute "1-100-100" "{\"id\": \"birth-date\", \"certifierID\": \"gov\", \"content\": { \"year\": \"1993\", \"month\": \"12\", \"day\": \"19\" } , \"issuedDate\": 1554239270 }" -u admin

# npx hurl invoke person person_create "{ \"id\": \"1-100-101\", \"firstname\": \"Jane\", \"lastname\": \"Doe\", \"username\": \"janedoe\", \"password\": \"12345678\", \"email\": \"jane.doe@mail.com\"}" -u admin
# find #STRING-OR-OBJECT
# string version
# npx hurl invoke person person_addAttribute "1-100-101" "{\"id\": \"birth-year\", \"certifierID\": \"gov\", \"content\": \"1993\", \"issuedDate\": 1554239270 }" -u admin
# object version
# npx hurl invoke person person_addAttribute "1-100-101" "{\"id\": \"birth-date\", \"certifierID\": \"gov\", \"content\": { \"year\": \"1915\", \"month\": \"10\", \"day\": \"15\" } , \"issuedDate\": 1554239270 }" -u admin

# npx hurl invoke person person_create "{ \"id\": \"1-100-102\", \"firstname\": \"Dick\", \"lastname\": \"Doe\", \"username\": \"dickdoe\", \"password\": \"12345678\", \"email\": \"dick.doe@mail.com\"}" -u admin
# find #STRING-OR-OBJECT
# string version
# npx hurl invoke person person_addAttribute "1-100-102" "{\"id\": \"birth-year\", \"certifierID\": \"gov\", \"content\": \"1988\", \"issuedDate\": 1554239270 }" -u admin
# object version
# npx hurl invoke person person_addAttribute "1-100-102" "{\"id\": \"birth-date\", \"certifierID\": \"gov\", \"content\": { \"year\": \"1988\", \"month\": \"1\", \"day\": \"2\" } , \"issuedDate\": 1554239270 }" -u admin

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

# npx hurl invoke person person_create "{\"id\":\"4ea88521-031b-4279-9165-9c10e183928f\",\"firstname\":\"Mário Alberto\",\"lastname\":\"Mendes Monteiro\",\"beneficiaryNumber\":\"285191659\",\"birthDate\":\"1971-12-19\",\"cardVersion\":\"006.007.23\",\"country\":\"PRT\",\"documentNumber\":\"09879462 0 ZZ3\",\"documentType\":\"Cartão De Cidadão\",\"emissionDate\":\"2018-08-05\",\"emittingEntity\":\"República Portuguesa\",\"expirationDate\":\"2028-05-08\",\"fatherFirstname\":\"Alberto\",\"fatherLastname\":\"De Andrade Monteiro\",\"fiscalNumber\":\"182692124\",\"gender\":\"M\",\"height\":\"1.81\",\"identityNumber\":\"098794620\",\"motherFirstname\":\"Maria Da Graça De Oliveira Mendes\",\"motherLastname\":\"Monteiro\",\"nationality\":\"PRT\",\"otherInformation\":\"\",\"pan\":\"0000036014662658\",\"requestLocation\":\"CRCiv. Figueira da Foz\",\"socialSecurityNumber\":\"11103478242\",\"username\":\"mariomonteiro\",\"password\":\"12345678\",\"email\":\"mario.monteiro@mail.com\"}" -u admin
# npx hurl invoke person person_get 4ea88521-031b-4279-9165-9c10e183928f

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

# create person with all extended data
ID=4ea88521-031b-4279-9165-9c10e1838009
FIRST_NAME=Jane
LAST_NAME=Doe
USER_NAME=janedoe
FISCAL_NUMBER=582692177
DATE=61985472
PAYLOAD="{\"id\":\"${ID}\",\"firstname\":\"${FIRST_NAME}\",\"lastname\":\"${LAST_NAME}\",\"beneficiaryNumber\":\"285191659\",\"birthDate\":\"${DATE}\",\"cardVersion\":\"006.007.23\",\"country\":\"PRT\",\"documentNumber\":\"09879462 0 ZZ3\",\"documentType\":\"Cartão De Cidadão\",\"emissionDate\":\"${DATE}\",\"emittingEntity\":\"República Portuguesa\",\"expirationDate\":\"${DATE}\",\"fatherFirstname\":\"Alberto\",\"fatherLastname\":\"De Andrade Monteiro\",\"fiscalNumber\":\"${FISCAL_NUMBER}\",\"gender\":\"M\",\"height\":\"1.81\",\"identityNumber\":\"098794620\",\"motherFirstname\":\"Maria Da Graça De Oliveira Mendes\",\"motherLastname\":\"Monteiro\",\"nationality\":\"PRT\",\"otherInformation\":\"\",\"pan\":\"0000036014662658\",\"requestLocation\":\"CRCiv. Figueira da Foz\",\"socialSecurityNumber\":\"11103478242\",\"username\":\"${USER_NAME}\",\"password\":\"12345678\",\"email\":\"mario.monteiro@mail.com\",\"mobilePhone\":\"351936202288\",\"postal\":\"3080-032\",\"city\":\"Figueira da Foz\",\"region\":\"Coimbra\",\"geoLocation\":\"40.1508,-8.8618\",\"timezone\":\"Europe/Lisbon\",\"personalInfo\":\"Just an ordinary man\",\"internalInfo\":\"Aspiring Good Hearth\",\"profile\":{\"data\":{\"key\":\"value\"}}}"
# echo $PAYLOAD  | jq
npx hurl invoke person person_create "${PAYLOAD}" -u admin
npx hurl invoke person person_get ${ID}

# create person with minimal required data
ID=4ea88521-031b-4279-9165-9c10e1839051
FISCAL_NUMBER=182692151
USER_NAME=${FISCAL_NUMBER}
PASS_WORD=12345678
PAYLOAD="{\"id\":\"${ID}\",\"fiscalNumber\":\"${FISCAL_NUMBER}\",\"username\":\"${USER_NAME}\", \"password\":\"${PASS_WORD}\"}"
# echo $PAYLOAD  | jq
npx hurl invoke person person_create "${PAYLOAD}" -u admin
npx hurl invoke person person_get ${ID}

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
ID=acef70e5-cd25-4533-8392-9fa57e43cf11
TRANSACTION_TYPE=CREATE
RESOURCE_TYPE=FUNDS
INPUT_TYPE=PARTICIPANT
INPUT_ID=gov
OUTPUT_TYPE=PERSON
OUTPUT_ID=4ea88521-031b-4279-9165-9c10e1838009
QUANTITY=1.11
CURRENCY=EUR
LOCATION=40.1890144,-8.5171909
PAYLOAD="{\"id\":\"${ID}\",\"transactionType\":\"${TRANSACTION_TYPE}\",\"resourceType\":\"${RESOURCE_TYPE}\",\"input\":{\"id\":\"${INPUT_ID}\",\"type\":\"${INPUT_TYPE}\"},\"output\":{\"id\":\"${OUTPUT_ID}\",\"type\":\"${OUTPUT_TYPE}\"},\"quantity\":\"${QUANTITY}\",\"currency\":\"${CURRENCY}\",\"location\":\"${LOCATION}\",\"metaData\":{\"key\":\"value\"},\"metaDataInternal\":{\"key\":\"internal value\"}}"
# echo $PAYLOAD  | jq
npx hurl invoke person transaction_create "${PAYLOAD}" -u admin
npx hurl invoke person transaction_get ${ID}





ID=25a0d90b-a3bd-4ec5-ae05-b334165d63ec
NAME="transaction#002"
PAYLOAD="{\"id\":\"${ID}\",\"name\":\"${NAME}\"}"
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