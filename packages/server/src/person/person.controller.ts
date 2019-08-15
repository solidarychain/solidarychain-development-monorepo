import { Body, Controller, Get, HttpException, HttpStatus, Logger, Param, Post } from '@nestjs/common';
import { Person } from 'person-cc';
import { PersonControllerBackEnd } from '../convector';
import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/CreatePersonDto';
import { AddPersonAttributeDto } from './dto/AddPersonAttributeDto';
import { GetPersonByAttributeDto } from './dto/GetPersonByAttributeDto';

@Controller('person')
export class PersonController {

  constructor(public personService: PersonService) { }

  @Get('/')
  public getAll() {
    try {
      return this.personService.getAll();
    } catch (err) {
      Logger.error(JSON.stringify(err));
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/:id')
  public async get(@Param() { id }) {
    try {
      return await this.personService.get(id);
    } catch (err) {
      Logger.error(JSON.stringify(err));
      const message: string = (err.responses[0]) ? err.responses[0].error.message : 'Internal';
      throw new HttpException(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('/')
  public async create(@Body() createPersonDto: CreatePersonDto) {
    try {
      return this.personService.create(createPersonDto.id, createPersonDto.name);
    } catch (err) {
      Logger.error(JSON.stringify(err));
      const message: string = (err.responses[0]) ? err.responses[0].error.message : 'Internal';
      throw new HttpException(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('/:id/add-attribute')
  public async addAttribute(@Param() { id }, @Body() addPersonAttributeDto: AddPersonAttributeDto) {
    try {
      return this.personService.addAttribute(id, addPersonAttributeDto.attributeId, addPersonAttributeDto.content);
    } catch (err) {
      Logger.error(JSON.stringify(err));
      throw new HttpException('Internal', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('/:id/get-attribute')
  public async getByAttribute(@Param() { id }, @Body() getPersonByAttributeDto: GetPersonByAttributeDto) {
    try {
      return this.personService.getByAttribute(id, getPersonByAttributeDto.value);
    } catch (err) {
      Logger.error(JSON.stringify(err));
      throw new HttpException('Internal', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
