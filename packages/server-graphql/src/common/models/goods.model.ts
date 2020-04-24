import { Optional } from '@nestjs/common';
import { GenericBalance } from '../../common/models';
import { IsDefined, Validate } from 'class-validator';
import { GraphQLJSONObject } from 'graphql-type-json';
import { Field, ID, ObjectType } from 'type-graphql';
import * as yup from 'yup';

@ObjectType()
export class Goods {
  @Field(type => ID)
  public id: string;

  // above is equal dto/new-x.input.ts and models/x.model.ts
  // minus balance, createdDate, createdByPersonId...

  @Field()
  public code: string;

  @Field({ nullable: true })
  @Optional()
  public barCode: string;

  @Field()
  public name: string;

  @Field({ nullable: true })
  @Optional()
  public description: string;

  @Field(type => String, { nullable: true })
  @Optional()
  public tags: string[];

  @Field(type => GenericBalance)
  @IsDefined()
  public balance?: GenericBalance;

  @Field(type => GraphQLJSONObject, { nullable: true })
  @Optional()
  public metaData: any;

  @Field(type => GraphQLJSONObject, { nullable: true })
  @Optional()
  public metaDataInternal: any;

  @Field()
  @IsDefined()
  @Validate(yup.number)
  public createdDate: number;

  @Field()
  @IsDefined()
  public createdByPersonId: string;
}
