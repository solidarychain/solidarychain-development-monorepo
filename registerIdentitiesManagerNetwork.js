/*
 * Register and Enroll a user
 * from: Examples on how to handle chain identities on business applications
 * convector-identity-patterns/packages/administrative/registerIdentitiesManager.js
 * https://raw.githubusercontent.com/worldsibu/convector-identity-patterns/master/packages/administrative/registerIdentitiesManager.js
 * 
 * this script is very very useful to enroll member enroll member user 'chaincodeAdmin'
 * this user has the admin attribute `attrs: [{ name: 'admin', value: 'true', ecert: true }]`
 * with this attribute one can use `changeIdentity` in `let isAdmin = this.fullIdentity.getAttributeValue('admin');`
 * and all admin operations
 * 
 * use with `$ node registerIdentitiesManager.js`
 * invoke with user -u chaincodeAdmin
 * 
 * Identity in Hyperledger Fabric (Part 1)
 * https://medium.com/@kctheservant/identity-in-hyperledger-fabric-94d06439816e
 * Identity in Hyperledger Fabric (Part 2)
 * https://medium.com/@kctheservant/identity-in-hyperledger-fabric-part-2-fc2f50214d9
 * 
 * this script is called from @SolidaryChain/solidarychain-production-network/fabric-samples/5node2channel/wallet/fabcar/javascript/generateWallets.sh
 * when start production network, and generate the wallet at @SolidaryChain/solidarychain-production-network/fabric-samples/5node2channel/wallet/fabcar/javascript/wallets/chaincodeAdmin
 */

const Fabric_Client = require('fabric-client');
const Fabric_CA_Client = require('fabric-ca-client');

const os = require('os');
const fs = require('fs');
const path = require('path');

const fabricClient = new Fabric_Client();
let fabricCaClient = null;
let adminUser = null;
let memberUser = null;
// get wallet path from source of true path: generated in same path at solidarychain-production-network/fabric-samples/5node2channel/wallet/fabcar/javascript/generated/wallets/.hfc-org1
const enrollmentID = 'chaincodeAdmin';
const walletPath = '../solidarychain-production-network/fabric-samples/5node2channel/wallet/fabcar/javascript/generated/wallets/.hfc-org1'
// const walletTargetPath = `../solidarychain-production-network/fabric-samples/5node2channel/wallet/fabcar/javascript/wallets/${enrollmentID}`;
const walletTargetPath = walletPath;
const fabricCAClientUrl = 'https://ca.org1.example.com:7054';
// warn this must match msp from connection profile, org1MSP its not Org1MSP, avoid typos to prevent poblem
// No peers defined for MSP 'org1MSP' to discover from
// when invoke node changeParticipantFingerprint.js
const mspid = 'Org1MSP';
// fs.mkdirSync(walletTargetPath, { recursive: true });
console.log(`${enrollmentID} generated on store path: ${walletTargetPath}`);

// create the key value store as defined in the fabric-client/config/default.json 'key-value-store' setting
Fabric_Client.newDefaultKeyValueStore({
  path: walletPath
}).then((stateStore) => {
  // assign the store to the fabric client
  fabricClient.setStateStore(stateStore);
  const cryptoSuite = Fabric_Client.newCryptoSuite();
  // use the same location for the state store (where the users' certificate are kept)
  // and the crypto store (where the users' keys are kept)
  const cryptoSstore = Fabric_Client.newCryptoKeyStore({ path: walletPath });
  cryptoSuite.setCryptoKeyStore(cryptoSstore);
  fabricClient.setCryptoSuite(cryptoSuite);

  // be sure to change the http to https when the CA is running TLS enabled
  fabricCaClient = new Fabric_CA_Client(fabricCAClientUrl, null, '', cryptoSuite);

  // first check to see if the admin is already enrolled
  return fabricClient.getUserContext('admin', true);
}).then((userFromStore) => {
  if (userFromStore && userFromStore.isEnrolled()) {
    console.log('Successfully loaded admin from persistence');
    adminUser = userFromStore;
  } else {
    throw new Error('Failed to get admin.... run enrollAdmin.js');
  }

  // at this point we should have the admin user
  // first need to register the user with the CA server
  return fabricCaClient.register({ enrollmentID: enrollmentID, attrs: [{ name: 'admin', value: 'true', ecert: true }], role: 'client' }, adminUser);
}).then((secret) => {
  // next we need to enroll the user with CA server
  console.log(`Successfully registered ${enrollmentID} - secret: ${secret}`);

  return fabricCaClient.enroll({ enrollmentID, enrollmentSecret: secret });
}).then((enrollment) => {
  console.log(`Successfully enrolled member user ${enrollmentID}`);
  return fabricClient.createUser({
    username: enrollmentID,
    mspid,
    cryptoContent: { privateKeyPEM: enrollment.key.toBytes(), signedCertPEM: enrollment.certificate }
  });
}).then((user) => {
  memberUser = user;

  return fabricClient.setUserContext(memberUser);
}).then(() => {
  console.log('chaincodeAdmin was successfully registered and enrolled and is ready to interact with the fabric network');

}).catch((err) => {
  console.error('Failed to register: ' + err);
  if (err.toString().indexOf('Authorization') > -1) {
    console.error('Authorization failures may be caused by having admin credentials from a previous CA instance.\n' +
      `Try again after deleting the contents of the store directory ${walletPath}`);
  }
});
