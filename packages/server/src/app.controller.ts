import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { swaggerApiPath } from './env';
import express = require('express');
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @ApiExcludeEndpoint()
  redirectToApi(@Res() response: express.Response) {
    response.redirect(swaggerApiPath, HttpStatus.PERMANENT_REDIRECT);
  }
}
