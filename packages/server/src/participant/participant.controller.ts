import { Body, Controller, Get, HttpException, HttpStatus, Logger, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { Participant } from 'participant-cc';
import { ParticipantControllerBackEnd } from '../convector';
import { swaggerModuleTagParticipant } from '../env';
import { RegisterParticipantDto } from './dto';

@Controller('/participant')
@ApiUseTags(swaggerModuleTagParticipant)
export class ParticipantController {

  @Get()
  @ApiOperation({ title: 'Get all Participants' })
  @ApiResponse({
    status: 200,
    description: 'The found records',
    type: RegisterParticipantDto,
  })
  public async getAll() {
    try {
      return ParticipantControllerBackEnd.getAll();
    } catch (err) {
      Logger.error(JSON.stringify(err));
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  @ApiOperation({ title: 'Get Participant' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: RegisterParticipantDto,
  })
  public async get(@Param('id') id: string): Promise<Participant> {
    try {
      return await ParticipantControllerBackEnd.get(id);
    } catch (err) {
      Logger.error(JSON.stringify(err));
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }

  @Post()
  @ApiOperation({ title: 'Register Participant' })
  @ApiResponse({ status: 201, description: 'The record has been successfully created.', type: RegisterParticipantDto })
  @ApiResponse({ status: 400, description: 'Bad request' })
  public async register(@Body() participantDto: RegisterParticipantDto): Promise<void> {
    try {
      return await ParticipantControllerBackEnd.register(participantDto.id, participantDto.name);
    } catch (err) {
      Logger.error(JSON.stringify(err));
      throw new HttpException(`Bad request: ${err.message}`, HttpStatus.BAD_REQUEST);
    }
  }
}
