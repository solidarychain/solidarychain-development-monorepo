// node module
import * as fs from 'fs';

export const httpsOptions = {
  // private-key.pem
  key: fs.readFileSync('./config/server.key'),
  // public-certificate.pem
  cert: fs.readFileSync('./config/server.crt'),
};
