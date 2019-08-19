import { Body, Controller, Get, HttpException, HttpStatus, Logger, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBadRequestResponse, ApiBearerAuth, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiUnauthorizedResponse, ApiUseTags } from '@nestjs/swagger';
import { Person } from 'person-cc';
import { appConstants as r } from '../constants';
import { envVariables as e } from '../env';
import { AddPersonAttributeDto, CreatePersonDto, GetPersonByAttributeDto } from './dto';
import { PersonService } from './person.service';

@Controller(`${e.swaggerApiPath}/${e.swaggerModuleTagPerson}`)
@ApiUseTags(e.swaggerModuleTagPerson)
export class PersonController {

  constructor(public personService: PersonService) { }

  @Get('/')
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @ApiOperation({ title: r.API_OPERATION_GET_ALL_PERSONS })
  @ApiOkResponse({ description: r.API_RESPONSE_FOUND_RECORDS })
  @ApiBadRequestResponse({ description: r.API_RESPONSE_BAD_REQUEST })
  @ApiInternalServerErrorResponse({ description: r.API_RESPONSE_INTERNAL_SERVER_ERROR })  
  @ApiUnauthorizedResponse({ description: r.API_RESPONSE_UNAUTHORIZED })
  public getAll(): Promise<Person[]> {
    try {
      return (this.personService.getAll() as Promise<Person[]>);
    } catch (err) {
      Logger.error(JSON.stringify(err));
      throw new HttpException(r.API_RESPONSE_BAD_REQUEST, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @ApiOperation({ title: r.API_OPERATION_GET_PERSON })
  @ApiOkResponse({ description: r.API_RESPONSE_FOUND_RECORD })
  @ApiInternalServerErrorResponse({ description: r.API_RESPONSE_INTERNAL_SERVER_ERROR })
  @ApiUnauthorizedResponse({ description: r.API_RESPONSE_UNAUTHORIZED })
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
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @ApiOperation({ title: r.API_OPERATION_CREATE_PERSON })
  @ApiOkResponse({ description: r.API_RESPONSE_FOUND_RECORDS, type: CreatePersonDto })
  @ApiInternalServerErrorResponse({ description: r.API_RESPONSE_INTERNAL_SERVER_ERROR })
  @ApiUnauthorizedResponse({ description: r.API_RESPONSE_UNAUTHORIZED })
  public async create(@Body() createPersonDto: CreatePersonDto): Promise<void> {
    try {
      return this.personService.create(createPersonDto);
    } catch (err) {
      Logger.error(JSON.stringify(err));
      const message: string = (err.responses[0]) ? err.responses[0].error.message : r.API_RESPONSE_INTERNAL_SERVER_ERROR;
      throw new HttpException(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('/:id/add-attribute')
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @ApiOperation({ title: r.API_OPERATION_ADD_PERSON_ATTRIBUTE })
  @ApiOkResponse({ description: r.API_RESPONSE_FOUND_RECORDS, type: AddPersonAttributeDto })
  @ApiInternalServerErrorResponse({ description: r.API_RESPONSE_INTERNAL_SERVER_ERROR })
  @ApiUnauthorizedResponse({ description: r.API_RESPONSE_UNAUTHORIZED })
  public async addAttribute(@Param('id') id: string, @Body() addPersonAttributeDto: AddPersonAttributeDto): Promise<Person[]> {
    try {
      return (this.personService.addAttribute(id, addPersonAttributeDto.attributeId, addPersonAttributeDto.content) as Promise<Person[]>);
    } catch (err) {
      Logger.error(JSON.stringify(err));
      throw new HttpException(r.API_RESPONSE_INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('/:id/get-attribute')
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @ApiOperation({ title: r.API_OPERATION_ADD_PERSONS_BY_ATTRIBUTE })
  @ApiOkResponse({ description: r.API_RESPONSE_FOUND_RECORDS, type: GetPersonByAttributeDto })
  @ApiInternalServerErrorResponse({ description: r.API_RESPONSE_INTERNAL_SERVER_ERROR })
  @ApiUnauthorizedResponse({ description: r.API_RESPONSE_UNAUTHORIZED })
  public async getByAttribute(@Param('id') id: string, @Body() getPersonByAttributeDto: GetPersonByAttributeDto): Promise<Person | Person[]> {
    try {
      return this.personService.getByAttribute(id, getPersonByAttributeDto.value);
    } catch (err) {
      Logger.error(JSON.stringify(err));
      throw new HttpException(r.API_RESPONSE_INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
