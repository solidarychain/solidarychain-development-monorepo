import { Controller, Get, HttpStatus, Post, Request, Res, UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiExcludeEndpoint, ApiOkResponse, ApiOperation, ApiUseTags, ApiInternalServerErrorResponse, ApiUnauthorizedResponse, ApiCreatedResponse, ApiBearerAuth } from '@nestjs/swagger';
import * as express from 'express';
import { AuthService } from './auth/auth.service';
import { LoginUserDto } from './auth/dto/login-user.dto';
import { restrings as r } from './constants';
import { swaggerApiPath, swaggerModuleTagAuth } from './env';
import { LoginUserResponseDto } from './auth/dto/login-user-response.dto';
import { GetProfileResponseDto } from './auth/dto/get-profile-response.dto';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) { }

  @Get()
  @ApiExcludeEndpoint()
  redirectToApi(@Res() response: express.Response) {
    response.redirect(swaggerApiPath, HttpStatus.PERMANENT_REDIRECT);
  }

  @Post(`/${swaggerApiPath}/login`)
  @ApiUseTags(swaggerModuleTagAuth)
  // implicit using authGuard local (non defaultStrategy)
  @UseGuards(AuthGuard('local'))
  @ApiOperation({ title: r.API_OPERATION_AUTH_LOGIN })
  @ApiCreatedResponse({ description: r.API_RESPONSE_LOGIN, type: LoginUserResponseDto })
  @ApiInternalServerErrorResponse({ description: r.API_RESPONSE_INTERNAL_SERVER_ERROR })
  @ApiUnauthorizedResponse({ description: r.API_RESPONSE_UNAUTHORIZED })
  async login(@Request() req, @Body() loginUserDto: LoginUserDto) {
    return this.authService.login(req.user);
  }

  // When GET /api/me route is hit, the Guard will automatically invoke our passport-jwt custom configured logic,
  // validating the JWT, and assigning the user property to the Request object.
  @Get(`/${swaggerApiPath}/me`)
  @ApiUseTags(swaggerModuleTagAuth)
  // implicit using authGuard jwt
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ title: r.API_OPERATION_GET_PROFILE })
  @ApiOkResponse({ description: r.API_RESPONSE_GET_PROFILE, type: GetProfileResponseDto })
  @ApiInternalServerErrorResponse({ description: r.API_RESPONSE_INTERNAL_SERVER_ERROR })
  @ApiUnauthorizedResponse({ description: r.API_RESPONSE_UNAUTHORIZED })
  getProfile(@Request() req) {
    return req.user;
  }
}
