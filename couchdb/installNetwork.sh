# load .env
set -a
. ./network/.env
set +a

COUCHDB=$(dirname "$0")
DB_PATH="${CHANNEL_ALL}_${CHAINCODE_NAME}"
echo "installing template views and indexes on DB_PATH:${DB_PATH}"

INDEXES="${COUCHDB}/indexes/*.json"
for i in ${INDEXES}
do
  for peer in "${PEERS_ID[@]}"
  do
    IDX=$peer-1
    IP=${PEERS[${IDX}]}
    for peerNo in "${PEERS_NO[@]}"
    do
      PEER="peer${peerNo}.org${peer}.${DOMAIN}"
      PORT="${COUCHDB_PEER_PORTS[peerNo]}"
      URL="${COUCHDB_PROTOCOL}://${IP}:${PORT}"
      echo "------------------------------------------------------------------------------------------------------------------------------------------------------------"
      echo " install indexs and views on node${peer} with url:${URL}, peer ${PEER}."
      echo "------------------------------------------------------------------------------------------------------------------------------------------------------------"
      curl -u ${COUCHDB_USER}:${COUCHDB_PASS} -X POST "${URL}/${DB_PATH}/_index" -H "Content-Type: application/json" --upload-file ${i}
    done
  done  
done
