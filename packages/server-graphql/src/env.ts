// tslint:disable-next-line:no-var-requires
import { envVariables as envVariablesCommon } from '@convector-sample/common';

export const envVariables: any = {
  // merge common envVariables
  ...envVariablesCommon,

  // override or extend common envVariables

  // http/s server
  // httpPort: process.env.HTTP_SERVER_PORT || 3001,
  httpsPort: process.env.HTTPS_SERVER_PORT || 3443,

  // jwt
  // https://github.com/zeit/ms
  // https://github.com/auth0/node-jsonwebtoken#usage
  jwtSecret: process.env.JWT_SECRET = 'secretKey',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN = '1h',
};
