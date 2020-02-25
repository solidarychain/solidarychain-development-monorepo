import { appConstants as c } from '@solidary-network/common-cc';
import { Participant } from '@solidary-network/participant-cc';
import { Controller, ConvectorController, FlatConvectorModel, Invokable, Param } from '@worldsibu/convector-core';
import { ChaincodeTx } from '@worldsibu/convector-platform-fabric';
import * as yup from 'yup';
import { PersonAttribute } from './person-attribute.model';
import { Person } from './person.model';
import { getParticipantByIdentity, hashPassword } from './utils';

@Controller('person')
export class PersonController extends ConvectorController<ChaincodeTx> {
  @Invokable()
  public async create(
    @Param(Person)
    person: Person
  ) {
    // get host participant from fingerprint
    const participant: Participant = await getParticipantByIdentity(this.sender);
    if (!!participant && !participant.id) {
      throw new Error('There is no participant with that identity');
    }

    // check duplicated id
    const exists = await Person.getOne(person.id);
    if (!!exists && exists.id) {
      throw new Error(`There is a person registered with that Id already (${person.id})`);
    }

    // check duplicated username
    const existsUsername = await Person.query(Person, {
      selector: {
        type: c.CONVECTOR_MODEL_PATH_PERSON,
        username: person.username,
        participant: {
          id: participant.id
        }
      }
    });
    if ((existsUsername as Person[]).length > 0) {
      throw new Error(`There is a person registered with that username already (${person.username})`);
    }

    // check duplicated fiscalNumber
    const existsFiscalnumber = await Person.query(Person, {
      selector: {
        type: c.CONVECTOR_MODEL_PATH_PERSON,
        fiscalNumber: person.fiscalNumber,
        participant: {
          id: participant.id
        }
      }
    });
    if ((existsFiscalnumber as Person[]).length > 0) {
      throw new Error(`There is a person registered with that fiscalNumber already (${person.fiscalNumber})`);
    }

    let gov = await Participant.getOne('gov');
    if (!gov || !gov.identities) {
      throw new Error('No government identity has been registered yet');
    }
    const govActiveIdentity = gov.identities.find(identity => identity.status === true);

    if (!govActiveIdentity) {
      throw new Error('No active identity found for participant');
    }
    if (this.sender !== govActiveIdentity.fingerprint) {
      throw new Error(`Just the government - ID=gov - can create people - requesting organization was ${this.sender}`);
    }

    // add person
    person.participant = gov;
    // create a new identity
    person.identities = [{
      fingerprint: this.sender,
      status: true
    }];
    // hashPassword before save model
    person.password = hashPassword(person.password);
    // add date in epoch unix time
    person.registrationDate = new Date().getTime();
    // add date in epoch unix time
    person.createdDate = new Date().getTime();

    // save person
    await person.save();
  }

  @Invokable()
  public async addAttribute(
    @Param(yup.string())
    personId: string,
    @Param(PersonAttribute.schema())
    attribute: PersonAttribute
  ) {
    // Check if the "stated" participant as certifier of the attribute is actually the one making the request
    let participant = await Participant.getOne(attribute.certifierID);

    if (!participant || !participant.identities) {
      throw new Error(`No participant found with id ${attribute.certifierID}`);
    }

    const participantActiveIdentity = participant.identities.find(
      identity => identity.status === true);

    if (!participantActiveIdentity) {
      throw new Error('No active identity found for participant');
    }

    if (this.sender !== participantActiveIdentity.fingerprint) {
      throw new Error(`Requester identity cannot sign with the current certificate ${this.sender}. This means that the user requesting the tx and the user set in the param certifierId do not match`);
    }

    let person = await Person.getOne(personId);

    if (!person || !person.id) {
      throw new Error(`No person found with id ${personId}`);
    }

    if (!person.attributes) {
      person.attributes = [];
    }

    let exists = person.attributes.find(attr => attr.id === attribute.id);

    if (!!exists) {
      let attributeOwner = await Participant.getOne(exists.certifierID);
      let attributeOwnerActiveIdentity = attributeOwner.identities.find(
        identity => identity.status === true);

      // Already has one, let's see if the requester has permissions to update it
      if (this.sender !== attributeOwnerActiveIdentity.fingerprint) {
        throw new Error(`User already has an attribute for ${attribute.id} but current identity cannot update it`);
      }
      // update as is the right attribute certifier
      exists = attribute;
    } else {
      person.attributes.push(attribute);
    }
    await person.save();
  }

