# QuickStart

```shell
# clone project
$ git clone https://github.com/solidarychain/solidarychain-development-monorepo.git
$ cd solidarychain-development-monorepo
# install dependencies, this will trigger lerna bootstrap
$ npm i
# after npm error "Cannot find module '@solidary-chain/common-cc'"
$ npx lerna run build --scope @solidary-chain/common-cc --stream
# restart Network
$ ./restartEnv.sh
```
