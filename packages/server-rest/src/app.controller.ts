import { Controller, Get, HttpStatus, Post, Request, Res, UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiCreatedResponse, ApiExcludeEndpoint, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiUnauthorizedResponse, ApiUseTags } from '@nestjs/swagger';
import * as express from 'express';
import { AuthService } from './auth/auth.service';
import { GetProfileResponseDto } from './auth/dto/get-profile-response.dto';
import { LoginUserResponseDto } from './auth/dto/login-user-response.dto';
import { appConstants as c } from './constants';
import { envVariables as e } from './env';
import { LoginUserDto } from './auth/dto/login-user.dto';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) { }

  @Get()
  @ApiExcludeEndpoint()
  redirectToApi(@Res() response: express.Response) {
    response.redirect(e.swaggerApiPath, HttpStatus.PERMANENT_REDIRECT);
  }

  // @Body Dto using only to help swagger to have request parameters with Dto props
  @Post(`/${e.swaggerApiPath}/login`)
  @ApiUseTags(e.swaggerModuleTagAuth)
  // implicit using authGuard local (non defaultStrategy)
  @UseGuards(AuthGuard('local'))
  @ApiOperation({ title: c.API_OPERATION_AUTH_LOGIN })
  @ApiCreatedResponse({ description: c.API_RESPONSE_LOGIN, type: LoginUserResponseDto })
  @ApiInternalServerErrorResponse({ description: c.API_RESPONSE_INTERNAL_SERVER_ERROR })
  @ApiUnauthorizedResponse({ description: c.API_RESPONSE_UNAUTHORIZED })
  async login(@Request() req, @Body() loginUser: LoginUserDto): Promise<LoginUserResponseDto> {
    // passport will attach the authenticated user to the request object
    // @Body() loginUser: LoginUserDto is used only in swagger api, else we don't have a object to fill with properties ex {"username": "johndoe","password": "12345678"}
    return this.authService.login(req.user);
  }

  // When GET /api/me route is hit, the Guard will automatically invoke our passport-jwt custom configured logic,
  // validating the JWT, and assigning the user property to the Request object.
  @Get(`/${e.swaggerApiPath}/me`)
  @ApiUseTags(e.swaggerModuleTagAuth)
  // implicit using authGuard jwt
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ title: c.API_OPERATION_GET_PROFILE })
  @ApiOkResponse({ description: c.API_RESPONSE_GET_PROFILE, type: GetProfileResponseDto })
  @ApiInternalServerErrorResponse({ description: c.API_RESPONSE_INTERNAL_SERVER_ERROR })
  @ApiUnauthorizedResponse({ description: c.API_RESPONSE_UNAUTHORIZED })
  getProfile(@Request() req) {
    return req.user;
  }
}
