import { ApiModelProperty } from '@nestjs/swagger';

export class GetPersonByAttributeDto {
  @ApiModelProperty()
  readonly value: any;
}
