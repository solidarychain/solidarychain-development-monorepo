import { Body, Controller, Get, HttpException, HttpStatus, Logger, Param, Post } from '@nestjs/common';
import { ApiUseTags, ApiOperation, ApiOkResponse, ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiBearerAuth } from '@nestjs/swagger';
import { swaggerModuleTagPerson } from '../env';
import { AddPersonAttributeDto, CreatePersonDto, GetPersonByAttributeDto } from './dto';
import { PersonService } from './person.service';
import { restrings as r } from '../constants';
import { Person } from 'person-cc';

@Controller(swaggerModuleTagPerson)
@ApiUseTags(swaggerModuleTagPerson)
export class PersonController {

  constructor(public personService: PersonService) { }

  @Get('/')
  @ApiBearerAuth()
  @ApiOperation({ title: r.API_RESPONSE_GET_ALL_PERSONS })
  @ApiOkResponse({ description: r.API_RESPONSE_FOUND_RECORDS })
  @ApiBadRequestResponse({ description: r.API_RESPONSE_BAD_REQUEST })
  public getAll(): Promise<Person[]> {
    try {
      return (this.personService.getAll() as Promise<Person[]>);
    } catch (err) {
      Logger.error(JSON.stringify(err));
      throw new HttpException(r.API_RESPONSE_BAD_REQUEST, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/:id')
  @ApiOperation({ title: r.API_RESPONSE_GET_PERSON })
  @ApiOkResponse({ description: r.API_RESPONSE_FOUND_RECORD })
  @ApiInternalServerErrorResponse({ description: r.API_RESPONSE_INTERNAL_SERVER_ERROR })
    public async get(@Param('id') id: string): Promise<Person> {
    try {
      return await this.personService.get(id);
    } catch (err) {
      Logger.error(JSON.stringify(err));
      const message: string = (err.responses[0]) ? err.responses[0].error.message : r.API_RESPONSE_INTERNAL_SERVER_ERROR;
      throw new HttpException(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('/')
  @ApiOperation({ title: r.API_RESPONSE_CREATE_PERSON })
  @ApiOkResponse({ description: r.API_RESPONSE_FOUND_RECORDS, type: CreatePersonDto })
  @ApiInternalServerErrorResponse({ description: r.API_RESPONSE_INTERNAL_SERVER_ERROR })
  public async create(@Body() createPersonDto: CreatePersonDto): Promise<void> {
    try {
      return this.personService.create(createPersonDto.id, createPersonDto.name);
    } catch (err) {
      Logger.error(JSON.stringify(err));
      const message: string = (err.responses[0]) ? err.responses[0].error.message : r.API_RESPONSE_INTERNAL_SERVER_ERROR;
      throw new HttpException(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('/:id/add-attribute')
  @ApiOperation({ title: r.API_RESPONSE_ADD_PERSON_ATTRIBUTE })
  @ApiOkResponse({ description: r.API_RESPONSE_FOUND_RECORDS, type: AddPersonAttributeDto })
  @ApiInternalServerErrorResponse({ description: r.API_RESPONSE_INTERNAL_SERVER_ERROR })
  public async addAttribute(@Param('id') id: string, @Body() addPersonAttributeDto: AddPersonAttributeDto): Promise<Person[]> {
    try {
      return (this.personService.addAttribute(id, addPersonAttributeDto.attributeId, addPersonAttributeDto.content) as Promise<Person[]>);
    } catch (err) {
      Logger.error(JSON.stringify(err));
      throw new HttpException(r.API_RESPONSE_INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('/:id/get-attribute')
  @ApiOperation({ title: r.API_RESPONSE_ADD_PERSONS_BY_ATTRIBUTE })
  @ApiOkResponse({ description: r.API_RESPONSE_FOUND_RECORDS, type: GetPersonByAttributeDto })
  @ApiInternalServerErrorResponse({ description: r.API_RESPONSE_INTERNAL_SERVER_ERROR })
  public async getByAttribute(@Param('id') id: string, @Body() getPersonByAttributeDto: GetPersonByAttributeDto): Promise<Person | Person[]> {
    try {
      return this.personService.getByAttribute(id, getPersonByAttributeDto.value);
    } catch (err) {
      Logger.error(JSON.stringify(err));
      throw new HttpException(r.API_RESPONSE_INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
