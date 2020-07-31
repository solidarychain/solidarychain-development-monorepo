import { Optional } from '@nestjs/common';
import { GenericBalance } from '../../common/models';
import { IsDefined, Validate } from 'class-validator';
import { GraphQLJSONObject } from 'graphql-type-json';
import { Field, ID, ObjectType } from 'type-graphql';
import * as yup from 'yup';

@ObjectType()
export class Goods {
  @Field(type => ID)
  id: string;

  // above is equal dto/new-x.input.ts and models/x.model.ts
  // minus balance, createdDate, createdByPersonId...

  @Field()
  code: string;

  @Field({ nullable: true })
  @Optional()
  barCode: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  @Optional()
  description: string;

  @Field(type => String, { nullable: true })
  @Optional()
  tags: string[];

  @Field(type => GenericBalance)
  @IsDefined()
  balance?: GenericBalance;

  @Field(type => GraphQLJSONObject, { nullable: true })
  @Optional()
  metaData: any;

  @Field(type => GraphQLJSONObject, { nullable: true })
  @Optional()
  metaDataInternal: any;

  @Field()
  @IsDefined()
  @Validate(yup.number)
  createdDate: number;

  @Field()
  @IsDefined()
  createdByPersonId: string;
}
