import { appConstants as c } from '@solidary-network/common-cc';
import { Controller, ConvectorController, Invokable, Param, FlatConvectorModel } from '@worldsibu/convector-core';
import { ChaincodeTx } from '@worldsibu/convector-platform-fabric';
import * as yup from 'yup';
import { Cause } from './cause.model';
import { getEntity } from './utils';
import { Participant, getParticipantByIdentity } from '@solidary-network/participant-cc';

@Controller('cause')
export class CauseController extends ConvectorController<ChaincodeTx> {
  @Invokable()
  public async create(
    @Param(Cause)
    cause: Cause
  ) {
    // get host participant from fingerprint
    const participant: Participant = await getParticipantByIdentity(this.sender);
    if (!!participant && !participant.id) {
      throw new Error('There is no participant with that identity');
    }

    // check duplicated id
    const exists = await Cause.getOne(cause.id);
    if (!!exists && exists.id) {
      throw new Error(`There is a cause with that Id already (${cause.id})`);
    }

    // check duplicated name
    const existsName = await Cause.query(Cause, {
      selector: {
        type: c.CONVECTOR_MODEL_PATH_CAUSE,
        name: cause.name,
        participant: {
          id: participant.id
        }
      }
    });
    if ((existsName as Cause[]).length > 0) {
      throw new Error(`There is a cause registered with that name already (${cause.name})`);
    }

    // add participant
    cause.participant = participant;
    // create a new identity
    cause.identities = [{
      // requesting organization is this.sender
      fingerprint: this.sender,
      status: true
    }];
    // assign input
    cause.input.entity = await getEntity(cause.input.type, cause.input.id);
    // clean non useful props, are required only receive id and entityType
    delete cause.input.id;
    delete cause.input.type;

    // add date in epoch unix time
    cause.createdDate = new Date().getTime();

    await cause.save();
  }

  // @Invokable()
  // public async get(
  //   @Param(yup.string())
  //   id: string
  // ) {
  //   const existing = await Cause.getOne(id);
  //   if (!existing || !existing.id) {
  //     throw new Error(`No cause exists with that ID ${id}`);
  //   }
  //   return existing;
  // }

  /**
   * get id: custom function to use `type` and `participant` in rich query
   * default convector get don't use of this properties and give problems, 
   * like we use ids of other models and it works 
   */
  @Invokable()
  public async get(
    @Param(yup.string())
    id: string,
  ): Promise<Cause> {
    // get host participant from fingerprint
    const participant: Participant = await getParticipantByIdentity(this.sender);
    const existing = await Cause.query(Cause, {
      selector: {
        type: c.CONVECTOR_MODEL_PATH_CAUSE,
        id,
        participant: {
          id: participant.id
        }
      }
    });
    // require to check if existing before try to access existing[0].id prop
    if (!existing || !existing[0] || !existing[0].id) {
      throw new Error(`No cause exists with that id ${id}`);
    }
    return existing[0];
  }

  @Invokable()
  public async getAll(): Promise<FlatConvectorModel<Cause>[]> {
    return (await Cause.getAll(c.CONVECTOR_MODEL_PATH_CAUSE)).map(cause => cause.toJSON() as any);
  }

  /**
   * get ongoing causes, date between startDate < date && endDate > date
   */
  @Invokable()
  public async getOngoing(
    @Param(yup.number())
    date: number,
  ): Promise<Cause | Cause[]> {
    return await Cause.query(Cause, {
      selector: {
        type: c.CONVECTOR_MODEL_PATH_CAUSE,
        startDate: {
          $lte: date
        },
        endDate: {
          $gte: date
        }
      }
    });
  }

  /**
   * get causes with complex query filter
   */
  @Invokable()
  public async getComplexQuery(
    @Param(yup.object())
    complexQueryInput: any,
  ): Promise<Cause | Cause[]> {
    if (!complexQueryInput || !complexQueryInput.filter) {
      throw new Error(c.EXCEPTION_ERROR_NO_COMPLEX_QUERY);
    }
    const complexQuery: any = {
      selector: {
        type: c.CONVECTOR_MODEL_PATH_CAUSE,
        // spread arbitrary query filter
        ...complexQueryInput.filter
      },
      // not useful
      // fields: (complexQueryInput.fields) ? complexQueryInput.fields : undefined,
      sort: (complexQueryInput.sort) ? complexQueryInput.sort : undefined,
    };
    const resultSet: Cause | Cause[] = await Cause.query(Cause, complexQuery);
    return resultSet;
  }

}
