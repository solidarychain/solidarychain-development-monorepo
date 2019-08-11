import { Injectable, Logger } from '@nestjs/common';
import { Attribute, Person } from 'person-cc';
import { PersonControllerBackEnd } from '../convector';
import { couchDBView, identityId } from '../env';

@Injectable()
export class PersonService {

  public async getAll() {
    const viewUrl = '_design/person/_view/all';
    const queryOptions = { startKey: [''], endKey: [''] };

    try {
      const result = (await Person.query(Person, couchDBView, viewUrl, queryOptions)) as Person[];
      return await Promise.all(result.map(item => item.toJSON()));
    } catch (err) {
      Logger.log(err);
      if (err.code === 'EDOCMISSING') {
        return [];
      } else {
        throw err;
      }
    }
  }

  public async addAttribute(id, attributeId, content) {
    const attribute = new Attribute(attributeId);
    attribute.certifierID = 'mit';
    attribute.content = {
      level: 'dummy',
      honours: 'high',
      description: 'Important title!',
    };
    attribute.issuedDate = Date.now();

    const attributeToAdd = new Attribute(attributeId);
    attributeToAdd.content = content;
    attributeToAdd.issuedDate = Date.now();

    // Get the identity the server is using right now
    attributeToAdd.certifierID = identityId;

    await PersonControllerBackEnd.addAttribute(id, attributeToAdd);

    const personToReturn = new Person(await PersonControllerBackEnd.get(id));
    return personToReturn.toJSON();
  }

}