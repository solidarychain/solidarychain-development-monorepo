import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
