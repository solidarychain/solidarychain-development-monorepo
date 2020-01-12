import { PersonAttribute as AttributeConvectorModel, Person as PersonConvectorModel } from '@solidary-network/person-cc';
import { Injectable, Logger } from '@nestjs/common';
import { FlatConvectorModel } from '@worldsibu/convector-core';
import { PersonControllerBackEnd } from '../convector';
import AddPersonAttributeInput from './dto/add-person-attribute.input';
import GetByAttributeInput from './dto/get-by-attribute.input';
import NewPersonInput from './dto/new-person.input';
import PersonArgs from './dto/person.args';
import Person from './models/person.model';
import { v4 as uuid } from 'uuid';
import { generate } from 'generate-password';

@Injectable()
export class PersonService {
  async findOneById(id: string): Promise<Person> {
    // get fabric model with _props
    const fabricModel: PersonConvectorModel = await PersonControllerBackEnd.get(id) as PersonConvectorModel;
    // convert fabric model to convector model (remove _props)
    const convectorModel: PersonConvectorModel = new PersonConvectorModel(fabricModel);
    // call common find method
    const model: Person = await this.findBy(convectorModel, null) as Person;
    return model;
  }

  async findOneByUsername(username: string): Promise<Person> {
    // get fabric model with _props
    const fabricModel: PersonConvectorModel | PersonConvectorModel[] = await PersonControllerBackEnd.getByUsername(username) as PersonConvectorModel;
    // convert fabric model to convector model (remove _props)
    const convectorModel: PersonConvectorModel = new PersonConvectorModel(fabricModel[0]);
    // call common find method
    const model: Person = await this.findBy(convectorModel, null) as Person;
    // return model
    return model;
  }

  async findByAttribute({ id, content }: GetByAttributeInput, personArgs: PersonArgs): Promise<Person | Person[]> {
    // get fabric model with _props
    const fabricModel: PersonConvectorModel[] = await PersonControllerBackEnd.getByAttribute(id, content) as PersonConvectorModel[];
    // convert fabric model to convector model (remove _props)
    const convectorModel: PersonConvectorModel[] = fabricModel.map((e: PersonConvectorModel) => new PersonConvectorModel(e));
    // call common find method
    const model: Person[] = await this.findBy(convectorModel, personArgs) as Person[];
    // return model
    return model;
  }

  async findAll(personArgs: PersonArgs): Promise<Person[]> {
    // get convector model
    const flatConvectorModel: Array<FlatConvectorModel<PersonConvectorModel[]>> = await PersonControllerBackEnd.getAll();
    // convert flat convector model to convector model
    const convectorModel: PersonConvectorModel[] = flatConvectorModel.map((e: PersonConvectorModel) => new PersonConvectorModel(e));
    // call common find method
    const model: Person[] = await this.findBy(convectorModel, personArgs) as Person[];
    // return model
    return model;
  }

  async create(data: NewPersonInput): Promise<Person> {
    try {
      const personToCreate: PersonConvectorModel = new PersonConvectorModel({
        ...data,
        // require to inject values
        id: uuid(),
        // inn case of omitted default username is fiscalNumber
        username: (data.username) ? data.username : data.fiscalNumber,
        // if not password defined generate a new one
        password: (data.password) ? data.password : generate({ length: 10, numbers: true }),
        // convert Date to epoch unix time to be stored in convector person model
        birthDate: ((data.birthDate as unknown) as number)/*.getTime()*/,
        emissionDate: ((data.emissionDate as unknown) as number)/*.getTime()*/,
        expirationDate: ((data.expirationDate as unknown) as number)/*.getTime()*/,
      });
      await PersonControllerBackEnd.create(personToCreate);
      return await this.findOneById(personToCreate.id);
    } catch (error) {
      // extract error message
      const errorMessage: string = (error.responses && error.responses[1].error.message) ? error.responses[1].error.message : error;
      throw errorMessage;
    }
  }

  async personAddAttribute(personId: string, addPersonAttributeInput: AddPersonAttributeInput): Promise<Person> {
    try {
      const attributeConvectorModel: AttributeConvectorModel = new AttributeConvectorModel(
        { ...addPersonAttributeInput },
      );
      // leave above line has a reminder, this is the hack to use content when it
      // don't have a @Validate annotation, read comments on Attribute person-cc
      // attributeConvectorModel.content = addPersonAttributeInput.content;
      await PersonControllerBackEnd.addAttribute(personId, attributeConvectorModel);
      return await this.findOneById(personId);
    } catch (error) {
      throw error;
    }
  }

  /**
   * shared findBy method
   */
  async findBy(convectorModel: PersonConvectorModel | PersonConvectorModel[], personArgs: PersonArgs): Promise<Person | Person[]> {
    try {
      // working in array mode
      if (Array.isArray(convectorModel)) {
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
        if (Array.isArray(convectorModel.attributes)) {
          const modifiedAttributes = this.convertAttributes(convectorModel);
          // apply modifiedAttributes to current person
          convectorModel.attributes = [...modifiedAttributes] as AttributeConvectorModel[];
        }
        // require to map fabric model to graphql Person[]
        return convectorModel as unknown as Person;
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
