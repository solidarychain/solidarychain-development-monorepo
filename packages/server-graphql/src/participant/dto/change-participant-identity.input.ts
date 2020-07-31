import { IsUUID } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class ChangeParticipantIdentityData {
  @Field()
  @IsUUID()
  id: string;

  @Field()
  newIdentity: string;
}
