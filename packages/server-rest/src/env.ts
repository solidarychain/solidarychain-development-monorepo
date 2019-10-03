// tslint:disable-next-line:no-var-requires
import { envVariables as envVariablesCommon } from '@convector-sample/common';
import { Logger } from '@nestjs/common';

export const envVariables: any = {
  // merge common envVariables
  ...envVariablesCommon,

  // override or extend common envVariables
  // http/s server
  httpPort: process.env.HTTP_SERVER_PORT || 3000,
  httpsPort: process.env.HTTPS_SERVER_PORT || 8443,
  // swaggerModule
  swaggerModuleTitle: process.env.SWAGGER_MODULE_TITLE || 'Person ChainCode',
  swaggerModuleDescription: process.env.SWAGGER_MODULE_DESCRIPTION || 'Convector Person ChainCode API',
  swaggerModuleVersion: process.env.SWAGGER_MODULE_VERSION || '1.0',
  swaggerApiPath: process.env.SWAGGER_API_PATH || 'api',
  swaggerModuleTagAuth: process.env.SWAGGER_MODULE_TAG_AUTH || 'auth',
  swaggerModuleTagPerson: process.env.SWAGGER_MODULE_TAG_PERSON || 'person',
  swaggerModuleTagParticipant: process.env.SWAGGER_MODULE_TAG_PERSON || 'participant',

  // authService : true: moked users array, false: or ledger person(users) authentication
  authServiceUseMokedUsers: process.env.AUTH_SERVICE_USE_MOKED_USERS || true,

  // jwt
  // https://github.com/zeit/ms
  // https://github.com/auth0/node-jsonwebtoken#usage
  accessTokenJwtSecret: process.env.ACCESS_TOKEN_JWT_SECRET || 'secretKeyAccessToken',
  accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || '15m',
  refreshTokenJwtSecret: process.env.REFRESH_TOKEN_JWT_SECRET || 'secretKeyRefreshToken',
  refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || '7d',
};
