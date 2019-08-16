import { Body, Controller, Get, HttpException, HttpStatus, Logger, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiUseTags, ApiOkResponse, ApiBadRequestResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { Participant } from 'participant-cc';
import { ParticipantControllerBackEnd } from '../convector';
import { swaggerModuleTagParticipant } from '../env';
import { RegisterParticipantDto } from './dto';
import { restrings as r } from '../constants';

@Controller(swaggerModuleTagParticipant)
@ApiUseTags(swaggerModuleTagParticipant)
export class ParticipantController {

  @Get()
  @ApiOperation({ title: r.API_RESPONSE_GET_PARTICIPANT })
  @ApiOkResponse({ description: r.API_RESPONSE_FOUND_RECORDS })
  @ApiBadRequestResponse({ description: r.API_RESPONSE_BAD_REQUEST })
  public async getAll() {
    try {
      return ParticipantControllerBackEnd.getAll();
    } catch (err) {
      Logger.error(JSON.stringify(err));
      throw new HttpException(r.API_RESPONSE_BAD_REQUEST, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/:id')
  @ApiOperation({ title: r.API_RESPONSE_GET_PARTICIPANT })
  @ApiOkResponse({ description: r.API_RESPONSE_FOUND_RECORD })
  @ApiBadRequestResponse({ description: r.API_RESPONSE_BAD_REQUEST })
  public async get(@Param('id') id: string): Promise<Participant> {
    try {
      return await ParticipantControllerBackEnd.get(id);
    } catch (err) {
      Logger.error(JSON.stringify(err));
      throw new HttpException(r.API_RESPONSE_BAD_REQUEST, HttpStatus.BAD_REQUEST);
    }
  }

  @Post()
  @ApiOperation({ title: r.API_RESPONSE_REGISTER_PARTICIPANT })
  @ApiCreatedResponse({ description: r.API_RESPONSE_CREATED, type: RegisterParticipantDto })
  @ApiBadRequestResponse({ description: r.API_RESPONSE_BAD_REQUEST })
  public async register(@Body() participantDto: RegisterParticipantDto): Promise<void> {
    try {
      return await ParticipantControllerBackEnd.register(participantDto.id, participantDto.name);
    } catch (err) {
      Logger.error(JSON.stringify(err));
      throw new HttpException(`${r.API_RESPONSE_BAD_REQUEST}: ${err.message}`, HttpStatus.BAD_REQUEST);
    }
  }
}
