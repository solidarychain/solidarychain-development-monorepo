import { Optional } from '@nestjs/common';
import { GenericBalance } from '../../common/models';
import { IsDefined, Validate } from 'class-validator';
import { GraphQLJSONObject } from 'graphql-type-json';
import { Field, ID, ObjectType } from 'type-graphql';
import * as yup from 'yup';

@ObjectType()
export class Goods {
  @Field(type => ID)
  @IsDefined()
  id: string;

  @Field()
  public code: string;

  @Field()
  public barCode: string;

  @Field()
  public name: string;

  @Field()
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

  @Field({ nullable: true })
  @IsDefined()
  public createdByPersonId: string;
}
