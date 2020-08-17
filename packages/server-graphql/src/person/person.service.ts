import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Person as PersonConvectorModel, PersonAttribute as AttributeConvectorModel } from '@solidary-chain/person-cc';
import { FlatConvectorModel } from '@worldsibu/convector-core';
import { generate } from 'generate-password';
import { v4 as uuid } from 'uuid';
import { GetByComplexQueryInput, PaginationArgs } from '../common/dto';
import { PersonControllerBackEnd } from '../convector';
import { AddPersonAttributeInput, GetByAttributeInput, NewPersonInput, UpdatePersonInput, UpdatePersonPasswordInput, UpdatePersonProfileInput, UpsertCitizenCardInput } from './dto';
import { Person } from './models';

@Injectable()
export class PersonService {
  async create(data: NewPersonInput): Promise<Person> {
    try {
      // require to use or generate new id
      const newId: string =  (data.id) ? data.id : uuid();
      // compose ConvectorModel from NewInput
      const personToCreate: PersonConvectorModel = new PersonConvectorModel({
        ...data,
        // require to inject values
        id: newId,
        // in case of omitted default username is fiscalNumber
        username: (data.username) ? data.username : data.fiscalNumber,
        // if not password defined generate a new one
        password: (data.password) ? data.password : generate({ length: 10, numbers: true }),
        // convert Date to epoch unix time to be stored in convector person model
        birthDate: ((data.birthDate as unknown) as number),
        emissionDate: ((data.emissionDate as unknown) as number),
        expirationDate: ((data.expirationDate as unknown) as number),
      });
      await PersonControllerBackEnd.create(personToCreate);
      return this.findOneById(newId);
    } catch (error) {
      // extract error message
      const errorMessage: string = (error.responses && error.responses[0].error.message) ? error.responses[0].error.message : error;
      // override default 'throw errorMessage;' with a customized version
      throw new HttpException({ status: HttpStatus.CONFLICT, error: errorMessage }, HttpStatus.CONFLICT);
    }
  }

  async update(data: UpdatePersonInput): Promise<Person> {
    try {
      // compose ConvectorModel from UpdateInput
      const personToUpdate: PersonConvectorModel = new PersonConvectorModel({
        ...data
      });
      await PersonControllerBackEnd.update(personToUpdate);
      return this.findOneById(data.id);
    } catch (error) {
      throw error;
    }
  }

  async updatePassword(data: UpdatePersonPasswordInput): Promise<Person> {
    try {
      // compose ConvectorModel from Input
      const personToUpdate: PersonConvectorModel = new PersonConvectorModel({
        ...data
      });
      await PersonControllerBackEnd.updatePassword(personToUpdate);
      return this.findOneById(data.id);
    } catch (error) {
      throw error;
    }
  }

  async updateProfile(data: UpdatePersonProfileInput): Promise<Person> {
    try {
      // compose ConvectorModel from Input
      const personToUpdate: PersonConvectorModel = new PersonConvectorModel({
        ...data
      });
      await PersonControllerBackEnd.updateProfile(personToUpdate);
      return this.findOneById(data.id);
    } catch (error) {
      throw error;
    }
  }

  async upsertCitizenCard(data: UpsertCitizenCardInput): Promise<Person> {
    try {
      // require to use or generate new id
      const newId: string =  (data.id) ? data.id : uuid();
      // compose ConvectorModel from NewInput
      const personToUpsert: PersonConvectorModel = new PersonConvectorModel({
        ...data,
        // require to inject values
        id: newId,
        // convert Date to epoch unix time to be stored in convector person model
        birthDate: ((data.birthDate as unknown) as number),
        emissionDate: ((data.emissionDate as unknown) as number),
        expirationDate: ((data.expirationDate as unknown) as number),
      });
      await PersonControllerBackEnd.upsertCitizenCard(personToUpsert);
      // we don't know the id, can be newId in case of a new record, or existing id, thats the reason why we use fiscalNumber
      return this.findOneByFiscalnumber(data.fiscalNumber);
    } catch (error) {
      throw error;
    }
  }

  async addAttribute(personId: string, addPersonAttributeInput: AddPersonAttributeInput): Promise<Person> {
    try {
      const attributeConvectorModel: AttributeConvectorModel = new AttributeConvectorModel(
        { ...addPersonAttributeInput },
      );
      // leave above line has a reminder, this is the hack to use content when it
      // don't have a @Validate annotation, read comments on Attribute person-cc
      // attributeConvectorModel.content = addPersonAttributeInput.content;
      await PersonControllerBackEnd.addAttribute(personId, attributeConvectorModel);
      return this.findOneById(personId);
    } catch (error) {
      throw error;
    }
  }

  async findAll(paginationArgs: PaginationArgs): Promise<Person[]> {
    // get convector model
    const flatConvectorModel: Array<FlatConvectorModel<PersonConvectorModel[]>> = await PersonControllerBackEnd.getAll();
    // convert flat convector model to convector model
    const convectorModel: PersonConvectorModel[] = flatConvectorModel.map((e: PersonConvectorModel) => new PersonConvectorModel(e));
    // call common find method
    const model: Person[] = await this.findBy(convectorModel, paginationArgs) as Person[];
    // return model
    return model;
  }

  async findByAttribute({ id, content }: GetByAttributeInput, paginationArgs: PaginationArgs): Promise<Person | Person[]> {
    // get fabric model with _props
    const fabricModel: PersonConvectorModel[] = await PersonControllerBackEnd.getByAttribute(id, content) as PersonConvectorModel[];
    // convert fabric model to convector model (remove _props)
    const convectorModel: PersonConvectorModel[] = fabricModel.map((e: PersonConvectorModel) => new PersonConvectorModel(e));
    // call common find method
    const model: Person[] = await this.findBy(convectorModel, paginationArgs) as Person[];
    // return model
    return model;
  }

  async findComplexQuery(getByComplexQueryInput: GetByComplexQueryInput, paginationArgs: PaginationArgs): Promise<Person | Person[]> {
    // get fabric model with _props
    const fabricModel: Array<FlatConvectorModel<PersonConvectorModel>> = await PersonControllerBackEnd.getComplexQuery(getByComplexQueryInput) as PersonConvectorModel[];
    // convert fabric model to convector model (remove _props)
    const convectorModel: PersonConvectorModel[] = fabricModel.map((e: PersonConvectorModel) => new PersonConvectorModel(e));
    // call common find method
    const model: Person[] = await this.findBy(convectorModel, paginationArgs) as Person[];
    // return model
    return model;
  }

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

  async findOneByFiscalnumber(fiscalNumber: string): Promise<Person> {
    // get fabric model with _props
    const fabricModel: PersonConvectorModel | PersonConvectorModel[] = await PersonControllerBackEnd.getByFiscalnumber(fiscalNumber) as PersonConvectorModel;
    // convert fabric model to convector model (remove _props)
    const convectorModel: PersonConvectorModel = new PersonConvectorModel(fabricModel[0]);
    // call common find method
    const model: Person = await this.findBy(convectorModel, null) as Person;
    // return model
    return model;
  }

  /**
   * shared findBy method
   */
  async findBy(convectorModel: PersonConvectorModel | PersonConvectorModel[], paginationArgs: PaginationArgs): Promise<Person | Person[]> {
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
        return (paginationArgs)
          ? convectorModel.splice(paginationArgs.skip, paginationArgs.take) as unknown as Person[]
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
