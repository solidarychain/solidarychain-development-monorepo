// tslint:disable-next-line:no-var-requires
import { envVariables as envVariablesCommon } from '@convector-sample/common';

export const envVariables: any = {
  // merge common envVariables
  ...envVariablesCommon,

  // override or extend common envVariables

  // http/s server
  httpPort: process.env.HTTP_SERVER_PORT || 3001,
  httpsPort: process.env.HTTPS_SERVER_PORT || 8444,
};
