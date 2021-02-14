import { appConstants as c, ChaincodeEvent, CurrentUser, GenericBalance, Goods, newPassword, newUuid } from '@solidary-chain/common-cc';
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
    person: Person,
    @Param(yup.object())
    user: CurrentUser,
  ) {
    // check if sender is government
    let gov: Participant = await Participant.getOne(c.GOV_UUID);
    await checkIfSenderIsGovernment(gov, this.sender);

    // check unique fields
    await checkUniqueField('_id', person.id, true);
    await checkUniqueField('username', person.username, true);
    await checkUniqueField('fiscalNumber', person.fiscalNumber, true);
    await checkUniqueField('mobilePhone', person.mobilePhone, false);
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

    // save person
    await person.save();
    // Emit the ContractEvent - passing the whole Commodity Object as the Payload.
    await this.tx.stub.setEvent(ChaincodeEvent.PersonCreatedEvent, person);
  }

  @Invokable()
  public async update(
    @Param(Person)
    person: Person,
    @Param(yup.object())
    user: CurrentUser
  ) {
    // check if sender is government
    let gov: Participant = await Participant.getOne(c.GOV_UUID);
    await checkIfSenderIsGovernment(gov, this.sender);

    // Retrieve to see if exists
    let existing = await Person.getById(person.id, user);

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
    @Param(yup.object())
    user: CurrentUser
  ) {
    // Retrieve to see if exists
    let existing = await Person.getById(person.id, user);

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
    @Param(yup.object())
    user: CurrentUser
  ) {
    // check if sender is government
    let gov: Participant = await Participant.getOne(c.GOV_UUID);
    await checkIfSenderIsGovernment(gov, this.sender);

    // Retrieve to see if exists
    let existing = await Person.getById(person.id, user);

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
    @Param(yup.object())
    user: CurrentUser
  ) {
    // Retrieve to see if exists
    let existing = await Person.getById(person.id, user);

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

  /**
   * this must be only used with citizenCard reader only, 
   * else we can use fiscalNumber to mess with other data, ex send a fiscalNumber and send non user data to it
   * it will use fiscalNumber to find user ALWAYS
   * @param person 
   * @param user 
   */
  @Invokable()
  public async upsertCitizenCard(
    @Param(Person)
    person: Person,
    @Param(yup.object())
    user: CurrentUser
  ) {
    debugger;
    // check if sender is government
    let gov: Participant = await Participant.getOne(c.GOV_UUID);
    await checkIfSenderIsGovernment(gov, this.sender);

    // check if is valid citizenCard data unique fields, else it fails
    if (!person.documentNumber || !person.identityNumber || !person.socialSecurityNumber || !person.beneficiaryNumber || !person.pan) {
      throw new Error('Invalid citizen card data!');
    }

    // Retrieve to see if exists
    let upsertPerson: Person;
    let getPerson: Person | Person[];
    // catch and ignore if fails, with this we can use empty object to register a news person
    try {
      getPerson = await Person.getByField('fiscalNumber', person.fiscalNumber, user);
    } catch (error) { }
    // insert person
    if (!getPerson || (getPerson && (getPerson as Person[]).length < 1)) {
      upsertPerson = new Person(newUuid());
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
    // update person, must get old person and override fields that come in update
    else {
      upsertPerson = getPerson[0];
      // prevent fiscalNumber from change, assign old value to model, in this case even if we change fiscalNumber in upsert it never changes, but even if we hack fiscalNumber it fails in other unique fields after
      upsertPerson.fiscalNumber = getPerson[0].fiscalNumber;
    }

    // check unique fields, always check for inserts and updates
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
    upsertPerson.firstName = person.firstName;
    upsertPerson.lastName = person.lastName;
    upsertPerson.gender = person.gender;
    upsertPerson.height = person.height;
    upsertPerson.fatherFirstName = person.fatherFirstName;
    upsertPerson.fatherLastName = person.fatherLastName;
    upsertPerson.motherFirstName = person.motherFirstName;
    upsertPerson.motherLastName = person.motherLastName;
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
    attribute: PersonAttribute,
    @Param(yup.object())
    user: CurrentUser
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

  /**
   * get id: custom function to use `type` and `participant` in rich query
   * default convector get don't use `type` property and give problems, 
   * like we use ids of other models and it works 
   */
  @Invokable()
  public async get(
    @Param(yup.string())
    id: string,
    @Param(yup.object())
    user: CurrentUser
  ): Promise<Person> {
    return await Person.getById(id, user);
  }

  @Invokable()
  public async getAll(
    @Param(yup.object())
    user: CurrentUser
  ): Promise<Person | Person[]> {
    return await Person.getByFilter({}, user);
  }

  /**
   * get model with complex query filter
   */
  @Invokable()
  public async getComplexQuery(
    @Param(yup.object())
    queryParams: any,
    @Param(yup.object())
    user: CurrentUser
  ): Promise<Person | Person[]> {
    return await Person.getByFilter(queryParams, user);
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
    value: any,
    @Param(yup.object())
    user: CurrentUser
  ): Promise<Person | Person[]> {
    const queryParams = {
      filter: {
        attributes: {
          $elemMatch: {
            id: id,
            content: value
          }
        }
      }
    };
    return await Person.getByFilter(queryParams, user);
  }

  /**
   * get person from username
   */
  @Invokable()
  public async getByUsername(
    @Param(yup.string())
    username: string,
    @Param(yup.object())
    user: CurrentUser
  ): Promise<Person | Person[]> {
    const queryParams = {
      filter: {
        username
      }
    };
    return await Person.getByFilter(queryParams, user);
  }

  /**
   * get person from fiscalNumber
   */
  @Invokable()
  public async getByFiscalnumber(
    @Param(yup.string())
    fiscalNumber: string,
    @Param(yup.object())
    user: CurrentUser
  ): Promise<Person | Person[]> {
    const queryParams = {
      filter: {
        fiscalNumber
      }
    };
    return await Person.getByFilter(queryParams, user);
  }

  // wip: unstable, and only creates first entity
  // @Invokable()
  // public async instantiate() {
  //   debugger;
  //   let gov: Participant = await Participant.getOne(c.GOV_UUID);
  //   // mock data
  //   const mockData = [
  //     { id: c.JOHN_UUID, firstName: c.JOHN_FIRST_NAME, lastName: c.JOHN_LAST_NAME, username: c.JOHN_USER_NAME, password: c.DEFAULT_PASSWORD, fiscalNumber: c.JOHN_FISCAL_NUMBER },
  //     { id: c.JANE_UUID, firstName: c.JANE_FIRST_NAME, lastName: c.JANE_LAST_NAME, username: c.JANE_USER_NAME, password: c.DEFAULT_PASSWORD, fiscalNumber: c.JANE_FISCAL_NUMBER },
  //   ];
  //   await Promise.all(
  //     mockData.map(async (person: Person) => {
  //       let newPerson = new Person(person.id);
  //       newPerson.firstName = person.firstName;
  //       newPerson.lastName = person.lastName;
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
