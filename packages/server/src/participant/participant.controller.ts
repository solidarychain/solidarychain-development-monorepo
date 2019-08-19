import { Body, Controller, Get, HttpException, HttpStatus, Logger, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiUnauthorizedResponse, ApiUseTags } from '@nestjs/swagger';
import { Participant } from 'participant-cc';
import { appConstants as c } from '../constants';
import { ParticipantControllerBackEnd } from '../convector';
import { envVariables as e } from '../env';
import { RegisterParticipantDto } from './dto';

@Controller(e.swaggerModuleTagParticipant)
@ApiUseTags(e.swaggerModuleTagParticipant)
export class ParticipantController {

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @ApiOperation({ title: c.API_OPERATION_GET_ALL_PARTICIPANTS })
  @ApiOkResponse({ description: c.API_RESPONSE_FOUND_RECORDS })
  @ApiBadRequestResponse({ description: c.API_RESPONSE_BAD_REQUEST })
  @ApiUnauthorizedResponse({ description: c.API_RESPONSE_UNAUTHORIZED })
  public async getAll() {
    try {
      return ParticipantControllerBackEnd.getAll();
    } catch (err) {
      Logger.error(JSON.stringify(err));
      throw new HttpException(c.API_RESPONSE_BAD_REQUEST, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @ApiOperation({ title: c.API_OPERATION_GET_PARTICIPANT })
  @ApiOkResponse({ description: c.API_RESPONSE_FOUND_RECORD })
  @ApiBadRequestResponse({ description: c.API_RESPONSE_BAD_REQUEST })
  @ApiUnauthorizedResponse({ description: c.API_RESPONSE_UNAUTHORIZED })
  public async get(@Param('id') id: string): Promise<Participant> {
    try {
      return await ParticipantControllerBackEnd.get(id);
    } catch (err) {
      Logger.error(JSON.stringify(err));
      throw new HttpException(c.API_RESPONSE_BAD_REQUEST, HttpStatus.BAD_REQUEST);
    }
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @ApiOperation({ title: c.API_OPERATION_REGISTER_PARTICIPANT })
  @ApiCreatedResponse({ description: c.API_RESPONSE_CREATED, type: RegisterParticipantDto })
  @ApiBadRequestResponse({ description: c.API_RESPONSE_BAD_REQUEST })
  @ApiUnauthorizedResponse({ description: c.API_RESPONSE_UNAUTHORIZED })
  public async register(@Body() participantDto: RegisterParticipantDto): Promise<void> {
    try {
      return await ParticipantControllerBackEnd.register(participantDto.id, participantDto.name);
    } catch (err) {
      Logger.error(JSON.stringify(err));
      throw new HttpException(`${c.API_RESPONSE_BAD_REQUEST}: ${err.message}`, HttpStatus.BAD_REQUEST);
    }
  }
}