  @Invokable()
  public async get(
    @Param(yup.string())
    id: string
  ) {
    const existing = await Person.getOne(id);
    if (!existing || !existing.id) {
      throw new Error(`No person exists with that ID ${id}`);
    }
    return existing;
  }

  @Invokable()
  public async getAll(): Promise<FlatConvectorModel<Person>[]> {
    return (await Person.getAll(c.CONVECTOR_MODEL_PATH_PERSON))
      .map(person => person.toJSON() as Person);
  }

  @Invokable()
  public async getByAttribute(
    @Param(yup.string())
    id: string,
    // find #STRING-OR-OBJECT
    // use if content is string
    // @Param(yup.mixed()) // this convert value to string, to keep the object use below @Param(yup.object())
    // use if content is object
    @Param(yup.object())   // this is used to use the value has a json object, ex "content": { "data": "1971", "work": true }
    value: any
  ): Promise<Person | Person[]> {
    return await Person.query(Person, {
      selector: {
        type: c.CONVECTOR_MODEL_PATH_PERSON,
        attributes: {
          $elemMatch: {
            id: id,
            content: value
          }
        }
      }
    });
  }

  /**
   * get username from participant
   */
  @Invokable()
  public async getByUsername(
    @Param(yup.string())
    username: string,
  ): Promise<Person | Person[]> {
    // get host participant from fingerprint
    const participant: Participant = await getParticipantByIdentity(this.sender);
    const existing = await Person.query(Person, {
      selector: {
        type: c.CONVECTOR_MODEL_PATH_PERSON,
        username,
        participant: {
          id: participant.id
        }
      }
    });
    // require to check if existing before try to access existing[0].id prop
    if (!existing || !existing[0] || !existing[0].id) {
      throw new Error(`No person exists with that username ${username}`);
    }
    return existing;
  }

  /**
   * get fiscalNumber from participant
   */
  @Invokable()
  public async getByFiscalnumber(
    @Param(yup.string())
    fiscalNumber: string,
  ): Promise<Person | Person[]> {
    // get host participant from fingerprint
    const participant: Participant = await getParticipantByIdentity(this.sender);
    const existing = await Person.query(Person, {
      selector: {
        type: c.CONVECTOR_MODEL_PATH_PERSON,
        fiscalNumber,
        participant: {
          id: participant.id
        }
      }
    });
    // require to check if existing before try to access existing[0].id prop
    if (!existing || !existing[0] || !existing[0].id) {
      throw new Error(`No person exists with that fiscalNumber ${fiscalNumber}`);
    }
    return existing;
  }

  /**
   * get causes, with complex query filter
   */
  @Invokable()
  public async getComplexQuery(
    @Param(yup.object())
    complexQueryInput: any,
  ): Promise<Person | Person[]> {
    if (!complexQueryInput || !complexQueryInput.filter) {
      throw new Error(c.EXCEPTION_ERROR_NO_COMPLEX_QUERY);
    }
    const complexQuery: any = {
      selector: {
        type: c.CONVECTOR_MODEL_PATH_PERSON,
        // spread arbitrary query filter
        ...complexQueryInput.filter
      },
      // not useful
      // fields: (complexQueryInput.fields) ? complexQueryInput.fields : undefined,
      sort: (complexQueryInput.sort) ? complexQueryInput.sort : undefined,
    };
    const resultSet: Person | Person[] = await Person.query(Person, complexQuery);
    return resultSet;
  }  
}
