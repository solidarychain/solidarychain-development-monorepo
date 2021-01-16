import { appConstants as c, checkValidModelIds, GenericBalance, Goods, x509Identities, ChaincodeEvent, getAmbassadorUserFilter, CurrentUser } from '@solidary-chain/common-cc';
import { BaseStorage, Controller, ConvectorController, FlatConvectorModel, Invokable, Param } from '@worldsibu/convector-core';
import { ClientIdentity } from 'fabric-shim';
import * as yup from 'yup';
import { Participant } from './participant.model';
import { checkUniqueField } from './utils';

@Controller('participant')
export class ParticipantController extends ConvectorController {
  get fullIdentity(): ClientIdentity {
    const stub = (BaseStorage.current as any).stubHelper;
    return new ClientIdentity(stub.getStub());
  };

  // used to create first participant
  @Invokable()
  public async createWithParameters(
    @Param(yup.string())
    id: string,
    @Param(yup.string())
    code: string,
    @Param(yup.string())
    name: string,
    @Param(yup.string().matches(c.REGEX_EMAIL, c.YUP_MESSAGE_INVALID_EMAIL))
    email: string,
    @Param(yup.string())
    fiscalNumber: string,
  ) {
    // get participant if not gov, in case of gov it won't exists yet and will be without participant
    let gov: Participant;
    if (id !== c.GOV_UUID) {
      // deprecated now always use gov to create participants
      // participant = await getParticipantByIdentity(this.sender);
      gov = await Participant.getOne(c.GOV_UUID);
      if (!!gov && !gov.id) {
        // throw new Error('There is no participant with that identity');
        throw new Error('There is no gov participant');
      }
    }

    // check unique fields
    await checkUniqueField('_id', id, true);
    await checkUniqueField('code', code, true);
    await checkUniqueField('name', name, true);
    await checkUniqueField('email', email, true);
    await checkUniqueField('fiscalNumber', fiscalNumber, true);

    // add participant
    let newParticipant = new Participant();
    newParticipant.id = id;
    newParticipant.code = code || id;
    newParticipant.name = name || id;
    newParticipant.email = email;
    newParticipant.fiscalNumber = fiscalNumber;
    newParticipant.msp = this.fullIdentity.getMSPID();
    // create a new identity
    newParticipant.identities = [{
      fingerprint: this.sender,
      status: true
    }];
    // add date in epoch unix time
    newParticipant.createdDate = new Date().getTime();

    // init objects
    newParticipant.fundsBalance = new GenericBalance();
    newParticipant.volunteeringHoursBalance = new GenericBalance();
    newParticipant.goodsStock = new Array<Goods>()

    // always add gov participant, if its is not the gov itself, gov don't have participant
    if (gov) {
      newParticipant.participant = gov;
    }

    // save participant
    await newParticipant.save();
    // Emit the Event
    await this.tx.stub.setEvent(ChaincodeEvent.ParticipantCreatedEvent, newParticipant);
  }

  @Invokable()
  public async create(
    // TODO: when use this, even if it not used we get the infamous { Error: transaction returned with failure: {"name":"Error","status":500,"message":"Cant find a participant with that fingerprint"}
    // warning the error only occurs if we invoke person_create with `-u admin` ex `npx hurl invoke ${CHAINCODE_NAME} person_create "${PAYLOAD}" -u admin`
    // if we invoke without it, it works, for now don't use `-u admin` user in invoke
    @Param(Participant)
    participant: Participant,
    @Param(yup.object())
    user: CurrentUser
  ) {
    // get participant if not gov, in case of gov it won't exists yet and will be without participant
    let gov: Participant;
    if (participant.id !== c.GOV_UUID) {
      // deprecated now always use gov to create participants
      // participant = await getParticipantByIdentity(this.sender);
      gov = await Participant.getOne(c.GOV_UUID);
      if (!!gov && !gov.id) {
        // throw new Error('There is no participant with that identity');
        throw new Error('There is no gov participant');
      }
    }

    // check if all ambassadors are valid persons, and update model.ambassadors with uuid's
    participant.ambassadors = await checkValidModelIds(c.CONVECTOR_MODEL_PATH_PERSON, c.CONVECTOR_MODEL_PATH_PERSON_NAME, participant.ambassadors, user);

    // check unique fields
    await checkUniqueField('_id', participant.id, true);
    await checkUniqueField('code', participant.code, true);
    await checkUniqueField('name', participant.name, true);
    await checkUniqueField('email', participant.email, true);
    await checkUniqueField('fiscalNumber', participant.fiscalNumber, true);

    // add participant
    participant.msp = this.fullIdentity.getMSPID();
    // create a new identity
    participant.identities = [{
      fingerprint: this.sender,
      status: true
    }];
    // assign createdByPersonId before delete loggedPersonId
    participant.createdByPersonId = user.userId;
    // add date in epoch unix time
    participant.createdDate = new Date().getTime();

    // init objects
    participant.fundsBalance = new GenericBalance();
    participant.volunteeringHoursBalance = new GenericBalance();
    participant.goodsStock = new Array<Goods>()

    // always add gov participant, if its is not the gov itself, gov don't have participant
    if (gov) {
      participant.participant = gov;
    }

    // save participant
    await participant.save();
    // Emit the Event
    await this.tx.stub.setEvent(ChaincodeEvent.ParticipantCreatedEvent, participant);
  }

