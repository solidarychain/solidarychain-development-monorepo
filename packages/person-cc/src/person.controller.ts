import { appConstants as c, ChaincodeEvent, GenericBalance, Goods, newPassword, newUuid } from '@solidary-chain/common-cc';
import { Participant } from '@solidary-chain/participant-cc';
import { Controller, ConvectorController, FlatConvectorModel, Invokable, Param } from '@worldsibu/convector-core';
import { ChaincodeTx } from '@worldsibu/convector-platform-fabric';
import * as yup from 'yup';
import { PersonAttribute } from './person-attribute.model';
import { Person } from './person.model';
import { checkIfSenderIsGovernment, checkUniqueField, hashPassword } from './utils';

@Controller('person')
export class PersonController extends ConvectorController<ChaincodeTx> {
  @Invokable()
  public async create(
    @Param(Person)
    person: Person
  ) {
    // check if sender is government
    let gov: Participant = await Participant.getOne(c.GOV_UUID);
    await checkIfSenderIsGovernment(gov, this.sender);

    // check unique fields
    await checkUniqueField('_id', person.id, true);
    await checkUniqueField('username', person.username, true);
    await checkUniqueField('fiscalNumber', person.fiscalNumber, true);
    await checkUniqueField('email', person.email, false);
    await checkUniqueField('identityNumber', person.identityNumber, false);
    await checkUniqueField('socialSecurityNumber', person.socialSecurityNumber, false);
    await checkUniqueField('beneficiaryNumber', person.beneficiaryNumber, false);
    await checkUniqueField('documentNumber', person.documentNumber, false);
    await checkUniqueField('pan', person.pan, false);

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

    // init objects
    person.fundsBalance = new GenericBalance();
    person.volunteeringHoursBalance = new GenericBalance();
    person.goodsStock = new Array<Goods>()

    // clean non useful props, are required only receive id and entityType
    delete person.loggedPersonId;

    // save person
    await person.save();
    // Emit the ContractEvent - passing the whole Commodity Object as the Payload.
    await this.tx.stub.setEvent(ChaincodeEvent.PersonCreatedEvent, person);
  }

  @Invokable()
  public async update(
    @Param(Person)
    person: Person,
  ) {
    // check if sender is government
    let gov: Participant = await Participant.getOne(c.GOV_UUID);
    await checkIfSenderIsGovernment(gov, this.sender);

    // Retrieve to see if exists
    let existing = await Person.getById(person.id);

    if (!existing || !existing.id) {
      throw new Error('No person exists with that ID');
    }

    // update fields
    existing.roles = person.roles;
    existing.metaDataInternal = person.metaDataInternal;

    // save person
    await existing.save();
    // Emit the Event
    await this.tx.stub.setEvent(ChaincodeEvent.PersonUpdatedEvent, person);
  }

  /**
   * this can be changed by user
   * @param person 
   */
  @Invokable()
  public async updatePassword(
    @Param(Person)
    person: Person,
  ) {
    // Retrieve to see if exists
    let existing = await Person.getById(person.id);

    if (!existing || !existing.id) {
      throw new Error('No person exists with that ID');
    }

    // update fields
    existing.password = hashPassword(person.password);

    // save person
    await existing.save();
    // Emit the Event
    await this.tx.stub.setEvent(ChaincodeEvent.PersonUpdatePasswordEvent, person);
  }

  @Invokable()
  public async updateRoles(
    @Param(Person)
    person: Person,
  ) {
    // check if sender is government
    let gov: Participant = await Participant.getOne(c.GOV_UUID);
    await checkIfSenderIsGovernment(gov, this.sender);

    // Retrieve to see if exists
    let existing = await Person.getById(person.id);

    if (!existing || !existing.id) {
      throw new Error('No person exists with that ID');
    }

    // update fields
    existing.roles = person.roles;

    // save person
    await existing.save();
    // Emit the Event
    await this.tx.stub.setEvent(ChaincodeEvent.PersonUpdateRolesEvent, person);
  }

