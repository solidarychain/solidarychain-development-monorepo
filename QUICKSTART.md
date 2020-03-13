# QuickStart

```shell
# clone project
$ git clone https://github.com/solidarynetwork/solidarynetwork-development-monorepo.git
$ cd solidarynetwork-development-monorepo
# first build -cc library: this is required on fresh clones before lerna bootstrap, to prevent the below error#1 Cannot find module '@solidary-network/common-cc'
$ npx lerna run build --scope @solidary-network/common-cc --stream
# install dependencies, this will trigger lerna bootstrap
$ npm i
# restart Network
$ ./restartEnv.sh
```
