# Network Notes

## restartEnv.sh some output

```shell
2020-02-27 21:35:22.710 UTC [channelCmd] update -> INFO 04f Successfully submitted channel update
Registering admin for org1
Registering admin for org2
Registering user1 for org1
Registering user1 for org2
[hurley] - Ran network restart script
[hurley] - ************ Success!
[hurley] - Complete network deployed at /home/mario/hyperledger-fabric-network
[hurley] - Setup:
        - Channels deployed: 1
            * ch1
        - Organizations: 2
            * org1: 
                - channels: 
                    * ch1
                - users: 
                    * admin 
                    * user1
            * org2: 
                - channels: 
                    * ch1
                - users: 
                    * admin 
                    * user1
```

## Network path/tree

`/home/mario/hyperledger-fabric-network/.hfc-org1/chaincodeAdmin`

```shell
$ tree /home/mario/hyperledger-fabric-network/
/home/mario/hyperledger-fabric-network/
├── artifacts
│   ├── config
│   │   ├── ch1.tx
│   │   ├── genesis.block
│   │   ├── peer0.org1.hurley.lab.ch1.tx
│   │   └── peer0.org2.hurley.lab.ch1.tx
│   └── crypto-config
│       ├── ordererOrganizations
│       │   └── hurley.lab
│       │       ├── ca
│       │       │   ├── 030acf39daff88da00da1f2031f4bbf30f53ef6e928164ba2a468bfaf8475f80_sk
│       │       │   └── ca.hurley.lab-cert.pem
│       │       ├── msp
│       │       │   ├── admincerts
│       │       │   │   └── Admin@hurley.lab-cert.pem
│       │       │   ├── cacerts
│       │       │   │   └── ca.hurley.lab-cert.pem
│       │       │   └── tlscacerts
│       │       │       └── tlsca.hurley.lab-cert.pem
│       │       ├── orderers
│       │       │   └── orderer.hurley.lab
│       │       │       ├── msp
│       │       │       │   ├── admincerts
│       │       │       │   │   └── Admin@hurley.lab-cert.pem
│       │       │       │   ├── cacerts
│       │       │       │   │   └── ca.hurley.lab-cert.pem
│       │       │       │   ├── keystore
│       │       │       │   │   └── b6d424c9c7dec44547e10e01b4fff531d0970a7875ff26090826d2ae48c7d6ea_sk
│       │       │       │   ├── signcerts
│       │       │       │   │   └── orderer.hurley.lab-cert.pem
│       │       │       │   └── tlscacerts
│       │       │       │       └── tlsca.hurley.lab-cert.pem
│       │       │       └── tls
│       │       │           ├── ca.crt
│       │       │           ├── server.crt
│       │       │           └── server.key
│       │       ├── tlsca
│       │       │   ├── 2ec9ca28c3668f2637dd2e905ca5e519c9fe952ef4861d23b51f92f168dc9db7_sk
│       │       │   └── tlsca.hurley.lab-cert.pem
│       │       └── users
│       │           └── Admin@hurley.lab
│       │               ├── msp
│       │               │   ├── admincerts
│       │               │   │   └── Admin@hurley.lab-cert.pem
│       │               │   ├── cacerts
│       │               │   │   └── ca.hurley.lab-cert.pem
│       │               │   ├── keystore
│       │               │   │   └── 6b27835cf75c2464d8519ff26731c8f79961a9be5f97a9a3423be133a9c9dc1d_sk
│       │               │   ├── signcerts
│       │               │   │   └── Admin@hurley.lab-cert.pem
│       │               │   └── tlscacerts
│       │               │       └── tlsca.hurley.lab-cert.pem
│       │               └── tls
│       │                   ├── ca.crt
│       │                   ├── client.crt
│       │                   └── client.key
│       └── peerOrganizations
│           ├── org1.hurley.lab
│           │   ├── ca
│           │   │   ├── ca.org1.hurley.lab-cert.pem
│           │   │   └── d74893f06aba2eead4635d1dac2ef97e621ce255e615420d943644c9ce59a8cb_sk
│           │   ├── msp
│           │   │   ├── admincerts
│           │   │   │   └── Admin@org1.hurley.lab-cert.pem
│           │   │   ├── cacerts
│           │   │   │   └── ca.org1.hurley.lab-cert.pem
│           │   │   ├── config.yaml
│           │   │   └── tlscacerts
│           │   │       └── tlsca.org1.hurley.lab-cert.pem
│           │   ├── peers
│           │   │   └── peer0.org1.hurley.lab
│           │   │       ├── msp
│           │   │       │   ├── admincerts
│           │   │       │   │   └── Admin@org1.hurley.lab-cert.pem
│           │   │       │   ├── cacerts
│           │   │       │   │   └── ca.org1.hurley.lab-cert.pem
│           │   │       │   ├── config.yaml
│           │   │       │   ├── keystore
│           │   │       │   │   └── a8e799d912cf13368f2b5f129331aff7535acc47e718d446a2f28010639a9cf4_sk
│           │   │       │   ├── signcerts
│           │   │       │   │   └── peer0.org1.hurley.lab-cert.pem
│           │   │       │   └── tlscacerts
│           │   │       │       └── tlsca.org1.hurley.lab-cert.pem
│           │   │       └── tls
│           │   │           ├── ca.crt
│           │   │           ├── server.crt
│           │   │           └── server.key
│           │   ├── tlsca
│           │   │   ├── 14849b6f15f41641a4cab5f2d9e79dd99c9be72507ca8fd13e6337d43f922daf_sk
│           │   │   └── tlsca.org1.hurley.lab-cert.pem
│           │   └── users
│           │       ├── Admin@org1.hurley.lab
│           │       │   ├── msp
│           │       │   │   ├── admincerts
│           │       │   │   │   └── Admin@org1.hurley.lab-cert.pem
│           │       │   │   ├── cacerts
│           │       │   │   │   └── ca.org1.hurley.lab-cert.pem
│           │       │   │   ├── keystore
│           │       │   │   │   └── 62aee1789438e7cd6202103effa6154da715d56a70bceedf715ee50e9d34d06d_sk
│           │       │   │   ├── signcerts
│           │       │   │   │   └── Admin@org1.hurley.lab-cert.pem
│           │       │   │   └── tlscacerts
│           │       │   │       └── tlsca.org1.hurley.lab-cert.pem
│           │       │   └── tls
│           │       │       ├── ca.crt
│           │       │       ├── client.crt
│           │       │       └── client.key
│           │       └── User1@org1.hurley.lab
│           │           ├── msp
│           │           │   ├── admincerts
│           │           │   │   └── User1@org1.hurley.lab-cert.pem
│           │           │   ├── cacerts
│           │           │   │   └── ca.org1.hurley.lab-cert.pem
│           │           │   ├── keystore
│           │           │   │   └── 995312cc824f742f2257ccd5f14c91f264470ccf17532dda4d967dc35c567df0_sk
│           │           │   ├── signcerts
│           │           │   │   └── User1@org1.hurley.lab-cert.pem
│           │           │   └── tlscacerts
│           │           │       └── tlsca.org1.hurley.lab-cert.pem
│           │           └── tls
│           │               ├── ca.crt
│           │               ├── client.crt
│           │               └── client.key
│           └── org2.hurley.lab
│               ├── ca
│               │   ├── b9f3413bb3941ba7da0f7acf146cdf2c61c666febe673bf68beafb589ba1ea3f_sk
│               │   └── ca.org2.hurley.lab-cert.pem
│               ├── msp
│               │   ├── admincerts
│               │   │   └── Admin@org2.hurley.lab-cert.pem
│               │   ├── cacerts
│               │   │   └── ca.org2.hurley.lab-cert.pem
│               │   ├── config.yaml
│               │   └── tlscacerts
│               │       └── tlsca.org2.hurley.lab-cert.pem
│               ├── peers
│               │   └── peer0.org2.hurley.lab
│               │       ├── msp
│               │       │   ├── admincerts
│               │       │   │   └── Admin@org2.hurley.lab-cert.pem
│               │       │   ├── cacerts
│               │       │   │   └── ca.org2.hurley.lab-cert.pem
│               │       │   ├── config.yaml
│               │       │   ├── keystore
│               │       │   │   └── 7011dedb35f698d54f5a2e6afd75aae6ff512b23da032e002788c21ae596c788_sk
│               │       │   ├── signcerts
│               │       │   │   └── peer0.org2.hurley.lab-cert.pem
│               │       │   └── tlscacerts
│               │       │       └── tlsca.org2.hurley.lab-cert.pem
│               │       └── tls
│               │           ├── ca.crt
│               │           ├── server.crt
│               │           └── server.key
│               ├── tlsca
│               │   ├── 6335fdf9dc707c1d001338717309c7c9d2da4a71b24447368c925057f78e738d_sk
│               │   └── tlsca.org2.hurley.lab-cert.pem
│               └── users
│                   ├── Admin@org2.hurley.lab
│                   │   ├── msp
│                   │   │   ├── admincerts
│                   │   │   │   └── Admin@org2.hurley.lab-cert.pem
│                   │   │   ├── cacerts
│                   │   │   │   └── ca.org2.hurley.lab-cert.pem
│                   │   │   ├── keystore
│                   │   │   │   └── 564b7e08e155324c52c26f546b8789b400c89bbba110b7dda19cac3355c50342_sk
│                   │   │   ├── signcerts
│                   │   │   │   └── Admin@org2.hurley.lab-cert.pem
│                   │   │   └── tlscacerts
│                   │   │       └── tlsca.org2.hurley.lab-cert.pem
│                   │   └── tls
│                   │       ├── ca.crt
│                   │       ├── client.crt
│                   │       └── client.key
│                   └── User1@org2.hurley.lab
│                       ├── msp
│                       │   ├── admincerts
│                       │   │   └── User1@org2.hurley.lab-cert.pem
│                       │   ├── cacerts
│                       │   │   └── ca.org2.hurley.lab-cert.pem
│                       │   ├── keystore
│                       │   │   └── 7be4a5877cf94f0725882ec06da24fea7b50b37c8aba08e53ae17fbdd302f697_sk
│                       │   ├── signcerts
│                       │   │   └── User1@org2.hurley.lab-cert.pem
│                       │   └── tlscacerts
│                       │       └── tlsca.org2.hurley.lab-cert.pem
│                       └── tls
│                           ├── ca.crt
│                           ├── client.crt
│                           └── client.key
├── binaries.sh
├── configtx.yaml
├── crypto-config.yaml
├── cyptofilesgenerator.sh.successful
├── docker-compose.yaml
├── fabric-binaries
│   └── 1.4.0
│       ├── bin
│       │   ├── configtxgen
│       │   ├── configtxlator
│       │   ├── cryptogen
│       │   ├── discover
│       │   ├── fabric-ca-client
│       │   ├── get-docker-images.sh
│       │   ├── idemixgen
│       │   ├── orderer
│       │   └── peer
│       └── config
│           ├── configtx.yaml
│           ├── core.yaml
│           └── orderer.yaml
├── generator.sh
├── hurley.networkConfig.json
├── installscript.sh
├── network-profiles
│   ├── org1.network-profile.inside-docker.yaml
│   ├── org1.network-profile.yaml
│   ├── org2.network-profile.inside-docker.yaml
│   └── org2.network-profile.yaml
├── restart.sh
├── tasks
│   ├── installchaincode.sh.successful
│   └── upgradechaincode.sh.successful
└── upgradescript.sh
```
