import { ApiModelProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreatePersonDto {
  @ApiModelProperty()
  @IsString()
  readonly id: string;

  @ApiModelProperty()
  @IsString()
  readonly name: string;
}
