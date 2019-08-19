import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsEmail } from 'class-validator';

export class CreatePersonDto {
  @ApiModelProperty()
  @IsString()
  readonly id: string;

  @ApiModelProperty()
  @IsString()
  readonly firstName: string;

  @ApiModelProperty()
  @IsString()
  readonly lastName: string;

  @ApiModelProperty()
  @IsString()
  readonly userName: string;

  @ApiModelProperty()
  @IsString()
  readonly passWord: string;

  @ApiModelProperty()
  @IsString()
  @IsEmail()
  readonly email: string;
}
