echo "Installing template views and indexs"

CHAINCODE_NAME=solidary-chain-chaincode
COUCHDB=$(dirname "$0")
DB_PATH="ch1_${CHAINCODE_NAME}"
COUCH_URL_ORG1="http://localhost:5084"
COUCH_URL_ORG2="http://localhost:5184"

# views

# org1
# curl -X PUT "${COUCH_URL_ORG1}/${DB_PATH}/_design/${CHAINCODE_NAME}" --upload-file ${COUCHDB}/views.json
# org2
# curl -X PUT "${COUCH_URL_ORG2}/${DB_PATH}/_design/${CHAINCODE_NAME}" --upload-file ${COUCHDB}/views.json

# indexes
# https://docs.couchdb.org/en/3.0.0/api/database/find.html#db-index
# Request URL: http://localhost:5184/ch1_solidary-chain-chaincode/_index
# Request Method: POST

INDEXES="${COUCHDB}/indexes/*.json"
for i in ${INDEXES}
do
  echo "create index from file ${i}"
  # org1
  curl -X POST "${COUCH_URL_ORG1}/${DB_PATH}/_index" -H "Content-Type: application/json" --upload-file ${i}
  # org2
  curl -X POST "${COUCH_URL_ORG2}/${DB_PATH}/_index" -H "Content-Type: application/json" --upload-file ${i}
done

echo "Installed template views/indexes"
