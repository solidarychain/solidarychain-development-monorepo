import { Injectable, Logger } from '@nestjs/common';
import { Attribute, Person } from 'person-cc';
import { PersonControllerBackEnd } from '../convector';
import { envVariables as e } from '../env';
import { CreatePersonDto } from './dto';

@Injectable()
export class PersonService {

  public async getAll() {
    const viewUrl = '_design/person/_view/all';
    const queryOptions = { startKey: [''], endKey: [''] };

    try {
      const result = (await Person.query(Person, e.couchDBView, viewUrl, queryOptions)) as Person[];
      // map item toJson
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

  public async get(id: string): Promise<Person> {
    try {
      return new Person(await PersonControllerBackEnd.get(id));
    } catch (err) {
      throw err;
    }
  }

  public async getByUsername(username: string): Promise<Person> {
    try {
      const user = await PersonControllerBackEnd.getByUsername(username);
      // create Person model
      const userModel = new Person((user[0]));
      return userModel;
    } catch (err) {
      throw err;
    }
  }

  public async addAttribute(id: string, attributeId: string, content: any) {
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
    attributeToAdd.certifierID = e.identityId;

    await PersonControllerBackEnd.addAttribute(id, attributeToAdd);

    const personToReturn = new Person(await PersonControllerBackEnd.get(id));
    return personToReturn.toJSON();
  }

  public async getByAttribute(id: string, value: any) {
    try {
      return await PersonControllerBackEnd.getByAttribute(id, value);
    } catch (err) {
      throw err;
    }
  }

  public async create(createPersonDto: CreatePersonDto) {
    try {
      const personToCreate = new Person({ ...createPersonDto });
      return await PersonControllerBackEnd.create(personToCreate);
    } catch (err) {
      throw err;
    }
  }
}
