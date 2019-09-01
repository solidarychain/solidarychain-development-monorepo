import { Person as PersonConvectorModel, Attribute as AttributeConvectorModel } from '@convector-sample/person-cc';
import { Injectable, Logger } from '@nestjs/common';
import { FlatConvectorModel } from '@worldsibu/convector-core';
import { PersonControllerBackEnd } from '../convector';
import { NewPersonInput } from './dto/new-person.input';
import { PersonArgs } from './dto/person.args';
import { Person } from './models/person';

@Injectable()
export class PersonService {
  async create(data: NewPersonInput): Promise<Person> {
    try {
      const personToCreate = new PersonConvectorModel({ ...data });
      await PersonControllerBackEnd.create(personToCreate);
      return this.findOneById(data.id);
    } catch (error) {
      throw error;
    }
  }

  async findOneById(id: string): Promise<Person> {
    try {
      // get fabric model with _props
      const person: PersonConvectorModel = await PersonControllerBackEnd.get(id);
      // convert fabric model to convector module _props
      const personModel = new PersonConvectorModel(person).toJSON();
      // trick: must return convector model as a graphql model, to prevent property conversion problems
      // TODO: return Person
      return (personModel as any);
    } catch (error) {
      throw error;
    }
  }

  async findAll(personArgs: PersonArgs): Promise<Person[]> {
    try {
      const fabricModel: Array<FlatConvectorModel<PersonConvectorModel[]>> = await PersonControllerBackEnd.getAll();
      // const newFabricModel = [...fabricModel];
      fabricModel.forEach((e: FlatConvectorModel<PersonConvectorModel>) => {
        // Logger.log(e.attributes: AttributeConvectorModel);
        Logger.log(e);
        const newAttributes = [];
        // capture new mapped attributes
        newAttributes.push(e.attributes.map((a: AttributeConvectorModel) => {
          let newContent = a.content;
          if (typeof a.content === 'string') {
            // const newAttribute = { ...a, content: { data: a.content } };
            // return { ...e, attributes: newAttribute };
            // return { ...a, content: { data: a.content } };
            newContent = { data: a.content };
          }
          return { ...a, content: newContent };
        }));
        e.attributes = [...newAttributes];
        Logger.log(e.attributes);
      });
      // Logger.log(mapped);
      // require to map fabric model to graphql Person[]
      return (personArgs)
        ? fabricModel.splice(personArgs.skip, personArgs.take) as Person[]
        : fabricModel as Person[];
    } catch (error) {
      Logger.error(JSON.stringify(error));
      throw error;
    }
  }
}
