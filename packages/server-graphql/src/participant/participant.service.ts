import { Injectable, Logger } from '@nestjs/common';
import { Participant as ParticipantConvectorModel } from '@solidary-chain/participant-cc';
import { FlatConvectorModel } from '@worldsibu/convector-core-model';
import { GetByComplexQueryInput, PaginationArgs } from '../common/dto';
import { ParticipantControllerBackEnd } from '../convector';
import { NewParticipantInput, UpdateParticipantInput, ChangeParticipantIdentityData } from './dto';
import { Participant } from './models';
import { v4 as uuid } from 'uuid';
import { UserInfo } from '../common/types/user-info';

@Injectable()
export class ParticipantService {
  async create(data: NewParticipantInput): Promise<Participant> {
    try {
      // require to use or generate new id
      const newId: string =  (data.id) ? data.id : uuid();
      // use arguments
      // await ParticipantControllerBackEnd.create(newId, data.code, data.name);
      // TODO: use object not arguments
      // compose ConvectorModel from NewInput
      const participantToCreate: ParticipantConvectorModel = new ParticipantConvectorModel({
        ...data,
        // require to inject values
        id: newId,
      });
      await ParticipantControllerBackEnd.create(participantToCreate);
      return this.findOneById(newId);
    } catch (error) {
      throw error;
    }
  }

  async update(data: UpdateParticipantInput): Promise<Participant> {
    try {
      // compose ConvectorModel from UpdateInput
      const participantToUpdate: ParticipantConvectorModel = new ParticipantConvectorModel({
        ...data
      });
      await ParticipantControllerBackEnd.update(participantToUpdate);
      return this.findOneById(data.id);
    } catch (error) {
      throw error;
    }
  }

  async changeIdentity(data: ChangeParticipantIdentityData): Promise<Participant> {
    try {
      await ParticipantControllerBackEnd.changeIdentity(data.id, data.newIdentity);
      return this.findOneById(data.id);
    } catch (error) {
      throw error;
    }
  }

  async findAll(paginationArgs: PaginationArgs): Promise<Participant[]> {
    try {
      const convectorModel: Array<FlatConvectorModel<ParticipantConvectorModel[]>> = await ParticipantControllerBackEnd.getAll();
      // require to map fabric model to graphql Participant[]
      return (paginationArgs)
        ? convectorModel.splice(paginationArgs.skip, paginationArgs.take) as Participant[]
        : convectorModel as Participant[];
    } catch (error) {
      Logger.error(JSON.stringify(error));
      throw error;
    }
  }

  async findComplexQuery(getByComplexQueryInput: GetByComplexQueryInput, userInfo: UserInfo, paginationArgs: PaginationArgs): Promise<Participant | Participant[]> {
    // get fabric model with _props
    const fabricModel: Array<FlatConvectorModel<ParticipantConvectorModel>> = await ParticipantControllerBackEnd.getComplexQuery(getByComplexQueryInput, userInfo) as ParticipantConvectorModel[];
    // convert fabric model to convector model (remove _props)
    const convectorModel: ParticipantConvectorModel[] = fabricModel.map((e: ParticipantConvectorModel) => new ParticipantConvectorModel(e));
    // call common find method
    const model: Participant[] = await this.findBy(convectorModel, paginationArgs) as Participant[];
    // return model
    return model;
  }

  async findOneById(id: string): Promise<Participant> {
    // get fabric model with _props
    const fabricModel: ParticipantConvectorModel = await ParticipantControllerBackEnd.get(id);
    // convert fabric model to convector model (remove _props)
    const convectorModel: ParticipantConvectorModel = new ParticipantConvectorModel(fabricModel);
    // trick: must return convector model as a graphql model, to prevent property conversion problems
    const model: Participant = await this.findBy(convectorModel, null) as Participant;
    return model;
  }

  async findOneByCode(code: string): Promise<Participant> {
    // get fabric model with _props
    const fabricModel: ParticipantConvectorModel | ParticipantConvectorModel[] = await ParticipantControllerBackEnd.getByCode(code) as ParticipantConvectorModel;
    // convert fabric model to convector model (remove _props)
    const convectorModel: ParticipantConvectorModel = new ParticipantConvectorModel(fabricModel[0]);
    // trick: must return convector model as a graphql model, to prevent property conversion problems
    const model: Participant = await this.findBy(convectorModel, null) as Participant;
    return model;
  }

  /**
   * shared findBy method
   */
  async findBy(convectorModel: ParticipantConvectorModel | ParticipantConvectorModel[], participantArgs: PaginationArgs): Promise<Participant | Participant[]> {
    try {
      // working in array mode
      if (Array.isArray(convectorModel)) {
        // require to map fabric model to graphql Participant[]
        return (participantArgs)
          ? convectorModel.splice(participantArgs.skip, participantArgs.take) as unknown as Participant[]
          : convectorModel as unknown as Participant[];
      } else {
        // only convert attributes if have attributes array
        // require to map fabric model to graphql Participant[]
        return convectorModel as unknown as Participant;
      }
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

}
