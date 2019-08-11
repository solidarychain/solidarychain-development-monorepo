import { Body, Controller, Get, HttpException, HttpStatus, Logger, Param, Post } from '@nestjs/common';
import { Person } from 'person-cc';
import { PersonControllerBackEnd } from '../convector';
import { PersonService } from './person.service';

@Controller('person')
export class PersonController {

  constructor(public personService: PersonService) { }

  @Get('/')
  public getAll() {
    try {
      return this.personService.getAll();
    } catch (err) {
      Logger.log(JSON.stringify(err));
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }

  @Post('/')
  public async create(@Body() { id, name }) {
    try {
      const personToCreate = new Person({ id, name });
      return await PersonControllerBackEnd.create(personToCreate);
    } catch (err) {
      Logger.log(JSON.stringify(err));
      throw new HttpException('Internal', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/:id')
  public async get(@Param() { id }) {
    try {
      const personToReturn = new Person(await PersonControllerBackEnd.get(id));
      return personToReturn.toJSON();
    } catch (err) {
      Logger.log(JSON.stringify(err));
      throw new HttpException('Internal', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('/:id/add-attribute')
  public async getAttribute(@Param() { id }, @Body() { attributeId, content }) {
    try {
      return this.personService.addAttribute(id, attributeId, content);
    } catch (err) {
      Logger.log(JSON.stringify(err));
      throw new HttpException('Internal', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
