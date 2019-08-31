import { IsOptional, Length, MaxLength } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class NewParticipantInput {
  @Field()
  @MaxLength(12)
  id: string;

  @Field()
  @Length(3, 100)
  name: string;

  // @Field({ nullable: true })
  // @IsOptional()
  // @Length(30, 255)
  // description?: string;

  // @Field(type => [String])
  // ingredients: string[];
}
