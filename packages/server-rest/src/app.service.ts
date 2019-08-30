import { Injectable } from '@nestjs/common';
import { envVariables as e } from './env';
import { BaseStorage } from '@worldsibu/convector-core';
import { CouchDBStorage } from '@worldsibu/convector-storage-couchdb';

@Injectable()
export class AppService {

  constructor() {
    // init CouchDB
    this.initCouchDB();
  }

  getHello(): string {
    return 'Hello World!';
  }

  initCouchDB() {
    BaseStorage.current = new CouchDBStorage({
      host: e.couchDBHost,
      protocol: e.couchDBProtocol,
      port: e.couchDBPort,
    }, e.couchDBView);
  }
}
