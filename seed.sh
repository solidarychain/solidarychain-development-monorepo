echo "Creating participant: Big Government"
npx hurl invoke person participant_register gov "Big Government" -u admin

echo "Creating participant: MIT"
npx hurl invoke person participant_register mit "MIT" -u user1 -o org1

echo "Creating participant: National Bank"
npx hurl invoke person participant_register naba "National Bank" -u user1 -o org2

echo "Creating person: John Doe"
npx hurl invoke person person_create "{ \"id\": \"1-100-100\", \"firstname\": \"John\", \"lastname\": \"Doe\", \"username\": \"johndoe\", \"password\": \"12345678\", \"email\": \"john.doe@mail.com\"}" -u admin

echo "Adding attribute 'birth-year' as the Big Government identity"
npx hurl invoke person person_addAttribute "1-100-100" "{\"id\": \"birth-year\", \"certifierID\": \"gov\", \"content\": \"1993\", \"issuedDate\": 1554239270 }" -u admin

npx hurl invoke person person_create "{ \"id\": \"1-100-101\", \"firstname\": \"Jane\", \"lastname\": \"Doe\", \"username\": \"janedoe\", \"password\": \"12345678\", \"email\": \"jane.doe@mail.com\"}" -u admin
npx hurl invoke person person_addAttribute "1-100-101" "{\"id\": \"birth-year\", \"certifierID\": \"gov\", \"content\": \"1993\", \"issuedDate\": 1554239270 }" -u admin

npx hurl invoke person person_create "{ \"id\": \"1-100-102\", \"firstname\": \"Dick\", \"lastname\": \"Doe\", \"username\": \"dickdoe\", \"password\": \"12345678\", \"email\": \"dick.doe@mail.com\"}" -u admin
npx hurl invoke person person_addAttribute "1-100-102" "{\"id\": \"birth-year\", \"certifierID\": \"gov\", \"content\": \"1988\", \"issuedDate\": 1554239270 }" -u admin
