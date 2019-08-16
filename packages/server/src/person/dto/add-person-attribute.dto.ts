import { ApiModelProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AddPersonAttributeDto {
  @ApiModelProperty()
  @IsString()
  readonly id: string;

  @ApiModelProperty()
  @IsString()
  readonly attributeId: string;

  @ApiModelProperty()
  readonly content: any;
}