  /**
   * this can be changed by user
   * @param person 
   */
  @Invokable()
  public async updateProfile(
    @Param(Person)
    person: Person,
  ) {
    // Retrieve to see if exists
    let existing = await Person.getById(person.id);

    if (!existing || !existing.id) {
      throw new Error('No person exists with that ID');
    }

    // check unique fields
    await checkUniqueField('email', person.email, true, person.id);
    await checkUniqueField('mobilePhone', person.mobilePhone, true, person.id);

    // update fields
    existing.email = person.email;
    existing.mobilePhone = person.mobilePhone;
    existing.postal = person.postal;
    existing.city = person.city;
    existing.region = person.region;
    existing.geoLocation = person.geoLocation;
    existing.timezone = person.timezone;
    existing.personalInfo = person.personalInfo;
    existing.profile = person.profile;
    existing.metaData = person.metaData;

    // save person
    await existing.save();
    // Emit the Event
    await this.tx.stub.setEvent(ChaincodeEvent.PersonUpdateProfileEvent, person);
  }

  @Invokable()
  public async upsertCitizenCard(
    @Param(Person)
    person: Person,
  ) {
    // check if sender is government
    let gov: Participant = await Participant.getOne(c.GOV_UUID);
    await checkIfSenderIsGovernment(gov, this.sender);

    // Retrieve to see if exists
    let upsertPerson: Person;
    let getPerson: Person | Person[] = await Person.getByField('fiscalNumber', person.fiscalNumber);
    // insert person
    if (!getPerson || (getPerson && (getPerson as Person[]).length < 1)) {
      // TODO use newUuid() after removed from send from graphql
      // get id from sent graphql id
      // currentPersonId = person.id;
      upsertPerson = new Person(person.id);
      upsertPerson.username = person.username || person.fiscalNumber;
      upsertPerson.password = hashPassword(newPassword(10));
      upsertPerson.participant = gov;
      upsertPerson.identities = [{
        fingerprint: this.sender,
        status: true
      }];
      // add date in epoch unix time
      upsertPerson.registrationDate = new Date().getTime();
      upsertPerson.createdDate = new Date().getTime();
      // init objects
      upsertPerson.fundsBalance = new GenericBalance();
      upsertPerson.volunteeringHoursBalance = new GenericBalance();
      upsertPerson.goodsStock = new Array<Goods>()
    }
    // upadte person
    else {
      upsertPerson = getPerson[0];
      // prevent fiscalNumber from change, assing old value to model, in this case even if we change fiscalNumber in upsert it never changes, but even if we hack fiscalNumber it fails in other unique fields after
      upsertPerson.fiscalNumber = getPerson[0].fiscalNumber;
    }

    // check unique fields, always check for inserts and updates
    await checkUniqueField('fiscalNumber', person.documentNumber, true, upsertPerson.id);
    await checkUniqueField('documentNumber', person.documentNumber, true, upsertPerson.id);
    await checkUniqueField('identityNumber', person.identityNumber, true, upsertPerson.id);
    await checkUniqueField('socialSecurityNumber', person.socialSecurityNumber, true, upsertPerson.id);
    await checkUniqueField('beneficiaryNumber', person.beneficiaryNumber, true, upsertPerson.id);
    await checkUniqueField('pan', person.pan, true, upsertPerson.id);

    upsertPerson.fiscalNumber = person.fiscalNumber;
    upsertPerson.documentNumber = person.documentNumber;
    upsertPerson.identityNumber = person.identityNumber;
    upsertPerson.socialSecurityNumber = person.socialSecurityNumber;
    upsertPerson.beneficiaryNumber = person.beneficiaryNumber;
    upsertPerson.pan = person.pan;
    // non unique
    upsertPerson.firstname = person.firstname;
    upsertPerson.lastname = person.lastname;
    upsertPerson.gender = person.gender;
    upsertPerson.height = person.height;
    upsertPerson.fatherFirstname = person.fatherFirstname;
    upsertPerson.fatherLastname = person.fatherLastname;
    upsertPerson.motherFirstname = person.motherFirstname;
    upsertPerson.motherLastname = person.motherLastname;
    upsertPerson.birthDate = person.birthDate;
    upsertPerson.nationality = person.nationality;
    upsertPerson.country = person.country;
    upsertPerson.documentType = person.documentType;
    upsertPerson.cardVersion = person.cardVersion;
    upsertPerson.emissionDate = person.emissionDate;
    upsertPerson.expirationDate = person.expirationDate;
    upsertPerson.emittingEntity = person.emittingEntity;
    upsertPerson.requestLocation = person.requestLocation;
    upsertPerson.otherInformation = person.otherInformation;
    // clean non useful props, are required only receive id and entityType
    delete upsertPerson.loggedPersonId;

    // save person
    await upsertPerson.save();
    // Emit the Event
    await this.tx.stub.setEvent(ChaincodeEvent.PersonUpsertCitizenCardEvent, upsertPerson);
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

    // get active identity (status true)
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

    // save person
    await person.save();
    // Emit the Event
    await this.tx.stub.setEvent(ChaincodeEvent.PersonAddAttributeEvent, person);
  }

