import { ApiModelProperty } from '@nestjs/swagger';

export class CreatePersonDto {
  @ApiModelProperty()
  readonly id: string;

  @ApiModelProperty()
  readonly name: string;
}
