/*
 * Register and Enroll a user
 */

const Fabric_Client = require('fabric-client');
const Fabric_CA_Client = require('fabric-ca-client');

const os = require('os');
const path = require('path');

const fabric_client = new Fabric_Client();
let fabric_ca_client = null;
let admin_user = null;
let member_user = null;
const homedir = os.homedir();
const hurleyIdentityPath = path.resolve(homedir, 'hyperledger-fabric-network/.hfc-org1');
var myArgs = process.argv.slice(2);

// console.log(myArgs[0])
let name_user = 'user1'
let per_level = 'member'
console.log('Store path:' + hurleyIdentityPath);
if(typeof myArgs[0] != 'undefined'){
    name_user=myArgs[0];
}
if(typeof myArgs[1] !== 'undefined'){
    per_level = myArgs[1]
}

// create the key value store as defined in the fabric-client/config/default.json 'key-value-store' setting
Fabric_Client.newDefaultKeyValueStore({
    path: hurleyIdentityPath
}).then((state_store) => {
    // assign the store to the fabric client
    fabric_client.setStateStore(state_store);
    const crypto_suite = Fabric_Client.newCryptoSuite();
    // use the same location for the state store (where the users' certificate are kept)
    // and the crypto store (where the users' keys are kept)
    const crypto_store = Fabric_Client.newCryptoKeyStore({ path: hurleyIdentityPath });
    crypto_suite.setCryptoKeyStore(crypto_store);
    fabric_client.setCryptoSuite(crypto_suite);

    // be sure to change the http to https when the CA is running TLS enabled
    fabric_ca_client = new Fabric_CA_Client('http://localhost:7054', null, '', crypto_suite);

    // first check to see if the admin is already enrolled
    return fabric_client.getUserContext('admin', true);
}).then((user_from_store) => {
    if (user_from_store && user_from_store.isEnrolled()) {
        console.log('Successfully loaded admin from persistence');
        admin_user = user_from_store;
    } else {
        throw new Error('Failed to get admin.... run enrollAdmin.js first');
    }

    // at this point we should have the admin user
    // first need to register the user with the CA server
    return fabric_ca_client.register({ enrollmentID: name_user, attrs: [{ name: "Occupation", value: per_level, ecert: true }], role: 'client' }, admin_user);
}).then((secret) => {
    // next we need to enroll the user with CA server
    console.log('Successfully registered - sec : '+name_user+' with organization : ' + per_level);

    return fabric_ca_client.enroll({ enrollmentID: name_user, enrollmentSecret: secret });
}).then((enrollment) => {
    console.log('Successfully enrolled member user : ' + name_user);
    return fabric_client.createUser({
        username: name_user,
        mspid: 'org1MSP',
        cryptoContent: { privateKeyPEM: enrollment.key.toBytes(), signedCertPEM: enrollment.certificate }
    });
}).then((user) => {
    member_user = user;

    return fabric_client.setUserContext(member_user);
}).then(() => {
    console.log(name_user + ' was successfully registered and enrolled and is ready to interact with the fabric network');

}).catch((err) => {
    console.error('Failed to register: ' + err);
    if (err.toString().indexOf('Authorization') > -1) {
        console.error('Authorization failures may be caused by having admin credentials from a previous CA instance.\n' +
            'Try again after deleting the contents of the store directory ' + hurleyIdentityPath);
    }
});