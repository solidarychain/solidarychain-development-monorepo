echo "Installing template views"
CHAINCODE_NAME=solidary-network-chaincode
VIEWS=$(dirname "$0")
VIEW_PATH="ch1_${CHAINCODE_NAME}"
COUCH_URL="http://localhost:5084"

curl -X PUT "$COUCH_URL/$VIEW_PATH/_design/${CHAINCODE_NAME}" \
  --upload-file $VIEWS//views.json

echo "Installed template views"