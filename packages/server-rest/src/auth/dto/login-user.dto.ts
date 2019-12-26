import { ApiModelProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginUserDto {
  @ApiModelProperty()
  @IsString()
  readonly username: string;

  @ApiModelProperty()
  @IsString()
  readonly password: string;

  readonly user: any;
}
