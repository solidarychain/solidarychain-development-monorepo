import { Injectable } from '@nestjs/common';
import { couchDBView, couchDBHost, couchDBProtocol, couchDBPort } from './env';
import { BaseStorage } from '@worldsibu/convector-core';
import { CouchDBStorage } from '@worldsibu/convector-storage-couchdb';

@Injectable()
export class AppService {

  constructor() {
    // init CouchDB before use it
    this.initCouchDB();
  }

  getHello(): string {
    return 'Hello World!';
  }

  initCouchDB() {
    BaseStorage.current = new CouchDBStorage({
      host: couchDBHost,
      protocol: couchDBProtocol,
      port: couchDBPort,
    }, couchDBView);
  }
}