  // @Invokable()
  // public async get(
  //   @Param(yup.string())
  //   id: string
  // ) {
  //   const existing = await Person.getOne(id);
  //   if (!existing || !existing.id) {
  //     throw new Error(`No person exists with that ID ${id}`);
  //   }
  //   return existing;
  // }

  /**
   * get id: custom function to use `type` and `participant` in rich query
   * default convector get don't use `type` property and give problems, 
   * like we use ids of other models and it works 
   */
  @Invokable()
  public async get(
    @Param(yup.string())
    id: string,
  ): Promise<Person> {
    // get host participant from fingerprint
    // const participant: Participant = await getParticipantByIdentity(this.sender);
    const existing = await Person.query(Person, {
      selector: {
        type: c.CONVECTOR_MODEL_PATH_PERSON,
        id,
      }
    });
    // require to check if existing before try to access existing[0].id prop
    if (!existing || !existing[0] || !existing[0].id) {
      throw new Error(`No person exists with that id ${id}`);
    }
    return existing[0];
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
   * get person from username
   */
  @Invokable()
  public async getByUsername(
    @Param(yup.string())
    username: string,
  ): Promise<Person | Person[]> {
    // get host participant from fingerprint
    // const participant: Participant = await getParticipantByIdentity(this.sender);
    const existing = await Person.query(Person, {
      selector: {
        type: c.CONVECTOR_MODEL_PATH_PERSON,
        username,
      }
    });
    // require to check if existing before try to access existing[0].id prop
    if (!existing || !existing[0] || !existing[0].id) {
      throw new Error(`No person exists with that username ${username}`);
    }
    return existing;
  }

  /**
   * get person from fiscalNumber
   */
  @Invokable()
  public async getByFiscalnumber(
    @Param(yup.string())
    fiscalNumber: string,
  ): Promise<Person | Person[]> {
    // get host participant from fingerprint
    // const participant: Participant = await getParticipantByIdentity(this.sender);
    const existing = await Person.query(Person, {
      selector: {
        type: c.CONVECTOR_MODEL_PATH_PERSON,
        fiscalNumber,
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

  // wip: unstable, and only creates first entity
  // @Invokable()
  // public async instantiate() {
  //   debugger;
  //   let gov: Participant = await Participant.getOne(c.GOV_UUID);
  //   // mock data
  //   const mockData = [
  //     { id: c.JOHN_UUID, firstname: c.JOHN_FIRST_NAME, lastname: c.JOHN_LAST_NAME, username: c.JOHN_USER_NAME, password: c.DEFAULT_PASSWORD, fiscalNumber: c.JOHN_FISCAL_NUMBER },
  //     { id: c.JANE_UUID, firstname: c.JANE_FIRST_NAME, lastname: c.JANE_LAST_NAME, username: c.JANE_USER_NAME, password: c.DEFAULT_PASSWORD, fiscalNumber: c.JANE_FISCAL_NUMBER },
  //   ];
  //   await Promise.all(
  //     mockData.map(async (person: Person) => {
  //       let newPerson = new Person(person.id);
  //       newPerson.firstname = person.firstname;
  //       newPerson.lastname = person.lastname;
  //       newPerson.username = person.username;
  //       newPerson.fiscalNumber = person.fiscalNumber;
  //       newPerson.participant = gov;
  //       newPerson.identities = [{
  //         fingerprint: this.sender,
  //         status: true
  //       }];
  //       newPerson.password = hashPassword(person.password);
  //       newPerson.registrationDate = new Date().getTime();
  //       newPerson.createdDate = new Date().getTime();
  //       newPerson.fundsBalance = new GenericBalance();
  //       newPerson.volunteeringHoursBalance = new GenericBalance();
  //       newPerson.goodsStock = new Array<Goods>()
  //       // require await ele Error: PUT_STATE failed: transaction ID: ...: no ledger context
  //       await newPerson.save();
  //     })
  //   );
  // }
}
