echo "Installing template views"

CHAINCODE_NAME=solidary-network-chaincode
VIEWS=$(dirname "$0")
DB_PATH="ch1_${CHAINCODE_NAME}"
COUCH_URL_ORG1="http://localhost:5084"
COUCH_URL_ORG2="http://localhost:5184"

curl -X PUT "${COUCH_URL_ORG1}/${DB_PATH}/_design/${CHAINCODE_NAME}" \
  --upload-file ${VIEWS}/views.json

curl -X PUT "${COUCH_URL_ORG2}/${DB_PATH}/_design/${CHAINCODE_NAME}" \
  --upload-file ${VIEWS}/views.json

# name index
curl -X POST "${COUCH_URL_ORG1}/${DB_PATH}/_index" \
  --header 'content-type: application/json' \
  --data '{
  "index": {
    "fields": [
      "name"
    ]
  },
  "name": "name-json-index",
  "type": "json"
}'

curl -X POST "${COUCH_URL_ORG2}/${DB_PATH}/_index" \
  --header 'content-type: application/json' \
  --data '{
  "index": {
    "fields": [
      "name"
    ]
  },
  "name": "name-json-index",
  "type": "json"
}'

# username index
curl -X POST "${COUCH_URL_ORG1}/${DB_PATH}/_index" \
  --header 'content-type: application/json' \
  --data '{
  "index": {
    "fields": [
      "username"
    ]
  },
  "name": "username-json-index",
  "type": "json"
}'

curl -X POST "${COUCH_URL_ORG2}/${DB_PATH}/_index" \
  --header 'content-type: application/json' \
  --data '{
  "index": {
    "fields": [
      "username"
    ]
  },
  "name": "username-json-index",
  "type": "json"
}'

# quantity index
curl -X POST "${COUCH_URL_ORG1}/${DB_PATH}/_index" \
  --header 'content-type: application/json' \
  --data '{
  "index": {
    "fields": [
      "quantity"
    ]
  },
  "name": "quantity-json-index",
  "type": "json"
}'

curl -X POST "${COUCH_URL_ORG2}/${DB_PATH}/_index" \
  --header 'content-type: application/json' \
  --data '{
  "index": {
    "fields": [
      "quantity"
    ]
  },
  "name": "quantity-json-index",
  "type": "json"
}'

echo "Installed template views/indexs"
