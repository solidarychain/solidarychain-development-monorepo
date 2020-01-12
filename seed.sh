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

# 61985472 = 12/19/1971 @ 10:11am (UTC)
# ID=4ea88521-031b-4279-9165-9c10e1839004
# FIRST_NAME="Mário Monteiro"
# DATE=61985472
# PAYLOAD="{ \
#   \"id\": \"${ID}\", \
#   \"firstname\": \"${FIRST_NAME}\", \
#   \"lastname\": \"Mendes Monteiro\", \
#   \"beneficiaryNumber\": \"285191659\", \
#   \"birthDate\": \"19 12 1971\", \
#   \"cardVersion\": \"006.007.23\", \
#   \"country\": \"PRT\", \
#   \"documentNumber\": \"09879462 0 ZZ3\", \
#   \"documentType\": \"Cartão De Cidadão\", \
#   \"emissionDate\": \"08 05 2018\", \
#   \"emittingEntity\": \"República Portuguesa\", \
#   \"expirationDate\": \"08 05 2028\", \
#   \"fatherFirstname\": \"Alberto\", \
#   \"fatherLastname\": \"De Andrade Monteiro\", \
#   \"fiscalNumber\": \"182692124\", \
#   \"gender\": \"M\", \
#   \"height\": \"1,81\", \
#   \"identityNumber\": \"098794620\", \
#   \"motherFirstname\": \"Maria Da Graça De Oliveira Mendes\", \
#   \"motherLastname\": \"Monteiro\", \
#   \"nationality\": \"PRT\", \
#   \"otherInformation\": \"\", \
#   \"pan\": \"0000036014662658\", \
#   \"requestLocation\": \"CRCiv. Figueira da Foz\", \
#   \"socialSecurityNumber\": \"11103478242\", \
#   \"username\": \"mariomonteiro\", \
#   \"password\": \"12345678\", \
#   \"email\": \"mario.monteiro@mail.com\" \
# }" 
# test PAYLOAD 
# PAYLOAD="{\"id\":\"1-100-104\",\"firstname\":\"Mário Alberto\",\"lastname\":\"Mendes Monteiro\",\"beneficiaryNumber\":\"285191659\",\"birthDate\":\"19 12 1971\",\"cardVersion\":\"006.007.23\",\"country\":\"PRT\",\"documentNumber\":\"09879462 0 ZZ3\",\"documentType\":\"Cartão De Cidadão\",\"emissionDate\":\"08 05 2018\",\"emittingEntity\":\"República Portuguesa\",\"expirationDate\":\"08 05 2028\",\"fatherFirstname\":\"Alberto\",\"fatherLastname\":\"De Andrade Monteiro\",\"fiscalNumber\":\"182692124\",\"gender\":\"M\",\"height\":\"1,81\",\"identityNumber\":\"098794620\",\"motherFirstname\":\"Maria Da Graça De Oliveira Mendes\",\"motherLastname\":\"Monteiro\",\"nationality\":\"PRT\",\"otherInformation\":\"\",\"pan\":\"0000036014662658\",\"requestLocation\":\"CRCiv. Figueira da Foz\",\"socialSecurityNumber\":\"11103478242\",\"username\":\"johndoe\",\"password\":\"12345678\",\"email\":\"john.doe@mail.com\"}"
# echo $PAYLOAD  | jq

# npx hurl invoke person person_create "{\"id\":\"4ea88521-031b-4279-9165-9c10e183928f\",\"firstname\":\"Mário Alberto\",\"lastname\":\"Mendes Monteiro\",\"beneficiaryNumber\":\"285191659\",\"birthDate\":\"1971-12-19\",\"cardVersion\":\"006.007.23\",\"country\":\"PRT\",\"documentNumber\":\"09879462 0 ZZ3\",\"documentType\":\"Cartão De Cidadão\",\"emissionDate\":\"2018-08-05\",\"emittingEntity\":\"República Portuguesa\",\"expirationDate\":\"2028-05-08\",\"fatherFirstname\":\"Alberto\",\"fatherLastname\":\"De Andrade Monteiro\",\"fiscalNumber\":\"182692124\",\"gender\":\"M\",\"height\":\"1.81\",\"identityNumber\":\"098794620\",\"motherFirstname\":\"Maria Da Graça De Oliveira Mendes\",\"motherLastname\":\"Monteiro\",\"nationality\":\"PRT\",\"otherInformation\":\"\",\"pan\":\"0000036014662658\",\"requestLocation\":\"CRCiv. Figueira da Foz\",\"socialSecurityNumber\":\"11103478242\",\"username\":\"mariomonteiro\",\"password\":\"12345678\",\"email\":\"mario.monteiro@mail.com\"}" -u admin
# npx hurl invoke person person_get 4ea88521-031b-4279-9165-9c10e183928f

ID=4ea88521-031b-4279-9165-9c10e1839001
FIRST_NAME="Mário Monteiro"
USER_NAME=mariomonteiro
FISCAL_NUMBER=182692124
DATE=61985472
npx hurl invoke person person_create "{\"id\":\"${ID}\",\"firstname\":\"${FIRST_NAME}\",\"lastname\":\"Mendes Monteiro\",\"beneficiaryNumber\":\"285191659\",\"birthDate\":\"${DATE}\",\"cardVersion\":\"006.007.23\",\"country\":\"PRT\",\"documentNumber\":\"09879462 0 ZZ3\",\"documentType\":\"Cartão De Cidadão\",\"emissionDate\":\"${DATE}\",\"emittingEntity\":\"República Portuguesa\",\"expirationDate\":\"${DATE}\",\"fatherFirstname\":\"Alberto\",\"fatherLastname\":\"De Andrade Monteiro\",\"fiscalNumber\":\"${FISCAL_NUMBER}\",\"gender\":\"M\",\"height\":\"1.81\",\"identityNumber\":\"098794620\",\"motherFirstname\":\"Maria Da Graça De Oliveira Mendes\",\"motherLastname\":\"Monteiro\",\"nationality\":\"PRT\",\"otherInformation\":\"\",\"pan\":\"0000036014662658\",\"requestLocation\":\"CRCiv. Figueira da Foz\",\"socialSecurityNumber\":\"11103478242\",\"username\":\"${USER_NAME}\",\"password\":\"12345678\",\"email\":\"mario.monteiro@mail.com\"}" -u admin
npx hurl invoke person person_get ${ID}
