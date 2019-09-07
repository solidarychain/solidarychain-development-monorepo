import { IsDefined, Length, MaxLength } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export default class NewParticipantInput {
  @Field()
  @IsDefined()
  @MaxLength(12)
  id: string;

  @Field()
  @IsDefined()
  @Length(3, 100)
  name: string;
}
