import { Test, TestingModule } from '@nestjs/testing';
import { ParticipantController } from './participant.controller';

describe('Participant Controller', () => {
  let controller: ParticipantController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParticipantController],
    }).compile();

    controller = module.get<ParticipantController>(ParticipantController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
