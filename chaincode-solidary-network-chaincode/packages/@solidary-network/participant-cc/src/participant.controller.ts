import { appConstants as c } from '@solidary-network/common';
import { BaseStorage, Controller, ConvectorController, FlatConvectorModel, Invokable, Param } from '@worldsibu/convector-core';
import { ClientIdentity } from 'fabric-shim';
import * as yup from 'yup';
import { Participant } from './participant.model';
import { getParticipantByIdentity } from './utils';

@Controller('participant')
export class ParticipantController extends ConvectorController {
  get fullIdentity(): ClientIdentity {
    const stub = (BaseStorage.current as any).stubHelper;
    return new ClientIdentity(stub.getStub());
  };

  @Invokable()
  public async register(
    @Param(yup.string())
    id: string,
    @Param(yup.string())
    name: string,
  ) {
    // get host participant from fingerprint, only if not gov, in this case it don't have been registered and fail to get it
    let participant: Participant;
    if (id !== 'gov') {
      participant = await getParticipantByIdentity(this.sender);
      if (!!participant && !participant.id) {
        throw new Error('There is no participant with that identity');
      }
    }

    // Retrieve to see if exists
    const existing = await Participant.getOne(id);

    if (!existing || !existing.id) {
      let newParticipant = new Participant();
      newParticipant.id = id;
      newParticipant.name = name || id;
      newParticipant.msp = this.fullIdentity.getMSPID();
      // add participant, if exists
      if (participant) newParticipant.participant = participant;
      // create a new identity
      newParticipant.identities = [{
        fingerprint: this.sender,
        status: true
      }];
      // add date in epoch unix time
      newParticipant.created = new Date().getTime();

      await newParticipant.save();
    } else {
      throw new Error('Identity exists already, please call changeIdentity fn for updates');
    }
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

  @Invokable()
  public async get(
    @Param(yup.string())
    id: string
  ) {
    const existing = await Participant.getOne(id);
    if (!existing || !existing.id) {
      throw new Error(`No identity exists with that ID ${id}`);
    }
    return existing;
  }

  @Invokable()
  public async getAll(): Promise<FlatConvectorModel<Participant>[]> {
    return (await Participant.getAll(c.CONVECTOR_MODEL_PATH_PARTICIPANT)).map(participant => participant.toJSON() as any);
  }
}