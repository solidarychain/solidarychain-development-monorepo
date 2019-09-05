import { Person as PersonConvectorModel, Attribute as AttributeConvectorModel } from '@convector-sample/person-cc';
import { Injectable, Logger } from '@nestjs/common';
import { FlatConvectorModel } from '@worldsibu/convector-core';
import { PersonControllerBackEnd } from '../convector';
import { NewPersonInput } from './dto/new-person.input';
import { PersonArgs } from './dto/person.args';
import { Person } from './models/person.model';

@Injectable()
export class PersonService {
  async create(data: NewPersonInput): Promise<Person> {
    try {
      const personToCreate = new PersonConvectorModel({ ...data });
      await PersonControllerBackEnd.create(personToCreate);
      return await this.findOneById(data.id);
    } catch (error) {
      throw error;
    }
  }

  async findOneById(id: string): Promise<Person> {
    try {
      // get fabric model with _props
      const person: any = await PersonControllerBackEnd.get(id);
      // convert fabric model to convector module _props
      const personModel: PersonConvectorModel = new PersonConvectorModel(person);
      // convert attributes content to object { data: content }
      if (Array.isArray(personModel.attributes)) {
        personModel.attributes = this.convertAttributes(personModel);
      }
      // trick: must return convector model as a graphql model, to prevent property conversion problems
      return (personModel as any) as Person;
    } catch (error) {
      throw error;
    }
  }

  async findAll(personArgs: PersonArgs): Promise<Person[]> {
    try {
      const fabricModel: Array<FlatConvectorModel<PersonConvectorModel[]>> = await PersonControllerBackEnd.getAll();
      // convert attributes content to object { data: content }
      fabricModel.forEach((e: PersonConvectorModel) => {
        // only convert attributes if have attributes array
        if (Array.isArray(e.attributes)) {
          const modifiedAttributes = this.convertAttributes(e);
          // apply modifiedAttributes to current person
          e.attributes = [...modifiedAttributes] as AttributeConvectorModel[];
        }
      });
      // require to map fabric model to graphql Person[]
      return (personArgs)
        ? fabricModel.splice(personArgs.skip, personArgs.take) as Person[]
        : fabricModel as Person[];
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  /**
   * function to convert property 'content' string to json object, if is a string object
   * to prevent error using GraphQLJSONObject custom scalar
   */
  convertAttributes(person: PersonConvectorModel): AttributeConvectorModel[] {
    // capture new mapped attributes
    const newAttributes = (person.attributes.map((attribute: AttributeConvectorModel) => {
      let newContent = attribute.content;
      if (typeof attribute.content !== 'object') {
        newContent = { data: attribute.content };
      }
      return { ...attribute, content: newContent };
    }));
    // require to cast to AttributeConvectorModel[]
    return newAttributes as AttributeConvectorModel[];
  }
}
