import { appConstants as c, x509Identities, checkValidModelIds, GenericBalance, Goods } from '@solidary-network/common-cc';
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

  @Invokable()
  public async create(
    // TODO: when use this, even if it not used we get the infamous { Error: transaction returned with failure: {"name":"Error","status":500,"message":"Cant find a participant with that fingerprint"}
    // warning the error only occurs if we invoke person_create with `-u admin` ex `npx hurl invoke ${CHAINCODE_NAME} person_create "${PAYLOAD}" -u admin`
    // if we invoke without it, it works, for now don't use `-u admin` user in invoke
    @Param(Participant)
    participant: Participant,
  ) {
    // get participant if not gov, in case of gov it won't exists yet and will be without participant
    let gov: Participant;
    if (participant.id !== c.UUID_GOV_ID) {
      // deprecated now always use gov to create participants
      // participant = await getParticipantByIdentity(this.sender);
      gov = await Participant.getOne(c.UUID_GOV_ID);
      if (!!gov && !gov.id) {
        // throw new Error('There is no participant with that identity');
        throw new Error('There is no gov participant');
      }
    }

    // check if all ambassadors are valid persons
    await checkValidModelIds(c.CONVECTOR_MODEL_PATH_PERSON, c.CONVECTOR_MODEL_PATH_PERSON_NAME, participant.ambassadors);

    // check unique fields
    await checkUniqueField('_id', participant.id, true);
    await checkUniqueField('code', participant.code, true);
    await checkUniqueField('name', participant.name, true);

    // add participant
    participant.msp = this.fullIdentity.getMSPID();
    // create a new identity
    participant.identities = [{
      fingerprint: this.sender,
      status: true
    }];
    // assign createdByPersonId before delete loggedPersonId
    participant.createdByPersonId = participant.loggedPersonId;
    // add date in epoch unix time
    participant.createdDate = new Date().getTime();

    // init objects
    participant.fundsBalance = new GenericBalance();
    participant.volunteeringHoursBalance = new GenericBalance();
    participant.goodsStock = new Array<Goods>()

    // clean non useful props, are required only receive id and entityType
    delete participant.loggedPersonId;

    // always add gov participant, if its is not the gov itself, gov don't have participant
    if (gov) {
      participant.participant = gov;
    }
    await participant.save();
  }

  // TODO: remove this old method, fails if we invoke it with `-u admin`, deprectaded in favour of above method with @Param(Participant)
  @Invokable()
  public async createWithParameters(
    @Param(yup.string())
    id: string,
    @Param(yup.string())
    code: string,
    @Param(yup.string())
    name: string,
  ) {
    // get participant if not gov, in case of gov it won't exists yet and will be without participant
    let gov: Participant;
    if (id !== c.UUID_GOV_ID) {
      // deprecated now always use gov to create participants
      // participant = await getParticipantByIdentity(this.sender);
      gov = await Participant.getOne(c.UUID_GOV_ID);
      if (!!gov && !gov.id) {
        // throw new Error('There is no participant with that identity');
        throw new Error('There is no go participant');
      }
    }

    // check unique fields
    await checkUniqueField('_id', id, true);
    await checkUniqueField('code', code, true);
    await checkUniqueField('name', name, true);

    // add participant
    let newParticipant = new Participant();
    newParticipant.id = id;
    newParticipant.code = code || id;
    newParticipant.name = name || id;
    newParticipant.msp = this.fullIdentity.getMSPID();
    // create a new identity
    newParticipant.identities = [{
      fingerprint: this.sender,
      status: true
    }];
    // add date in epoch unix time
    newParticipant.createdDate = new Date().getTime();

    // always add gov participant, if its is not the gov itself, gov don't have participant
    if (gov) {
      newParticipant.participant = gov;
    }
    await newParticipant.save();
  }

  @Invokable()
  public async changeIdentity(
    @Param(yup.string())
    id: string,
    @Param(yup.string())
    newIdentity: string
  ) {
    // Check permissions
    let isAdmin = this.fullIdentity.getAttributeValue('admin');
    let requesterMSP = this.fullIdentity.getMSPID();

    // Retrieve to see if exists
    const existing = await Participant.getById(id);
    // TODO: remove after confirm that above line works
    // const existing = await Participant.getOne(id);
    
    if (!existing || !existing.id) {
      throw new Error('No identity exists with that ID');
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

    await existing.save();
  }

  // @Invokable()
  // public async get(
  //   @Param(yup.string())
  //   id: string
  // ) {
  //   const existing = await Participant.getOne(id);
  //   if (!existing || !existing.id) {
  //     throw new Error(`No identity exists with that ID ${id}`);
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
  ): Promise<Participant> {
    const existing = await Participant.query(Participant, {
      selector: {
        type: c.CONVECTOR_MODEL_PATH_PARTICIPANT,
        id,
        // all participants belong to gov participant, without filter participant we get all, inclusive the gov
        // participant: {
        //   id: participant.id
        // }
      }
    });

    // require to check if existing before try to access existing[0].id prop
    if (!existing || !existing[0] || !existing[0].id) {
      throw new Error(`No participant exists with that id ${id}`);
    }
    return existing[0];
  }

  @Invokable()
  public async getAll(): Promise<FlatConvectorModel<Participant>[]> {
    return (await Participant.getAll(c.CONVECTOR_MODEL_PATH_PARTICIPANT)).map(participant => participant.toJSON() as any);
  }

  /**
   * get participant from code
   */
  @Invokable()
  public async getByCode(
    @Param(yup.string())
    code: string,
  ): Promise<Participant | Participant[]> {
    const existing = await Participant.query(Participant, {
      selector: {
        type: c.CONVECTOR_MODEL_PATH_PARTICIPANT,
        code,
        // all participants belong to gov participant, without filter participant we get all, inclusive the gov
        // participant: {
        //   id: participant.id
        // }
      }
    });
    // require to check if existing before try to access existing[0].id prop
    if (!existing || !existing[0] || !existing[0].id) {
      throw new Error(`No participant exists with that code ${code}`);
    }
    return existing;
  }

  /**
   * get participants with complex query filter
   */
  @Invokable()
  public async getComplexQuery(
    @Param(yup.object())
    complexQueryInput: any,
  ): Promise<Participant | Participant[]> {
    if (!complexQueryInput || !complexQueryInput.filter) {
      throw new Error(c.EXCEPTION_ERROR_NO_COMPLEX_QUERY);
    }
    const complexQuery: any = {
      selector: {
        type: c.CONVECTOR_MODEL_PATH_PARTICIPANT,
        // spread arbitrary query filter
        ...complexQueryInput.filter
      },
      // not useful
      // fields: (complexQueryInput.fields) ? complexQueryInput.fields : undefined,
      sort: (complexQueryInput.sort) ? complexQueryInput.sort : undefined,
    };
    const resultSet: Participant | Participant[] = await Participant.query(Participant, complexQuery);
    return resultSet;
  }

}