import { IsDefined, Length, MaxLength, IsOptional, IsUUID } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class NewParticipantInput {
  // optional: generated automatically, but can optionally be used
  @IsOptional()
  @IsUUID()
  @Field({ nullable: true })
  public id: string;

  @Field()
  @IsDefined()
  @Length(3, 30)
  code: string;

  @Field()
  @IsDefined()
  @Length(3, 100)
  name: string;
}
