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
  accessTokenJwtSecret: process.env.ACCESS_TOKEN_JWT_SECRET || 'secretKeyAccessToken',
  accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || '15m',
  refreshTokenJwtSecret: process.env.REFRESH_TOKEN_JWT_SECRET || 'secretKeyRefreshToken',
  refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || '7d',
  refreshTokenSkipIncrementVersion: process.env.REFRESH_TOKEN_SKIP_INCREMENT_VERSION || 'false',

  // cors origin react frontend
  corsOriginReactFrontend: process.env.CORS_ORIGIN_REACT_FRONTEND || 'https://localhost:3000',
};
