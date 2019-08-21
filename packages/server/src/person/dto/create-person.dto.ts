import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsEmail } from 'class-validator';

export class CreatePersonDto {
  @ApiModelProperty()
  @IsString()
  readonly id: string;

  @ApiModelProperty()
  @IsString()
  readonly firstname: string;

  @ApiModelProperty()
  @IsString()
  readonly lastname: string;

  @ApiModelProperty()
  @IsString()
  readonly username: string;

  @ApiModelProperty()
  @IsString()
  readonly password: string;

  @ApiModelProperty()
  @IsString()
  @IsEmail()
  readonly email: string;
}
