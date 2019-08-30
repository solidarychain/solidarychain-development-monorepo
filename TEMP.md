$( curl -k -X POST https://localhost:3443/api/login -d '{ "username": "johndoe", "password": "12345678"}' -H 'Content-Type: application/json' | jq -r 'keys[] as $k | "export \($k)=\(.[$k])"' )


curl -k -X POST https://localhost:3443/api/login -d '{ "username": "johndoe", "password": "12345678"}' -H 'Content-Type: application/json'

npx hurl invoke person person_getByUsername johndoe

npx hurl invoke person person_get 1-100-100
curl -k https://localhost:3443/person/1-100-100 | jq

$ sudo docker container logs -f 6f6fdc99761b | grep Query:
log queries problems in DOCKER
debug: [Chaincode] ============= START : person_getByUsername ===========
debug: [StubHelper] Query: {"selector":{"type":"io.worldsibu.example.person","username":"johndoe"}}
debug: [Chaincode] ============= END : person_getByUsername ===========

debug: [StubHelper] Query: {"selector":{"type":"io.worldsibu.examples.person","username":"johndoe"}}
debug: [StubHelper] Query: {"selector":{"type":"io.worldsibu.examples.person","username":"johndoe"}}



(node:19308) UnhandledPromiseRejectionWarning: Error: Cannot save null userContext.
    at Client.setUserContext (/media/mario/Storage/Development/BlockChain/Convector/NodeNestJsHyperLedgerConvectorRestStarter/node_modules/fabric-client/lib/Client.js:1487:10)
    at FabricControllerAdapter.<anonymous> (/media/mario/Storage/Development/BlockChain/Convector/NodeNestJsHyperLedgerConvectorRestStarter/node_modules/@worldsibu/convector-common-fabric-helper/dist/src/client.helper.js:178:48)
    at step (/media/mario/Storage/Development/BlockChain/Convector/NodeNestJsHyperLedgerConvectorRestStarter/node_modules/tslib/tslib.js:133:27)
    at Object.next (/media/mario/Storage/Development/BlockChain/Convector/NodeNestJsHyperLedgerConvectorRestStarter/node_modules/tslib/tslib.js:114:57)
    at fulfilled (/media/mario/Storage/Development/BlockChain/Convector/NodeNestJsHyperLedgerConvectorRestStarter/node_modules/tslib/tslib.js:104:62)
    at <anonymous>
@koakh Cannot save null userContext. means that it cannot find the user you specified in your adapter in the ./config folder, it can be multiple things, the file does not exist, the paths to the config folder are wrong or the user in the adapter is not the right one

when lost props like .get after enc:restart
do
npx lerna run build --scope person-cc
npx lerna run build --scope participant-cc





things that might happen when not updating:
- typescript didn't compiled before packaging
- it tried to install without packaging
just thinking out loud



because it will create an entry in the generated package.json of "@convector-rest-sample/common": "file:./packages/common"
right now it's generating "common": "file:./packages/common" and since you're importing in code @convector-rest-sample/common it won't find it


by default it has a flag --update that skip the folder cleaning
that's because for debugging if you remove the files it will crash the server
so we just put that flag for override the files
I'm talking about the chaincode-manager --update






export class CommonController { }

hack package.json
"cc:package": "f() { npm run lerna:build; chaincode-manager --update --config ./$2.$1.config.json --output ./chaincode-$1 package; npm run copy:indexes -- $1; npm run copy:package:common -- $1; }; f",
"copy:package:common": "f () { mkdir -p ./chaincode-$1/node_modules/@convector-rest-sample/; cp -r ./packages/common/ ./chaincode-$1/node_modules/@convector-rest-sample/; }; f"

inside chaincode is in folder 
/usr/local/src

fake controller
{
  "name": "common",
  "version": "file:./packages/common",
  "controller": "CommonController"
}

@Controller('common')
export class CommonController extends ConvectorController<ChaincodeTx> {
}


yes, the peer will try to run npm install and so it will try to find your dependency published on npm or another registry. We have been thinking on adding another property besides controllers in the config file, for other local packages you want to get copied to the generated chaincode
for the time being there's a trick you can make, put a controller inside that package and add it to the list of controllers in the config.json file, so it will copy the folder into the chaincode-* package

{
  ...
  "keyStore": "/Users/walter/hyperledger-fabric-network/.hfc-org1",
  "//**INSIDE-DOCKER**//keyStore": "/config/.hfc-org1",
  "networkProfile": "/Users/walter/hyperledger-fabric-network/network-profiles/org1.network-profile.yaml",
  ...
  "controllers": [
    ...
    {
      "name": "common",
      "version": "file:./packages/common",
      "controller": "CommonController"
    }
  ],
