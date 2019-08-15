import { ApiModelProperty } from '@nestjs/swagger';

export class RegisterParticipantDto {
  @ApiModelProperty()
  readonly id: string;

  @ApiModelProperty()
  readonly name: string;
}