  @Invokable()
  public async update(
    @Param(Participant)
    participant: Participant,
    @Param(yup.object())
    user: CurrentUser
  ) {
    // Check permissions
    let isAdmin = this.fullIdentity.getAttributeValue('admin');
    let requesterMSP = this.fullIdentity.getMSPID();

    // Retrieve to see if exists
    let existing = await Participant.getById(participant.id, user);

    if (!existing || !existing.id) {
      throw new Error('No participant exists with that id');
    }

    if (existing.msp != requesterMSP) {
      throw new Error('Unauthorized. MSPs do not match');
    }

    if (!isAdmin) {
      throw new Error('Unauthorized. Requester identity is not an admin');
    }

    // check if all ambassadors are valid persons, and update model.ambassadors with uuid's
    participant.ambassadors = await checkValidModelIds(c.CONVECTOR_MODEL_PATH_PERSON, c.CONVECTOR_MODEL_PATH_PERSON_NAME, participant.ambassadors, user);

    // update fields
    existing.email = participant.email;
    existing.ambassadors = participant.ambassadors;
    existing.metaData = participant.metaData;
    existing.metaDataInternal = participant.metaDataInternal;

    // save participant
    await existing.save();
    // Emit the Event
    await this.tx.stub.setEvent(ChaincodeEvent.ParticipantUpdatedEvent, participant);
  }

  // TODO: this works when we know how to create a new identity fingerprint
  @Invokable()
  public async changeIdentity(
    @Param(yup.string())
    id: string,
    @Param(yup.string())
    newIdentity: string,
    @Param(yup.object())
    user: CurrentUser
  ) {
    // Check permissions
    let isAdmin = this.fullIdentity.getAttributeValue('admin');
    let requesterMSP = this.fullIdentity.getMSPID();

    // Retrieve to see if exists
    const existing = await Participant.getById(id, user);
    // TODO: remove after confirm that above line works
    // const existing = await Participant.getOne(id);

    if (!existing || !existing.id) {
      throw new Error('No participant exists with that id');
    }

    if (existing.msp != requesterMSP) {
      throw new Error('Unauthorized. MSPs do not match');
    }

    // required chaincodeAdmin, theOne that have admin attribute attrs: [{ name: 'admin', value: 'true' }]
    // must be registered with registerIdentitiesManager.js
    if (!isAdmin) {
      throw new Error('Unauthorized. Requester identity is not an admin');
    }

    // Disable previous identities!
    existing.identities = existing.identities.map((identity: FlatConvectorModel<x509Identities>) => {
      identity.status = false;
      return identity;
    });

    // Set the enrolling identity 
    existing.identities.push({
      fingerprint: newIdentity,
      status: true
    });

    // save participant
    await existing.save();
    // Emit the Event
    await this.tx.stub.setEvent(ChaincodeEvent.ParticipantChangeIdentityEvent, existing);
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
  ): Promise<Participant> {
    return await Participant.getById(id, user);
  }

  @Invokable()
  public async getAll(
    @Param(yup.object())
    user: CurrentUser
  ): Promise<Participant | Participant[]> {
    return await Participant.getByFilter({}, user);
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
  ): Promise<Participant | Participant[]> {
    return await Participant.getByFilter(queryParams, user);
  }

  /**
   * get participant from code
   */
  @Invokable()
  public async getByCode(
    @Param(yup.string())
    code: string,
    @Param(yup.object())
    user: CurrentUser
  ): Promise<Participant | Participant[]> {
    const queryParams = {
      filter: {
        code
      }
    };
    return await Participant.getByFilter(queryParams, user);
  }

  // wip: unstable, and only creates first entity and have the problem 'Just the government (participant with id gov) can create people'
  // @Invokable()
  // public async instantiate() {
  //   // mock data
  //   const mockData = [
  //     { id: c.GOV_UUID, code: c.GOV_CODE, name: c.GOV_NAME },
  //     { id: c.NAB_UUID, code: c.NAB_CODE, name: c.NAB_NAME },
  //   ];
  //   await Promise.all(
  //     mockData.map(async (participant: Participant) => {
  //       let newParticipant = new Participant(participant.id);
  //       newParticipant.code = participant.code;
  //       newParticipant.name = participant.name;
  //       newParticipant.msp = this.fullIdentity.getMSPID();
  //       newParticipant.identities = [{
  //         fingerprint: this.sender,
  //         status: true
  //       }];
  //       newParticipant.createdDate = new Date().getTime();
  //       newParticipant.fundsBalance = new GenericBalance();
  //       newParticipant.volunteeringHoursBalance = new GenericBalance();
  //       newParticipant.goodsStock = new Array<Goods>()
  //       // require await ele Error: PUT_STATE failed: transaction ID: ...: no ledger context
  //       await newParticipant.save();
  //     })
  //   );
  // }  
}