import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class GetProfileResponseDto {
  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  readonly userId: string;

  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  readonly username: string;
}
