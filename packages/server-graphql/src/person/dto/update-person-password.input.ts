import { IsDefined, IsOptional, IsUUID } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class UpdatePersonPasswordInput {
  @Field()
  @IsUUID()
  id: string;

  @Field({ nullable: true })
  @IsDefined()
  password: string;
}
