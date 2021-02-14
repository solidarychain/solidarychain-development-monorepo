import { appConstants as c, checkValidModelIds, GenericBalance, Goods, ChaincodeEvent, randomString, getAmbassadorUserFilter, CurrentUser } from '@solidary-chain/common-cc';
import { getParticipantByIdentity, Participant } from '@solidary-chain/participant-cc';
import { Controller, ConvectorController, FlatConvectorModel, Invokable, Param } from '@worldsibu/convector-core';
import { ChaincodeTx } from '@worldsibu/convector-platform-fabric';
import * as yup from 'yup';
import { Cause } from './cause.model';
import { checkUniqueField, getEntity } from './utils';

@Controller('cause')
export class CauseController extends ConvectorController<ChaincodeTx> {
  @Invokable()
  public async create(
    @Param(Cause)
    cause: Cause,
    @Param(yup.object())
    user: CurrentUser
  ) {
    // get host participant from fingerprint
    const participant: Participant = await getParticipantByIdentity(this.sender);
    if (!!participant && !participant.id) {
      throw new Error('There is no participant with that identity');
    }

    // check if all ambassadors are valid persons, and update model.ambassadors with uuid's
    cause.ambassadors = await checkValidModelIds(c.CONVECTOR_MODEL_PATH_PERSON, c.CONVECTOR_MODEL_PATH_PERSON_NAME, cause.ambassadors, user);

    // get postfix name this way we can have multiple causes with same name
    const postfixCode: string = randomString(10);
    // modify cause.name, used in save to
    cause.name = `${cause.name} [${postfixCode}]`;

    // check unique fields
    await checkUniqueField('_id', cause.id, true);
    await checkUniqueField('name', cause.name, true);

    // add participant
    cause.participant = participant;
    // create a new identity
    cause.identities = [{
      // requesting organization is this.sender
      fingerprint: this.sender,
      status: true
    }];
    // assign input: require to use admin to have access to all entities, this way we can get owner
    cause.input.entity = await getEntity(cause.input.type, cause.input.id, c.CURRENT_USER_ADMIN_ROLE);
    // check if is a valid input from entity
    if (!cause.input.entity) {
      const entityType: string = cause.input.type.replace(`${c.CONVECTOR_MODEL_PATH_PREFIX}.`, '');
      throw new Error(`There is no entity of type '${entityType}' with Id '${cause.input.id}'`);
    }
    // assign createdByPersonId from userId
    cause.createdByPersonId = user.userId;
    // add date in epoch unix time
    cause.createdDate = new Date().getTime();

    // init objects
    cause.fundsBalance = new GenericBalance();
    cause.volunteeringHoursBalance = new GenericBalance();
    cause.goodsStock = new Array<Goods>()

    // clean non useful props, are required only receive id and entityType
    delete cause.input.id;
    delete cause.input.type;

    // save cause
    await cause.save();
    // Emit the Event
    await this.tx.stub.setEvent(ChaincodeEvent.CauseCreatedEvent, cause);
  }

  @Invokable()
  public async update(
    @Param(Cause)
    cause: Cause,
    @Param(yup.object())
    user: CurrentUser
  ) {
    // Retrieve to see if exists
    let existing = await Cause.getById(cause.id, user);

    // check if all ambassadors are valid persons, and update model.ambassadors with uuid's
    cause.ambassadors = await checkValidModelIds(c.CONVECTOR_MODEL_PATH_PERSON, c.CONVECTOR_MODEL_PATH_PERSON_NAME, cause.ambassadors, user);

    // update fields
    existing.email = cause.email;
    existing.ambassadors = cause.ambassadors;
    existing.tags = cause.tags;
    existing.metaData = cause.metaData;
    existing.metaDataInternal = cause.metaDataInternal;

    // save cause
    await existing.save();
    // Emit the Event
    await this.tx.stub.setEvent(ChaincodeEvent.CauseUpdatedEvent, cause);
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
  ): Promise<Cause> {
    return await Cause.getById(id, user);
  }

  @Invokable()
  public async getAll(
    @Param(yup.object())
    user: CurrentUser
  ): Promise<Cause | Cause[]> {
    return await Cause.getByFilter({}, user);
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
  ): Promise<Cause | Cause[]> {
    return await Cause.getByFilter(queryParams, user);
  }

  /**
   * get ongoing causes, date between startDate < date && endDate > date
   */
  @Invokable()
  public async getOngoing(
    @Param(yup.number())
    date: number,
    @Param(yup.object())
    user: CurrentUser
  ): Promise<Cause | Cause[]> {
    const queryParams = {
      filter: {
        startDate: {
          $lte: date
        },
        endDate: {
          $gte: date
        }
      }
    };
    return await Cause.getByFilter(queryParams, user);
  }
}
