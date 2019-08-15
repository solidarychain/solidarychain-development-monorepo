import { Controller, Get, HttpException, HttpStatus, Logger, Param, Post, Body } from '@nestjs/common';
import { ParticipantControllerBackEnd } from '../convector';
import { Participant } from './types';
import { RegisterParticipantDto } from './dto/RegisterParticipantDto';

@Controller('/participant')
export class ParticipantController {

  @Get(':id')
  public async get(@Param('id') id: string): Promise<Participant> {
    try {
      return await ParticipantControllerBackEnd.get(id);
    } catch (err) {
      Logger.error(JSON.stringify(err));
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }

  @Post()
  public async register(@Body() registerParticipantDto: RegisterParticipantDto): Promise<void> {
    try {
      return await ParticipantControllerBackEnd.register(registerParticipantDto.id, registerParticipantDto.name);
    } catch (err) {
      Logger.error(JSON.stringify(err));
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }
}
