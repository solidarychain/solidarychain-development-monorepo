import { appConstants as c } from '@solidary-network/common-cc';
import { BaseStorage, Controller, ConvectorController, FlatConvectorModel, Invokable, Param } from '@worldsibu/convector-core';
import { ClientIdentity } from 'fabric-shim';
import * as yup from 'yup';
import { Participant } from './participant.model';
import { checkDuplicatedField } from './utils';

@Controller('participant')
export class ParticipantController extends ConvectorController {
  get fullIdentity(): ClientIdentity {
    const stub = (BaseStorage.current as any).stubHelper;
    return new ClientIdentity(stub.getStub());
  };

  @Invokable()
  public async create(
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

    // TODO: remove this code
    // check duplicated id
    // const exists = await Participant.getOne(id);
    // if (!!exists && exists.id) {
    //   throw new Error(`There is a participant registered with that Id already (${id})`);
    // }
    await checkDuplicatedField('_id', id);
    await checkDuplicatedField('code', code);
    await checkDuplicatedField('name', name);

    // TODO same re use function to check if record exist ex assetType
    // TODO#001 { Error: transaction returned with failure: {"name":"Error","status":500,"message":"Cannot read property 'assetType' of undefined"}

    // // check duplicated code
    // const existsCode = await Participant.query(Participant, {
    //   selector: {
    //     type: c.CONVECTOR_MODEL_PATH_PARTICIPANT,
    //     code
    //   }
    // });
    // if ((existsCode as Participant[]).length > 0) {
    //   throw new Error(`There is a participant registered with that code already (${code})`);
    // }

    // add participant
    let participant = new Participant();
    participant.id = id;
    participant.code = code || id;
    participant.name = name || id;
    participant.msp = this.fullIdentity.getMSPID();
    // create a new identity
    participant.identities = [{
      fingerprint: this.sender,
      status: true
    }];
    // add date in epoch unix time
    participant.createdDate = new Date().getTime();

    // always add gov participant, if its is not the gov itself
    if (gov) {
      participant.participant = gov;
    }
    await participant.save();
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
    const existing = await Participant.getOne(id);
    if (!existing || !existing.id) {
      throw new Error('No identity exists with that ID');
    }

    if (existing.msp != requesterMSP) {
      throw new Error('Unauthorized. MSPs do not match');
    }

    // required chaincodeAdmin, theOne that have admin attribute attrs: [{ name: 'admin', value: 'true' }]
    if (!isAdmin) {
      throw new Error('Unauthorized. Requester identity is not an admin');
    }

    // Disable previous identities!
    existing.identities = existing.identities.map(identity => {
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