import { ApiModelProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginUserResponseDto {
  @ApiModelProperty()
  @IsString()
  readonly accessToken: string;
}
