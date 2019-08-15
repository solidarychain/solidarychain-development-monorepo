import { ApiModelProperty } from '@nestjs/swagger';

export class AddPersonAttributeDto {
  @ApiModelProperty()
  readonly id: string;

  @ApiModelProperty()
  readonly attributeId: string;

  @ApiModelProperty()
  readonly content: any;
}
