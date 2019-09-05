import { Person as PersonConvectorModel, Attribute as AttributeConvectorModel } from '@convector-sample/person-cc';
import { Injectable, Logger } from '@nestjs/common';
import { FlatConvectorModel } from '@worldsibu/convector-core';
import { PersonControllerBackEnd } from '../convector';
import { NewPersonInput } from './dto/new-person.input';
import { PersonArgs } from './dto/person.args';
import { Person } from './models/person.model';
import { GetByAttributeInput } from './dto/get-by-attribute.input';

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
      const fabricModel: any = await PersonControllerBackEnd.get(id);
      // convert fabric model to convector model (remove _props)
      const convectorModel: PersonConvectorModel = new PersonConvectorModel(fabricModel);
      // convert attributes content to object { data: content }
      if (Array.isArray(convectorModel.attributes)) {
        convectorModel.attributes = this.convertAttributes(convectorModel);
      }
      // trick: must return convector model as a graphql model, to prevent property conversion problems
      return (convectorModel as any) as Person;
    } catch (error) {
      throw error;
    }
  }

  async findAll(personArgs: PersonArgs): Promise<Person[]> {
    try {
      const convectorModel: Array<FlatConvectorModel<PersonConvectorModel[]>> = await PersonControllerBackEnd.getAll();
      // convert attributes content to object { data: content }
      convectorModel.forEach((e: PersonConvectorModel) => {
        // only convert attributes if have attributes array
        if (Array.isArray(e.attributes)) {
          const modifiedAttributes = this.convertAttributes(e);
          // apply modifiedAttributes to current person
          e.attributes = [...modifiedAttributes] as AttributeConvectorModel[];
        }
      });
      // require to map fabric model to graphql Person[]
      return (personArgs)
        ? convectorModel.splice(personArgs.skip, personArgs.take) as Person[]
        : convectorModel as Person[];
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  // TODO: create a function
  // TODO: add pagination args
  // TODO convertAttributes works with array or non array of fabric and convector <GENERIC> type, don't DRY THIS MAN!!!!!!!!
  async getByAttribute({ id, value }: GetByAttributeInput, personArgs: PersonArgs): Promise<Person | Person[]> {
    try {
      const fabricModel: PersonConvectorModel | PersonConvectorModel[] = await PersonControllerBackEnd.getByAttribute(id, value.data);
      if (Array.isArray(fabricModel)) {
        // convert fabric model to convector model (remove _props)
        const convectorModel: PersonConvectorModel[] = fabricModel.map((e: PersonConvectorModel) => new PersonConvectorModel(e));
        // convert attributes content to object { data: content }
        convectorModel.forEach((e: PersonConvectorModel) => {
          // only convert attributes if have attributes array
          if (Array.isArray(e.attributes)) {
            const modifiedAttributes = this.convertAttributes(e);
            // apply modifiedAttributes to current person
            e.attributes = [...modifiedAttributes] as AttributeConvectorModel[];
          }
        });
        // require to map fabric model to graphql Person[]
        return (personArgs)
          ? convectorModel.splice(personArgs.skip, personArgs.take) as unknown as Person[]
          : convectorModel as unknown as Person[];
      } else {
        // only convert attributes if have attributes array
        if (Array.isArray(fabricModel.attributes)) {
          const modifiedAttributes = this.convertAttributes(fabricModel);
          // apply modifiedAttributes to current person
          fabricModel.attributes = [...modifiedAttributes] as AttributeConvectorModel[];
        }
        // require to map fabric model to graphql Person[]
        return fabricModel as unknown as Person;
      }
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
