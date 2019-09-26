# NOTES

1:25

```shell
# create  react app
$ cd packages
$ npx create-react-app frontend-react --typescript
# test it

```

```shell
# change package.json
$ code packages/frontend-react/package.json
```

change `"name": "frontend-react"` to `"name": "@convector-sample/frontend-react"`
and `"private": true` to `"private": false`, or remove it from `package.json` else it won't appear in `npx lerna list`, and we must use `npx lerna list -a`

- [@lerna/import](https://github.com/lerna/lerna/tree/master/commands/import)

```shell
# not clean and hosting all project dependencies
$ npx lerna clean -y && npx lerna bootstrap --hoist
# fix build cc and start server (Property 'get' does not exist on type....)
$ npx lerna run build --scope @convector-sample/participant-cc --stream
# test react app
$ npx lerna run start --scope @convector-sample/frontend-react --stream
```

- [Support Jest 24.9.0](https://github.com/facebook/create-react-app/issues/7580)

```shell
# errors  
The react-scripts package provided by Create React App requires a dependency "jest": "24.9.0"
# the problem is using yarn and npm, remove lock files
$ rm packages/frontend-react/yarn.json
$ rm packages/frontend-react/package-lock.json
$ rm packages/frontend-react/node_modules/ -r
# fix it with SKIP_PREFLIGHT_CHECK else it won't work
$ nano packages/frontend-react/.env
# add
SKIP_PREFLIGHT_CHECK=true
# now bootstrap
$ npx lerna bootstrap
```

done

## Setup VSCode Debug

- [React Starter](:note:ef02870a-e3e8-4586-9baa-e752f1b9086e)

add `.vscode/launch.json` and `packages/frontend-react/.vscode/launch.json` this way work if we are in root folder and project folder as vscode open folder

```json
{
  // Use IntelliSense to learn about possible attributes.
  // Hover to view descriptions of existing attributes.
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Chrome",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:3000",
      "webRoot": "${workspaceRoot}/src",
      "userDataDir": "${workspaceRoot}/.vscode/chrome",
      "sourceMapPathOverrides": {
        "webpack:///src/*": "${webRoot}/*"
      }
    }
  ]
}
```

```shell
# boot app with a breakpoint and press F5 and done
$ npx lerna run start --scope @convector-sample/frontend-react --stream

```

