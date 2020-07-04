# QuickStart

```shell
# clone project
$ git clone https://github.com/solidarychain/solidarychain-development-monorepo.git
$ cd solidarychain-development-monorepo
# install dependencies, this will trigger lerna bootstrap
$ npm i
# after npm error "Cannot find module '@solidary-network/common-cc'"
$ npx lerna run build --scope @solidary-network/common-cc --stream
# restart Network
$ ./restartEnv.sh
```
