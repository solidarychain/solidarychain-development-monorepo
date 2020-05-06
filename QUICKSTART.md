# QuickStart

```shell
# clone project
$ git clone https://github.com/solidarynetwork/solidarynetwork-development-monorepo.git
$ cd solidarynetwork-development-monorepo
# install dependencies, this will trigger lerna bootstrap
$ npm i
# after npm error "Cannot find module '@solidary-network/common-cc'"
$ npx lerna run build --scope @solidary-network/common-cc --stream
# restart Network
$ ./restartEnv.sh
```
