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
    // get participant is if not gov, else gov will be assign after create
    let participant: Participant;
    if (id !== 'gov') {
      // deprecated now always use gov to create participants
      // participant = await getParticipantByIdentity(this.sender);
      participant = await Participant.getOne('gov');
      if (!!participant && !participant.id) {
        // throw new Error('There is no participant with that identity');
        throw new Error('There is no participant with that id');
      }
    }

    // Retrieve to see if exists
    const existing = await Participant.getOne(id);

    if (!existing || !existing.id) {
      let newParticipant = new Participant();
      newParticipant.id = id;
      newParticipant.name = name || id;
      newParticipant.msp = this.fullIdentity.getMSPID();
      // create a new identity
      newParticipant.identities = [{
        fingerprint: this.sender,
        status: true
      }];
      // add date in epoch unix time
      newParticipant.createdDate = new Date().getTime();
      // if participant is null, it is the gov that is created right now, assign newParticipant to it
      if (!participant) { participant = newParticipant };
      // always add gov participant
      newParticipant.participant = participant;

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