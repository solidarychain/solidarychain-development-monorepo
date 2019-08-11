import { Controller, Get, HttpException, HttpStatus, Logger, Param } from '@nestjs/common';
import { ParticipantControllerBackEnd } from '../convector';

@Controller('/participant')
export class ParticipantController {

  @Get(':id')
  public async get(@Param('id') id: string) {
    try {
      return await ParticipantControllerBackEnd.get(id);
    } catch (err) {
      Logger.log(JSON.stringify(err));
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }

}
